import './index.css'
import { Routes, Route  } from 'react-router-dom'
// Pages
import Home from './pages/home'
import About from './pages/about'
import ProductionPage from './pages/production'
// import Contact from './pages/contact'

// Insights Page
import InsightsPage from './pages/insightspage'
import ArticlePage from './pages/articlepage'

// SubServices Page
import FarmDesignPage from './pages/SubServices/productionpage'
import InstitutionalPage from './pages/SubServices/institutional'
import ProductionProcessingPage from './pages/SubServices/processingPage'
import GCAcademy from './pages/SubServices/academy'

// Loader
import Loader from './components/loader'
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/production" element={<ProductionPage />} />
        {/* <Route path="/contact" element={<Contact />} /> */}

        {/* SubServices Page */}
        <Route path="/SubServices/productionpage" element={<FarmDesignPage />} />
        <Route path="/SubServices/institutional" element={<InstitutionalPage />} />
        <Route path="/SubServices/processingPage" element={<ProductionProcessingPage />} />
        <Route path="/SubServices/academy" element={<GCAcademy />} />

        {/* Loader */}
        <Route path="/loader" element={<Loader />} />

        {/* Insights Page */}
        <Route path="/insights" element={<InsightsPage />} />
        <Route path="/insights/:slug" element={<ArticlePage />} />
      </Routes>
    </>
  )
}

export default App;
