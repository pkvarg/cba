import React, { useState, useEffect } from 'react'
import { useStateContext } from '../context/StateContext'
import CbaZoneNavbar from '../components/CbaZoneNavbar'
import { useNavigate } from 'react-router-dom'

const CbaZone = () => {
  const { currentUser, setCurrentUser } = useStateContext()
  const isAdmin = currentUser.isAdmin
  const navigate = useNavigate()

  // useEffect(() => {
  //   if (!currentUser) return navigate('/')
  // }, [currentUser])
  return (
    <>
      <CbaZoneNavbar />

      <div className='text-white flex justify-center text-[20px]'>
        <h1>Ahoj {currentUser.name}</h1>
      </div>
    </>
  )
}

export default CbaZone
