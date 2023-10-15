import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Audio = () => {
  const [roomCode, setRoomcode] = useState()
  const navigate = useNavigate()

  const handleFormSubmit = (e) => {
    e.preventDefault()
    navigate(`/room/${roomCode}`)
  }

  return (
    <div className='h-[95vh] bg-dark text-white text-[35px]'>
      <h1 className='text-center py-16'>Audio</h1>
      <form
        onSubmit={handleFormSubmit}
        className='flex flex-col justify-center items-center pt-8'
      >
        <div className='text-black my-4'>
          <label className='block'>Enter Room Code</label>
          <input
            type='text'
            required
            placeholder='Enter Room Code'
            onChange={(e) => setRoomcode(e.target.value)}
            className='pl-1'
          />
        </div>
        <button type='submit'>Enter Room</button>
      </form>
    </div>
  )
}

export default Audio
