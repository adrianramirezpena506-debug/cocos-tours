import type { ImgHTMLAttributes } from 'react'

export function ResponsiveImage({ src, alt, className, ...props }: ImgHTMLAttributes<HTMLImageElement> & { src: string; alt: string }) {
  const base = src.replace(/^\/assets\//, '').replace(/\.(jpe?g|png)$/i, '')
  const canUseGenerated = /\.(jpe?g|png)$/i.test(src) && !src.includes('/brand/')

  if (!canUseGenerated) return <img src={src} alt={alt} className={className} {...props} />

  return (
    <picture>
      <source type="image/avif" srcSet={`/assets/responsive/${base}-640.avif 640w, /assets/responsive/${base}-960.avif 960w, /assets/responsive/${base}-1440.avif 1440w`} />
      <source type="image/webp" srcSet={`/assets/responsive/${base}-640.webp 640w, /assets/responsive/${base}-960.webp 960w, /assets/responsive/${base}-1440.webp 1440w`} />
      <img src={src} alt={alt} className={className} {...props} />
    </picture>
  )
}
