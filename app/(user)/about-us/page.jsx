import Image from 'next/image'
import React from 'react'

const page = () => {
  return (
    <main  className='bg-orange-200'>
      <div className='p-5'><h1 className='text-orange-500 text-center lg:text-5xl text-4xl font-mono '>About Us</h1></div>
      <div className='lg:flex flex-row p-5 justify-between  '>
        <div className='lg:mt-32 pb-5'>
          <h2 className='lg:text-3xl text-xl text-orange-500 pb-3  text-center lg:text-left font-extralight'>Welcome To Our Website</h2>
          <p className='pb-3 '>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Blanditiis assumenda odit itaque reprehenderit totam. </p>
          <p className='pb-3'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Blanditiis assumenda odit itaque reprehenderit totam. </p>
          <button className='inline-block bg-orange-400 text-white p-2 rounded-sm text-xl border-none cursor-pointer duration-75 hover:bg-orange-300 hover:scale-110'>Learn More</button>
        </div>
        <div className=''>
          <Image
          src={'/bgimg.jpg'}
          width={1000}
          height={1000}
          alt="About us"
          className=' rounded-md'
          />
        </div>
      </div>
    </main>
  )
}

export default page