import React, { useState, useEffect } from 'react'
import CbaZoneBack from '../components/CbaZoneBack'
import CreatedEvents from '../Sections/CreatedEvents'
import NonAdminCreatedEvents from '../Sections/NonAdminCreatedEvents'
import axios from 'axios'

const Events = () => {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    const getEvents = async () => {
      try {
        let { data } = await axios.get(
          'https://api.pictusweb.com/api/cba/blogs/category/events'
          //'http://localhost:2000/api/cba/blogs/category/events'
        )

        if (data) {
          data = data.filter((blog) => blog.english !== true)
          setBlogs(data)
        }
      } catch (error) {
        console.log(error)
      }
    }

    getEvents()
  }, [])

  return (
    <div className='text-[25px] text-white'>
      <CbaZoneBack destination={'/cba-zone'} />
      <div className='flex flex-col items-center mx-4 lg:mx-[20%]'>
        <h1 className='text-[40px] text-center mt-4'>Podujatia 2024</h1>
        {/* <CreatedEvents blogs={blogs} /> */}
        <NonAdminCreatedEvents blogs={blogs} />
      </div>
    </div>
  )
}

export default Events
