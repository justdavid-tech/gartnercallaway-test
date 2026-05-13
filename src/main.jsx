import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import Navbar from './components/navbar.jsx'
import Footer from './components/footer.jsx'
import FloatingActions from './components/floatingactions.jsx'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <StrictMode>
    <Navbar />
    <App />
    <Footer />
    <FloatingActions />
  </StrictMode>
  </BrowserRouter>
)

