import GithudSign from '@/app/components/GithubSign'
import React from 'react'

const page = () => {
  return (
    <div className="bg-[url('/blue.jpg')] w-full h-dvh bg-cover bg-center justify-center items-center pt-0 flex min-h-screen ">
      <div className=' bg-white  p-6 items-center rounded-xl'>
        <h1 className='font-bold text-3xl p-3'>Sign in to JOTTIFY</h1>
        <div>
          <GithudSign/>
        </div>
     
      </div>
    </div>
    
  )
}

export default page