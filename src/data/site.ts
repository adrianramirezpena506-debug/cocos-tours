import type { Localized, Testimonial } from '../types/content'

export const site = {
  name: "Coco's Tours",
  phoneDisplay: '+506 8876-9354',
  phoneHref: '+50688769354',
  whatsapp: '50688769354',
  email: 'cocostourscrc@gmail.com',
  address: {
    es: '200 metros oeste del muelle del ferry, Barrio El Carmen, Puntarenas, Costa Rica',
    en: '200 metres west of the ferry pier, Barrio El Carmen, Puntarenas, Costa Rica',
  } satisfies Localized,
  facebook: 'https://www.facebook.com/cocospuntarenas',
  instagram: 'https://www.instagram.com/cocostourscr/',
  tripadvisor:
    'https://www.tripadvisor.com/Attraction_Review-g309287-d15606337-Reviews-Coco_s_Tours-Puntarenas_Province_of_Puntarenas.html',
  map: 'https://www.google.com/maps/search/?api=1&query=200+metros+oeste+del+muelle+del+ferry+Barrio+El+Carmen+Puntarenas+Costa+Rica',
  liveLogin: 'https://cocostours.cr/login/',
  liveRegister: 'https://cocostours.cr/register/',
} as const

export const testimonials: Testimonial[] = [
  {
    name: 'Merly',
    quote: {
      es: 'Fue una experiencia increíble, un full day en Isla Tortuga. Las personas fueron súper amables, conocimos su historia, hicimos snorkel, comimos muy rico y disfrutamos de la playa.',
      en: 'It was an incredible full day on Tortuga Island. Everyone was wonderfully kind; we learned its history, snorkelled, enjoyed a delicious meal and spent time on the beach.',
    },
    sourceUrl: site.tripadvisor,
  },
  {
    name: 'Karla G.',
    quote: {
      es: 'Amo viajar con ellos. Son demasiado atentos, brindan servicios muy personalizados y ofrecen tours muy buenos.',
      en: 'I love travelling with them. They are incredibly attentive, provide very personal service and offer excellent tours.',
    },
    sourceUrl: site.tripadvisor,
  },
  {
    name: 'Brian P.',
    quote: {
      es: 'Don Mario nos contó del recorrido y de la isla. El guía y el capitán estuvieron atentos a la fauna; vimos delfines, monos araña, peces de colores y una flora asombrosa.',
      en: 'Don Mario told us about the route and the island. The guide and captain watched carefully for wildlife; we saw dolphins, spider monkeys, colourful fish and remarkable flora.',
    },
    sourceUrl: site.tripadvisor,
  },
  {
    name: 'Viajero de TripAdvisor',
    quote: {
      es: 'La calidez y hospitalidad de don Mario es excelente. Hicimos Isla Tortuga e Isla San Lucas con muy buenos guías y disfrutamos enormemente los viajes en barco.',
      en: "Don Mario's warmth and hospitality are excellent. We visited Tortuga Island and San Lucas Island with very good guides and thoroughly enjoyed the boat journeys.",
    },
    sourceUrl: site.tripadvisor,
  },
]
