import React, { useState, useEffect } from 'react'

import { useNavigate } from 'react-router-dom'
import { useStateContext } from '../context/StateContext'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import CbaZoneBack from '../components/CbaZoneBack'

const Login = () => {
  // login
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { currentUser, setCurrentUser } = useStateContext()

  const { isLoggedIn, setIsLoggedIn } = useStateContext()
  const loggedValue = import.meta.env.VITE_EMAIL_EXTRA_TWO
  const [name, setName] = useState('')
  const [showAdminContent, setShowAdminContent] = useState(false)

  const navigate = useNavigate()

  const adminContent = () => {
    setShowAdminContent((prev) => !prev)
  }

  useEffect(() => {
    isLoggedIn && navigate('/cba-zone')
  }, [isLoggedIn])

  const handleLogin = async (e) => {
    e.preventDefault()

    const { data } = await axios.post(
      'https://api.pictusweb.com/api/cba/login',
      // 'http://localhost:2000/api/cba/login'
      {
        email,
        password,
      }
    )
    console.log(data)
    if (data === 'Neplatný email alebo heslo')
      return toast.error('Neplatný email alebo heslo')
    setCurrentUser(data)
    setIsLoggedIn(true)
    navigate('/cba-zone')
  }

  return (
    <div className={'bg-[#2e2236] text-white text-[30px] pt-2 relative'}>
      {/* <h1 className='text-center text-green-600'>Prihlásiť sa cez</h1> */}

      <CbaZoneBack destination={'/'} />

      <div className='mx-4 lg:mx-0'>
        <form
          onSubmit={handleLogin}
          className='flex flex-col gap-2 ml-0 lg:ml-4 mt-16 w-[100%] lg:w-[33%]'
        >
          <input
            type='text'
            placeholder='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type='password'
            placeholder='heslo'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type='submit' className='ml-2 text-green-500'>
            Prihlásiť sa
          </button>
        </form>
      </div>

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
