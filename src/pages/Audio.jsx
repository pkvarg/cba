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
    <div className='h-[95vh] bg-[#2e2236] text-white text-[35px] relative'>
      <a className='absolute top-2 left-2 text-white' href='/'>
        Home
      </a>
      <h1 className='text-center text-green-700 py-16'>
        Audio for Translation of the Meetings
      </h1>
      <h2 className='text-center text-yellow-600'>
        Room Code will be announced...
      </h2>
      <form
        onSubmit={handleFormSubmit}
        className='flex flex-col justify-center items-center pt-8'
      >
        <div className='text-white my-4'>
          <label className='block text-[25px] '>Enter Room Code</label>
          <input
            type='text'
            required
            placeholder='Enter Room Code'
            onChange={(e) => setRoomcode(e.target.value)}
            className='pl-1'
          />
        </div>
        <button className='text-green-700' type='submit'>
          Enter Room
        </button>
      </form>
    </div>
  )
}

export default Audio
