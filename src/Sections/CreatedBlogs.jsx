import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const CreatedBlogs = ({ blogs }) => {
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
        {blogs.map((blog) => (
          <div
            className='py-8 cursor-pointer'
            key={blog._id}
            onClick={() => navigate(`/admin/edit/${blog._id}`)}
          >
            <h1 className='text-green-300'>Nadpis: {blog.title}</h1>
            <h2>Kategória: {blog.category}</h2>
            <div className='flex flex-row gap-2'>
              <p>Obrázok: </p>
              {blog.media !== '' ? (
                <img
                  className='w-[250px] lg:w-[100px]'
                  src={blog.media}
                  alt={blog.title}
                />
              ) : (
                <p>bez obrázku</p>
              )}
            </div>
            <p>Text: {blog.text}</p>
            {/* <p>Dátum: {getDate(blog.updatedAt)}</p> */}
          </div>
        ))}
      </div>
    </div>
  )
}

export default CreatedBlogs
