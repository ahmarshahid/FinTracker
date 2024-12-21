"use server";

import { ID } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { cookies } from "next/headers";
import { encryptId, parseStringify } from "../utils";
import { Products, CountryCode, ProcessorTokenCreateRequest, ProcessorTokenCreateRequestProcessorEnum } from "plaid";
import { plaidClient } from '@/lib/plaid';
import { revalidatePath } from "next/cache";
export const signIn = async ({email, password}: signInProps) => {

    try{
        // Mutation /Database Query/ Making Fetch request

      const {account} = await createAdminClient();

      const response = await account.createEmailPasswordSession(email, password);

      return parseStringify(response);

      }

    catch(error){
        console.log('Error', error)
    }

}

export const signUp = async (userData : SignUpParams) => {

const { email, password, firstName, lastName } = userData;


    try{
        // Creating user account using AppWrite
         const { account } = await createAdminClient();

  const newUserAccount =  await account.create(ID.unique(),
   email, 
   password, 
   `${firstName} ${lastName}`
);


  const session = await account.createEmailPasswordSession(email, password);

  cookies().set("appwrite-session", session.secret, {
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    secure: true,
  });

return parseStringify(newUserAccount)

    }

    catch(error){
        console.log('Error', error)
    }

}

export async function getLoggedInUser() {
  try {

    const { account } = await createSessionClient();
     
    if(!account){
      throw new Error("No Session")
    }

    const user = await account.get();

    return parseStringify(user)

  } 

  catch (error) {

    console.error("Hello Error:", error);

    return null;

  }
}

export const logout = async () => {

  try {

    const { account } = await createSessionClient();

    cookies().delete("appwrite-session");

    await account.deleteSession("current");

  } catch (error) {
    console.log("Error", error);
    return null;
  }



}

export const createLinkToken = async (user: User) => {

  try{
    const tokenParams = {
      user: {
        client_user_id: user.$id,
      },
      client_name: user.name,
      products: ['auth'] as Products[],
      language: 'en',
      contry_codes: ['US'] as CountryCode[],
    }

    const response = await plaidClient.linkDeliveryCreate(tokenParams);
    return parseStringify({linkToken: response.data.link_token });

  } catch(error){
    console.log('Error', error);
  }
}

export const exchangePublicToken = async ({
  publicToken,
  user,
}: exchangePublicTokenProps) => {

  try {

    const response = await plaidClient.itemPublicTokenExchange({
      public_token: publicToken,
    });

    const accessToken = response.data.access_token;
    const itemId = response.data.item_id;


    // Get account information from plaid using access token

    const accountsResponse = await plaidClient.accountsGet({
      access_token: accessToken,
    });

    const accountData = accountsResponse.data.accounts[0];


    // Create a processor token for Dwolla using account ID and access token

    const request: ProcessorTokenCreateRequest = {
      access_token: accessToken,
      account_id: accountData.account_id,
      processor: "Dwolla" as ProcessorTokenCreateRequestProcessorEnum,
    };


    const processorTokenResponse = await plaidClient.processorTokenCreate(request);
    const processorToken = processorTokenResponse.data.processor_token;

    // Creating a funding source for account using Dwolla Customer ID and processor token and bank name
    
    const fundingSourceUrl = await addFundingSource({
      dwollaCustomerId: user.dwollaCustomerId,
      processorToken,
      bankName: accountData.name,
    });

    // if there is no funding source URL, throw an error
    if(!fundingSourceUrl) throw Error;

    // Create a bank account using the user ID, item ID, and account ID, access token, and funding source URL and Sharable ID
    await createBankAccount({
      userId: user.$id,
      itemId: itemId,
      accountId: accountData.account_id,
      accessToken,
      fundingSourceUrl,
      sharableId: encryptId(accountData.account_id),
    });

    //Redirect the path to reflect the changes
    revalidatePath('/');
    // Return a success message

    return parseStringify({publicTokenExchange: "Completed",
    });


  } catch (error) {
    console.error("An error occurred while creating exchanging token:", error);
  }
}