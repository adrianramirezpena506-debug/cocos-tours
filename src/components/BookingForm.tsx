import { useMemo, useState, type FormEvent } from 'react'
import { CalendarDays, Minus, Plus } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import { useLanguage } from '../i18n'
import { buildWhatsAppUrl } from '../lib/whatsapp'
import { todayInCostaRica } from '../lib/format'
import type { Tour } from '../types/content'

function Counter({ label, value, setValue, min = 0 }: { label: string; value: number; setValue: (value: number) => void; min?: number }) {
  return (
    <div className="counter-field">
      <span>{label}</span>
      <div className="counter-control">
        <button type="button" onClick={() => setValue(Math.max(min, value - 1))} aria-label={`${label}: menos`}><Minus size={16} /></button>
        <output aria-live="polite">{value}</output>
        <button type="button" onClick={() => setValue(value + 1)} aria-label={`${label}: más`}><Plus size={16} /></button>
      </div>
    </div>
  )
}

export function BookingForm({ tour, compact = false }: { tour?: Tour; compact?: boolean }) {
  const { locale } = useLanguage()
  const [params] = useSearchParams()
  const [date, setDate] = useState(params.get('date') ?? '')
  const [adults, setAdults] = useState(Number(params.get('adults') ?? Math.max(1, tour?.minimumGuests ?? 1)))
  const [children, setChildren] = useState(Number(params.get('children') ?? 0))
  const [time, setTime] = useState(params.get('time') ?? tour?.schedules[0]?.value ?? '')
  const [error, setError] = useState('')
  const es = locale === 'es'

  const url = useMemo(() => buildWhatsAppUrl({
    tour: tour?.name[locale], date, adults, children, time: tour?.schedules.find((schedule) => schedule.value === time)?.label[locale] ?? time,
  }, locale), [adults, children, date, locale, time, tour])

  const submit = (event: FormEvent) => {
    event.preventDefault()
    if (!date) return setError(es ? 'Seleccione una fecha preferida.' : 'Choose a preferred date.')
    if (tour?.minimumGuests && adults + children < tour.minimumGuests) return setError(es ? `Esta experiencia requiere un mínimo de ${tour.minimumGuests} personas.` : `This experience requires at least ${tour.minimumGuests} guests.`)
    setError('')
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <form className={`booking-form ${compact ? 'booking-form-compact' : ''}`} onSubmit={submit} noValidate>
      <label className="date-field">
        <span>{es ? 'Fecha preferida' : 'Preferred date'}</span>
        <span className="date-input-wrap"><CalendarDays size={18} aria-hidden="true" /><input type="date" min={todayInCostaRica()} value={date} onChange={(event) => setDate(event.target.value)} required /></span>
      </label>
      <Counter label={es ? 'Adultos' : 'Adults'} value={adults} setValue={setAdults} min={1} />
      <Counter label={es ? 'Niños' : 'Children'} value={children} setValue={setChildren} />
      {tour && tour.schedules.length > 1 && (
        <label>
          <span>{es ? 'Horario' : 'Time'}</span>
          <select value={time} onChange={(event) => setTime(event.target.value)}>
            {tour.schedules.map((schedule) => <option key={schedule.value ?? schedule.label.en} value={schedule.value}>{schedule.label[locale]}</option>)}
          </select>
        </label>
      )}
      {error && <p className="form-error" role="alert">{error}</p>}
      <button className="button button-coral booking-submit" type="submit">{es ? 'Solicitar reserva' : 'Request booking'} <span aria-hidden="true">↗</span></button>
      <p className="form-note">{es ? 'Solicitud sin compromiso. La reserva se confirma directamente con el equipo.' : 'No-obligation request. The team confirms every booking directly.'}</p>
    </form>
  )
}
