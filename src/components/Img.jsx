import { useState } from 'react'
import { Bow } from './Logo.jsx'

// Image produit avec chargement différé et joli remplaçant si la photo manque.
export default function Img({ src, alt, className = '', eager = false, ...rest }) {
  const [failed, setFailed] = useState(false)
  if (!src || failed) {
    return (
      <div className={`flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-b from-blush/40 to-cream text-burgundy/60 ${className}`} role="img" aria-label={alt}>
        <Bow className="h-6 w-10" />
        <span className="text-[11px] uppercase tracking-[0.3em]">Banati</span>
      </div>
    )
  }
  return (
    <img
      src={src}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      onError={() => setFailed(true)}
      className={`h-full w-full object-cover ${className}`}
      {...rest}
    />
  )
}
