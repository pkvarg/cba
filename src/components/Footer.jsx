import React from 'react'
import CookieConsent from 'react-cookie-consent'
import axios from 'axios'

const Footer = () => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const increaseVisitors = async () => {
    try {
      const { data } = await axios.put(
        `https://api.pictusweb.com/api/visitors/cba/increase`,
        // `http://localhost:2000/api/visitors/cba/increase`,
        config
      )
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <CookieConsent
        location='bottom'
        style={{
          background: '#dadada',
          color: '#8a1b1f',
          fontSize: '22.5px',
          textAlign: 'justify',
        }}
        buttonStyle={{
          background: '#1d9f2f',
          color: '#fff',
          fontSize: '17.5px',
        }}
        buttonText='Súhlasím'
        expires={365}
        enableDeclineButton
        onAccept={() => {
          increaseVisitors()
        }}
        declineButtonStyle={{
          background: 'red',
          color: '#fff',
          fontSize: '17.5px',
        }}
        declineButtonText='Nesúhlasím'
        onDecline={() => {
          increaseVisitors()
        }}
      >
        Táto stránka nezhromažďuje žiadne údaje.{' '}
      </CookieConsent>
      <footer className='bg-[#2e2236] font-light'>
        <section className='mx-4 text-white text-[15px] lg:text-[20px] pt-0 lg:pt-4 pb-8'>
          <div className='flex flex-row gap-2 justify-center items-center'>
            <p className='text-[20px] mt-[10px]'>&copy;</p>
            <p> {Date().substring(11, 15)}</p>
            <p>Cirkev v Bratislave</p>
          </div>
          <div className='flex flex-col lg:flex-row gap-0 lg:gap-2 items-center justify-center'></div>
          <div className='flex justify-center mt-0 lg:mt-2'>
            <a href='https://pictusweb.sk'>
              &#60;&#47;&#62; PICTUSWEB development
            </a>
          </div>
        </section>
      </footer>
    </>
  )
}

export default Footer
