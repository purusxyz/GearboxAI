import './App.css'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import LoginSuccess from "./pages/LoginSuccess";

function App() {

  return (
      
    <main>
         
         <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login-success" element={<LoginSuccess />} />
         </Routes>  
    </main>
  )
}

export default App
