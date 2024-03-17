import React from 'react'
import { useNavigate } from 'react-router-dom'

const CbaZoneBack = ({ destination }) => {
  const navigate = useNavigate()
  return (
    <p
      onClick={() => navigate(`${destination}`)}
      className='text-[25px] text-green-500 cursor-pointer'
    >
      Naspäť
    </p>
  )
}

export default CbaZoneBack
