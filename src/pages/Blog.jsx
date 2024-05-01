import React, { useState, useEffect } from 'react'
import HeaderPages from '../components/HeaderPages'
import Translation from '../Home.json'
import { useStateContext } from '../context/StateContext'

const Blog = () => {
  const { language } = useStateContext()
  const [content, setContent] = useState({})

  useEffect(() => {
    if (language === 'slovak') {
      setContent(Translation.slovak)
    } else {
      setContent(Translation.english)
    }
  }, [language])
  return (
    <>
      <HeaderPages content={content} />
      <div className='text-white'>Blog</div>
    </>
  )
}

export default Blog
