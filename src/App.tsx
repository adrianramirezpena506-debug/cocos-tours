import { Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/SiteChrome'
import { ExperiencesPage } from './pages/ExperiencesPage'
import { HomePage } from './pages/HomePage'
import { TourPage } from './pages/TourPage'
import { AboutPage, ArticlePage, ContactPage, DestinationsPage, GalleryPage, JournalPage, LegalPage, NotFoundPage, ServicesPage } from './pages/UtilityPages'

function RootRedirect() {
  const locale = localStorage.getItem('cocos-locale') === 'en' ? 'en' : 'es'
  return <Navigate to={`/${locale}`} replace />
}

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<RootRedirect />} />
        <Route path="/:locale" element={<HomePage />} />
        <Route path="/es/experiencias" element={<ExperiencesPage />} />
        <Route path="/en/experiences" element={<ExperiencesPage />} />
        <Route path="/es/experiencias/:slug" element={<TourPage />} />
        <Route path="/en/experiences/:slug" element={<TourPage />} />
        <Route path="/es/destinos" element={<DestinationsPage />} />
        <Route path="/en/destinations" element={<DestinationsPage />} />
        <Route path="/es/servicios" element={<ServicesPage />} />
        <Route path="/en/services" element={<ServicesPage />} />
        <Route path="/es/nosotros" element={<AboutPage />} />
        <Route path="/en/about" element={<AboutPage />} />
        <Route path="/es/galeria" element={<GalleryPage />} />
        <Route path="/en/gallery" element={<GalleryPage />} />
        <Route path="/es/blog" element={<JournalPage />} />
        <Route path="/en/journal" element={<JournalPage />} />
        <Route path="/es/blog/:slug" element={<ArticlePage />} />
        <Route path="/en/journal/:slug" element={<ArticlePage />} />
        <Route path="/es/contacto" element={<ContactPage />} />
        <Route path="/en/contact" element={<ContactPage />} />
        <Route path="/es/privacidad" element={<LegalPage type="privacy" />} />
        <Route path="/en/privacy" element={<LegalPage type="privacy" />} />
        <Route path="/es/terminos" element={<LegalPage type="terms" />} />
        <Route path="/en/terms" element={<LegalPage type="terms" />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  )
}
