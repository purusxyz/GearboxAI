import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import axios from "axios";

const BASE_URL =
  import.meta.env.VITE_BACKEND_URL ||
  "http://localhost:5000/api/v1";
  
axios.defaults.baseURL = BASE_URL;
axios.defaults.withCredentials = true;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </StrictMode>,
)
