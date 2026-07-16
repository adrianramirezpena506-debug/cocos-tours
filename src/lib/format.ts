import type { Locale, TourPrice } from '../types/content'

export const formatCRC = (amount: number): string => `₡${Math.round(amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`

export const formatPrice = (price: TourPrice, locale: Locale): string => {
  if (price.onRequest || price.amount === null) return locale === 'es' ? 'Cotización personalizada' : 'Custom quote'
  return `${locale === 'es' ? 'desde ' : 'from '}${formatCRC(price.amount)}`
}

export const readingTime = (paragraphs: string[]): number => {
  const words = paragraphs.join(' ').trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(words / 210))
}

export const todayInCostaRica = (): string =>
  new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Costa_Rica',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date())
