import React, { useState } from 'react'
import { Link } from 'react-scroll'
import LanguageBar from './LanguageBar'

const Header = ({ content, showContactForm, setShowContactForm }) => {
  const [navbar, setNavbar] = useState(false)

  return (
    <header className='herom'>
      <nav className='w-full text-white nav-font'>
        <div className='justify-between px-4 mx-auto md:items-center md:flex md:px-8'>
          <div className='mb-0 lg:mb-2'>
            <div className='flex items-center justify-between py-3 md:py-5 md:block'>
              <a className='text-[2.05rem] font-normal' href='/'>
                {content.headerTitle}
              </a>
              <div className='md:hidden'>
                <button
                  className='p-2 text-white rounded-md outline-none focus:border-gray-400 focus:border'
                  onClick={() => setNavbar(!navbar)}
                >
                  {navbar ? (
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='w-10 h-10'
                      viewBox='0 0 20 20'
                      fill='currentColor'
                    >
                      <path
                        fillRule='evenodd'
                        d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                        clipRule='evenodd'
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='w-10 h-10'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M4 6h16M4 12h16M4 18h16'
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
          <div>
            <div
              className={`flex-1 justify-self-center h-[80vh] lg:h-auto pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
                navbar ? 'block' : 'hidden'
              }`}
            >
              <ul className='justify-center space-y-8 md:flex md:space-x-6 md:space-y-0 text-[30px] lg:text-[25px]'>
                <li>
                  {/* <a href='/'>O nás</a> */}
                  <Link
                    to='about'
                    spy={true}
                    smooth={true}
                    offset={0}
                    duration={500}
                    className='hover:text-dark-red'
                  >
                    O nás
                  </Link>
                </li>
                <li>
                  <Link
                    to='faith'
                    spy={true}
                    smooth={true}
                    offset={0}
                    duration={500}
                    className='hover:text-dark-red'
                  >
                    Vyznanie viery
                  </Link>
                  {/* <a href='/'>Vyznanie viery</a> */}
                </li>
                <li>
                  <Link
                    to='events'
                    spy={true}
                    smooth={true}
                    offset={0}
                    duration={500}
                    className='hover:text-dark-red'
                  >
                    Podujatia
                  </Link>
                </li>
                <li>
                  <a href='/'>Linky</a>
                </li>
                <li>
                  <a href='/'>Eshop</a>
                </li>
                <li>
                  <Link
                    to='contact'
                    spy={true}
                    smooth={true}
                    offset={0}
                    duration={500}
                    className='hover:text-dark-red'
                    onClick={() => setShowContactForm(true)}
                  >
                    Kontakt
                  </Link>
                </li>
                <li>
                  <a href='/login'>Login</a>
                </li>
                <li>
                  <a href='/audio'>Audio</a>
                </li>
                <li>
                  <LanguageBar />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
