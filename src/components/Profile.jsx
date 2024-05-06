import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useStateContext } from '../context/StateContext'

const Profile = ({ userId, setUserId }) => {
  const { currentUser, setCurrentUser } = useStateContext()
  const currentUserisAdmin = currentUser.isAdmin

  const [user, setUser] = useState()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const getUserById = async () => {
      const res = await axios.get(
        `https://api.pictusweb.com/api/cba/getUserById/${userId}`
        //`http://localhost:2000/api/cba/getUserById/${userId}`
      )
      if (res.data) {
        setName(res.data.name)
        setEmail(res.data.email)
        setIsAdmin(res.data.isAdmin)
      }
    }
    getUserById()
  }, [userId])

  const editUser = async (e) => {
    e.preventDefault()
    if (newPassword !== repeatPassword) {
      return toast.error('Nové heslo a opakované heslo sa nezhodujú')
    }
    //toast.success('OK')
    try {
      const res = await axios.put(
        `https://api.pictusweb.com/api/cba/edituser/${userId}`,
        // `http://localhost:2000/api/cba/edituser/${userId}`,
        {
          name,
          email,
          newPassword,
          isAdmin,
        }
      )
      if (res.statusText === 'OK') {
        setUserId('')
        setCurrentUser((prevUser) => ({
          ...prevUser,
          name: name,
          email: email,
          isAdmin: isAdmin,
        }))
      }
    } catch (error) {
      console.log(error)
    }
  }

  const deleteUser = async (e) => {
    e.preventDefault()
    if (window.confirm('Naozaj?')) {
      try {
        const res = await axios.delete(
          `https://api.pictusweb.com/api/cba/deleteuser/${userId}`
          //`http://localhost:2000/api/cba/deleteuser/${userId}`
        )
        if (res.statusText === 'OK') {
          toast.success(res.data)
          setUserId('')
        }
      } catch (error) {
        console.log(error)
      }
    } else {
      setUserId('')
    }
  }

  return (
    <div className='absolute left-[50%] top-[50%] transform -translate-x-1/2 -translate-y-1/2'>
      <p
        onClick={() => setUserId('')}
        className='text-red-500 text-right cursor-pointer'
      >
        X
      </p>
      <h1>Profil</h1>
      <form onSubmit={editUser} className='flex flex-col'>
        <label>Meno</label>
        <input
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label className='mt-1'>Email</label>

        <input
          type='text'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <>
          <label className='mt-1'>Nové heslo</label>

          <input
            type='password'
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <label className='mt-1'>Opakovať nové heslo</label>
          <input
            type='password'
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
          />
        </>

        {currentUserisAdmin && (
          <>
            <label className='mt-1'>Admin?</label>
            <input
              type='text'
              value={isAdmin}
              onChange={(e) => setIsAdmin(e.target.value)}
            />
          </>
        )}
        <button type='submit' className='text-green-500 mt-4'>
          Upraviť
        </button>
        {currentUserisAdmin && (
          <button onClick={deleteUser} className='text-red-700'>
            Vymazať
          </button>
        )}
      </form>
    </div>
  )
}

export default Profile
