import React, { useState, useEffect } from 'react'
import axios from 'axios'

const BlogByCategory = () => {
  const categoryToFetch = 'slider'
  const [blogsInCategory, setBlogsInCategory] = useState([])

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const { data } = await axios.get(
          `https://api.pictusweb.com/api/cba/blogs/category/${categoryToFetch}`
          // `http://localhost:2000/api/cba/blogs/category/${categoryToFetch}`
        )
        console.log(data)
        setBlogsInCategory(data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchCategory()
  }, [])
  return (
    <div>
      <div className='bg-green-800 text-white py-16'>
        <h1 className='text-center'>Blogy v kategórii {categoryToFetch}</h1>
        <div className='flex flex-row items-center justify-evenly'>
          {blogsInCategory &&
            blogsInCategory.map((blog) => (
              <div
                key={blog._id}
                className='flex flex-col gap-2 justify-center items-center py-2 mt-8'
              >
                <h2>{blog.title}</h2>
                <img src={blog.media} alt={blog.title} className='w-[100px]' />
                <p>{blog.text}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default BlogByCategory
