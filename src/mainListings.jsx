import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import ListingsPage from './Listings.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Index />
  </StrictMode>,
)

