import React from 'react'

const Message = ({ variant, children }) => {
  return (
    <>
      {variant === 'danger' ? (
        <div
          className='text-red-500 border border-red-500 text-[35px] px-4 mb-2 rounded relative'
          role='alert'
        >
          <strong className='font-bold'>{children}</strong>
        </div>
      ) : (
        <div
          className='text-green-600 border border-green-500 text-[35px] px-4 mb-2 rounded relative'
          role='alert'
        >
          <strong className='font-bold'>{children}</strong>
        </div>
      )}
    </>
  )
}

Message.defaultProps = {
  variant: 'info',
}

export default Message
