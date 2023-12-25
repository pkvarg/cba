import Home from './pages/Home'
import Audio from './pages/Audio'
import RoomPage from './pages/Roompage'
import Login from './pages/Login'
import EditBlog from './pages/EditBlog'
import Footer from './components/Footer'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { StateContext } from './context/StateContext'
import { firebaseConfig } from '../firebaseConfig'
import { initializeApp } from 'firebase/app'
import { Toaster } from 'react-hot-toast'

export const app = initializeApp(firebaseConfig)

function App() {
  return (
    <BrowserRouter>
      <StateContext>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/audio' element={<Audio />} />
          <Route path='/room/:roomId' element={<RoomPage />} />
          <Route path='/login' element={<Login />} />
          {/* <Route path='/login/:id' element={<EditBlog />} /> */}
          <Route path='/edit/:id' element={<EditBlog />} />
        </Routes>
        {/* <Footer /> */}
      </StateContext>
      <Toaster />
    </BrowserRouter>
  )
}

export default App
