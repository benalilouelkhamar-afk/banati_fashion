import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../context/LangContext.jsx'
import { useCart } from '../context/CartContext.jsx'
import { CITIES, waLink, openWhatsApp } from '../data/config.js'
import Img from '../components/Img.jsx'
import { fmt } from '../components/Price.jsx'
import { WhatsApp } from '../components/Icons.jsx'

const cleanPhone = (s) => s.replace(/[\s.\-()]/g, '')
const PHONE_RE = /^(?:\+212|00212|212|0)[5-7]\d{8}$/

export function buildOrderMessage(lines, total, f) {
  const rows = lines.map((l) => {
    const color = l.color && l.product.colors.length > 1 ? ` (${l.color})` : ''
    return `- ${l.product.name_fr}${color} | Taille: ${l.size || '-'} | Qté: ${l.qty} | ${l.qty * l.product.price} DH`
  })
  return [
    'Salam BANATI 🌸',
    'Commande:',
    ...rows,
    `Total: ${total} DH`,
    `Nom: ${f.name.trim()}`,
    `Tél: ${f.phone.trim()}`,
    `Ville: ${f.city}`,
    `Adresse: ${f.address.trim()}`,
    `Note: ${f.note.trim() || '-'}`,
  ].join('\n')
}

export default function Cart() {
  const { t, pick } = useLang()
  const { lines, setQty, remove, clear, total } = useCart()
  const [f, setF] = useState({ name: '', phone: '', city: '', address: '', note: '' })
  const [errors, setErrors] = useState({})
  const [sentUrl, setSentUrl] = useState('')
  const cur = t('common.currency')

  const upd = (k) => (e) => { setF({ ...f, [k]: e.target.value }); setErrors({ ...errors, [k]: undefined }) }

  const submit = (e) => {
    e.preventDefault()
    const er = {}
    if (f.name.trim().length < 2) er.name = t('cart.errName')
    if (!PHONE_RE.test(cleanPhone(f.phone))) er.phone = t('cart.errPhone')
    if (!f.city) er.city = t('cart.errCity')
    if (f.address.trim().length < 4) er.address = t('cart.errAddress')
    setErrors(er)
    if (Object.keys(er).length) {
      document.getElementById(`c-${Object.keys(er)[0]}`)?.focus()
      return
    }
    const url = waLink(buildOrderMessage(lines, total, f))
    setSentUrl(url)
    clear()
    window.scrollTo(0, 0)
    openWhatsApp(url)
  }

  if (sentUrl) {
    return (
      <div className="container-x py-20 text-center">
        <div className="mx-auto max-w-md rounded-3xl bg-white/70 p-8 shadow-sm">
          <div className="text-5xl">🌸</div>
          <h1 className="mt-4 font-serif text-3xl font-semibold">{t('cart.thanksTitle')}</h1>
          <p className="mt-3 text-choco/75">{t('cart.thanksText')}</p>
          <a href={sentUrl} target="_blank" rel="noopener noreferrer" className="mt-5 inline-block text-sm text-burgundy underline">{t('cart.thanksWa')}</a>
          <div className="mt-8"><Link to="/boutique" className="btn-primary">{t('cart.continue')}</Link></div>
        </div>
      </div>
    )
  }

  if (!lines.length) {
    return (
      <div className="container-x py-24 text-center">
        <h1 className="section-title">{t('cart.title')}</h1>
        <p className="mt-4 text-choco/60">{t('cart.empty')}</p>
        <Link to="/boutique" className="btn-primary mt-8">{t('cart.continue')}</Link>
      </div>
    )
  }

  const Field = ({ id, label, children }) => (
    <div>
      <label htmlFor={`c-${id}`} className="mb-1.5 block text-sm font-medium">{label}</label>
      {children}
      {errors[id] && <p className="mt-1 text-xs text-burgundy">{errors[id]}</p>}
    </div>
  )

  return (
    <div className="container-x pt-8">
      <h1 className="section-title text-center">{t('cart.title')}</h1>
      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_420px]">
        <div>
          <ul className="divide-y divide-choco/10 border-y border-choco/10">
            {lines.map((l) => (
              <li key={l.key} className="flex gap-4 py-4">
                <Link to={`/produit/${l.product.slug}`} className="aspect-portrait w-20 shrink-0 overflow-hidden rounded-xl bg-white sm:w-24">
                  <Img src={l.product.images[0]} alt={pick(l.product, 'name')} />
                </Link>
                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex justify-between gap-2">
                    <Link to={`/produit/${l.product.slug}`} className="font-medium leading-snug hover:text-burgundy">{pick(l.product, 'name')}</Link>
                    <span className="shrink-0 font-semibold text-burgundy">{fmt(l.qty * l.product.price)} {cur}</span>
                  </div>
                  <p className="mt-0.5 text-xs text-choco/60">
                    {l.size && <>{t('cart.size')}: {l.size}</>}{l.color && <> · {t('cart.color')}: {l.color}</>}
                  </p>
                  <div className="mt-auto flex items-center justify-between pt-2">
                    <div className="flex items-center rounded-full border border-choco/15 bg-white" dir="ltr">
                      <button className="h-9 w-9 text-lg" onClick={() => setQty(l.key, l.qty - 1)} aria-label="-">−</button>
                      <span className="w-6 text-center text-sm" aria-label={t('cart.qty')}>{l.qty}</span>
                      <button className="h-9 w-9 text-lg" onClick={() => setQty(l.key, l.qty + 1)} aria-label="+">+</button>
                    </div>
                    <button onClick={() => remove(l.key)} className="text-xs text-choco/60 underline hover:text-burgundy">{t('cart.remove')}</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-center justify-between text-lg">
            <span>{t('cart.total')}</span>
            <span className="font-semibold text-burgundy">{fmt(total)} {cur}</span>
          </div>
          <Link to="/boutique" className="mt-4 inline-block text-sm text-burgundy underline">{t('cart.continue')}</Link>
        </div>

        <form onSubmit={submit} noValidate className="h-fit space-y-4 rounded-3xl bg-white/70 p-5 shadow-sm sm:p-7">
          <div>
            <h2 className="font-serif text-2xl font-semibold">{t('cart.checkout')}</h2>
            <p className="mt-1 text-xs text-choco/60">{t('cart.checkoutSub')}</p>
          </div>
          {Field({ id: 'name', label: t('cart.name'), children: <input id="c-name" className="field" autoComplete="name" value={f.name} onChange={upd('name')} /> })}
          {Field({ id: 'phone', label: t('cart.phone'), children: <input id="c-phone" className="field" type="tel" inputMode="tel" dir="ltr" autoComplete="tel" placeholder="06 12 34 56 78" value={f.phone} onChange={upd('phone')} /> })}
          {Field({ id: 'city', label: t('cart.city'), children: (
            <select id="c-city" className="field" value={f.city} onChange={upd('city')}>
              <option value="">{t('cart.chooseCity')}</option>
              {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          ) })}
          {Field({ id: 'address', label: t('cart.address'), children: <input id="c-address" className="field" autoComplete="street-address" value={f.address} onChange={upd('address')} /> })}
          {Field({ id: 'note', label: t('cart.note'), children: <textarea id="c-note" rows={2} className="field resize-none" value={f.note} onChange={upd('note')} /> })}
          <div className="flex items-center justify-between border-t border-choco/10 pt-4">
            <span>{t('cart.total')}</span><span className="text-xl font-semibold text-burgundy">{fmt(total)} {cur}</span>
          </div>
          <button type="submit" className="btn-wa w-full py-4"><WhatsApp size={20} /> {t('cart.send')}</button>
        </form>
      </div>
    </div>
  )
}
