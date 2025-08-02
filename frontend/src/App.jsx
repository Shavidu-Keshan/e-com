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
import Register from './pages/register'

function App() {
  

  return (
    <BrowserRouter>
      <div>
        <Toaster position='top-center'/>
       
        <Routes path="/*">
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/admin*" element={<AdminPage />} />
          <Route path="/testing" element={<TestPage />} />
          <Route path="/*" element={<Home />} />
        </Routes>
      </div>
      
    </BrowserRouter>
  )
}

export default App

//https://yewagxggzrwmdzwaesgc.supabase.co

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlld2FneGdnenJ3bWR6d2Flc2djIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMwMTM0MjgsImV4cCI6MjA2ODU4OTQyOH0.QTYEIKLEu7HMrY4NDpUPeHaS6oKIl3PBCWGFhcDncwg