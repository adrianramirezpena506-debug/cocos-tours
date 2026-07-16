import { writeFile } from 'node:fs/promises'
import path from 'node:path'

const tours = ['isla-tortuga','isla-san-lucas','tour-bioluminiscencia','tour-isla-tortuga-bioluminiscencia','tour-parque-nacional-san-lucas-isla-venado-playa-esmeralda','isla-san-lucas-playa-esmeralda','tour-privado-tesoros-del-golfo','pesca-deportiva-in-shore','pesca-deportiva-off-shore-alta-mar']
const posts = ['isla-tortuga-el-paraiso-escondido-de-costa-rica-que-debes-visitar','isla-san-lucas-historia-naturaleza-y-aventura-a-solo-minutos-de-puntarenas','discover-the-heart-of-costa-rica-cocos-tours-island-culture-tour','authentic-tourism-experiences-in-costa-rica-with-cocostours-cr','tortuga-island-tour-a-day-in-paradise-from-puntarenas','inshore-fishing-in-the-nicoya-gulf-a-paradise-for-anglers','discover-san-lucas-island-national-park-with-cocos-tours-a-journey-into-costa-ricas-hidden-history-and-natural-beauty','discover-the-hidden-gems-of-the-gulf-of-nicoya-venado-chira-islands-tour-with-cocos-tours','discover-the-wonders-of-birdwatching-with-cocostours-cr','discovering-costa-ricas-gastronomy-culture-with-cocostours-cr','conscious-and-responsible-tourism-in-costa-rica-travel-with-purpose-with-cocos-tours','embark-on-an-unforgettable-wildlife-watching-adventure-with-cocostours-cr','empowering-communities-through-tourism-development-in-costa-rica','discover-costa-ricas-local-heritage-and-eco-tourism-with-coco-tours','discover-the-magic-of-bioluminescence-with-cocos-tour']
const routes = [
  '/es','/es/experiencias','/es/destinos','/es/servicios','/es/nosotros','/es/galeria','/es/blog','/es/contacto','/es/privacidad','/es/terminos',
  '/en','/en/experiences','/en/destinations','/en/services','/en/about','/en/gallery','/en/journal','/en/contact','/en/privacy','/en/terms',
  ...tours.flatMap((slug) => [`/es/experiencias/${slug}`, `/en/experiences/${slug}`]),
  ...posts.flatMap((slug) => [`/es/blog/${slug}`, `/en/journal/${slug}`]),
]
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes.map((route) => `  <url><loc>https://cocostours.cr${route}</loc></url>`).join('\n')}\n</urlset>\n`
await writeFile(path.join(process.cwd(), 'public', 'sitemap.xml'), xml)
