import React, { useState, useEffect } from 'react'
import { useStateContext } from '../context/StateContext'
import CbaZoneNavbar from '../components/CbaZoneNavbar'
import { useNavigate } from 'react-router-dom'
import Meetings from '../Sections/cba-zone/Meetings'

const CbaZone = () => {
  const { currentUser, setCurrentUser } = useStateContext()
  const isAdmin = currentUser.isAdmin
  const navigate = useNavigate()

  return (
    <>
      <CbaZoneNavbar />

      <div className='text-white flex flex-col justify-center items-center gap-8 mx-4 lg:mx-16 text-[30px] lg:text-[25px]'>
        <Meetings />
        <p className='text-[35px] text-green-500'>Úvody 2024</p>
        <img src='/rozpis2024.webp' alt='schedule' className='my-2' />
        <p className='text-[35px] text-green-500'>Varenie 2024</p>
        <p>...</p>
      </div>
    </>
  )
}

export default CbaZone
