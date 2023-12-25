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
import axios from 'axios'
import { toast } from 'react-hot-toast'
import Profile from '../components/Profile'

const Login = () => {
  // emails to db
  const [emailToDb, setEmailToDb] = useState('')
  const [users, setUsers] = useState([])
  const [userId, setUserId] = useState('')

  //
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

      localStorage.removeItem('blogging')

      navigate('/')
    })
  }

  const adminContent = () => {
    setShowAdminContent((prev) => !prev)
  }

  useEffect(() => {
    const loggedStorage = JSON.parse(localStorage.getItem('blogging'))
    const theValue = import.meta.env.VITE_EMAIL_EXTRA_TWO
    if (loggedStorage === theValue) {
      setIsLoggedIn(true)
    }
    if (isLoggedIn === true) {
      window.localStorage.setItem('blogging', JSON.stringify(loggedValue))
    }
  }, [isLoggedIn])

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const { data } = await axios.get('http://localhost:2000/api/cba/getall')
        if (data) {
          setUsers(data)
        }
      } catch (error) {
        console.log(error)
      }
    }
    getAllUsers()
  }, [userId])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(`http://localhost:2000/api/cba/newuser`, {
        emailToDb,
      })
      console.log(res)
      if (res.status === 200) toast.error(res.data)
      if (res.status === 201) toast.success('Užívateľ vytvorený')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div
      className={
        isLoggedIn
          ? 'bg-dark text-white text-[30px] pt-2 relative'
          : 'bg-dark text-white text-[30px] pt-2 relative'
      }
    >
      {/* <h1 className='text-center text-green-600'>Prihlásiť sa cez</h1> */}
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

      <div className={userId ? 'blur-md' : ''}>
        <form onSubmit={handleSubmit} className='ml-4 mt-16'>
          <input
            type='text'
            value={emailToDb}
            onChange={(e) => setEmailToDb(e.target.value)}
          />
          <button type='submit' className='ml-2'>
            Pridať do databázy
          </button>
        </form>

        <p className='mt-4 border-b'>Užívatelia</p>
        {users &&
          users.map((user) => (
            <div key={user._id} className='m-2 border-b'>
              <p
                onClick={() => setUserId(user._id)}
                className='text-green-500 cursor-pointer'
              >
                Na profil
              </p>
              <p>meno: {user.name}</p>
              <p>email: {user.email}</p>
              <p className='text-red-500'>
                {user.isAdmin === true ? 'Admin' : ''}
              </p>
            </div>
          ))}
      </div>

      {userId && <Profile userId={userId} setUserId={setUserId} />}

      {/* <div className='flex flex-col lg:flex-row justify-center items-center text-center mt-12 lg:mt-4'>
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
      </div> */}

      {/* <p className='text-center mt-16 mx-4'>
        Urob zoznam userov a podmienku.., ktorí sa budú môcť prihlásiť a čo
        vidieť
      </p> */}

      {/* {isLoggedIn && (
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
              <p className='text-center'>
                zvolená kategória určí, kde sa príspevok zobrazí
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
      )} */}
    </div>
  )
}

export default Login
