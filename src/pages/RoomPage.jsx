import React from 'react'
import { useParams } from 'react-router-dom'
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt'

const RoomPage = () => {
  const { roomId } = useParams()

  const myMeeting = async (element) => {
    //generate Kit token
    const appID = Number(import.meta.env.VITE_ZEGO_APP_ID)

    console.log(appID)
    const serverSecret = import.meta.env.VITE_ZEGO_SERVER_SECRET
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomId,
      Date.now().toString(),
      'Your Name'
    )
    const zp = ZegoUIKitPrebuilt.create(kitToken)
    zp.joinRoom({
      container: element,
      scenario: {
        mode: ZegoUIKitPrebuilt.VideoConference,
      },
    })
  }

  return (
    <div className='bg-black text-white h-[90vh]'>
      {roomId === 'Rev22' ? (
        <div ref={myMeeting} />
      ) : (
        <h1 className='text-[35px] text-center pt-[50px]'>
          No broadcast or Wrong room number
        </h1>
      )}
    </div>
  )
}

export default RoomPage
