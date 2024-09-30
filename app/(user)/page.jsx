import React from 'react'

const page = () => {
  return (
    <div className='one h-dvh w-full bg-cover bg-center bg-no-repeat'>
      <div className='bg-black/70 w-full h-dvh flex flex-col lg:gap-10 items-center'>
        <p className='text-white text-2xl text-center w-2/4 lg:mt-28'>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ut, delectus hic similique commodi recusandae quasi dolore quod ab maxime itaque illo eius tempore facere perspiciatis fugiat impedit inventore. Numquam, quasi. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sed autem assumenda id suscipit mollitia ea velit at earum officia, provident dicta, veniam accusantium, dignissimos eligendi deserunt perferendis possimus quidem fugit.
        </p>
        <div className='flex items-center justify-evenly'>
          <button className='p-3 w-fit h-fit text-xl border-2 border-solid text-white border-white hover:bg-white hover:text-black rounded-md m-16'>Learn More</button>
          <button className='p-3 w-fit h-fit text-xl border-2 border-solid text-white border-white hover:bg-white hover:text-black rounded-md m-16'>Get Started</button>
        </div>
      </div>
    </div>
  )
}

export default page