import { useEffect } from 'react'
import type { Locale, SeoMeta } from '../types/content'

const SITE_URL = 'https://cocostours.cr'

const upsertMeta = (selector: string, attrs: Record<string, string>) => {
  let element = document.head.querySelector<HTMLMetaElement>(selector)
  if (!element) {
    element = document.createElement('meta')
    document.head.appendChild(element)
  }
  Object.entries(attrs).forEach(([key, value]) => element?.setAttribute(key, value))
}

const upsertLink = (selector: string, attrs: Record<string, string>) => {
  let element = document.head.querySelector<HTMLLinkElement>(selector)
  if (!element) {
    element = document.createElement('link')
    document.head.appendChild(element)
  }
  Object.entries(attrs).forEach(([key, value]) => element?.setAttribute(key, value))
}

export function Seo({ meta, locale }: { meta: SeoMeta; locale: Locale }) {
  useEffect(() => {
    document.title = meta.title
    const canonical = `${SITE_URL}${meta.canonicalPath}`
    const image = `${SITE_URL}${meta.image ?? '/assets/tours/isla-tortuga.jpg'}`
    upsertMeta('meta[name="description"]', { name: 'description', content: meta.description })
    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: meta.title })
    upsertMeta('meta[property="og:description"]', { property: 'og:description', content: meta.description })
    upsertMeta('meta[property="og:type"]', { property: 'og:type', content: 'website' })
    upsertMeta('meta[property="og:url"]', { property: 'og:url', content: canonical })
    upsertMeta('meta[property="og:image"]', { property: 'og:image', content: image })
    upsertMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' })
    upsertLink('link[rel="canonical"]', { rel: 'canonical', href: canonical })
    const translatedPath = meta.canonicalPath.replace(/^\/(es|en)/, locale === 'es' ? '/en' : '/es')
    upsertLink('link[hreflang="es"]', { rel: 'alternate', hreflang: 'es', href: `${SITE_URL}${locale === 'es' ? meta.canonicalPath : translatedPath}` })
    upsertLink('link[hreflang="en"]', { rel: 'alternate', hreflang: 'en', href: `${SITE_URL}${locale === 'en' ? meta.canonicalPath : translatedPath}` })

    document.head.querySelectorAll('script[data-cocos-jsonld]').forEach((element) => element.remove())
    if (meta.jsonLd) {
      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.dataset.cocosJsonld = 'true'
      script.text = JSON.stringify(meta.jsonLd)
      document.head.appendChild(script)
    }
  }, [locale, meta])

  return null
}
