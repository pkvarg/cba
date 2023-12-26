import React, { useState, useEffect } from 'react'
import { useStateContext } from '../context/StateContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Profile from '../components/Profile'
import AdminNavbar from '../components/AdminNavbar'

const Admin = () => {
  const { currentUser } = useStateContext()
  const navigate = useNavigate()
  const isAdmin = currentUser.isAdmin

  return (
    isAdmin && (
      <>
        <AdminNavbar />
      </>
    )
  )
}

export default Admin
