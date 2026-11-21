import { useLang } from '../context/LangContext.jsx'
import { Truck, Cash, Store } from './Icons.jsx'

export default function TrustBar() {
  const { t } = useLang()
  const items = [[Truck, 'trust.delivery'], [Cash, 'trust.cod'], [Store, 'trust.store']]
  return (
    <section className="border-y border-choco/10 bg-white/60">
      <div className="container-x grid grid-cols-3 py-5 sm:py-6">
        {items.map(([Icon, k], i) => (
          <div key={k} className={`flex flex-col items-center gap-2 px-1 text-center sm:flex-row sm:justify-center sm:gap-3 ${i ? 'border-s border-choco/10' : ''}`}>
            <Icon className="text-burgundy" />
            <span className="text-[11px] font-medium uppercase leading-tight tracking-wide text-choco sm:text-xs">{t(k)}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
