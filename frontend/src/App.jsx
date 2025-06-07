import { BrowserRouter } from 'react-router-dom'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import Login from './pages/login'
import Signup from './pages/signup'
import Header from './components/header'
import AdminPage from './pages/adminPage'

function App() {
  

  return (
    <BrowserRouter>
      <div>
        
       
        <Routes path="/*">
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin*" element={<AdminPage />} />
          <Route path="/*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </div>
      
    </BrowserRouter>
  )
}

export default App
