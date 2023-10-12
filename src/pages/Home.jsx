import React from 'react'
import Header from '../components/Header'

const Home = () => {
  return (
    <>
      <Header />
      <div className='hero h-[100vh] text-[25px] text-white -mt-[25%] lg:-mt-[8%]'>
        <h1 className='text-center text-[55px] pt-[50%] lg:pt-[20%]'>
          Vitajte doma
        </h1>
      </div>
      <div className='bg-[#d1d1d1] text-white text-[40px] py-[200px] text-center'>
        <h1>Na stránke sa pracuje...</h1>
      </div>
    </>
  )
}

export default Home
