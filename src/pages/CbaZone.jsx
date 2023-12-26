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

      <div className='text-white flex  text-[20px]'>
        <Meetings />
      </div>
    </>
  )
}

export default CbaZone
