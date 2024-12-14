import React from 'react'
import AuthForm from '@/components/AuthForm'
import { getLoggedInUser } from '@/lib/actions/user.actions';

const SignUp = async() => {

  const LoggedInUser = await getLoggedInUser();
  console.log(LoggedInUser);
 
  return (

    <section className='fex-center size-full max-sm:px-6'>
      <AuthForm type = 'sign-up'/>
    </section>
  )
}

export default SignUp
