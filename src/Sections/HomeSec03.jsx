import React from 'react'

const HomeSec03 = () => {
  return (
    <div className='bg-white py-8' id='events'>
      <h1 className='text-center text-[45px] uppercase my-8'>Podujatia</h1>
      <div className='flex flex-col items-center justify-center text-[27.5px]'>
        <h2 className='text-[35px]'>BLÍŽIACE SA PODUJATIA</h2>
        <h3 className='text-[30px] text-center mx-4 lg:mx-0'>
          JESENNÁ KONFERENCIA PRE KRAJINY STREDNEJ A VÝCHODNEJ EURÓPY A BALKÁNU
          2023
        </h3>
        <p className='mt-8'>10.-12. novembra 2023</p>
        <p>Sofia, Bulharsko</p>
        <a
          className='my-4 border border-[#2e2236] rounded-2xl px-4 pt-1 hover:bg-[#2e2236] hover:text-white'
          href='https://churchesceeb.org/home-sk/'
          target='_blank'
        >
          viac
        </a>
      </div>
    </div>
  )
}

export default HomeSec03
