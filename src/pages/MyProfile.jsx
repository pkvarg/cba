import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Profile from '../components/Profile'
import { useStateContext } from '../context/StateContext'

const MyProfile = () => {
  const params = useParams()
  const navigate = useNavigate()
  const id = params.id
  const [userId, setUserId] = useState(id)

  useEffect(() => {
    if (userId === '') navigate('/cba-zone')
  }, [userId])

  return (
    <div className='text-white text-[25px]'>
      <a href='/cba-zone'>Naspäť</a>
      {userId && (
        <div>
          <div>
            <Profile userId={userId} setUserId={setUserId} />
          </div>
        </div>
      )}
    </div>
  )
}

export default MyProfile
