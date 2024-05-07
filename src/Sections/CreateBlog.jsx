import React, { useState, useEffect } from 'react'
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage'
import { app } from '../App'
import axios from 'axios'
import toast from 'react-hot-toast'

const CreateBlog = ({ category, setKey }) => {
  const [open, setOpen] = useState(false)
  const [file, setFile] = useState(null)
  const [text, setText] = useState('')
  const [title, setTitle] = useState('')
  const [upcoming, setUpcoming] = useState(false)
  const [english, setEnglish] = useState(false)
  const currentPathname = window.location.pathname
  const isEvent = currentPathname.includes('events')
  const isBlog = currentPathname.includes('blogs')
  const [hasLink, setHasLink] = useState(false)
  const [link, setLink] = useState('')

  const [media, setMedia] = useState('')

  const [data, setData] = useState({})

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
    try {
      const res = await axios.post(
        'https://api.pictusweb.com/api/cba/blog',
        //'http://localhost:2000/api/cba/blog',
        {
          title,
          category,
          media,
          text,
          upcoming,
          english,
          link,
        }
      )

      if (res.status === 201) {
        toast.success('Príspevok úspešne vytvorený')
        setKey((prev) => prev + 1)
        setTitle('')
        setFile('')
        setText('')
        setLink('')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='relative flex flex-col'>
      <label className='text-[30px] py-1' htmlFor='text'>
        Nadpis
      </label>
      <input
        type='text'
        placeholder='Nadpis'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      {isEvent && (
        <>
          <p
            onClick={() => setUpcoming((prev) => !prev)}
            className={
              upcoming
                ? 'text-green-500 text-[25px] mt-4 cursor-pointer'
                : 'text-red-500 text-[25px] mt-4 cursor-pointer'
            }
          >
            Nadchádzajúce podujatie? {upcoming ? 'Áno' : 'Nie'}
          </p>
          <p
            onClick={() => setEnglish((prev) => !prev)}
            className={
              english
                ? 'text-green-500 text-[25px] mt-4 cursor-pointer'
                : 'text-red-500 text-[25px] mt-4 cursor-pointer'
            }
          >
            Je toto anglický oznam? {english ? 'Áno' : 'Nie'}
          </p>

          <p
            onClick={() => setHasLink((prev) => !prev)}
            className={
              hasLink
                ? 'text-green-500 text-[25px] mt-4 cursor-pointer'
                : 'text-red-500 text-[25px] mt-4 cursor-pointer'
            }
          >
            Pridať link odkazujúci na iný web? {hasLink ? 'Áno' : 'Nie'}
          </p>
        </>
      )}
      {hasLink && (
        <textarea
          className='text-[#2e2236] mt-4 pl-1'
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder='Vlož link...'
        />
      )}

      {isBlog && (
        <p
          onClick={() => setEnglish((prev) => !prev)}
          className={
            english
              ? 'text-green-500 text-[25px] mt-4 cursor-pointer'
              : 'text-red-500 text-[25px] mt-4 cursor-pointer'
          }
        >
          Je toto anglický blog? {english ? 'Áno' : 'Nie'}
        </p>
      )}
      {/* <label htmlFor='text' className='text-[25px] mt-4'>
        Kategória
      </label>
      <select
        className='mt-2 text-[#2e2236]'
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value='announcements'>Oznamy</option>
        <option value='events'>Podujatia</option>
        <option value='slider'>Slider</option>
      </select> */}
      <div className='flex relative bg-[#2e2236] mt-8'>
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
          </div>
        )}
      </div>
      {media !== '' ? (
        <img className='w-[250px] my-4' src={media} alt={title} />
      ) : (
        <p>bez obrázku</p>
      )}

      <textarea
        className='text-[#2e2236] mt-4 pl-1'
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
