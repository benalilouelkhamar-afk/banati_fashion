import { useState } from 'react'
import { useLang } from '../context/LangContext.jsx'
import { CITIES, waLink, openWhatsApp } from '../data/config.js'
import { fmt } from './Price.jsx'
import { WhatsApp, Lock } from './Icons.jsx'

const cleanPhone = (s) => s.replace(/[\s.\-()]/g, '')
const PHONE_RE = /^(?:\+212|00212|212|0)[5-7]\d{8}$/

// Message WhatsApp, au format demandé par la boutique
export function buildOrderMessage(lines, f) {
  const rows = lines.length
    ? lines.map((l) => {
      const color = l.color && l.product.colors.length > 1 ? ` (${l.color})` : ''
      return `- ${l.product.name_fr}${color} | Taille: ${l.size || '-'} | Qté: ${l.qty} | ${l.qty * l.product.price} DH`
    })
    : [`- ${f.wish.trim()}`]
  const total = lines.reduce((s, l) => s + l.qty * l.product.price, 0)
  return [
    'Salam BANATI 🌸',
    'Commande:',
    ...rows,
    ...(lines.length ? [`Total: ${total} DH`] : []),
    `Nom: ${f.name.trim()}`,
    `Tél: ${f.phone.trim()}`,
    `Ville: ${f.city}`,
    `Adresse: ${f.address.trim()}`,
    `Note: ${f.note.trim() || '-'}`,
  ].join('\n')
}

/**
 * Formulaire de commande (paiement à la livraison).
 * lines = articles commandés ([] = commande libre : la cliente écrit l'article voulu).
 * onSent(url) est appelé quand WhatsApp s'ouvre.
 */
export default function OrderForm({ lines, onSent, idPrefix = 'o' }) {
  const { t } = useLang()
  const [f, setF] = useState({ name: '', phone: '', city: '', address: '', note: '', wish: '' })
  const [errors, setErrors] = useState({})
  const total = lines.reduce((s, l) => s + l.qty * l.product.price, 0)
  const cur = t('common.currency')

  const upd = (k) => (e) => { setF({ ...f, [k]: e.target.value }); if (errors[k]) setErrors({ ...errors, [k]: undefined }) }

  const submit = (e) => {
    e.preventDefault()
    const er = {}
    if (!lines.length && f.wish.trim().length < 2) er.wish = t('order.errWish')
    if (f.name.trim().length < 2) er.name = t('cart.errName')
    if (!PHONE_RE.test(cleanPhone(f.phone))) er.phone = t('cart.errPhone')
    if (!f.city) er.city = t('cart.errCity')
    if (f.address.trim().length < 4) er.address = t('cart.errAddress')
    setErrors(er)
    const first = Object.keys(er)[0]
    if (first) { document.getElementById(`${idPrefix}-${first}`)?.focus(); return }
    const url = waLink(buildOrderMessage(lines, f))
    onSent(url)
    openWhatsApp(url)
  }

  const field = (id, label, input) => (
    <div>
      <label htmlFor={`${idPrefix}-${id}`} className="mb-1.5 block text-[13px] font-medium text-choco">{label}</label>
      {input}
      {errors[id] && <p className="mt-1 text-xs text-burgundy" role="alert">{errors[id]}</p>}
    </div>
  )
  const cls = (id) => `field ${errors[id] ? 'border-burgundy/60 ring-2 ring-burgundy/10' : ''}`

  return (
    <form onSubmit={submit} noValidate className="space-y-4">
      {!lines.length && field('wish', t('order.wish'),
        <textarea id={`${idPrefix}-wish`} rows={2} className={`${cls('wish')} resize-none`} placeholder={t('order.wishPh')} value={f.wish} onChange={upd('wish')} />)}
      {field('name', t('cart.name'), <input id={`${idPrefix}-name`} className={cls('name')} autoComplete="name" value={f.name} onChange={upd('name')} />)}
      {field('phone', t('cart.phone'), <input id={`${idPrefix}-phone`} className={cls('phone')} type="tel" inputMode="tel" dir="ltr" autoComplete="tel" placeholder="06 12 34 56 78" value={f.phone} onChange={upd('phone')} />)}
      {field('city', t('cart.city'), (
        <select id={`${idPrefix}-city`} className={cls('city')} value={f.city} onChange={upd('city')}>
          <option value="">{t('cart.chooseCity')}</option>
          {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      ))}
      {field('address', t('cart.address'), <input id={`${idPrefix}-address`} className={cls('address')} autoComplete="street-address" placeholder={t('order.addressPh')} value={f.address} onChange={upd('address')} />)}
      {field('note', t('cart.note'), <textarea id={`${idPrefix}-note`} rows={2} className="field resize-none" value={f.note} onChange={upd('note')} />)}

      {lines.length > 0 && (
        <div className="space-y-1.5 border-t border-choco/10 pt-4 text-sm">
          <div className="flex justify-between text-choco/70"><span>{t('order.subtotal')}</span><span>{fmt(total)} {cur}</span></div>
          <div className="flex justify-between text-choco/70"><span>{t('order.shipping')}</span><span>{t('order.shippingVal')}</span></div>
          <div className="flex justify-between pt-1 text-base font-semibold"><span>{t('cart.total')}</span><span className="text-burgundy">{fmt(total)} {cur}</span></div>
        </div>
      )}
      <button type="submit" className="btn-wa w-full py-4 text-[15px]"><WhatsApp size={20} /> {t('order.confirm')}</button>
      <p className="flex items-center justify-center gap-1.5 text-center text-[11px] text-choco/55"><Lock /> {t('order.reassure')}</p>
    </form>
  )
}
