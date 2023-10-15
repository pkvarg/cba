import Home from './pages/Home'
import Audio from './pages/Audio'
import RoomPage from './pages/Roompage'
import Footer from './components/Footer'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { StateContext } from './context/StateContext'

function App() {
  return (
    <BrowserRouter>
      <StateContext>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/audio' element={<Audio />} />
          <Route path='/room/:roomId' element={<RoomPage />} />
        </Routes>
        <Footer />
      </StateContext>
    </BrowserRouter>
  )
}

export default App
