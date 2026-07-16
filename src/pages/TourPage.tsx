import { Check, Clock, Compass, MapPin, MessageCircle, ShieldCheck, Sparkles, X } from 'lucide-react'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { tours, tourBySlug } from '../data/tours'
import { site } from '../data/site'
import { useLanguage } from '../i18n'
import { formatPrice } from '../lib/format'
import { BookingForm } from '../components/BookingForm'
import { ResponsiveImage } from '../components/ResponsiveImage'
import { TourCard } from '../components/ContentComponents'
import { Seo } from '../components/Seo'
import { useSitePath } from '../components/SiteChrome'
import { NotFoundPage } from './UtilityPages'

export function TourPage() {
  const { slug } = useParams()
  const { locale } = useLanguage()
  const path = useSitePath()
  const [sheet, setSheet] = useState(false)
  const tour = tourBySlug(slug)
  const es = locale === 'es'

  if (!tour) return <NotFoundPage />
  const similar = tours.filter((item) => item.id !== tour.id && item.categories.some((category) => tour.categories.includes(category))).slice(0, 3)
  const canonicalPath = `${path('experiences')}/${tour.slug}`
  const meta = {
    title: `${tour.name[locale]} | Coco's Tours`,
    description: tour.summary[locale],
    canonicalPath,
    image: tour.media.src,
    jsonLd: [
      { '@context': 'https://schema.org', '@type': 'TouristTrip', name: tour.name[locale], description: tour.summary[locale], touristType: tour.categories, itinerary: tour.location[locale], offers: tour.price.amount ? { '@type': 'Offer', priceCurrency: 'CRC', price: tour.price.amount, url: `https://cocostours.cr${canonicalPath}` } : undefined },
      { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: es ? 'Inicio' : 'Home', item: `https://cocostours.cr/${locale}` }, { '@type': 'ListItem', position: 2, name: es ? 'Experiencias' : 'Experiences', item: `https://cocostours.cr${path('experiences')}` }, { '@type': 'ListItem', position: 3, name: tour.name[locale], item: `https://cocostours.cr${canonicalPath}` }] },
      { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: tour.faqs.map((faq) => ({ '@type': 'Question', name: faq.question[locale], acceptedAnswer: { '@type': 'Answer', text: faq.answer[locale] } })) },
    ],
  }

  return (
    <>
      <Seo meta={meta} locale={locale} />
      <section className="tour-hero">
        <ResponsiveImage src={tour.media.src} alt={tour.media.alt[locale]} fetchPriority="high" style={{ objectPosition: tour.media.position }} />
        <div className="tour-hero-overlay" />
        <div className="container tour-hero-content"><Link to={path('experiences')}>{es ? 'Experiencias' : 'Experiences'}</Link><span>/</span><span>{tour.eyebrow[locale]}</span><h1 className="editorial-heading">{tour.name[locale]}</h1><p>{tour.summary[locale]}</p></div>
      </section>
      <section className="tour-facts"><div className="container tour-facts-grid"><div><span>{es ? 'Desde' : 'From'}</span><strong>{formatPrice(tour.price, locale).replace(es ? 'desde ' : 'from ', '')}</strong></div><div><Clock /><span>{es ? 'Duración' : 'Duration'}</span><strong>{tour.schedules[0].duration[locale]}</strong></div><div><MapPin /><span>{es ? 'Lugar' : 'Location'}</span><strong>{tour.location[locale].split(',')[0]}</strong></div><div><Compass /><span>{es ? 'Disponibilidad' : 'Availability'}</span><strong>{tour.availability[locale]}</strong></div></div></section>
      <section className="tour-content section-pad"><div className="container tour-layout">
        <div className="tour-main">
          <div className="tour-intro"><span className="eyebrow">{es ? 'LA EXPERIENCIA' : 'THE EXPERIENCE'}</span><h2 className="editorial-heading">{tour.summary[locale]}</h2>{tour.description[locale].map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
          <div className="highlights-grid">{tour.highlights[locale].map((item) => <div key={item}><Sparkles /><span>{item}</span></div>)}</div>
          <section className="detail-section"><h2 className="editorial-heading">{es ? 'Horario y recorrido' : 'Schedule and journey'}</h2><div className="schedule-list">{tour.schedules.map((schedule, index) => <div key={schedule.label.en}><span>0{index + 1}</span><div><strong>{schedule.label[locale]}</strong><p>{schedule.duration[locale]}</p></div></div>)}</div></section>
          <section className="detail-section two-column-lists"><div><h2 className="editorial-heading">{es ? 'Qué incluye' : 'What is included'}</h2><ul>{tour.includes[locale].map((item) => <li key={item}><Check />{item}</li>)}</ul></div><div><h2 className="editorial-heading">{es ? 'Qué llevar' : 'What to bring'}</h2><ul>{tour.bring[locale].map((item) => <li key={item}><Check />{item}</li>)}</ul></div></section>
          <section className="safety-panel"><div><ShieldCheck /></div><div><span className="eyebrow">{es ? 'SEGURIDAD Y CONFIANZA' : 'SAFETY & TRUST'}</span><h2 className="editorial-heading">{es ? 'Información publicada para esta experiencia' : 'Information published for this experience'}</h2><ul>{tour.safety[locale].map((item) => <li key={item}>{item}</li>)}</ul></div></section>
          <section className="detail-section"><h2 className="editorial-heading">{es ? 'Consideraciones importantes' : 'Important considerations'}</h2><div className="considerations">{tour.considerations[locale].map((item, index) => <div key={item}><span>{String(index + 1).padStart(2, '0')}</span><p>{item}</p></div>)}</div>{tour.price.note && <p className="price-note">{tour.price.note[locale]}</p>}</section>
          <section className="detail-section faq-list"><h2 className="editorial-heading">{es ? 'Preguntas frecuentes' : 'Frequently asked questions'}</h2>{tour.faqs.map((faq) => <details key={faq.question.en}><summary>{faq.question[locale]}<span>+</span></summary><p>{faq.answer[locale]}</p></details>)}</section>
        </div>
        <aside className="booking-aside"><div className="booking-card"><span>{es ? 'Desde' : 'From'}</span><strong className="editorial-heading">{formatPrice(tour.price, locale).replace(es ? 'desde ' : 'from ', '')}</strong><p>{tour.price.note?.[locale] ?? (es ? 'Confirme el precio final con el equipo.' : 'Confirm the final price with the team.')}</p><BookingForm tour={tour} /><a className="booking-whatsapp" href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noreferrer"><MessageCircle /> {es ? 'Prefiero preguntar primero' : 'I would rather ask first'}</a></div></aside>
      </div></section>
      <section className="similar-section section-pad"><div className="container"><h2 className="editorial-heading">{es ? 'Experiencias que también podrían inspirarle' : 'Experiences that may also inspire you'}</h2><div className="all-tours-grid">{similar.map((item) => <TourCard key={item.id} tour={item} />)}</div></div></section>
      <div className="mobile-booking-bar"><div><span>{es ? 'Desde' : 'From'}</span><strong>{formatPrice(tour.price, locale).replace(es ? 'desde ' : 'from ', '')}</strong></div><button type="button" onClick={() => setSheet(true)}>{es ? 'Solicitar reserva' : 'Request booking'}</button></div>
      {sheet && <div className="booking-sheet" role="dialog" aria-modal="true" aria-label={es ? 'Solicitar reserva' : 'Request booking'}><button className="sheet-close" type="button" onClick={() => setSheet(false)} autoFocus aria-label={es ? 'Cerrar' : 'Close'}><X /></button><h2 className="editorial-heading">{tour.name[locale]}</h2><BookingForm tour={tour} /></div>}
    </>
  )
}
