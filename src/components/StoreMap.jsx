import { SHOP } from '../data/config.js'

export default function StoreMap({ className = '' }) {
  return (
    <div className={`overflow-hidden rounded-2xl border border-choco/10 bg-white shadow-sm ${className}`}>
      <iframe
        title="BANATI FASHION — Kenitra"
        src={SHOP.mapsEmbed}
        className="h-72 w-full sm:h-80"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  )
}
