import { createContext, useContext, useEffect, useMemo, type ReactNode } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import type { Locale } from './types/content'

const localeFromPath = (pathname: string): Locale => (pathname.startsWith('/en') ? 'en' : 'es')

interface LanguageContextValue {
  locale: Locale
  switchLocale: () => void
  localizePath: (path: string) => string
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const location = useLocation()
  const navigate = useNavigate()
  const locale = localeFromPath(location.pathname)

  useEffect(() => {
    localStorage.setItem('cocos-locale', locale)
    document.documentElement.lang = locale
  }, [locale])

  const value = useMemo<LanguageContextValue>(() => ({
    locale,
    switchLocale: () => {
      const next = locale === 'es' ? 'en' : 'es'
      const segmentMap: Record<string, string> = {
        experiencias: 'experiences', experiences: 'experiencias',
        destinos: 'destinations', destinations: 'destinos',
        nosotros: 'about', about: 'nosotros',
        galeria: 'gallery', gallery: 'galeria',
        blog: 'journal', journal: 'blog',
        contacto: 'contact', contact: 'contacto',
        servicios: 'services', services: 'servicios',
        privacidad: 'privacy', privacy: 'privacidad',
        terminos: 'terms', terms: 'terminos',
      }
      const parts = location.pathname.split('/').filter(Boolean)
      const translated = parts.slice(1).map((part, index) => index === 0 ? (segmentMap[part] ?? part) : part)
      const path = `/${next}${translated.length ? `/${translated.join('/')}` : ''}`
      navigate(`${path}${location.search}`)
    },
    localizePath: (path) => `/${locale}${path.startsWith('/') ? path : `/${path}`}`,
  }), [locale, location.pathname, location.search, navigate])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage must be used within LanguageProvider')
  return context
}
