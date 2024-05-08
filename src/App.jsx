import Home from './pages/Home'
import Audio from './pages/Audio'
//import RoomPage from './pages/Roompage'
import Login from './pages/Login'
import EditBlog from './pages/EditBlog'
import Footer from './components/Footer'
import CbaZone from './pages/CbaZone'
import PublicCbaCalendar from './pages/PublicCbaCalendar'
import Admin from './pages/Admin'
import Users from './pages/AdminUsers'
import Events from './pages/Events'
import Gallery from './pages/Gallery'
import Download from './pages/Download'
import MyProfile from './pages/MyProfile'
import Burdens from './pages/Burdens'
import AdminEvents from './pages/AdminEvents'
import AdminBlogs from './pages/AdminBlogs'
import AdminAnnouncements from './pages/AdminAnnouncements'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { StateContext } from './context/StateContext'
import { firebaseConfig } from '../firebaseConfig'
import { initializeApp } from 'firebase/app'
import { Toaster } from 'react-hot-toast'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import Blog from './pages/Blog'
import Counter from './pages/counter'
export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()

function App() {
  return (
    <BrowserRouter>
      <StateContext>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/audio' element={<Audio />} />
          {/* <Route path='/room/:roomId' element={<RoomPage />} /> */}
          <Route path='/login' element={<Login />} />
          <Route path='/gallery' element={<Gallery />} />
          <Route path='/download' element={<Download />} />
          <Route path='/cba-zone' element={<CbaZone />} />
          <Route path='/cba-zone/my-profile/:id' element={<MyProfile />} />
          <Route path='/cba-zone/events' element={<Events />} />
          <Route path='/cba-zone/burdens' element={<Burdens />} />

          <Route path='/admin' element={<Admin />} />
          <Route path='/admin/users' element={<Users />} />
          <Route path='/admin/events' element={<AdminEvents />} />
          <Route path='/admin/blogs' element={<AdminBlogs />} />
          <Route path='/admin/announcements' element={<AdminAnnouncements />} />
          <Route path='/admin/edit/:id' element={<EditBlog />} />
          <Route path='/blog' element={<Blog />} />
          <Route path='/blog/:id' element={<Blog />} />
          <Route path='/calendar' element={<PublicCbaCalendar />} />
          <Route path='/counter' element={<Counter />} />
        </Routes>
        {/* <Footer /> */}
      </StateContext>
      <Toaster />
    </BrowserRouter>
  )
}

export default App
