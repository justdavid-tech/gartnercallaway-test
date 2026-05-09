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


// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import { BrowserRouter } from 'react-router-dom'
// import Navbar from './components/navbar.jsx'
// import Footer from './components/footer.jsx'
// import Home from './pages/home.jsx'
// // import ContactPage from './pages/contact.jsx'
// // import AboutPage from './pages/about.jsx'
// // import ContactPage from './pages/contact.jsx'
// // import InsightsPage from "./pages/insightspage.jsx"
// // import ProductionPage from './pages/production.jsx'
// // import ArticlePage from './pages/articlepage.jsx'


// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <BrowserRouter>
//       <Navbar />
//       <Home />
//       {/* <AboutPage /> */}
//       {/* <h1 style={{ color: 'red', fontSize: '48px' }}>Hello</h1> */}
//       {/* <ContactPage /> */}
//       {/* <InsightsPage /> */}
//       {/* <ArticlePage /> */}
//       {/* <ProductionPage /> */}
//       <Footer />
//     </BrowserRouter>
//   </StrictMode>
// )
