import React from 'react'
import Header from '../components/Header'

const Home = () => {
  return (
    <>
      <Header />
      <div className='hero h-[100vh] text-[25px] text-white -mt-[8%]'>
        <h1 className='text-center text-[55px] pt-[20%]'>Vitajte doma</h1>
      </div>
    </>
  )
}

export default Home
