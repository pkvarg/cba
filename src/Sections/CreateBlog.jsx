import React, { useState, useEffect } from 'react'
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage'
import { app } from '../App'
import axios from 'axios'

const CreateBlog = () => {
  const [open, setOpen] = useState(false)
  const [file, setFile] = useState(null)
  const [text, setText] = useState('')
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [media, setMedia] = useState('')

  useEffect(() => {
    const storage = getStorage(app)
    const upload = () => {
      const name = new Date().getTime() + file.name
      const storageRef = ref(storage, name)

      const uploadTask = uploadBytesResumable(storageRef, file)

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log('Upload is ' + progress + '% done')
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused')
              break
            case 'running':
              console.log('Upload is running')
              break
          }
        },
        (error) => {},
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setMedia(downloadURL)
          })
        }
      )
    }

    file && upload()
  }, [file])

  const handleSubmit = async () => {
    console.log(title, category, media, text)
    try {
      const res = await axios.post('http://localhost:2000/api/cba/blog', {
        title,
        category,
        media,
        text,
      })

      if (res.status === 200) {
        const data = await res.json()
        console.log(data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='relative flex flex-col'>
      <input
        type='text'
        placeholder='Nadpis'
        onChange={(e) => setTitle(e.target.value)}
      />
      <label htmlFor='text' className='text-[25px] mt-4'>
        Kategória
      </label>
      <select
        className='mt-2 text-dark'
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value='announcements'>Oznamy</option>
        <option value='events'>Podujatia</option>
        <option value='slider'>Slider</option>
      </select>
      <div className='flex relative bg-dark mt-8'>
        <button
          className='w-[36px] h-[36px] border border-green-100 flex items-center justify-center cursor-pointer'
          onClick={() => setOpen(!open)}
        >
          <img src='/plus.png' alt='' width={16} height={16} />
        </button>
        {open && (
          <div className='flex gap-[20px] z-999 w-[100%] absolute left-[50px]'>
            <input
              type='file'
              id='image'
              onChange={(e) => setFile(e.target.files[0])}
              style={{ display: 'none' }}
            />
            <button className='border border-white w-[36px] h-[36px] 100 flex items-center justify-center cursor-pointer'>
              <label htmlFor='image'>
                <img src='/image.png' alt='' width={16} height={16} />
              </label>
            </button>
            <button className='border border-white w-[36px] h-[36px] 100 flex items-center justify-center cursor-pointer'>
              <img src='/external.png' alt='' width={16} height={16} />
            </button>
            <button className='border border-white w-[36px] h-[36px] 100 flex items-center justify-center cursor-pointer'>
              <img src='/video.png' alt='' width={16} height={16} />
            </button>
          </div>
        )}
      </div>
      <textarea
        className='w-[300px] text-dark mt-4 pl-1'
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder='Text...'
      />
      <button className='mt-4 text-green-400' onClick={handleSubmit}>
        Publikovať
      </button>
    </div>
  )
}

export default CreateBlog
