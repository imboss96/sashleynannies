import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import WhyUsPage from './pages/WhyUsPage'
import ServicesPage from './pages/ServicesPage'
import ServiceDetailPage from './pages/ServiceDetailPage'
import VettingPage from './pages/VettingPage'
import ContactPage from './pages/ContactPage'
import HomeCareConsultationPage from './pages/HomeCareConsultationPage'
import PrivacyPage from './pages/PrivacyPage'
import TermsPage from './pages/TermsPage'
import CareersPage from './pages/CareersPage'

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<HomePage />} />
          <Route path="/why-us" element={<WhyUsPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/nanny-agency-nairobi" element={<ServiceDetailPage slug="nanny-agency-nairobi" />} />
          <Route path="/house-help-nairobi" element={<ServiceDetailPage slug="house-help-nairobi" />} />
          <Route path="/live-in-nanny-nairobi" element={<ServiceDetailPage slug="live-in-nanny-nairobi" />} />
          <Route path="/live-out-nanny-nairobi" element={<ServiceDetailPage slug="live-out-nanny-nairobi" />} />
          <Route path="/house-manager-nairobi" element={<ServiceDetailPage slug="house-manager-nairobi" />} />
          <Route path="/vetting-process" element={<VettingPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/home-care-consultation" element={<HomeCareConsultationPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/privacy.html" element={<Navigate to="/privacy" replace />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/terms.html" element={<Navigate to="/terms" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}
