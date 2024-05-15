import React, { useRef, useState, useEffect } from 'react'
import Message from '../components/Message'
import axios from 'axios'

const Contact = ({ content }) => {
  const [message, setMessage] = useState(null)
  const [messageSuccess, setMessageSuccess] = useState(null)
  const [email, setEmail] = useState('')
  const [mailMessage, setMailMessage] = useState('')
  const [checkBox, setCheckBox] = useState(false)
  const [showGdpr, setShowGdpr] = useState(false)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')

  const toggleShowGdpr = (e) => {
    e.preventDefault()
    setShowGdpr((prev) => !prev)
  }

  const handleCheckBox = () => {
    setCheckBox((current) => !current)
  }

  const form = useRef()
  const x = import.meta.env.VITE_EMAIL_EXTRA_ONE
  const y = import.meta.env.VITE_EMAIL_EXTRA_TWO
  const [passwordGroupOne, setPasswordGroupOne] = useState(x)
  const [passwordGroupTwo, setPasswordGroupTwo] = useState(y)

  const closeContact = () => {
    setShowContactForm(false)
    setShowGdpr(false)
  }

  const sendEmail = (e) => {
    e.preventDefault()

    if (passwordGroupOne !== x || passwordGroupTwo !== y) {
      setMessage(content.contactError)
      setName('')
      setEmail('')
      setPhone('')
      setMailMessage('')

      const element = document.getElementById('contact')
      element.scrollIntoView({ behavior: 'smooth' })
    } else {
      callContactApi(name, email, phone, mailMessage)
      const element = document.getElementById('contact')
      element.scrollIntoView({ behavior: 'smooth' })
      setName('')
      setPhone('')
      setEmail('')
      setMailMessage('')
    }
  }

  const callContactApi = async (name, email, phone, mailMessage) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    try {
      const { data } = await axios.put(
        'https://api.pictusweb.com/api/email/cba-contact',
        // 'http://localhost:2000/api/email/cba-contact',
        { name, email, phone, mailMessage },
        config
      )
      if (data.status === 'Success') {
        setMessageSuccess(content.contactMessageSuccess)
      }
    } catch (error) {
      setMessage(content.contactError)
      console.log(error)
    }
  }

  return (
    <>
      <div className='bg-[#2e2236] h-8' id='contact'></div>
      <div className='bg-[#2e2236] pt-8 lg:pt-16 pb-10 text-[25px] text-white'>
        <h1 className='text-[30px] lg:text-[35px] text-white text-center lg:pt-0 py-4'>
          {content.contactTitle}
        </h1>
        <div className='mx-4 md:mx-6 lg:mx-0 flex lg:flex-row flex-col lg:justify-center lg:gap-[10%] '>
          <div className='pt-[50px] lg:pt-0 lg:w-[30%]'>
            {messageSuccess && (
              <Message variant='success'>{messageSuccess}</Message>
            )}
            {message && <Message variant='danger'>{message}</Message>}
            <div>
              <form
                ref={form}
                onSubmit={sendEmail}
                className='flex flex-col gap-[2.5px]'
              >
                <div>
                  <div className='flex flex-col'>
                    <label className='form-label mt-[2.5%] text-[20px]'>
                      {content.contactName}
                    </label>
                    <input
                      className='form-control rounded-xl'
                      type='text'
                      name='user_name'
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required='required'
                    />

                    <label className='form-label mt-[2.5%] text-[20px]'>
                      {content.contactEmail}
                    </label>
                    <input
                      className='form-control rounded-xl'
                      type='email'
                      name='user_email'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required='required'
                    />
                    <label className='form-label mt-[2.5%] text-[20px]'>
                      {' '}
                      {content.contactPhone}
                    </label>
                    <input
                      className='form-control rounded-xl'
                      type='text'
                      name='user_phone'
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>
                <div className='flex flex-col'>
                  <label className='form-label mt-[2.5%] text-[20px]'>
                    {content.contactMessage}
                  </label>
                  <textarea
                    className='form-control rounded-xl text-[#2e2236]  pl-[10px]'
                    rows='5'
                    name='message'
                    value={mailMessage}
                    onChange={(e) => setMailMessage(e.target.value)}
                    required='required'
                  ></textarea>

                  <div className='flex flex-row form-check mt-8 items-center'>
                    <input
                      id='flexCheckDefault'
                      type='checkbox'
                      defaultChecked={false}
                      value={checkBox}
                      onChange={handleCheckBox}
                      required='required'
                      className='rounded-xl w-[25px] h-[25px] lg:h-[30px]'
                    />

                    <label
                      className='form-check-label text-[25px] lg:text-[25px] ml-[15px] mt-[7px]'
                      htmlFor='flexCheckDefault'
                    >
                      {content.contactAgree}{' '}
                      <button
                        className='underline'
                        onClick={(e) => toggleShowGdpr(e)}
                      >
                        {content.contactGdpr}{' '}
                      </button>
                      {showGdpr && (
                        <p className='w-[300px] lg:w-[240px] text-[22.5px] text-left mt-2 leading-6'>
                          {content.gdpr1}
                        </p>
                      )}
                    </label>
                  </div>
                </div>
                <input
                  className='form-control hidden'
                  type='text'
                  defaultValue={passwordGroupOne}
                  onChange={(e) => setPasswordGroupOne(e.target.value)}
                />
                <input
                  className='form-control hidden'
                  type='text'
                  defaultValue={passwordGroupTwo}
                  onChange={(e) => setPasswordGroupTwo(e.target.value)}
                />
                <button
                  className='text-[25px] bg-violet mt-10 pt-[5px] rounded-xl border border-white hover:text-[#2e2236] hover:bg-white'
                  type='submit'
                  value='Send'
                >
                  {content.contactSend}
                </button>
              </form>
            </div>
            <div></div>
          </div>
          <div className='lg:w-[30%] '>
            <h1 className='mt-14 text-center'>
              Pre osobný kontakt alebo štúdium biblie
            </h1>
            <h2 className='text-center'>
              nás kontaktujte prosím cez formulár.
            </h2>
            <div className='mt-16 flex lg:ml-16 justify-center lg:mr-[15%]'>
              <img className='w-[50%]' src='tree.png' alt='tree of life' />
            </div>
            <h3 className='mt-12 text-[#A0B937] text-center'>
              V Ňom bol život a život bol svetlom ľudí.
              <span className='text-[17.5px] '> Ján 1:4</span>
            </h3>
          </div>
        </div>
      </div>
    </>
  )
}

export default Contact
