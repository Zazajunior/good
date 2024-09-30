'use client'
import React, {useState} from 'react'
import { signIn } from 'next-auth/react'
import { IoLogoGithub } from "react-icons/io5";
import { BiLoader } from "react-icons/bi";

const GithubSignin = () => {
    const [processing, setProcessing] = useState(false)
    const handleSignin = () => {
        signIn("github", { callbackUrl: "/add-note" })
        setProcessing(true)
       
    }
    return (
        <div>
            <button className='border-black p-3 border-[1px] rounded-xl mt-9 flex items-center text-2xl gap-5 hover:bg-slate-200 ' disabled = {processing} onClick={handleSignin}>
                <IoLogoGithub  className='text-2xl'/>
                <span>Continue with Github </span>
                {
                    processing &&<BiLoader className='text-2xl animate-spin'/>
                }
            </button>
        </div>
    )
}

export default GithubSignin