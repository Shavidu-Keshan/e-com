import { BrowserRouter } from 'react-router-dom'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import Login from './pages/login'
import Signup from './pages/signup'
import Header from './components/header'
import AdminPage from './pages/adminPage'
import TestPage from './pages/testPage'
import { Toaster } from 'react-hot-toast'

function App() {
  

  return (
    <BrowserRouter>
      <div>
        <Toaster position='top-center'/>
       
        <Routes path="/*">
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin*" element={<AdminPage />} />
          <Route path="/testing" element={<TestPage />} />
          <Route path="/*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </div>
      
    </BrowserRouter>
  )
}

export default App
