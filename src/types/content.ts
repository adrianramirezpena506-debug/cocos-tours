export type Locale = 'es' | 'en'

export type Localized<T = string> = Record<Locale, T>

export type TourCategory =
  | 'islands'
  | 'heritage'
  | 'marine'
  | 'bioluminescence'
  | 'fishing'
  | 'private'

export interface TourPrice {
  amount: number | null
  currency: 'CRC'
  onRequest?: boolean
  note?: Localized
}

export interface TourSchedule {
  label: Localized
  duration: Localized
  timeOfDay: 'morning' | 'afternoon' | 'full-day' | 'night'
  value?: string
}

export interface TourMedia {
  src: string
  alt: Localized
  position?: string
}

export interface Tour {
  id: string
  slug: string
  name: Localized
  eyebrow: Localized
  summary: Localized
  description: Localized<string[]>
  location: Localized
  availability: Localized
  minimumAge?: Localized
  minimumGuests?: number
  price: TourPrice
  schedules: TourSchedule[]
  categories: TourCategory[]
  includes: Localized<string[]>
  bring: Localized<string[]>
  considerations: Localized<string[]>
  highlights: Localized<string[]>
  safety: Localized<string[]>
  faqs: { question: Localized; answer: Localized }[]
  media: TourMedia
  featured?: boolean
}

export interface BlogPost {
  slug: string
  title: Localized
  excerpt: Localized
  body: Localized<string[]>
  category: Localized
  date: string
  image: string
  imageAlt: Localized
}

export interface GalleryAsset {
  id: string
  src: string
  category: TourCategory | 'people' | 'culture'
  caption: Localized
  alt: Localized
}

export interface Testimonial {
  name: string
  quote: Localized
  sourceUrl: string
}

export interface SeoMeta {
  title: string
  description: string
  canonicalPath: string
  image?: string
  jsonLd?: Record<string, unknown> | Record<string, unknown>[]
}

export interface InquiryDraft {
  name?: string
  email?: string
  whatsapp?: string
  country?: string
  preferredLanguage?: Locale
  tour?: string
  date?: string
  adults: number
  children: number
  time?: string
  message?: string
}
