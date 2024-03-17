import React, { useState, useEffect } from 'react'
import CbaZoneBack from '../components/CbaZoneBack'
import { useStateContext } from '../context/StateContext'
import CreateBlog from '../Sections/CreateBlog'
import CreatedBlogs from '../Sections/CreatedBlogs'
import axios from 'axios'

const AdminBlogs = () => {
  const { currentUser } = useStateContext()
  const isAdmin = currentUser.isAdmin

  const [blogs, setBlogs] = useState([])
  const [key, setKey] = useState(0)
  console.log(key)

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const { data } = await axios.get(
          //'https://api.pictusweb.com/api/cba/blogs/category/blogs'
          'http://localhost:2000/api/cba/blogs/category/blogs'
        )

        if (data) {
          console.log(data)
          setBlogs(data)
        }
      } catch (error) {
        console.log(error)
      }
    }

    getBlogs()
  }, [key])

  return (
    isAdmin && (
      <div className='text-[25px] text-white'>
        <CbaZoneBack destination={'/admin'} />
        <h1 className='text-[40px] text-center'>Blogy</h1>
        <div className='mx-[30%]'>
          <h1 className='ml-16 my-8 text-center text-[45px] text-green-500'>
            Napíš nový príspevok
          </h1>

          <>
            <CreateBlog category={'blogs'} setKey={setKey} />
            <CreatedBlogs blogs={blogs} />
          </>
        </div>
      </div>
    )
  )
}

export default AdminBlogs
