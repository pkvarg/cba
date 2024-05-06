import React, { useState, useEffect } from 'react'
import CbaZoneBack from '../components/CbaZoneBack'
import { useStateContext } from '../context/StateContext'
import CreateBlog from '../Sections/CreateBlog'
import CreatedEvents from '../Sections/CreatedEvents'
import axios from 'axios'

const AdminEvents = () => {
  const { currentUser } = useStateContext()
  const isAdmin = currentUser.isAdmin

  const [blogs, setBlogs] = useState([])
  const [key, setKey] = useState(0)
  console.log(key)

  useEffect(() => {
    const getEvents = async () => {
      try {
        const { data } = await axios.get(
          'https://api.pictusweb.com/api/cba/blogs/category/events'
          //'http://localhost:2000/api/cba/blogs/category/events'
        )

        if (data) {
          console.log(data)
          setBlogs(data)
        }
      } catch (error) {
        console.log(error)
      }
    }

    getEvents()
  }, [key])

  return (
    isAdmin && (
      <div className='text-[25px] text-white'>
        <CbaZoneBack destination={'/admin'} />
        <h1 className='text-[40px] text-center'>Podujatia</h1>
        <div className='mx-[30%]'>
          <h1 className='ml-16 my-8 text-center text-[45px] text-green-500'>
            Napíš nový príspevok
          </h1>

          <>
            <CreateBlog category={'events'} setKey={setKey} />
            <CreatedEvents blogs={blogs} />
          </>
        </div>
      </div>
    )
  )
}

export default AdminEvents
