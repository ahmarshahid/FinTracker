"use client"
//import { Link } from 'lucide-react'
import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import Image from 'next/image'
import Footer from './Footer'


const Sidebar = ({user}: SiderbarProps) => {

    const pathName = usePathname();

  return (
    <section className= 'sidebar'>
        <nav className = 'flex flex-col gap-4'>
            <Link href='/' className='mb-12 cursor-pointer items-center flex gap-2'>
             <Image src='/icons/bitcoin1.png' 
            width={40} 
            height={36}
            alt = "Bitcoin Icon"
            className='size-[24px]
            max-xl:size-16 items-center'
            /> 
            <h1 className='sidebar-logo'
            >Fintech</h1>
            </Link>

    {
        sidebarLinks.map((item) => {

            const isActive = pathName === item.route || pathName.startsWith('${item.route}/');    

         return (
            <Link href={item.route} key={item.label}
            className={cn
                ('sidebar-link', {
                    'bg-bank-gradient': isActive
                }) }
            >
                 <div className='relative size-6'>
                    <Image
                    src = {item.imgURL}
                    alt={item.label}
                    fill
                    className = {cn({
                        'brightness-[3] invert-0': isActive
                    })}
                    />

                 </div>
                 <p className={cn(
                    "sidebar-label",
                    {"!text-white":isActive})}>
                        {item.label}
                 </p>
             </Link>
            );
         })
    }

    USER

        </nav>
    
    <Footer user = {user}/>
    
    </section>
  )
}

export default Sidebar