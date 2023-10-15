import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import HomeSec01 from '../Sections/HomeSec01'
import HomeSec02 from '../Sections/HomeSec02'
import Translation from '../Home.json'
import { useStateContext } from '../context/StateContext'
import Contact from '../Sections/Contact'

const Home = () => {
  const { language } = useStateContext()
  const [content, setContent] = useState({})
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
        <h1 className='text-center text-[75px] pt-[50%] lg:pt-[20%]'>
          {content.headerTitle}
        </h1>
        <p className='text-center text-[30px] mx-2'>
          "Ja som vínny kmeň a vy ste ratolesti. <br /> Kto zostáva vo mne a ja
          v ňom, ten prináša veľa ovocia, <br /> pretože bezo mňa nič nemôžete
          činiť." <br />
          <span className='text-[18px] text-center'> Ján 15:5</span>
        </p>
      </div>
      <HomeSec01 />
      <HomeSec02 />
      <Contact content={content} />
    </>
  )
}

export default Home
