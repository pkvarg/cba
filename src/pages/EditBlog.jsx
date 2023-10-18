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

const EditBlog = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [blog, setBlog] = useState()
  const [open, setOpen] = useState(false)
  const [file, setFile] = useState(null)
  const [text, setText] = useState('')
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [media, setMedia] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    const getSingleBlog = async () => {
      try {
        const { data } = await axios.get(
          `https://api.pictusweb.com/api/cba/blogs/${id}`
          // `http://localhost:2000/api/cba/blogs/${id}`
        )

        if (data) {
          setBlog(data)
          setTitle(data.title)
          setCategory(data.category)
          setMedia(data.media)
          setText(data.text)
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
    navigate('/login')
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
        `https://api.pictusweb.com/api/cba/blogs/update/${id}`,

        // `http://localhost:2000/api/cba/blogs/update/${id}`,
        {
          title,
          category,
          media,
          text,
        }
      )

      if (res.status === 200) {
        setSuccess('Príspevok úspešne upravený')
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
          setSuccess('Príspevok úspešne vymazaný')
          navigate('/login')
        }
      } catch (error) {
        setSuccess('Chyba pri vymazávaní')
      }
    } else {
      console.log('User clicked Cancel or closed the dialog')
    }
  }

  return (
    <div className='bg-dark text-white text-[30px] relative'>
      <a className='absolute top-2 left-2 text-white' href='/login'>
        Naspäť
      </a>
      <h1 className='text-[45px] text-center text-green-400'>Editovať blog</h1>
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
              </div>
            )}
          </div>

          {media && (
            <img className='my-4 w-[50%] lg:w-[25%]' src={media} alt='file' />
          )}

          <textarea
            className='text-dark mt-4 pl-1'
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
      <p className='text-[40px] text-center text-yellow-600'>{success}</p>
    </div>
  )
}

export default EditBlog
