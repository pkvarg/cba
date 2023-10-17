import React, { useState, useEffect } from 'react'
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  getAuth,
  signOut,
} from 'firebase/auth'
import { app } from '../App'
import { useNavigate } from 'react-router-dom'
import { useStateContext } from '../context/StateContext'
import CreateBlog from '../Sections/CreateBlog'
import CreatedBlogs from '../Sections/CreatedBlogs'

const Login = () => {
  const { isLoggedIn, setIsLoggedIn } = useStateContext()
  const loggedValue = import.meta.env.VITE_EMAIL_EXTRA_TWO
  const [name, setName] = useState('')
  const [showAdminContent, setShowAdminContent] = useState(false)

  const auth = getAuth(app)
  const fbAuthProvider = new FacebookAuthProvider()
  const glAuthProvider = new GoogleAuthProvider()

  const navigate = useNavigate()

  const FacebookAuth = async () => {
    const fbAuth = signInWithPopup(auth, fbAuthProvider)
    return fbAuth
  }

  const GoogleAuth = async () => {
    const googleAuth = signInWithPopup(auth, glAuthProvider)
    return googleAuth
  }

  async function FacebookAuthButtonClicked() {
    try {
      const res = await FacebookAuth()
      if (res.user.accessToken) {
        setIsLoggedIn(true)
        setName(res.user.displayName)
      }
    } catch (error) {
      console.log('error', error)
    }
  }
  async function GoogleAuthButtonClicked() {
    try {
      const res = await GoogleAuth()
      if (res.user.accessToken) {
        setIsLoggedIn(true)
        setName(res.user.displayName)
      }
    } catch (error) {
      console.log('error', error)
    }
  }

  const SignUserOut = () => {
    signOut(auth).then(() => {
      setIsLoggedIn(false)
      console.log('out')
      navigate('/')
    })
  }

  const adminContent = () => {
    setShowAdminContent((prev) => !prev)
  }

  useEffect(() => {
    const loggedStorage = localStorage.getItem('blogging')
    if (loggedStorage === loggedValue)
      // set logged in...
      console.log(loggedStorage)
  }, [])

  console.log(isLoggedIn)
  return (
    <div
      className={
        isLoggedIn
          ? 'bg-dark text-white text-[30px] pt-2 relative'
          : 'bg-dark text-white text-[30px] pt-2 relative'
      }
    >
      <h1 className='text-center text-green-600'>Prihlásiť sa cez</h1>
      {isLoggedIn && (
        <button
          className='absolute top-2 right-4 text-red-400'
          onClick={SignUserOut}
        >
          Odhlásiť
        </button>
      )}
      <a className='absolute top-2 left-2 text-white' href='/'>
        Domov
      </a>
      <div className='flex flex-col lg:flex-row justify-center items-center text-center mt-12 lg:mt-4'>
        <button className='' onClick={FacebookAuthButtonClicked}>
          <img className='w-[200px]' src='fb.webp' alt='fb' />
        </button>
        <p className='mx-4 mt-[10px]'>alebo</p>
        <button onClick={GoogleAuthButtonClicked}>
          <img
            className='w-[160px] h-[55px] mt-[15px] ml-[15px]'
            src='gl.webp'
            alt='google'
          />
        </button>
      </div>

      {/* <p className='text-center mt-16 mx-4'>
        Urob zoznam userov a podmienku.., ktorí sa budú môcť prihlásiť a čo
        vidieť
      </p> */}

      {isLoggedIn && (
        <>
          <div className='flex flex-col gap-4'>
            <div className='m-auto'>
              <h1 className='ml-16 mt-8 text-yellow-500 text-[50px] text-center'>
                Vitaj
                <span className=' text-green-400'> {name}</span>
              </h1>
              <p className='text-center'>
                Pre tvorbu obsahu klikni sem...
                <button className='text-yellow-400' onClick={adminContent}>
                  Obsah
                </button>
              </p>
            </div>
          </div>

          <div className='flex flex-col gap-4'>
            {showAdminContent && (
              <div className='m-auto'>
                <h1 className='ml-16 my-8 text-center text-[45px] text-green-500'>
                  Napíš nový príspevok
                </h1>

                <>
                  <CreateBlog />
                  <CreatedBlogs />
                </>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default Login
