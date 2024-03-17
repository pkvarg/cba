import React, { useState, useEffect } from 'react'
import axios from 'axios'

const HomeSec03 = ({ content, language }) => {
  const [blogs, setBlogs] = useState([])
  const [englishBlogs, setEnglishBlogs] = useState([])

  useEffect(() => {
    const getEvents = async () => {
      try {
        const { data } = await axios.get(
          //'https://api.pictusweb.com/api/cba/blogs/category/events'
          'http://localhost:2000/api/cba/blogs/category/events'
        )

        if (data) {
          console.log(data)
          setBlogs(data)
          setEnglishBlogs(data.filter((blog) => blog.english === true))
        }
      } catch (error) {
        console.log(error)
      }
    }

    getEvents()
  }, [])

  console.log(englishBlogs)

  return (
    <div className='bg-white py-8' id='events'>
      <h1 className='text-center text-[45px] uppercase mt-8'>
        {content.home03title}
      </h1>
      <div className='flex flex-col items-center justify-center text-[27.5px]'>
        <h2 className='text-[35px]'>{content.home03sub}</h2>

        {language === 'slovak'
          ? blogs &&
            blogs.map(
              (blog) =>
                blog.upcoming === true && (
                  <div key={blog._id}>
                    <h3 className='text-[30px] text-center mt-2 mx-4 lg:mx-0'>
                      {blog.title}
                    </h3>
                    <p className='mt-2'>{blog.text}</p>
                    {/* <p>Sofia, Bulharsko</p> */}
                  </div>
                )
            )
          : englishBlogs.map((blog) => (
              <div key={blog._id}>
                <h3 className='text-[30px] text-center mt-2 mx-4 lg:mx-0'>
                  {blog.title}
                </h3>
                <p className='mt-2'>{blog.text}</p>
                {/* <p>Sofia, Bulharsko</p> */}
              </div>
            ))}

        <a
          className='my-4 border border-[#2e2236] rounded-2xl px-4 pt-1 hover:bg-[#2e2236] hover:text-white'
          href='https://churchesceeb.org/home-sk/'
          target='_blank'
        >
          {content.home02b1}
        </a>
      </div>
    </div>
  )
}

export default HomeSec03
