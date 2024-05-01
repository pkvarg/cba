import React, { useState, useEffect } from 'react'
import axios from 'axios'

const BlogByCategory = ({ language }) => {
  const categoryToFetch = 'blogs'
  const [blogsInCategory, setBlogsInCategory] = useState([])

  const [blogs, setBlogs] = useState([])
  const [englishBlogs, setEnglishBlogs] = useState([])

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const { data } = await axios.get(
          //`https://api.pictusweb.com/api/cba/blogs/category/${categoryToFetch}`
          `http://localhost:2000/api/cba/blogs/category/${categoryToFetch}`
        )
        if (data) {
          console.log(data)
          setBlogs(data.filter((blog) => blog.english === false))
          setEnglishBlogs(data.filter((blog) => blog.english === true))
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchCategory()
  }, [])

  console.log(blogs, englishBlogs)
  return (
    <div>
      <div className='bg-[#768c51] text-white py-16 text-[30px]'>
        {/* <h1 className='text-center'>Blogy v kategórii {categoryToFetch}</h1> */}
        <div className='flex flex-row items-center justify-evenly mx-2 lg:mx-[20%]'>
          {language === 'slovak' &&
            blogs &&
            blogs.map((blog) => (
              <div
                key={blog._id}
                className='flex flex-col gap-2 justify-center items-center py-2 mt-8'
              >
                <h2>{blog.title}</h2>
                {blog.media && (
                  <img
                    src={blog.media}
                    alt={blog.title}
                    className='w-[100px]'
                  />
                )}
                <p className='font-[300]'>{blog.text}</p>
              </div>
            ))}
          {language === 'english' &&
            englishBlogs &&
            englishBlogs.map((blog) => (
              <div
                key={blog._id}
                className='flex flex-col gap-2 justify-center items-center py-2 mt-8'
              >
                <h2>{blog.title}</h2>
                {blog.media && (
                  <img
                    src={blog.media}
                    alt={blog.title}
                    className='w-[100px]'
                  />
                )}
                <p className='font-[300]'>{blog.text}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default BlogByCategory
