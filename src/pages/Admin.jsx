import React from 'react'
import { useStateContext } from '../context/StateContext'
import AdminNavbar from '../components/AdminNavbar'
import ApiCalendar from 'react-google-calendar-api'

const Admin = () => {
  const { currentUser } = useStateContext()
  const isAdmin = currentUser.isAdmin

  return (
    isAdmin && (
      <>
        <AdminNavbar />
        <h1 className='text-center text-[35px] text-white'>Admin</h1>
      </>
    )
  )
}

export default Admin
