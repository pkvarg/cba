import React, { useState, useEffect } from 'react'
import { useStateContext } from '../context/StateContext'
import CbaZoneNavbar from '../components/CbaZoneNavbar'
import { useNavigate } from 'react-router-dom'
import Meetings from '../Sections/cba-zone/Meetings'
import { auth, provider } from './../App'
import { signInWithPopup } from 'firebase/auth'
import Calendar from '@ericz1803/react-google-calendar'

const CbaZone = () => {
  const { currentUser, setCurrentUser } = useStateContext()
  const isAdmin = currentUser.isAdmin
  const navigate = useNavigate()

  const calendarId = import.meta.env.VITE_GOOGLE_CALENDAR_ID

  let calendars = [
    {
      calendarId: calendarId,
      color: '#B241D1',
    },
  ]

  const apiKey = import.meta.env.VITE_GOOGLE_CALENDAR_API_KEY

  const calendarStyles = {
    calendar: {
      border: '1px solid #ccc',
      borderRadius: '5px',
      padding: '10px',
      color: 'white',
    },
    event: {
      backgroundColor: '#f0f0f0',
      borderRadius: '3px',
      padding: '5px',
    },
  }

  const language = 'EN'

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
      <div className='lg:m-[5%]'>
        <h1>My Google Calendar</h1>

        <Calendar
          apiKey={apiKey}
          calendars={calendars}
          styles={calendarStyles}
          language={language}
        />
      </div>
    </>
  )
}

export default CbaZone
