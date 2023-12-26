import React, { createContext, useContext, useState, useEffect } from 'react'
const Context = createContext()

export const StateContext = ({ children }) => {
  const [language, setLanguage] = useState('slovak')
  const [currentUser, setCurrentUser] = useState({})
  // const [isLoggedIn, setIsLoggedIn] = useState(false)
  // const loggedValue = import.meta.env.VITE_EMAIL_EXTRA_TWO

  // lang
  useEffect(() => {
    const LocalStorageLanguage = window.localStorage.getItem('language')
    if (LocalStorageLanguage !== null)
      setLanguage(JSON.parse(LocalStorageLanguage))
  }, [])

  useEffect(() => {
    window.localStorage.setItem('language', JSON.stringify(language))
  }, [language])

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo')
    if (userInfo !== null) {
      setCurrentUser(JSON.parse(userInfo))
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem('userInfo', JSON.stringify(currentUser))
  }, [currentUser])

  return (
    <Context.Provider
      value={{ language, setLanguage, currentUser, setCurrentUser }}
    >
      {children}
    </Context.Provider>
  )
}

export const useStateContext = () => useContext(Context)
