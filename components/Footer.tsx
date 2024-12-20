import React from 'react'
import Image from 'next/image'
import { logout } from '@/lib/actions/user.actions'
import { useRouter } from 'next/navigation'
const Footer = ({user, type = 'desktop'}: FooterProps) => {

    const router = useRouter();

    const handleLogout = async ()=> {
        const LoggedOut = await logout();

        if(LoggedOut){
            router.push('/sign-in')
        }
    }
  return (
    <footer className='footer'>
        <div className= {type === 'mobile' ? 'footer_name-mobile' : 'footer_name'}>
            <p className='text-xl font-bold text-red-700'>
                {user?.name[0]}
            </p>
        </div>

        <div className = {type === 'mobile' ? 'footer_email-mobile' : 'footer_email'}>
            <h1 className='text-14 truncate font-bold font-semibold text-gray-700'>
                {user?.name}
            </h1>

            <p className = "text-14 truncate font-normal text-gray-600">
                {user?.email}
            </p>
        </div>

        <div className = "footer_image" onClick = {handleLogout}>

            <Image src = "icons/logout.svg" fill alt = "Logout" className='hover:bg-gray-200'/>
           

        </div>

    </footer>
  )
}

export default Footer