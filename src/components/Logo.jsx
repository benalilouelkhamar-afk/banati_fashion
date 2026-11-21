export function Bow({ className = '' }) {
  return (
    <svg viewBox="0 0 40 24" className={className} aria-hidden="true">
      <path d="M20 12C15 5 6 2 4 6s2 11 16 6zm0 0c5-7 14-10 16-6s-2 11-16 6z" fill="currentColor" opacity=".9" />
      <path d="M18.5 13.5 15 22l3.5-2 1.5 3 1.5-3 3.5 2-3.5-8.5" fill="currentColor" opacity=".75" />
      <circle cx="20" cy="12" r="2.4" fill="currentColor" />
    </svg>
  )
}

export default function Logo({ light = false, className = '' }) {
  return (
    <span dir="ltr" className={`inline-flex flex-col items-center leading-none ${className}`}>
      <Bow className={`mb-0.5 h-3 w-6 ${light ? 'text-blush' : 'text-burgundy'}`} />
      <span className={`font-display text-xl font-semibold tracking-[0.18em] sm:text-2xl ${light ? 'text-cream' : 'text-choco'}`} style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>
        BANATI
      </span>
      <span className={`mt-0.5 text-[9px] font-medium tracking-[0.5em] ${light ? 'text-blush' : 'text-burgundy'}`} style={{ fontFamily: 'Poppins, sans-serif' }}>
        FASHION
      </span>
    </span>
  )
}
