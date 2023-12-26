import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Profile from '../components/Profile'
import { useStateContext } from '../context/StateContext'
import CbaZoneBack from '../components/CbaZoneBack'

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
      <CbaZoneBack destination={'/cba-zone'} />

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
