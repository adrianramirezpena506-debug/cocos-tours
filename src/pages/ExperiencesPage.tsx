import { Filter, Search, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { tours } from '../data/tours'
import { useLanguage } from '../i18n'
import type { TourCategory } from '../types/content'
import { TourCard } from '../components/ContentComponents'
import { Seo } from '../components/Seo'

const categoryOptions: { value: TourCategory; es: string; en: string }[] = [
  { value: 'islands', es: 'Islas y playas', en: 'Islands & beaches' },
  { value: 'heritage', es: 'Cultura e historia', en: 'Culture & history' },
  { value: 'marine', es: 'Vida marina', en: 'Marine life' },
  { value: 'bioluminescence', es: 'Bioluminiscencia', en: 'Bioluminescence' },
  { value: 'fishing', es: 'Pesca', en: 'Fishing' },
  { value: 'private', es: 'Tours privados', en: 'Private tours' },
]

export function ExperiencesPage() {
  const { locale } = useLanguage()
  const [params, setParams] = useSearchParams()
  const [query, setQuery] = useState(params.get('q') ?? '')
  const category = params.get('category') as TourCategory | null
  const time = params.get('time')
  const es = locale === 'es'

  const filtered = useMemo(() => tours.filter((tour) => {
    const matchesCategory = !category || tour.categories.includes(category)
    const matchesTime = !time || tour.schedules.some((schedule) => schedule.timeOfDay === time)
    const haystack = `${tour.name[locale]} ${tour.summary[locale]} ${tour.location[locale]}`.toLowerCase()
    return matchesCategory && matchesTime && haystack.includes(query.toLowerCase())
  }), [category, locale, query, time])

  const change = (key: string, value?: string) => {
    const next = new URLSearchParams(params)
    if (value) next.set(key, value); else next.delete(key)
    setParams(next)
  }

  return (
    <>
      <Seo locale={locale} meta={{ title: es ? "Experiencias | Coco's Tours" : "Experiences | Coco's Tours", description: es ? 'Compare tours a Isla Tortuga, Isla San Lucas, bioluminiscencia, pesca y experiencias privadas.' : 'Compare Tortuga Island, San Lucas Island, bioluminescence, fishing and private tours.', canonicalPath: `/${locale}/${es ? 'experiencias' : 'experiences'}` }} />
      <section className="page-hero experiences-hero"><div className="container"><span className="eyebrow">{es ? 'NUEVE FORMAS DE VIVIR EL GOLFO' : 'NINE WAYS TO EXPERIENCE THE GULF'}</span><h1 className="editorial-heading">{es ? 'Elija su próxima historia.' : 'Choose your next story.'}</h1><p>{es ? 'Compare destinos, horarios y formas de acercarse al mar sin prisas ni promesas artificiales.' : 'Compare destinations, schedules and ways to approach the sea without rush or artificial promises.'}</p></div></section>
      <section className="experiences-browser section-pad" id="discover"><div className="container">
        <div className="filter-toolbar">
          <label className="search-box"><Search /><span className="sr-only">{es ? 'Buscar tours' : 'Search tours'}</span><input value={query} onChange={(event) => { setQuery(event.target.value); change('q', event.target.value || undefined) }} placeholder={es ? 'Buscar por isla, actividad o lugar' : 'Search by island, activity or place'} /></label>
          <div className="filter-label"><Filter /> {es ? 'Filtrar' : 'Filter'}</div>
        </div>
        <div className="filter-chips" aria-label={es ? 'Categorías' : 'Categories'}><button className={!category ? 'active' : ''} onClick={() => change('category')} type="button">{es ? 'Todas' : 'All'}</button>{categoryOptions.map((option) => <button className={category === option.value ? 'active' : ''} key={option.value} type="button" onClick={() => change('category', option.value)}>{option[locale]}</button>)}</div>
        <div className="secondary-filters"><span>{es ? 'Horario:' : 'Time:'}</span>{[
          ['', es ? 'Cualquiera' : 'Any'], ['morning', es ? 'Mañana' : 'Morning'], ['afternoon', es ? 'Tarde' : 'Afternoon'], ['full-day', es ? 'Día completo' : 'Full day'], ['night', es ? 'Nocturno' : 'Night'],
        ].map(([value, label]) => <button className={(time ?? '') === value ? 'active' : ''} key={value} type="button" onClick={() => change('time', value || undefined)}>{label}</button>)}
        {(category || time || query) && <button className="clear-filters" type="button" onClick={() => { setQuery(''); setParams({}) }}><X size={15} /> {es ? 'Limpiar' : 'Clear'}</button>}</div>
        <div className="results-heading"><p>{filtered.length} {es ? 'experiencias' : 'experiences'}</p></div>
        {filtered.length ? <div className="all-tours-grid">{filtered.map((tour) => <TourCard key={tour.id} tour={tour} />)}</div> : <div className="empty-state"><h2 className="editorial-heading">{es ? 'No encontramos una experiencia con esos filtros.' : 'We could not find an experience with those filters.'}</h2><button type="button" onClick={() => { setQuery(''); setParams({}) }}>{es ? 'Ver todos los tours' : 'View all tours'}</button></div>}
      </div></section>
    </>
  )
}
