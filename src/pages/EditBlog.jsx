import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage'
import { app } from '../App'
import CbaZoneBack from '../components/CbaZoneBack'
import { useStateContext } from '../context/StateContext'
import toast from 'react-hot-toast'

const EditBlog = () => {
  const { currentUser } = useStateContext()
  const isAdmin = currentUser.isAdmin

  const { id } = useParams()
  const navigate = useNavigate()
  const [blog, setBlog] = useState()
  const [open, setOpen] = useState(false)
  const [file, setFile] = useState(null)
  const [text, setText] = useState('')
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [media, setMedia] = useState('')
  const [upcoming, setUpcoming] = useState(false)
  const currentPathname = window.location.pathname
  const isEvent = currentPathname.includes('events')

  const [english, setEnglish] = useState(false)
  // const isBlog = currentPathname.includes('blogs')
  const [hasLink, setHasLink] = useState(false)
  const [link, setLink] = useState('')

  useEffect(() => {
    const getSingleBlog = async () => {
      try {
        const { data } = await axios.get(
          `https://api.pictusweb.com/api/cba/blogs/${id}`
          //`http://localhost:2000/api/cba/blogs/${id}`
        )

        if (data) {
          setBlog(data)
          setTitle(data.title)
          setCategory(data.category)
          setMedia(data.media)
          setText(data.text)
          setUpcoming(data.upcoming)
          setEnglish(data.english)
          setLink(data.link)
        }
      } catch (error) {
        console.log(error)
      }
    }

    getSingleBlog()
  }, [])

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

  const afterSuccess = () => {
    navigate(`/admin/${category}`)
  }

  const getDate = (dt) => {
    const date = new Date(dt)
    const year = date.getFullYear()
    const month = date.getMonth() + 1 // Months are 0-indexed, so add 1
    const day = date.getDate()
    const formatted = `${day}.${month}.${year} `
    return formatted
  }

  const handleSubmit = async () => {
    try {
      const res = await axios.put(
        // `https://api.pictusweb.com/api/cba/blogs/update/${id}`,

        `http://localhost:2000/api/cba/blogs/update/${id}`,
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

      if (res.status === 200) {
        toast.success('Príspevok úspešne upravený')
        setTimeout(afterSuccess, 3000)
      }
    } catch (error) {
      console.log(error)
      setSuccess(error.message)
    }
  }

  const handleDelete = async () => {
    const confirmed = window.confirm('Naozaj?')
    if (confirmed) {
      try {
        const res = await axios.delete(
          `https://api.pictusweb.com/api/cba/blogs/${id}`
          // `http://localhost:2000/api/cba/blogs/${id}`
        )

        if (res.status === 200) {
          toast.success('Príspevok úspešne vymazaný')
          navigate(`/admin/${category}`)
        }
      } catch (error) {
        toast.error('Chyba pri vymazávaní')
      }
    } else {
      console.log('User clicked Cancel or closed the dialog')
    }
  }

  return (
    isAdmin && (
      <div className='bg-[#2e2236] text-white text-[30px] relative'>
        <CbaZoneBack destination={'/admin/events'} />
        <h1 className='text-[45px] text-center text-green-400'>Editovať</h1>
        {blog && (
          <div className='relative flex flex-col mx-2 lg:mx-[35%] mt-16'>
            <label className='text-[30px] py-1' htmlFor='text'>
              Nadpis
            </label>
            <input
              type='text'
              value={title}
              placeholder='Nadpis'
              onChange={(e) => setTitle(e.target.value)}
            />
            <label htmlFor='text' value={category} className='text-[25px] mt-4'>
              Kategória
            </label>
            <select
              className='mt-2 text-[#2e2236]'
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value='announcements'>Oznamy</option>
              <option value='events'>Podujatia</option>
              <option value='blogs'>Blogy</option>
            </select>

            {true && (
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

            <div className='flex relative bg-[#2e2236] mt-8'>
              <p className='mr-4'>Obrázok</p>
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

            {media && (
              <img className='my-4 w-[50%] lg:w-[25%]' src={media} alt='file' />
            )}

            <textarea
              className='text-[#2e2236] mt-4 pl-1'
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder='Text...'
            />
            <button className='mt-4 text-green-400' onClick={handleSubmit}>
              Editovať
            </button>
            <button className='mt-4 text-red-400' onClick={handleDelete}>
              Vymazať
            </button>
          </div>
        )}
      </div>
    )
  )
}

export default EditBlog
