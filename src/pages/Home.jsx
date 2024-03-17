import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import HomeSec01 from '../Sections/HomeSec01'
import HomeSec02 from '../Sections/HomeSec02'
import HomeSec03 from '../Sections/HomeSec03'
import Translation from '../Home.json'
import { useStateContext } from '../context/StateContext'
import Contact from '../Sections/Contact'
import BlogByCategory from '../Sections/BlogByCategory'
import Footer from '../components/Footer'
import GalleryShort from '../Sections/GalleryShort'

const Home = () => {
  const { language } = useStateContext()
  const [content, setContent] = useState({})
  // const [showContactForm, setShowContactForm] = useState(false)
  const [cookieAccept, setCookieAccept] = useState(false)
  useEffect(() => {
    if (language === 'slovak') {
      setContent(Translation.slovak)
    } else {
      setContent(Translation.english)
    }
  }, [language])

  return (
    <>
      <Header content={content} />
      <div className='hero h-[90vh] lg:h-[110vh] text-[25px] text-white -mt-[25%] lg:-mt-[8%]'>
        {language === 'slovak' ? (
          <h1 className='text-center text-[75px] leading-[75px] pt-[50%] lg:pt-[20%]'>
            Cirkev <br className='flex lg:hidden' /> v Bratislave
          </h1>
        ) : (
          <h1 className='text-center text-[75px] pt-[50%] lg:pt-[20%]'>
            The Church <br className='flex lg:hidden' /> in Bratislava
          </h1>
        )}

        {language === 'slovak' ? (
          <p className='text-center text-[30px] mx-2'>
            "Ja som vínny kmeň a vy ste ratolesti. <br /> Kto zostáva vo mne a
            ja v ňom, ten prináša veľa ovocia, <br /> pretože bezo mňa nič
            nemôžete činiť." <br />
            <span className='text-[18px] text-center'> Ján 15:5</span>
          </p>
        ) : (
          <p className='text-center text-[30px] mx-2'>
            "I am the vine; you are the branches. <br /> He who abides in Me and
            I in him, he bears amuch fruit; <br /> for apart from Me you can do
            nothing." <br />
            <span className='text-[18px] text-center'> John 15:5</span>
          </p>
        )}
      </div>
      <HomeSec01 content={content} />
      <HomeSec02 content={content} />
      <GalleryShort content={content} />
      <HomeSec03 content={content} language={language} />
      {/* <BlogByCategory /> */}

      <Contact content={content} />
      <Footer />
    </>
  )
}

export default Home
