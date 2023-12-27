import React from 'react'
import { useNavigate } from 'react-router-dom'

const CreatedEvents = ({ blogs }) => {
  const navigate = useNavigate()

  const getDate = (dt) => {
    const date = new Date(dt)
    const year = date.getFullYear()
    const month = date.getMonth() + 1 // Months are 0-indexed, so add 1
    const day = date.getDate()
    const formatted = `${day}.${month}.${year} `
    return formatted
  }

  return (
    <div className='py-16'>
      <div>
        {Array.isArray(blogs) ? (
          blogs.map((blog) => (
            <div
              className='py-8 cursor-pointer'
              key={blog._id}
              onClick={() => navigate(`/admin/edit/${blog._id}`)}
            >
              <h1 className='text-green-300'>{blog.title}</h1>
              <div className='flex flex-row gap-2'>
                {/* <p>Obrázok: </p> */}
                {blog.media !== '' ? (
                  <img
                    className='w-[250px] lg:w-[100px]'
                    src={blog.media}
                    alt={blog.title}
                  />
                ) : (
                  ''
                  // <p>bez obrázku</p>
                )}
              </div>
              <p>{blog.text}</p>
              <p className='text-red-500 text-[20px] uppercase'>
                {blog.upcoming && 'Nadchádzajúce'}
              </p>{' '}
              {/* <p>Dátum: {getDate(blog.updatedAt)}</p> */}
            </div>
          ))
        ) : (
          <div
            className='py-8 cursor-pointer'
            key={blogs._id}
            onClick={() => navigate(`/admin/edit/${blogs._id}`)}
          >
            <h1 className='text-green-300'>{blogs.title}</h1>
            <div className='flex flex-row gap-2'>
              {/* <p>Obrázok: </p> */}
              {blogs.media !== '' ? (
                <img
                  className='w-[250px] lg:w-[100px]'
                  src={blogs.media}
                  alt={blogs.title}
                />
              ) : (
                ''
                // <p>bez obrázku</p>
              )}
            </div>
            <p>{blogs.text}</p>
            <p className='text-red-500 text-[20px] uppercase'>
              {blogs.upcoming && 'Nadchádzajúce'}
            </p>

            {/* <p>Dátum: {getDate(blogs.updatedAt)}</p> */}
          </div>
        )}
      </div>
    </div>
  )
}

export default CreatedEvents
