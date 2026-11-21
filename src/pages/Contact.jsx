import { useLang } from '../context/LangContext.jsx'
import { SHOP, waLink } from '../data/config.js'
import StoreMap from '../components/StoreMap.jsx'
import { WhatsApp, Phone, Insta, Pin, Clock } from '../components/Icons.jsx'

export default function Contact() {
  const { t } = useLang()
  const items = [
    [WhatsApp, t('contact.whatsapp'), SHOP.phoneDisplay, waLink(t('home.waHello')), true],
    [Phone, t('contact.phone'), SHOP.phoneDisplay, `tel:+${SHOP.whatsapp}`, true],
    [Insta, t('contact.instagram'), SHOP.instagramHandle, SHOP.instagram, true],
    [Pin, t('contact.address'), t('common.address'), SHOP.mapsLink, false],
    [Clock, t('contact.hours'), t('contact.hoursText'), null, false],
  ]
  return (
    <div className="container-x pt-10">
      <div className="text-center">
        <h1 className="section-title">{t('contact.title')}</h1>
        <p className="mx-auto mt-3 max-w-md text-choco/70">{t('contact.sub')}</p>
        <a href={waLink(t('home.waHello'))} target="_blank" rel="noopener noreferrer" className="btn-wa mt-6"><WhatsApp size={20} /> {t('contact.write')}</a>
      </div>
      <div className="mt-12 grid gap-8 md:grid-cols-2">
        <ul className="space-y-3">
          {items.map(([Icon, label, value, href, ltr]) => {
            const body = (
              <>
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blush/50 text-burgundy"><Icon /></span>
                <span>
                  <span className="block text-xs uppercase tracking-wider text-choco/60">{label}</span>
                  <span className="block font-medium" dir={ltr ? 'ltr' : undefined}>{value}</span>
                </span>
              </>
            )
            return (
              <li key={label}>
                {href
                  ? <a href={href} target={href.startsWith('tel') ? undefined : '_blank'} rel="noopener noreferrer" className="flex items-center gap-4 rounded-2xl bg-white/70 p-4 transition hover:bg-white">{body}</a>
                  : <div className="flex items-center gap-4 rounded-2xl bg-white/70 p-4">{body}</div>}
              </li>
            )
          })}
        </ul>
        <StoreMap />
      </div>
    </div>
  )
}
