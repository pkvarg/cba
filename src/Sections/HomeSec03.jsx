import React from 'react'

const HomeSec03 = () => {
  return (
    <div className='bg-white pb-8' id='events'>
      <h1 className='text-center text-[45px] uppercase my-8'>Podujatia</h1>
      <div className='flex flex-col items-center justify-center text-[27.5px]'>
        <h2 className='text-[35px]'>BLÍŽIACE SA PODUJATIA</h2>
        <h3 className='text-[30px]'>
          JESENNÁ KONFERENCIA PRE KRAJINY STREDNEJ A VÝCHODNEJ EURÓPY A BALKÁNU
          2023
        </h3>
        <p>10.-12. novembra 2023</p>
        <p>Sofia, Bulharsko</p>
        <a
          className='my-4 border border-dark rounded-2xl px-4 pt-1 hover:bg-dark hover:text-white'
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
