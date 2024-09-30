'use client'
import React, { useState } from 'react'
import {signIn} from 'next-auth/react'
import { FaGithubSquare } from "react-icons/fa";
import {BiLoader} from "react-icons/bi"

 

const GithubSign = () => {
    const [processing, setProcessing] = useState(false)
    const handlesign = () =>{
    signIn('github', {callbackUrl:'/'})
    setProcessing(true)
    }
  return (
    
    <div>
      <button className='flex items-center p-2 border-2 rounded-full mt-9 gap-5 text-2xl hover:border-orange-300 border-green-700 group' onClick={handlesign} disabled ={processing}>
        <FaGithubSquare className='text-2xl text-green-700 group-hover:text-orange-300'/> 
        <span className='text-green-700 group-hover:text-orange-300'>Continue with Github</span>
        {
          processing ? <BiLoader  className='animate-spin text-2xl'/> : null

        } 
      </button>
    </div>
      
  )

  
}

export default GithubSign