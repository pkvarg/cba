import React from 'react'
import CbaZoneBack from '../components/CbaZoneBack'
import { useStateContext } from '../context/StateContext'

const AdminBlogs = () => {
  const { currentUser } = useStateContext()
  const isAdmin = currentUser.isAdmin

  return (
    isAdmin && (
      <div className='text-[25px] text-white'>
        <CbaZoneBack destination={'/admin'} />
        <h1 className='text-[40px] text-center'>Blogy</h1>
      </div>
    )
  )
}

export default AdminBlogs
