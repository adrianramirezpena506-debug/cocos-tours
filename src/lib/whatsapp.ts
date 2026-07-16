import { site } from '../data/site'
import type { InquiryDraft, Locale } from '../types/content'

const line = (label: string, value?: string | number) => (value === undefined || value === '' ? null : `${label}: ${value}`)

export const buildWhatsAppUrl = (draft: InquiryDraft, locale: Locale): string => {
  const es = locale === 'es'
  const lines = [
    es ? "Hola, Coco's Tours. Quisiera solicitar información para planear una experiencia." : "Hello, Coco's Tours. I would like to request information to plan an experience.",
    '',
    line(es ? 'Nombre' : 'Name', draft.name),
    line('Email', draft.email),
    line('WhatsApp', draft.whatsapp),
    line(es ? 'País' : 'Country', draft.country),
    line(es ? 'Experiencia' : 'Experience', draft.tour),
    line(es ? 'Fecha preferida' : 'Preferred date', draft.date),
    line(es ? 'Adultos' : 'Adults', draft.adults),
    line(es ? 'Niños' : 'Children', draft.children),
    line(es ? 'Horario' : 'Time', draft.time),
    line(es ? 'Mensaje' : 'Message', draft.message),
    '',
    es ? 'Entiendo que esta es una solicitud y no una reserva confirmada.' : 'I understand this is a request, not a confirmed booking.',
  ].filter((value): value is string => value !== null)

  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(lines.join('\n'))}`
}
