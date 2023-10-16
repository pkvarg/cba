import React, { useState } from 'react'
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  getAuth,
  signOut,
} from 'firebase/auth'
import { app } from '../App'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [login, setLogin] = useState(false)
  const [name, setName] = useState('')

  const auth = getAuth(app)
  const fbAuthProvider = new FacebookAuthProvider()
  const glAuthProvider = new GoogleAuthProvider()

  const navigate = useNavigate()

  const FacebookAuth = async () => {
    const fbAuth = signInWithPopup(auth, fbAuthProvider)
    return fbAuth
  }

  async function FacebookAuthButtonClicked() {
    try {
      const res = await FacebookAuth()
      if (res.user.accessToken) {
        setLogin(true)
        setName(res.user.displayName)
      }
    } catch (error) {
      console.log('error', error)
    }
  }
  async function GoogleAuthButtonClicked() {
    try {
      const res = await GoogleAuth()
      console.log('gl user', res)
      if (res.user.accessToken) {
        setLogin(true)
        setName(res.user.displayName)
      }
    } catch (error) {
      console.log('error', error)
    }
  }

  const GoogleAuth = async () => {
    const googleAuth = signInWithPopup(auth, glAuthProvider)
    return googleAuth
  }

  const SignUserOut = () => {
    signOut(auth).then(() => {
      setLogin(false)
      console.log('out')
      navigate('/')
    })
  }

  return (
    <div className='bg-dark h-[90vh] text-white text-[30px] pt-2 relative'>
      <h1 className='text-center text-green-600'>Prihlásiť sa cez</h1>
      <button
        className='absolute top-2 right-4 text-red-400'
        onClick={SignUserOut}
      >
        Odhlásiť
      </button>
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

      <p className='text-center mt-16 mx-4'>
        Urob zoznam userov a podmienku.., ktorí sa budú môcť prihlásiť a čo
        vidieť
      </p>

      <div className='flex flex-col gap-4'>
        {login && (
          <div className='m-auto'>
            <h1 className='ml-16 mt-8'>
              Vitaj
              <span className=' text-green-400'> {name}</span>
            </h1>
            <p>Teraz vidíš tajný obsahhhh...</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Login