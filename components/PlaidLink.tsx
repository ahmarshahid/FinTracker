import React, {useCallback, useState, useEffect} from 'react'
import { Button } from './ui/button'
import {PlaidLinkOptions} from 'react-plaid-link'
import { useRouter } from 'next/navigation';
import { PlaidLinkOnSuccess, usePlaidLink } from 'react-plaid-link';

const PlaidLink = ({user, variant} : PlaidLinkProps) => {
   
   const router = useRouter();
   
   
    const [token, settoken] = useState('');

    useEffect(()=>{
        const getLinktoken = async() =>{
           
           // const data = await createLinkToken(user);
        
           // setToken(data?/linkToken);
        
        }
        getLinktoken();
    }, []);



    const onSuccess = useCallback<PlaidLinkOnSuccess>(async (public_token: string)=>{
     //   await exchangePublicToken({
     //       publicToken: public_token,
     //       user,
     //   })

        router.push('/');

    }, [user])


    const config: PlaidLinkOptions = {
        token,
        onSuccess
    }
  
  
  const {open, ready} = usePlaidLink(config);
  
  
    return (
    <>
      {variant === 'primary' ? (
        <Button
        onClick = {()=> open()}
        disabled = {!ready}
        className = "plaidlink-primary"
        >
            Connect bank
        </Button>
      ): variant === 'ghost' ? (
        <Button>
            Connect bank
        </Button>
      ): (
        <Button>
            Connect bank
        </Button>
      )}  
    </>
  )
}

export default PlaidLink