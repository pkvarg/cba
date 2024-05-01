import { useState } from 'react'
import ApiCalendar from 'react-google-calendar-api'

const apiKey = import.meta.env.VITE_GOOGLE_CALENDAR_API_KEY
const clientId = import.meta.env.VITE_GOOGLE_CALENDAR_CLIENT_ID

const config = {
  clientId: clientId,
  apiKey: apiKey,
  scope: 'https://www.googleapis.com/auth/calendar',
  discoveryDocs: [
    'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest',
  ],
}

const apiCalendar = new ApiCalendar(config)

const TestDemo = () => {
  const [events, setEvents] = useState([])
  const [calendars, setCalendars] = useState([])

  const handleItemClick = (name) => {
    if (name === 'sign-in') {
      apiCalendar.handleAuthClick()
    } else if (name === 'sign-out') {
      apiCalendar.handleSignoutClick()
    }
  }

  const createEventFromNow = () => {
    const now = new Date()
    const oneHourFromNow = new Date(now.getTime() + 60 * 60 * 1000) // Adding 1 hour in milliseconds
    const oneDayFromNow = new Date(now.getTime() + 24 * 60 * 60 * 1000) // Adding 1 day in milliseconds

    if (!isValidDate(now) || !isValidDate(oneHourFromNow)) {
      console.error('Invalid date detected')
      return
    }

    const eventFromNow = {
      summary: 'Pic Event With Google Meet Conference',
      start: {
        dateTime: new Date().toISOString(),
        timeZone: 'Europe/Paris',
      },
      end: {
        dateTime: new Date(new Date().getTime() + 3600000).toISOString(),
        timeZone: 'Europe/Paris',
      },
    }

    apiCalendar
      .createEventFromNow(eventFromNow)
      .then((result) => {
        console.log(result)
      })
      .catch((error) => {
        console.error('Error creating event:', error)
      })
  }

  // Function to check if a date is valid
  const isValidDate = (date) => {
    return date instanceof Date && !isNaN(date)
  }

  const listUpcomingEvents = () => {
    apiCalendar
      .listUpcomingEvents(10)
      .then(({ result }) => {
        console.log(result.items)
        setEvents(result.items)
      })
      .catch((error) => {
        console.error('Error listing upcoming events:', error)
      })
  }

  const listCalendars = () => {
    apiCalendar
      .listCalendars()
      .then(({ result }) => {
        console.log(result.items)
        setCalendars(result.items)
      })
      .catch((error) => {
        console.error('Error listing calendars:', error)
      })
  }

  const createCalendar = () => {
    apiCalendar
      .createCalendar('myCalendar2')
      .then(({ result }) => {
        console.log(result)
      })
      .catch((error) => {
        console.error('Error creating calendar:', error)
      })
  }

  return (
    <div>
      <div style={{ padding: '0.5em' }}>
        <button onClick={() => handleItemClick('sign-in')}>sign-in</button>
        <button onClick={() => handleItemClick('sign-out')}>sign-out</button>
      </div>
      <div style={{ padding: '0.5em' }}>
        <button onClick={createEventFromNow}>Create Event from now</button>
      </div>
      <div style={{ padding: '0.5em' }}>
        <button onClick={listUpcomingEvents}>List upcoming events</button>
        <div>
          <h4>Events</h4>
          {events.length === 0 && <p>No events to show</p>}
          {events.map((event) => (
            <p key={event.id}>{JSON.stringify(event)}</p>
          ))}
        </div>
      </div>
      <div style={{ padding: '0.5em' }}>
        <button onClick={listCalendars}>List calendars</button>
        <div>
          <h4>Calendars</h4>
          {calendars.length === 0 && <p>No calendars to show</p>}
          {calendars.map((calendar) => (
            <p key={calendar.id}>{JSON.stringify(calendar)}</p>
          ))}
        </div>
      </div>
      <div style={{ padding: '0.5em' }}>
        <button onClick={createCalendar}>Create calendar</button>
      </div>
    </div>
  )
}

export default TestDemo
