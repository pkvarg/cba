import React, { useState, useEffect } from 'react'
import Translation from '../Home.json'
import { useStateContext } from '../context/StateContext'
import HeaderPages from '../components/HeaderPages'

const Download = () => {
  const { language } = useStateContext()
  const [content, setContent] = useState({})
  const [showContact, setShowContact] = useState(false)

  useEffect(() => {
    if (showContact) {
      const element = document.getElementById('contact')
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }, [showContact])

  useEffect(() => {
    if (language === 'slovak') {
      setContent(Translation.slovak)
    } else {
      setContent(Translation.english)
    }
  }, [language])

  return (
    <div>
      <HeaderPages content={content} setShowContact={setShowContact} />
      <h1 className='text-center text-white text-[30px]'>
        {content.galleryDownload}
      </h1>
    </div>
  )
}

export default Download
