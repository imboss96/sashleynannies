import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'

const HomePage = lazy(() => import('./pages/HomePage'))
const WhyUsPage = lazy(() => import('./pages/WhyUsPage'))
const ServicesPage = lazy(() => import('./pages/ServicesPage'))
const ServiceDetailPage = lazy(() => import('./pages/ServiceDetailPage'))
const VettingPage = lazy(() => import('./pages/VettingPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const HomeCareConsultationPage = lazy(() => import('./pages/HomeCareConsultationPage'))
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'))
const TermsPage = lazy(() => import('./pages/TermsPage'))
const CareersPage = lazy(() => import('./pages/CareersPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))
const BlogPage = lazy(() => import('./pages/BlogPage'))
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'))

export default function App() {
  return (
    <Layout>
      <Suspense fallback={<p role="status">Loading page…</p>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
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
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Layout>
  )
}
