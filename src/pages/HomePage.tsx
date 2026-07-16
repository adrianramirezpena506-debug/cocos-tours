import { useEffect, useRef, useState, type FormEvent } from 'react'
import { Anchor, ArrowDown, ArrowRight, Binoculars, Compass, HeartHandshake, History, Leaf, ShieldCheck, Sparkles, UsersRound } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { blogPosts } from '../data/blog'
import { gallery } from '../data/gallery'
import { site } from '../data/site'
import { tours } from '../data/tours'
import { useLanguage } from '../i18n'
import { readingTime, todayInCostaRica } from '../lib/format'
import { ResponsiveImage } from '../components/ResponsiveImage'
import { SectionHeading, Testimonials, TourCard } from '../components/ContentComponents'
import { ArrowLink, useSitePath } from '../components/SiteChrome'
import { Seo } from '../components/Seo'

function HeroSearch() {
  const { locale } = useLanguage()
  const path = useSitePath()
  const navigate = useNavigate()
  const [tour, setTour] = useState(tours[0].slug)
  const [date, setDate] = useState('')
  const [adults, setAdults] = useState(2)
  const [children, setChildren] = useState(0)
  const [error, setError] = useState('')
  const es = locale === 'es'

  const submit = (event: FormEvent) => {
    event.preventDefault()
    if (!date) return setError(es ? 'Seleccione una fecha.' : 'Choose a date.')
    setError('')
    navigate(`${path('experiences')}/${tour}?date=${date}&adults=${adults}&children=${children}`)
  }

  return (
    <form className="hero-search" onSubmit={submit}>
      <label><span>{es ? 'Experiencia' : 'Experience'}</span><select value={tour} onChange={(event) => setTour(event.target.value)}>{tours.map((item) => <option key={item.id} value={item.slug}>{item.name[locale]}</option>)}</select></label>
      <label><span>{es ? 'Fecha' : 'Date'}</span><input type="date" min={todayInCostaRica()} value={date} onChange={(event) => setDate(event.target.value)} /></label>
      <label><span>{es ? 'Adultos' : 'Adults'}</span><input type="number" min="1" value={adults} onChange={(event) => setAdults(Math.max(1, Number(event.target.value)))} /></label>
      <label><span>{es ? 'Niños' : 'Children'}</span><input type="number" min="0" value={children} onChange={(event) => setChildren(Math.max(0, Number(event.target.value)))} /></label>
      <button type="submit">{es ? 'Buscar' : 'Search'} <ArrowRight size={18} /></button>
      {error && <p className="hero-search-error" role="alert">{error}</p>}
    </form>
  )
}

export function HomePage() {
  const { locale } = useLanguage()
  const path = useSitePath()
  const video = useRef<HTMLVideoElement>(null)
  const es = locale === 'es'
  const latest = blogPosts.slice(0, 3)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) video.current?.pause()
  }, [])

  const meta = {
    title: es ? "Coco's Tours | Tours en Isla Tortuga, Golfo de Nicoya y Puntarenas" : "Coco's Tours | Tortuga Island, Gulf of Nicoya & Puntarenas Tours",
    description: es ? 'Descubra Isla Tortuga, Isla San Lucas, bioluminiscencia, pesca deportiva y tours privados en el Golfo de Nicoya con Coco’s Tours, Puntarenas.' : 'Discover Tortuga Island, San Lucas Island, bioluminescence, sport fishing and private Gulf of Nicoya tours with Coco’s Tours in Puntarenas.',
    canonicalPath: `/${locale}`,
    image: '/assets/tours/isla-tortuga.jpg',
    jsonLd: {
      '@context': 'https://schema.org', '@type': ['LocalBusiness', 'TouristInformationCenter'], name: site.name,
      url: `https://cocostours.cr/${locale}`, telephone: site.phoneHref, email: site.email,
      address: { '@type': 'PostalAddress', streetAddress: '200 metros oeste del muelle del ferry, Barrio El Carmen', addressLocality: 'Puntarenas', addressCountry: 'CR' },
      sameAs: [site.facebook, site.instagram, site.tripadvisor],
    },
  }

  return (
    <>
      <Seo meta={meta} locale={locale} />
      <section className="hero">
        <video ref={video} className="hero-media" autoPlay muted loop playsInline poster="/assets/tours/isla-tortuga.jpg" aria-hidden="true"><source src="/assets/hero/gulf-navigation.mp4" type="video/mp4" /></video>
        <div className="hero-overlay" />
        <div className="container hero-content">
          <span className="hero-eyebrow">{es ? 'TOURS LOCALES · GOLFO DE NICOYA' : 'LOCAL TOURS · GULF OF NICOYA'}</span>
          <h1 className="editorial-heading">{es ? <>Conectamos<br /><em>almas</em> con el mar.</> : <>We connect<br /><em>souls</em> with the sea.</>}</h1>
          <p>{es ? 'Experiencias auténticas entre islas, cultura, naturaleza y tradición, guiadas por personas que conocen profundamente el Golfo de Nicoya.' : 'Authentic experiences among islands, culture, nature and tradition, guided by people who know the Gulf of Nicoya deeply.'}</p>
          <div className="hero-actions"><Link className="button button-coral" to={path('experiences')}>{es ? 'Explorar experiencias' : 'Explore experiences'} <ArrowRight /></Link><a className="text-button" href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noreferrer">{es ? 'Hablar por WhatsApp' : 'Talk on WhatsApp'}</a></div>
          <div className="hero-trust"><span />{es ? 'Turismo local, consciente y responsable desde Puntarenas.' : 'Local, conscious and responsible tourism from Puntarenas.'}</div>
        </div>
        <a className="scroll-cue" href="#booking" aria-label={es ? 'Ir al buscador' : 'Go to search'}><ArrowDown /></a>
        <div className="container hero-search-wrap" id="booking"><HeroSearch /></div>
      </section>

      <section className="intro-section section-pad">
        <div className="container intro-grid">
          <div><span className="eyebrow">{es ? 'UNA COSTA VIVA' : 'A LIVING COAST'}</span><h2 className="editorial-heading">{es ? <>El Golfo de Nicoya<br />no se visita. <em>Se vive.</em></> : <>The Gulf of Nicoya<br />is not visited. <em>It is lived.</em></>}</h2></div>
          <div className="intro-copy"><p>{es ? 'El mar ha sido camino, sustento y memoria para las familias de Puntarenas. Cada salida es una oportunidad de mirar el Golfo desde quienes lo conocen y lo cuidan.' : 'The sea has been a route, livelihood and memory for Puntarenas families. Every departure is an opportunity to see the Gulf through those who know and care for it.'}</p><ArrowLink to={path('about')}>{es ? 'Conocer nuestra historia' : 'Discover our story'}</ArrowLink></div>
          <div className="route-line" aria-hidden="true"><span /><i /><i /><i /></div>
        </div>
      </section>

      <section className="featured-section section-pad" id="experiences">
        <div className="container">
          <SectionHeading eyebrow={es ? 'EXPERIENCIAS DESTACADAS' : 'FEATURED EXPERIENCES'} title={es ? 'Experiencias que dejan huella' : 'Experiences that stay with you'} copy={es ? 'Viajes hechos a escala humana, entre la historia de las islas y el movimiento del Pacífico.' : 'Human-scale journeys between island history and the movement of the Pacific.'} />
          <div className="featured-grid"><TourCard tour={tours[0]} large />{tours.slice(1, 3).map((tour) => <TourCard key={tour.id} tour={tour} />)}</div>
          <div className="section-action"><ArrowLink to={path('experiences')}>{es ? 'Ver las nueve experiencias' : 'View all nine experiences'}</ArrowLink></div>
        </div>
      </section>

      <section className="bio-feature section-pad">
        <div className="bio-particles" aria-hidden="true" />
        <div className="container bio-grid">
          <div className="bio-image"><ResponsiveImage src="/assets/tours/bioluminescence.jpg" alt={tours[2].media.alt[locale]} loading="lazy" /></div>
          <div><span className="eyebrow">{es ? 'BIOLUMINISCENCIA · LUNA NUEVA' : 'BIOLUMINESCENCE · NEW MOON'}</span><h2 className="editorial-heading">{es ? <>Cuando cae la noche,<br /><em>el mar comienza a brillar.</em></> : <>When night falls,<br /><em>the sea begins to glow.</em></>}</h2><p>{es ? 'Un fenómeno natural que vuelve visible cada movimiento del agua. La experiencia se realiza durante la luna nueva, cuando las condiciones favorecen su observación.' : 'A natural phenomenon that makes every movement in the water visible. The experience runs around the new moon, when conditions best support viewing.'}</p><Link className="button button-aqua" to={`${path('experiences')}/tour-bioluminiscencia`}>{es ? 'Descubrir bioluminiscencia' : 'Discover bioluminescence'} <Sparkles /></Link></div>
        </div>
      </section>

      <section className="tortuga-feature section-pad">
        <div className="container tortuga-grid">
          <div><span className="eyebrow">ISLA TORTUGA</span><h2 className="editorial-heading">{es ? 'Un día entre aguas cristalinas y naturaleza.' : 'A day among clear waters and nature.'}</h2><p>{es ? 'Navegación, snorkel, almuerzo frente al mar y tiempo para disfrutar la playa. Durante la ruta existe la posibilidad de observar fauna marina.' : 'Sailing, snorkelling, lunch by the sea and time to enjoy the beach. Marine wildlife may be observed along the route.'}</p><ul className="feature-list"><li><Binoculars />{es ? 'Posible observación de fauna' : 'Possible wildlife sightings'}</li><li><Compass />Snorkeling</li><li><HeartHandshake />{es ? 'Atención personalizada' : 'Personal attention'}</li></ul><ArrowLink to={`${path('experiences')}/isla-tortuga`}>{es ? 'Ver experiencia' : 'View experience'}</ArrowLink></div>
          <div className="tortuga-image"><ResponsiveImage src="/assets/tours/isla-tortuga.jpg" alt={tours[0].media.alt[locale]} loading="lazy" /></div>
        </div>
      </section>

      <section className="heritage-feature section-pad">
        <div className="container heritage-grid">
          <div className="heritage-image"><ResponsiveImage src="/assets/gallery/san-lucas-history.jpg" alt={es ? 'Vestigios de la antigua penitenciaría de Isla San Lucas' : 'Remains of the former San Lucas Island penitentiary'} loading="lazy" /></div>
          <div><span className="eyebrow">PARQUE NACIONAL ISLA SAN LUCAS</span><h2 className="editorial-heading">{es ? 'Una isla donde la historia vuelve a respirar.' : 'An island where history breathes again.'}</h2><p>{es ? 'Los antiguos pabellones y senderos cuentan una historia compleja, hoy abrazada por la biodiversidad del Golfo.' : 'Former prison buildings and trails tell a complex story, now embraced by the Gulf’s biodiversity.'}</p><div className="heritage-facts"><span><History />{es ? 'Memoria histórica' : 'Historical memory'}</span><span><Leaf />{es ? 'Senderos y naturaleza' : 'Trails and nature'}</span><span><Anchor />{es ? 'Navegación desde Puntarenas' : 'Sailing from Puntarenas'}</span></div><ArrowLink to={`${path('experiences')}/isla-san-lucas`}>{es ? 'Explorar Isla San Lucas' : 'Explore San Lucas Island'}</ArrowLink></div>
        </div>
      </section>

      <section className="why-section section-pad">
        <div className="container"><SectionHeading eyebrow={es ? 'POR QUÉ COCO’S TOURS' : 'WHY COCO’S TOURS'} title={es ? 'Conocimiento local. Atención humana.' : 'Local knowledge. Human attention.'} />
          <div className="why-grid">{[
            [UsersRound, es ? 'Atención personalizada' : 'Personal attention', es ? 'Cada experiencia se coordina directamente con el equipo.' : 'Every experience is coordinated directly with the team.'],
            [Anchor, es ? 'Conexión con el Golfo' : 'Connection to the Gulf', es ? 'Una relación familiar y ancestral con el mar y la pesca.' : 'A family and ancestral relationship with the sea and fishing.'],
            [Leaf, es ? 'Turismo consciente' : 'Conscious tourism', es ? 'Respeto ambiental, apoyo local y preservación de tradiciones.' : 'Environmental respect, local support and preserved traditions.'],
            [ShieldCheck, es ? 'Seguridad publicada' : 'Published safety practices', es ? 'Permisos, póliza, equipos y personal certificado según cada tour.' : 'Permits, policy, equipment and certified staff as published per tour.'],
          ].map(([Icon, title, copy], index) => <article key={String(title)}><span>0{index + 1}</span><Icon /><h3>{String(title)}</h3><p>{String(copy)}</p></article>)}</div>
        </div>
      </section>

      <Testimonials />

      <section className="sustainability-section section-pad">
        <div className="container sustainability-grid">
          <div><span className="eyebrow">{es ? 'TURISMO CONSCIENTE' : 'CONSCIOUS TOURISM'}</span><h2 className="editorial-heading">{es ? 'Viajar también puede cuidar.' : 'Travel can care, too.'}</h2><p>{es ? 'El respeto ambiental se vuelve real cuando se conecta con empleo comunitario, pesca responsable, productores locales y tradiciones vivas.' : 'Environmental respect becomes real when it connects with community employment, responsible fishing, local producers and living traditions.'}</p></div>
          <div className="sustainability-list">{[
            es ? 'Conservación y respeto por la fauna' : 'Conservation and respect for wildlife',
            es ? 'Apoyo a productores locales' : 'Support for local producers',
            es ? 'Pesca responsable' : 'Responsible fishing',
            es ? 'Preservación de tradiciones' : 'Preservation of traditions',
          ].map((item, index) => <div key={item}><span>0{index + 1}</span><p>{item}</p><Leaf /></div>)}</div>
        </div>
      </section>

      <section className="home-gallery">
        <div className="gallery-strip">{gallery.slice(0, 5).map((item) => <ResponsiveImage key={item.id} src={item.src} alt={item.alt[locale]} loading="lazy" />)}</div>
        <div className="gallery-overlay-card"><span className="eyebrow">{es ? 'MOMENTOS DEL GOLFO' : 'MOMENTS FROM THE GULF'}</span><h2 className="editorial-heading">{es ? 'Historias contadas por el mar.' : 'Stories told by the sea.'}</h2><ArrowLink to={path('gallery')}>{es ? 'Explorar galería' : 'Explore gallery'}</ArrowLink></div>
      </section>

      <section className="journal-preview section-pad"><div className="container"><SectionHeading eyebrow={es ? 'DIARIO DE VIAJE' : 'TRAVEL JOURNAL'} title={es ? 'Historias del Golfo' : 'Stories from the Gulf'} />
        <div className="journal-grid">{latest.map((post) => <article key={post.slug}><Link to={`${path('journal')}/${post.slug}`}><ResponsiveImage src={post.image} alt={post.imageAlt[locale]} loading="lazy" /></Link><div><span>{post.category[locale]} · {readingTime(post.body[locale])} min</span><h3 className="editorial-heading"><Link to={`${path('journal')}/${post.slug}`}>{post.title[locale]}</Link></h3><ArrowLink to={`${path('journal')}/${post.slug}`}>{es ? 'Leer historia' : 'Read story'}</ArrowLink></div></article>)}</div>
        <div className="section-action"><ArrowLink to={path('journal')}>{es ? 'Ver todas las historias' : 'View all stories'}</ArrowLink></div>
      </div></section>

      <section className="final-cta"><div className="container"><span className="eyebrow">{es ? 'SU PRÓXIMA HISTORIA' : 'YOUR NEXT STORY'}</span><h2 className="editorial-heading">{es ? <>El Golfo está listo.<br /><em>¿Navegamos?</em></> : <>The Gulf is ready.<br /><em>Shall we sail?</em></>}</h2><div><Link className="button button-coral" to={path('experiences')}>{es ? 'Planear mi experiencia' : 'Plan my experience'} <ArrowRight /></Link><a href={`tel:${site.phoneHref}`}>{site.phoneDisplay}</a></div></div></section>
    </>
  )
}
