"use client";
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

import { z } from "zod"
 

const formSchema = z.object({
  username: z.string().min(2, {
    
  }),
})

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const AuthForm = ({type}: {type:string}) => {
    const [user, setUser] = useState(null)

     // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  })
 
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }






    
  return (
    <section className='"auth-form'>
       <header className='flex flex-col gap-5 md:gap-8'>
          <Link href="/" className="cursor-pointer flex items-center gap-1">
            <Image 
              src="/icons/bitcoin1.png"
              width={34}
              height={34}
              alt="Horizon logo"
            />
            <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">Fintech</h1>
          </Link>
          <div className = "flex flex-col gap-1 md:gap-3">
            <h1 className=' text-24 lg:text-36 font-semibold text-gray-900'>
            {user
             ? 'Link Account'
             : type==='sign-in'
             ? 'Sign In'
             : 'Sign Up'
            
            }
            <p className='text-16 font-normal text-gray-600'>
                {user 
                ? 'Link your account to access the services'
                : 'Please Enter your details'
            }
            </p>
            </h1>

          </div>
       </header>
       {user ?(
        <div className='flex flex-col gap-4'>
              {/* PlaidLink */}  
        </div>
       ):(
        <>
        FORM
        </>
       )
       }
    </section>
  )
}

export default AuthForm