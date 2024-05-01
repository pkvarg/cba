import React from 'react'
import { useStateContext } from '../context/StateContext'

const LanguageBar = () => {
  const { language, setLanguage } = useStateContext()

  const handleLanguage = (lang) => {
    setLanguage(lang)
  }

  return (
    <div className='flex flex-row gap-3 items-center mt-[0px]'>
      <button onClick={() => handleLanguage('english')}>
        <img
          className='w-[3rem] md:w-[3rem] lg:w-[2rem]'
          src='/english.webp'
          alt='english'
        />
      </button>

      <button onClick={() => handleLanguage('slovak')}>
        <img
          className='w-[3rem] md:w-[3rem] lg:w-[2rem]'
          src='/slovak.webp'
          alt='slovak'
        />
      </button>
    </div>
  )
}

export default LanguageBar
