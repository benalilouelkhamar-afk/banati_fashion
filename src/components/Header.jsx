import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useLang } from '../context/LangContext.jsx'
import { useCart } from '../context/CartContext.jsx'
import Logo from './Logo.jsx'
import { Bag, MenuIcon, Close } from './Icons.jsx'

const LINKS = [
  ['/', 'nav.home'], ['/boutique', 'nav.shop'], ['/notre-histoire', 'nav.about'], ['/faq', 'nav.faq'], ['/contact', 'nav.contact'],
]

export default function Header() {
  const { t, toggle } = useLang()
  const { count } = useCart()
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  useEffect(() => setOpen(false), [pathname])
  useEffect(() => { document.body.style.overflow = open ? 'hidden' : '' }, [open])

  const linkCls = ({ isActive }) => `text-[12px] font-medium uppercase tracking-[0.16em] transition hover:text-burgundy ${isActive ? 'text-burgundy' : 'text-choco/80'}`

  return (
    <header className="sticky top-0 z-30 border-b border-choco/10 bg-cream/90 backdrop-blur">
      <div className="bg-burgundy whitespace-nowrap py-2 text-center text-[10px] font-medium uppercase tracking-[0.06em] text-cream sm:text-[11px] sm:tracking-[0.18em]">
        {t('trust.delivery')} <span className="mx-1.5 text-blush sm:mx-2">✦</span> {t('trust.cod')}
      </div>
      <div className="container-x flex h-16 items-center justify-between gap-3">
        <button className="-ms-2 p-2 md:hidden" onClick={() => setOpen(true)} aria-label={t('nav.menu')}>
          <MenuIcon />
        </button>
        <nav className="hidden flex-1 items-center gap-6 md:flex">
          {LINKS.slice(0, 3).map(([to, k]) => <NavLink key={to} to={to} end className={linkCls}>{t(k)}</NavLink>)}
        </nav>
        <Link to="/" aria-label="BANATI FASHION" className="shrink-0"><Logo /></Link>
        <div className="flex flex-1 items-center justify-end gap-2 sm:gap-5">
          <nav className="hidden items-center gap-6 md:flex">
            {LINKS.slice(3).map(([to, k]) => <NavLink key={to} to={to} className={linkCls}>{t(k)}</NavLink>)}
          </nav>
          <button onClick={toggle} className="rounded-full border border-choco/20 px-3 py-1 text-xs font-medium text-choco hover:border-burgundy hover:text-burgundy">
            {t('common.lang')}
          </button>
          <Link to="/panier" className="relative -me-1 p-1.5 text-choco hover:text-burgundy" aria-label={t('nav.cart')}>
            <Bag />
            {count > 0 && (
              <span className="absolute -end-1 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-burgundy px-1 text-[10px] font-semibold text-cream">{count}</span>
            )}
          </Link>
        </div>
      </div>

      {/* menu mobile */}
      <div className={`fixed inset-0 z-50 md:hidden ${open ? '' : 'pointer-events-none'}`}>
        <div className={`absolute inset-0 bg-choco/40 transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`} onClick={() => setOpen(false)} />
        <aside className={`absolute inset-y-0 start-0 flex w-[82%] max-w-xs flex-col bg-cream p-6 shadow-xl transition-transform duration-300 ${open ? 'translate-x-0' : 'ltr:-translate-x-full rtl:translate-x-full'}`}>
          <div className="mb-8 flex items-center justify-between">
            <Logo />
            <button onClick={() => setOpen(false)} aria-label={t('nav.close')} className="p-2"><Close /></button>
          </div>
          <nav className="flex flex-col">
            {LINKS.map(([to, k]) => (
              <NavLink key={to} to={to} end className={({ isActive }) => `border-b border-choco/10 py-4 font-serif text-2xl ${isActive ? 'text-burgundy' : 'text-choco'}`}>{t(k)}</NavLink>
            ))}
            <NavLink to="/panier" className="py-4 font-serif text-2xl text-choco">{t('nav.cart')} {count > 0 && `(${count})`}</NavLink>
          </nav>
          <p className="mt-auto text-xs text-choco/60">{t('brand.style')}</p>
        </aside>
      </div>
    </header>
  )
}
