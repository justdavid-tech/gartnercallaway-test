import './index.css'
import { Routes, Route  } from 'react-router-dom'
// Pages
import Home from './pages/home'
import About from './pages/about'
import ProductionPage from './pages/production'
import ContactPage from './pages/contact'

// Insights Page
import InsightsPage from './pages/insightspage'
import ArticlePage from './pages/articlepage'

// SubServices Page
import FarmDesignPage from './pages/SubServices/productionpage'
import InstitutionalPage from './pages/SubServices/institutional'
import ProductionProcessingPage from './pages/SubServices/processingPage'
import GCAcademy from './pages/SubServices/academy'

// Governance Page
import GovernancePage from './pages/governance/policies'
import Board from './pages/governance/board'
import SocialResponsibility from './pages/governance/socialResponsibility'

// Terms and Conditions
import Termsofuse from './pages/legal/termsofuse'

// Privacy Policy
import Privacypolicy from './pages/legal/privacyPolicy'

import VideosPage from "./pages/videos";

// Loader
import Loader from './components/loader'
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/production" element={<ProductionPage />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* SubServices Page */}
        <Route path="/SubServices/productionpage" element={<FarmDesignPage />} />
        <Route path="/SubServices/institutional" element={<InstitutionalPage />} />
        {/* <Route path="/SubServices/processingPage" element={<ProductionProcessingPage />} /> */}
        <Route path="/SubServices/academy" element={<GCAcademy />} />

        {/* Governance Page */}
        <Route path="/governance/policies" element={<GovernancePage />} />
        <Route path="/governance/board" element={<Board />} />
        <Route path="/governance/social-responsibility" element={<SocialResponsibility />} />

        {/* Terms and Conditions */}
        <Route path="/legal/terms-of-use" element={<Termsofuse />} />

        {/* Privacy Policy */}
        <Route path="/legal/privacy-policy" element={<Privacypolicy />} />

        {/* Loader */}
        <Route path="/loader" element={<Loader />} />

        {/* Insights Page */}
        <Route path="/insights" element={<InsightsPage />} />
        <Route path="/insights/:slug" element={<ArticlePage />} />

        {/* Youtube Videos */}
        <Route path="/videos" element={<VideosPage />} />
      </Routes>
    </>
  )
}

export default App;
