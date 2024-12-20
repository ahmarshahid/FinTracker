"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { z } from "zod";
import { authformSchema } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import CustomInput from "./CustomInput";
import { useRouter } from "next/navigation"
import {signIn, signUp } from "@/lib/actions/user.actions";


const AuthForm = ({ type }: { type: string }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  

  const formSchema = authformSchema(type);
  
  const router = useRouter();


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async(data: z.infer<typeof 
    formSchema>) => {
    setIsLoading(true);
    
    try {
      // Creating an account for Appwrite and Plaid Link Token


      if(type === 'sign-up'){
        const newUser = await signUp(data);
        

        setUser(newUser);
      }

      if(type === 'sign-in'){

         const response = await signIn({
          email : data.email,
          password: data.password,
       })

        if(response){router.push('/')}
        
      }
    }
  catch(error){
    console.log(error);
  }
    finally{
      setIsLoading(false);
  }
  }


  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link href="/" className="cursor-pointer flex items-center gap-1">
          <Image src="/icons/bitcoin1.png" width={34} height={34} alt="Horizon logo" />
          <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">Fintech</h1>
        </Link>
        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-26 lg:text-36 font-semibold text-gray-900">
            {user ? "Link Account" : type === "sign-in" ? "Sign In" : "Sign Up"}
          </h1>
          <p className="text-16 font-normal text-gray-600">
            {user ? "Link your account to access the services" : "Please Enter your details"}
          </p>
        </div>
      </header>
      {user ? (
        <div className="flex flex-col gap-4">{/* PlaidLink */}</div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

            {type === 'sign-up' && (
              <>

              <div className = "flex gap-4">


              <CustomInput control={form.control} name="firstName" 
              Label="First Name" placeholder="Enter your first name" 
              type="text" />

              <CustomInput control={form.control} name="lastName" 
              Label="Last Name" placeholder="Enter your last name" 
              type="text" />

              </div>


              <CustomInput control={form.control} name="address1" 
              Label="Address" placeholder="Enter your address" 
              type="text" />

              <CustomInput control={form.control} name="city" 
              Label="City" placeholder="Enter your city" 
              type="text" />

              
              <div className = "flex gap-4">
              <CustomInput control={form.control} name="state" 
              Label="State" placeholder="Example LHR" 
              type="text" />

              <CustomInput control={form.control} name="postalCode" 
              Label="Postal Code" placeholder="111001" 
              type="text" />

              </div>

                <div className = "flex gap-4">
              <CustomInput control={form.control} name="dateOfBirth" 
              Label="Date of Birth" placeholder="YYYY-MM-DD" 
              type="text" />

              <CustomInput control={form.control} name="ssn" 
              Label="SSN" placeholder="Example 123-45-6789" 
              type="text" />
              </div>

              </>
            )}

              {/*for email*/}
              <CustomInput control={form.control} name="email" Label="Email" placeholder="Enter your email" type="email" />
               {/*for password*/}
              <CustomInput control={form.control} name="password" Label="Password" placeholder="Enter your password" type="password" />
             
              <div className = "flex flex-col gap-4">
              <Button type="submit" disabled={isLoading}
              className="form-btn">
                {isLoading ? 
                 ( 
                 <>
                 <Loader2 size={20} className="animate-spin" /> &nbsp; Loading...
                 </>
                ) : type === "sign-in" ? 'Sign In' : 'Sign Up'}
              </Button>

              </div>


            </form>
          </Form>   

            <footer className = "flex justify-center gap-1">
              <p className="text-14 font-normal text-gray-600">
                {type === "sign-in" ? "Don't have an account?" : "Already have an account?"}
              </p>
              <Link href={type === 'sign-in' ? '/sign-up'
              : '/sign-in'} className="form-Link text-blue-600">
                {type === 'sign-in' ? 'Sign Up' : 'Sign In'}
              
              </Link>


            </footer>






        </>
      )}
    </section>
  );
};

export default AuthForm;
