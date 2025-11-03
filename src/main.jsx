import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
//import './index.css'
import Login from './Login.jsx'
import Listings from './Listings.jsx'

createRoot(document.getElementById('login')).render(
  <StrictMode>
    <Login />
  </StrictMode>,
)

createRoot(document.getElementById('listings')).render(
  <StrictMode>
    <Listings />
  </StrictMode>,
)

