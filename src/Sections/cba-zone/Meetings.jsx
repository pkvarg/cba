import React from 'react'

const Meetings = () => {
  return (
    <div className='ml-2 mt-8 '>
      <h1 className='text-center text-[35px] my-8 text-green-500'>
        Stretnutia
      </h1>
      <p>
        Pondelok 18:00
        <a
          href='https://us02web.zoom.us/j/87605761021'
          target='_blank'
          className='ml-2'
        >
          Zoom Link
        </a>
      </p>
      <p>
        Utorok 19:30{' '}
        <a
          href='https://us02web.zoom.us/j/3473568624?pwd=eUtvOEVXU1ZjZjFMQUFFb2V5UVhqdz09'
          className='ml-2'
        >
          Zoom Link
        </a>
      </p>
      <p>
        Streda 18:00{' '}
        <a
          href='https://us02web.zoom.us/j/87605761021'
          target='_blank'
          className='ml-2'
        >
          Zoom Link
        </a>
      </p>
      <p>
        Štvrtok 18:00{' '}
        <a
          href='https://us02web.zoom.us/j/87605761021'
          target='_blank'
          className='ml-2'
        >
          Zoom Link
        </a>
      </p>
      <p>Piatok 18:00</p>
      <p>
        Nedeľa 10:00{' '}
        <a
          href='https://us02web.zoom.us/j/87605761021'
          target='_blank'
          className='ml-2'
        >
          Zoom Link
        </a>
      </p>
    </div>
  )
}

export default Meetings
