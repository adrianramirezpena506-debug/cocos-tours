import { useEffect, useRef, useState, type ReactNode, type TouchEvent } from 'react'
import { ArrowRight, ChevronLeft, ChevronRight, Instagram, Menu, MessageCircle, Phone, UserRound, X } from 'lucide-react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { site } from '../data/site'
import { useLanguage } from '../i18n'

const paths = {
  experiences: { es: '/experiencias', en: '/experiences' },
  destinations: { es: '/destinos', en: '/destinations' },
  about: { es: '/nosotros', en: '/about' },
  gallery: { es: '/galeria', en: '/gallery' },
  journal: { es: '/blog', en: '/journal' },
  contact: { es: '/contacto', en: '/contact' },
  services: { es: '/servicios', en: '/services' },
  privacy: { es: '/privacidad', en: '/privacy' },
  terms: { es: '/terminos', en: '/terms' },
} as const

export function useSitePath() {
  const { locale } = useLanguage()
  return (key: keyof typeof paths) => `/${locale}${paths[key][locale]}`
}

export function Header() {
  const { locale, switchLocale } = useLanguage()
  const path = useSitePath()
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const location = useLocation()
  const es = locale === 'es'

  useEffect(() => setOpen(false), [location.pathname])
  useEffect(() => {
    document.body.classList.toggle('menu-open', open)
    if (open) menuRef.current?.querySelector<HTMLElement>('a,button')?.focus()
    const escape = (event: KeyboardEvent) => event.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', escape)
    return () => {
      document.body.classList.remove('menu-open')
      document.removeEventListener('keydown', escape)
    }
  }, [open])

  const nav = [
    ['experiences', es ? 'Experiencias' : 'Experiences'],
    ['destinations', es ? 'Destinos' : 'Destinations'],
    ['about', es ? 'Nosotros' : 'About'],
    ['gallery', es ? 'Galería' : 'Gallery'],
    ['journal', es ? 'Blog' : 'Journal'],
    ['contact', es ? 'Contacto' : 'Contact'],
  ] as [keyof typeof paths, string][]

  return (
    <header className="site-header">
      <nav className="nav-shell" aria-label={es ? 'Navegación principal' : 'Main navigation'}>
        <Link className="logo-link" to={`/${locale}`} aria-label="Coco's Tours — inicio">
          <img src="/assets/brand/cocos-logo.png" alt="Coco's Tours" />
        </Link>
        <div className="desktop-nav">
          {nav.map(([key, label]) => <NavLink key={key} to={path(key)}>{label}</NavLink>)}
        </div>
        <div className="nav-actions">
          <button className="language-switch" type="button" onClick={switchLocale} aria-label={es ? 'Change language to English' : 'Cambiar idioma a español'}>{es ? 'EN' : 'ES'}</button>
          <Link className="button button-small button-light desktop-book" to={`${path('experiences')}#discover`}>{es ? 'Reservar experiencia' : 'Book an experience'}</Link>
          <button className="menu-toggle" type="button" onClick={() => setOpen(true)} aria-expanded={open} aria-controls="mobile-menu" aria-label={es ? 'Abrir menú' : 'Open menu'}><Menu /></button>
        </div>
      </nav>
      <div className={`mobile-menu ${open ? 'is-open' : ''}`} id="mobile-menu" ref={menuRef} aria-hidden={!open}>
        <div className="mobile-menu-top">
          <img src="/assets/brand/cocos-logo.png" alt="Coco's Tours" />
          <button type="button" onClick={() => setOpen(false)} aria-label={es ? 'Cerrar menú' : 'Close menu'}><X /></button>
        </div>
        <div className="mobile-menu-links">
          {nav.map(([key, label], index) => <NavLink key={key} to={path(key)}><span>0{index + 1}</span>{label}</NavLink>)}
        </div>
        <div className="mobile-menu-footer">
          <button type="button" onClick={switchLocale}>{es ? 'English version' : 'Versión en español'}</button>
          <a href={`tel:${site.phoneHref}`}><Phone size={17} /> {site.phoneDisplay}</a>
          <a href={site.liveLogin} target="_blank" rel="noreferrer"><UserRound size={17} /> {es ? 'Cuenta en el sitio actual' : 'Account on current site'}</a>
        </div>
      </div>
    </header>
  )
}

export function Footer() {
  const { locale } = useLanguage()
  const path = useSitePath()
  const es = locale === 'es'
  return (
    <footer className="site-footer">
      <div className="footer-waterline" aria-hidden="true" />
      <div className="container footer-grid">
        <div className="footer-brand">
          <img src="/assets/brand/cocos-logo.png" alt="Coco's Tours" />
          <p>{es ? 'Conectamos almas con el mar a través de experiencias locales, conscientes y profundamente humanas.' : 'We connect souls with the sea through local, conscious and deeply human experiences.'}</p>
        </div>
        <div>
          <h2>{es ? 'Experiencias' : 'Experiences'}</h2>
          <Link to={path('experiences')}>{es ? 'Todos los tours' : 'All tours'}</Link>
          <Link to={`${path('experiences')}?category=islands`}>{es ? 'Islas y playas' : 'Islands & beaches'}</Link>
          <Link to={`${path('experiences')}?category=fishing`}>{es ? 'Pesca deportiva' : 'Sport fishing'}</Link>
          <Link to={`${path('experiences')}?category=private`}>{es ? 'Tours privados' : 'Private tours'}</Link>
        </div>
        <div>
          <h2>{es ? 'Compañía' : 'Company'}</h2>
          <Link to={path('about')}>{es ? 'Nuestra historia' : 'Our story'}</Link>
          <Link to={path('services')}>{es ? 'Servicios' : 'Services'}</Link>
          <Link to={path('journal')}>{es ? 'Historias del Golfo' : 'Stories from the Gulf'}</Link>
          <Link to={path('contact')}>{es ? 'Contacto' : 'Contact'}</Link>
        </div>
        <div className="footer-contact">
          <h2>{es ? 'Hablemos' : 'Let’s talk'}</h2>
          <a href={`tel:${site.phoneHref}`}>{site.phoneDisplay}</a>
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <a href={site.map} target="_blank" rel="noreferrer">{site.address[locale]}</a>
          <div className="social-row">
            <a href={site.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram /></a>
            <a href={site.facebook} target="_blank" rel="noreferrer" aria-label="Facebook">f</a>
            <a href={site.tripadvisor} target="_blank" rel="noreferrer" aria-label="TripAdvisor">●●●</a>
          </div>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} Coco's Tours</span>
        <div><Link to={path('privacy')}>{es ? 'Privacidad' : 'Privacy'}</Link><Link to={path('terms')}>{es ? 'Términos de solicitud' : 'Inquiry terms'}</Link></div>
        <div className="account-links"><a href={site.liveLogin} target="_blank" rel="noreferrer">{es ? 'Ingresar ↗' : 'Log in ↗'}</a><a href={site.liveRegister} target="_blank" rel="noreferrer">{es ? 'Registrarse ↗' : 'Register ↗'}</a></div>
      </div>
    </footer>
  )
}

export function Layout({ children }: { children: ReactNode }) {
  const { locale } = useLanguage()
  const es = locale === 'es'
  return (
    <>
      <a className="skip-link" href="#main-content">{es ? 'Saltar al contenido' : 'Skip to content'}</a>
      <Header />
      <main id="main-content">{children}</main>
      <Footer />
      <a className="floating-whatsapp" href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(es ? "Hola, Coco's Tours. Quisiera planear mi tour." : "Hello, Coco's Tours. I would like to plan my tour.")}`} target="_blank" rel="noreferrer" aria-label={es ? 'Planear mi tour por WhatsApp' : 'Plan my tour on WhatsApp'}>
        <MessageCircle /><span>{es ? 'Planear mi tour' : 'Plan my tour'}</span>
      </a>
    </>
  )
}

export function ArrowLink({ to, children }: { to: string; children: ReactNode }) {
  return <Link className="arrow-link" to={to}>{children}<ArrowRight size={18} /></Link>
}

export function CarouselControls({ previous, next, label }: { previous: () => void; next: () => void; label: string }) {
  return <div className="carousel-controls" aria-label={label}><button type="button" onClick={previous} aria-label="Previous"><ChevronLeft /></button><button type="button" onClick={next} aria-label="Next"><ChevronRight /></button></div>
}

export function SwipeArea({ children, onPrevious, onNext, className = '' }: { children: ReactNode; onPrevious: () => void; onNext: () => void; className?: string }) {
  const startX = useRef(0)
  const onStart = (event: TouchEvent) => { startX.current = event.touches[0].clientX }
  const onEnd = (event: TouchEvent) => {
    const distance = event.changedTouches[0].clientX - startX.current
    if (Math.abs(distance) > 45) {
      if (distance > 0) onPrevious()
      else onNext()
    }
  }
  return <div className={className} onTouchStart={onStart} onTouchEnd={onEnd}>{children}</div>
}
