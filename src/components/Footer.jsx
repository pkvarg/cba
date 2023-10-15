import React from 'react'

const Footer = () => {
  return (
    <footer className='bg-dark font-light'>
      <section className='mx-4 text-white text-[30px] lg:text-[20px] pt-4 pb-8'>
        <div className='flex flex-row gap-2 justify-center items-center'>
          <p className='text-[20px] mt-[10px]'>&copy;</p>
          <p> {Date().substring(11, 15)}</p>
          <p>Cirkev v Bratislave</p>
        </div>
        <div className='flex flex-col lg:flex-row gap-2 items-center justify-center'></div>
        <div className='flex justify-center mt-2'>
          <a href='https://pictusweb.sk'>
            &#60;&#47;&#62; PICTUSWEB development
          </a>
        </div>
      </section>
    </footer>
  )
}

export default Footer
