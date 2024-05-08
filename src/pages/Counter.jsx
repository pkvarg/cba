import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Counter = () => {
  const [count, setCount] = useState(0)

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const getVisitors = async () => {
    const { data } = await axios.get(
      `https://api.pictusweb.com/api/visitors/cba/counter`,

      // `http://localhost:2000/api/visitors/cba/counter`,

      config
    )

    setCount(data)
  }

  useEffect(() => {
    getVisitors()
  }, [count])

  return (
    <div className='m-4 text-white text-[30px]'>
      <h1>Počet návštev: {count}</h1>
    </div>
  )
}

export default Counter
