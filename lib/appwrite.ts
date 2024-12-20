"use server";
import { Client, Account } from "node-appwrite";
import { cookies } from "next/headers";
import { Users, Databases } from "node-appwrite";
export async function createSessionClient() {
  const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
  const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT;

  if (!endpoint || !projectId) {
    throw new Error("Appwrite endpoint or project ID is not set.");
  }

  const client = new Client().setEndpoint(endpoint).setProject(projectId);

  const session = cookies().get("appwrite-session");

  if (!session || !session.value) {
    console.error("Session cookie not found or invalid:", session);
    throw new Error("No session: appwrite-session cookie is missing or empty.");
  }

  client.setSession(session.value);

  return {
    account: new Account(client),
    client,
  };
}

export async function createAdminClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)
    .setKey(process.env.NEXT_APPWRITE_KEY!);

  return {
    get account() {
      return new Account(client);
    },
    get database(){
        return new Databases(client)
    },
    get user(){
        return new Users(client)
    }
  };
}
