import { Link } from 'react-router-dom'
import { useLang } from '../context/LangContext.jsx'
import { SHOP, waLink } from '../data/config.js'
import Logo from './Logo.jsx'
import { Insta, WhatsApp, Pin, Phone } from './Icons.jsx'

export default function Footer() {
  const { t } = useLang()
  return (
    <footer className="mt-20 bg-choco text-cream/80">
      <div className="container-x grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo light />
          <p className="mt-4 max-w-xs font-serif text-lg italic text-cream/90">{t('brand.tagline')}</p>
          <p className="mt-1 text-xs tracking-wide text-blush">{t('brand.style')}</p>
        </div>
        <div>
          <h4 className="mb-4 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-blush">{t('footer.links')}</h4>
          <ul className="space-y-2 text-sm">
            <li><Link className="hover:text-cream" to="/boutique">{t('nav.shop')}</Link></li>
            <li><Link className="hover:text-cream" to="/notre-histoire">{t('nav.about')}</Link></li>
            <li><Link className="hover:text-cream" to="/faq">{t('nav.faq')}</Link></li>
            <li><Link className="hover:text-cream" to="/contact">{t('nav.contact')}</Link></li>
            <li><Link className="hover:text-cream" to="/panier">{t('nav.cart')}</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-4 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-blush">{t('footer.contact')}</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-2"><Pin className="mt-0.5 shrink-0" width="16" /> <a className="hover:text-cream" href={SHOP.mapsLink} target="_blank" rel="noopener noreferrer">{t('common.address')}</a></li>
            <li className="flex gap-2"><Phone className="mt-0.5 shrink-0" width="16" /> <a dir="ltr" className="hover:text-cream" href={`tel:+${SHOP.whatsapp}`}>{SHOP.phoneDisplay}</a></li>
            <li className="flex gap-2"><WhatsApp size={16} className="mt-0.5 shrink-0" /> <a className="hover:text-cream" href={waLink()} target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-4 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-blush">{t('footer.follow')}</h4>
          <a href={SHOP.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm hover:text-cream">
            <Insta /> <span dir="ltr">{SHOP.instagramHandle}</span>
          </a>
        </div>
      </div>
      <div className="border-t border-cream/10 py-5 pb-24 text-center text-xs text-cream/60 sm:pb-5">{t('footer.rights')}</div>
    </footer>
  )
}
