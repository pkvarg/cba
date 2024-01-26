import React from 'react'

const HomeSec01 = ({ content }) => {
  return (
    <div className='bg-[#f9f9f9] text-[40px] py-16 text-center' id='about'>
      <div className='uppercase mx-2'>
        <h1 className='font-black'>{content.home01title1}</h1>
        <h2 className='font-bold'>{content.home01title2}</h2>
      </div>
      <div className='flex justify-center'>
        <div className='bg-greyline h-[2px] w-[33%] my-6'></div>
      </div>
      <div className='mx-2 lg:mx-[20%]'>
        <p className='text-[27.5px] text-center'>{content.home01p1}</p>
        <p className='text-[27.5px] text-center'>{content.home01p2}</p>
        <p className='text-[27.5px] text-center'>{content.home01p3}</p>
        <p className='text-[27.5px] text-center'>{content.home01p4}</p>
      </div>
    </div>
  )
}

export default HomeSec01
