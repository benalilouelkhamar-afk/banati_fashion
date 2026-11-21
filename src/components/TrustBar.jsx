import { useLang } from '../context/LangContext.jsx'

export default function TrustBar() {
  const { t } = useLang()
  const items = [['🚚', 'trust.delivery'], ['💵', 'trust.cod'], ['🏬', 'trust.store']]
  return (
    <section className="border-y border-choco/10 bg-white/50">
      <div className="container-x grid grid-cols-3 divide-x divide-choco/10 py-5 rtl:divide-x-reverse">
        {items.map(([icon, k]) => (
          <div key={k} className="flex flex-col items-center gap-1.5 px-2 text-center sm:flex-row sm:justify-center sm:gap-3">
            <span className="text-2xl" aria-hidden="true">{icon}</span>
            <span className="text-[11px] font-medium leading-tight text-choco sm:text-sm">{t(k)}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
