import { useLang } from '../context/LangContext.jsx'
import { waLink } from '../data/config.js'
import { WhatsApp } from '../components/Icons.jsx'

export default function Faq() {
  const { t } = useLang()
  const items = t('faq.items')
  return (
    <div className="container-x max-w-3xl pt-10">
      <h1 className="section-title text-center">{t('faq.title')}</h1>
      <div className="mt-10 space-y-3">
        {Array.isArray(items) && items.map((it, i) => (
          <details key={i} className="group rounded-2xl bg-white/70 p-5 open:bg-white" open={i === 0}>
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium [&::-webkit-details-marker]:hidden">
              {it.q}
              <span className="text-xl text-burgundy transition group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 leading-relaxed text-choco/75">{it.a}</p>
          </details>
        ))}
      </div>
      <div className="mt-10 text-center">
        <a href={waLink(t('home.waHello'))} target="_blank" rel="noopener noreferrer" className="btn-wa"><WhatsApp size={20} /> {t('contact.write')}</a>
      </div>
    </div>
  )
}
