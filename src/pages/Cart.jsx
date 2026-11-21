import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../context/LangContext.jsx'
import { useCart } from '../context/CartContext.jsx'
import OrderForm from '../components/OrderForm.jsx'
import Img from '../components/Img.jsx'
import { fmt } from '../components/Price.jsx'

export default function Cart() {
  const { t, pick } = useLang()
  const { lines, setQty, remove, clear, total } = useCart()
  const [sentUrl, setSentUrl] = useState('')
  const cur = t('common.currency')
  const onSent = (url) => { setSentUrl(url); clear(); window.scrollTo(0, 0) }

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

        <div className="h-fit rounded-3xl bg-white/70 p-5 shadow-sm sm:p-7 lg:sticky lg:top-28">
          <h2 className="font-serif text-2xl font-semibold">{t('cart.checkout')}</h2>
          <p className="mb-5 mt-1 text-xs text-choco/60">{t('cart.checkoutSub')}</p>
          <OrderForm lines={lines} onSent={onSent} idPrefix="c" />
        </div>
      </div>
    </div>
  )
}
