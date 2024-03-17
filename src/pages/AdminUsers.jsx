import React, { useState, useEffect } from 'react'
import { useStateContext } from '../context/StateContext'
import Profile from '../components/Profile'
import axios from 'axios'
import CbaZoneBack from '../components/CbaZoneBack'

const AdminUsers = () => {
  const { currentUser } = useStateContext()

  const isAdmin = currentUser.isAdmin

  // emails to db
  const [emailToDb, setEmailToDb] = useState('')
  const [users, setUsers] = useState([])
  const [userId, setUserId] = useState('')

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const { data } = await axios.get('http://localhost:2000/api/cba/getall')
        if (data) {
          setUsers(data)
        }
      } catch (error) {
        console.log(error)
      }
    }
    getAllUsers()
  }, [userId])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(`http://localhost:2000/api/cba/newuser`, {
        emailToDb,
      })
      console.log(res)
      if (res.status === 200) toast.error(res.data)
      if (res.status === 201) toast.success('Užívateľ vytvorený')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    isAdmin && (
      <div className='text-white text-[25px]'>
        <CbaZoneBack destination={'/admin'} />

        <div className='flex text-white text-[25px] ml-2'>
          <div className={userId ? 'blur-md' : ''}>
            <p className='mt-4 ml-2 border-b'>Užívatelia</p>
            {users &&
              users.map((user) => (
                <div key={user._id} className='m-2 border-b'>
                  <p
                    onClick={() => setUserId(user._id)}
                    className='text-green-500 cursor-pointer'
                  >
                    Na profil
                  </p>
                  <p>meno: {user.name}</p>
                  <p>email: {user.email}</p>
                  <p className='text-red-500'>
                    {user.isAdmin === true ? 'Admin' : ''}
                  </p>
                </div>
              ))}

            <form
              onSubmit={handleSubmit}
              className='flex flex-col gap-2 mt-16 ml-2'
            >
              <label className='text-[20px]'>Nový užívateľ</label>
              <input
                type='text'
                value={emailToDb}
                onChange={(e) => setEmailToDb(e.target.value)}
              />
              <button type='submit' className='ml-2 text-green-500'>
                Pridať do databázy
              </button>
            </form>
          </div>

          {userId && <Profile userId={userId} setUserId={setUserId} />}
        </div>
      </div>
    )
  )
}

export default AdminUsers
