import { describe, expect, it } from 'vitest'
import { blogPosts } from '../data/blog'
import { tours } from '../data/tours'
import { formatCRC, formatPrice, readingTime } from '../lib/format'
import { buildWhatsAppUrl } from '../lib/whatsapp'

describe('verified content inventory', () => {
  it('preserves all nine tours with unique slugs', () => {
    expect(tours).toHaveLength(9)
    expect(new Set(tours.map((tour) => tour.slug)).size).toBe(9)
  })

  it('preserves all fifteen journal articles in both languages', () => {
    expect(blogPosts).toHaveLength(15)
    for (const post of blogPosts) {
      expect(post.title.es).toBeTruthy()
      expect(post.title.en).toBeTruthy()
      expect(post.body.es.length).toBeGreaterThan(1)
      expect(post.body.en.length).toBeGreaterThan(1)
    }
  })
})

describe('public formatting and inquiry contracts', () => {
  it('formats Costa Rican colones exactly', () => {
    expect(formatCRC(30000)).toBe('₡30.000')
    expect(formatCRC(50000)).toBe('₡50.000')
    expect(formatPrice({ amount: null, currency: 'CRC', onRequest: true }, 'en')).toBe('Custom quote')
  })

  it('creates a structured WhatsApp request without claiming confirmation', () => {
    const url = buildWhatsAppUrl({ tour: 'Tour Isla Tortuga', date: '2026-08-01', adults: 2, children: 1 }, 'es')
    const decoded = decodeURIComponent(url)
    expect(url).toContain('https://wa.me/50688769354')
    expect(decoded).toContain('Experiencia: Tour Isla Tortuga')
    expect(decoded).toContain('no una reserva confirmada')
  })

  it('calculates a non-zero reading time', () => {
    expect(readingTime(['Una historia breve del Golfo.'])).toBe(1)
  })
})
