import React from 'react'
import { useStateContext } from '../context/StateContext'
import AdminNavbar from '../components/AdminNavbar'

const Admin = () => {
  const { currentUser } = useStateContext()
  const isAdmin = currentUser.isAdmin

  return (
    isAdmin && (
      <>
        <AdminNavbar />
        <h1 className='text-center text-[35px] text-red-500'>Admin</h1>
      </>
    )
  )
}

export default Admin
