import React, { useState } from 'react'

const HomeSec02 = ({ content }) => {
  const [showMore, setShowMore] = useState(false)

  return (
    <div className='bg-[#2e2236] text-white' id='faith'>
      <h1 className='text-center text-[40px] font-medium pt-16 uppercase'>
        {content.home02title}
      </h1>
      <div className='text-[30px] font-light mx-2 lg:mx-[20%] text-justify py-16 flex flex-col gap-4 lg:gap-2'>
        <p>{content.home02p1}</p>

        <p>{content.home02p2}</p>

        <p>{content.home02p3}</p>

        <div className='flex justify-center'>
          <button
            className={
              !showMore
                ? 'mt-12 mb-4 rounded-2xl border border-l-emerald-100 hover:bg-white hover:text-[#2e2236] hover:border-[#2e2236] hover:border-2 w-[75px]'
                : 'hidden'
            }
            onClick={() => setShowMore((prev) => !prev)}
          >
            {showMore ? content.home02b2 : content.home02b1}
          </button>
        </div>

        {showMore && (
          <>
            <p>
              <p>{content.home02p4}</p>
            </p>
            <p>
              <p>{content.home02p5}</p>
            </p>
            <p>
              <p>{content.home02p6}</p>
            </p>
            <p>
              <p>{content.home02p7}</p>
            </p>
          </>
        )}

        <div className='flex justify-center'>
          <button
            className={
              showMore
                ? 'mt-12 mb-4 rounded-2xl border border-l-emerald-100 hover:bg-white hover:text-[#2e2236] hover:border-[#2e2236] hover:border-2 w-[75px]'
                : 'hidden'
            }
            onClick={() => setShowMore((prev) => !prev)}
          >
            {showMore ? content.home02b2 : content.home02b1}
          </button>
        </div>
      </div>
    </div>
  )
}

export default HomeSec02
