import { useEffect, useState } from 'react'
import { ArrowRight, Clock, MapPin, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { testimonials } from '../data/site'
import { useLanguage } from '../i18n'
import { formatPrice } from '../lib/format'
import type { GalleryAsset, Tour } from '../types/content'
import { CarouselControls, SwipeArea, useSitePath } from './SiteChrome'
import { ResponsiveImage } from './ResponsiveImage'

export function SectionHeading({ eyebrow, title, copy, light = false }: { eyebrow: string; title: string; copy?: string; light?: boolean }) {
  return <div className={`section-heading ${light ? 'is-light' : ''}`}><span className="eyebrow">{eyebrow}</span><h2 className="editorial-heading">{title}</h2>{copy && <p>{copy}</p>}</div>
}

export function TourCard({ tour, large = false }: { tour: Tour; large?: boolean }) {
  const { locale } = useLanguage()
  const path = useSitePath()
  return (
    <article className={`tour-card ${large ? 'tour-card-large' : ''}`}>
      <Link className="tour-card-image" to={`${path('experiences')}/${tour.slug}`} aria-label={tour.name[locale]}>
        <ResponsiveImage src={tour.media.src} alt={tour.media.alt[locale]} loading="lazy" />
        <span>{tour.eyebrow[locale]}</span>
      </Link>
      <div className="tour-card-body">
        <div className="tour-card-meta"><span><Clock size={15} /> {tour.schedules[0].duration[locale]}</span><span><MapPin size={15} /> {tour.location[locale].split(',')[0]}</span></div>
        <h3 className="editorial-heading"><Link to={`${path('experiences')}/${tour.slug}`}>{tour.name[locale]}</Link></h3>
        <p>{tour.summary[locale]}</p>
        <div className="tour-card-footer"><strong>{formatPrice(tour.price, locale)}</strong><Link to={`${path('experiences')}/${tour.slug}`} aria-label={`${locale === 'es' ? 'Ver' : 'View'} ${tour.name[locale]}`}><ArrowRight /></Link></div>
      </div>
    </article>
  )
}

export function Testimonials() {
  const { locale } = useLanguage()
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const next = () => setIndex((value) => (value + 1) % testimonials.length)
  const previous = () => setIndex((value) => (value - 1 + testimonials.length) % testimonials.length)

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const timer = window.setInterval(() => setIndex((value) => (value + 1) % testimonials.length), 7000)
    return () => window.clearInterval(timer)
  }, [paused])

  const item = testimonials[index]
  return (
    <section className="testimonials-section" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocusCapture={() => setPaused(true)} onBlurCapture={() => setPaused(false)}>
      <div className="container testimonials-grid">
        <div><span className="eyebrow">TRIPADVISOR</span><p>{locale === 'es' ? 'Historias compartidas por quienes navegaron con nosotros.' : 'Stories shared by people who have sailed with us.'}</p><a href={item.sourceUrl} target="_blank" rel="noreferrer">{locale === 'es' ? 'Ver perfil oficial ↗' : 'View official profile ↗'}</a></div>
        <SwipeArea className="testimonial-quote" onPrevious={previous} onNext={next}>
          <span className="quote-mark" aria-hidden="true">“</span>
          <blockquote key={index} className="editorial-heading">{item.quote[locale]}</blockquote>
          <div className="testimonial-meta"><cite>{item.name}</cite><span>{index + 1} / {testimonials.length}</span><CarouselControls previous={previous} next={next} label={locale === 'es' ? 'Navegar testimonios' : 'Navigate testimonials'} /></div>
        </SwipeArea>
      </div>
    </section>
  )
}

export function GalleryLightbox({ items, initial, onClose }: { items: GalleryAsset[]; initial: number; onClose: () => void }) {
  const { locale } = useLanguage()
  const [index, setIndex] = useState(initial)
  const next = () => setIndex((value) => (value + 1) % items.length)
  const previous = () => setIndex((value) => (value - 1 + items.length) % items.length)
  const item = items[index]

  useEffect(() => {
    const key = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowRight') setIndex((value) => (value + 1) % items.length)
      if (event.key === 'ArrowLeft') setIndex((value) => (value - 1 + items.length) % items.length)
    }
    document.body.classList.add('lightbox-open')
    document.addEventListener('keydown', key)
    return () => { document.body.classList.remove('lightbox-open'); document.removeEventListener('keydown', key) }
  }, [items.length, onClose])

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={locale === 'es' ? 'Galería ampliada' : 'Expanded gallery'}>
      <button className="lightbox-close" type="button" onClick={onClose} autoFocus aria-label={locale === 'es' ? 'Cerrar' : 'Close'}><X /></button>
      <SwipeArea className="lightbox-content" onPrevious={previous} onNext={next}>
        <ResponsiveImage src={item.src} alt={item.alt[locale]} />
        <div><p>{item.caption[locale]}</p><span>{index + 1} / {items.length}</span></div>
      </SwipeArea>
      <CarouselControls previous={previous} next={next} label={locale === 'es' ? 'Navegar galería' : 'Navigate gallery'} />
    </div>
  )
}
