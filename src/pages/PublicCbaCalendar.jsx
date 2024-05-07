import React from 'react'
import { Link as DomLink } from 'react-router-dom'
import Calendar from '@ericz1803/react-google-calendar'

const PublicCbaCalendar = () => {
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
      <div className='text-white flex justify-start items-center gap-8 text-[30px] lg:text-[25px] ml-2'>
        <DomLink to='/'>Domov</DomLink>
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

export default PublicCbaCalendar
