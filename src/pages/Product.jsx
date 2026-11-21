import { useEffect, useRef, useState, useCallback } from 'react'
import { Link, useParams } from 'react-router-dom'
import products from '../data/products.json'
import { COLOR_HEX } from '../data/config.js'
import { useOrder } from '../context/OrderContext.jsx'
import { useLang } from '../context/LangContext.jsx'
import { useCart } from '../context/CartContext.jsx'
import Img from '../components/Img.jsx'
import Price from '../components/Price.jsx'
import ProductCard from '../components/ProductCard.jsx'
import SizeGuideModal from '../components/SizeGuideModal.jsx'
import { WhatsApp, Ruler, Chevron, Truck, Cash, Bag } from '../components/Icons.jsx'

function Gallery({ images, alt }) {
  const ref = useRef(null)
  const [idx, setIdx] = useState(0)
  const onScroll = () => {
    const el = ref.current
    if (!el) return
    setIdx(Math.round(Math.abs(el.scrollLeft) / el.clientWidth))
  }
  const go = (i) => {
    const el = ref.current
    if (!el) return
    const dir = getComputedStyle(el).direction === 'rtl' ? -1 : 1
    el.scrollTo({ left: dir * i * el.clientWidth, behavior: 'smooth' })
  }
  return (
    <div>
      <div className="relative">
        <div ref={ref} onScroll={onScroll} className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto rounded-3xl bg-white">
          {images.map((src, i) => (
            <div key={src + i} className="aspect-portrait w-full shrink-0 snap-center">
              <Img src={src} alt={`${alt} ${i + 1}`} eager={i === 0} />
            </div>
          ))}
        </div>
        {images.length > 1 && (
          <div className="absolute inset-x-0 bottom-3 flex justify-center gap-1.5">
            {images.map((_, i) => (
              <button key={i} onClick={() => go(i)} aria-label={`${i + 1}`} className={`h-1.5 rounded-full transition-all ${i === idx ? 'w-6 bg-burgundy' : 'w-1.5 bg-cream/90'}`} />
            ))}
          </div>
        )}
      </div>
      {images.length > 1 && (
        <div className="mt-3 flex gap-2">
          {images.map((src, i) => (
            <button key={i} onClick={() => go(i)} className={`aspect-portrait w-16 overflow-hidden rounded-xl border-2 ${i === idx ? 'border-burgundy' : 'border-transparent opacity-70'}`}>
              <Img src={src} alt="" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default function Product() {
  const { slug } = useParams()
  const { t, pick, lang } = useLang()
  const { add } = useCart()
  const { openOrder } = useOrder()
  const [qty, setQtyState] = useState(1)
  const p = products.find((x) => x.slug === slug)
  const [size, setSize] = useState('')
  const [color, setColor] = useState(p?.colors?.[0] || '')
  const [err, setErr] = useState(false)
  const [added, setAdded] = useState(false)
  const [guide, setGuide] = useState(false)
  const closeGuide = useCallback(() => setGuide(false), [])

  useEffect(() => { setSize(''); setColor(p?.colors?.[0] || ''); setErr(false); setAdded(false); setQtyState(1) }, [slug]) // eslint-disable-line

  useEffect(() => {
    if (p) document.title = `${p.name_fr} – BANATI FASHION`
    return () => { document.title = 'BANATI FASHION – Boutique mode femme à Kenitra' }
  }, [p])

  if (!p) {
    return (
      <div className="container-x py-24 text-center">
        <h1 className="section-title">{t('product.notFound')}</h1>
        <Link to="/boutique" className="btn-primary mt-8">{t('product.back')}</Link>
      </div>
    )
  }

  const name = pick(p, 'name')
  const needSize = () => {
    if (p.sizes.length && !size) {
      setErr(true)
      document.getElementById('sizes')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return false
    }
    return true
  }
  const onAdd = () => {
    if (!needSize()) return
    add(p.id, size, color, qty)
    setAdded(true)
    setTimeout(() => setAdded(false), 2200)
  }
  // « Commander via WhatsApp » : formulaire COD d'abord, puis WhatsApp
  const onOrder = () => {
    if (!needSize()) return
    openOrder({ lines: [{ key: `${p.id}|${size}|${color}`, id: p.id, size, color, qty, product: p }] })
  }

  const related = [
    ...products.filter((x) => x.category === p.category && x.id !== p.id),
  ].sort((a, b) => Math.abs(a.id - p.id) - Math.abs(b.id - p.id)).slice(0, 4)

  return (
    <div className="container-x pt-6">
      <nav className="mb-4 flex items-center gap-1 text-xs text-choco/60">
        <Link to="/boutique" className="hover:text-burgundy">{t('nav.shop')}</Link>
        <Chevron width="14" className="rtl:rotate-180" />
        <Link to={`/boutique?cat=${p.category}`} className="hover:text-burgundy">{t(`categories.${p.category}`)}</Link>
      </nav>

      <div className="grid gap-8 md:grid-cols-2 md:gap-12">
        <Gallery images={p.images} alt={name} />

        <div className="md:pt-4">
          <div className="flex flex-wrap gap-2">
            {p.is_new && <span className="rounded-full bg-blush/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-burgundy">{t('badge.new')}</span>}
            {!p.in_stock && <span className="rounded-full bg-choco px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-cream">{t('badge.out')}</span>}
          </div>
          <h1 className="mt-3 font-serif text-3xl font-semibold leading-tight sm:text-4xl">{name}</h1>
          <Price price={p.price} old={p.old_price} className="mt-2 text-xl" />

          {p.colors.length > 0 && (
            <div className="mt-6">
              <p className="mb-2 text-xs uppercase tracking-wider text-choco/60">{t('product.color')} : <span className="normal-case text-choco">{color}</span></p>
              <div className="flex flex-wrap gap-2">
                {p.colors.map((c) => (
                  <button key={c} onClick={() => setColor(c)} aria-label={c} title={c}
                    className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm transition ${color === c ? 'border-burgundy ring-1 ring-burgundy' : 'border-choco/15 bg-white/70'}`}>
                    {COLOR_HEX[c] && <span className="h-4 w-4 rounded-full border border-choco/20" style={{ background: COLOR_HEX[c] }} />}
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}

          {p.sizes.length > 0 && (
            <div className="mt-6" id="sizes">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-xs uppercase tracking-wider text-choco/60">{t('product.size')}</p>
                <button onClick={() => setGuide(true)} className="inline-flex items-center gap-1 text-xs text-burgundy underline-offset-4 hover:underline"><Ruler /> {t('product.sizeGuide')}</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {p.sizes.map((s) => (
                  <button key={s} onClick={() => { setSize(s); setErr(false) }} disabled={!p.in_stock}
                    className={`h-11 min-w-11 rounded-xl border px-3 text-sm font-medium transition ${size === s ? 'border-burgundy bg-burgundy text-cream' : 'border-choco/15 bg-white/70 hover:border-burgundy'}`}>
                    {s}
                  </button>
                ))}
              </div>
              {err && <p className="mt-2 text-sm text-burgundy">{t('product.chooseSize')}</p>}
            </div>
          )}

          {p.in_stock && (
            <div className="mt-6">
              <p className="mb-2 text-xs uppercase tracking-wider text-choco/60">{t('order.qty')}</p>
              <div className="inline-flex items-center rounded-full border border-choco/15 bg-white" dir="ltr">
                <button className="h-11 w-11 text-lg" onClick={() => setQtyState((q) => Math.max(1, q - 1))} aria-label="-">−</button>
                <span className="w-8 text-center font-medium">{qty}</span>
                <button className="h-11 w-11 text-lg" onClick={() => setQtyState((q) => Math.min(20, q + 1))} aria-label="+">+</button>
              </div>
            </div>
          )}

          {p.in_stock ? (
            <div className="mt-8 flex flex-col gap-3">
              <button onClick={onOrder} className="btn-wa w-full py-4 text-[15px]"><WhatsApp size={20} /> {t('product.orderWa')}</button>
              <button onClick={onAdd} className="btn-outline w-full py-4">{added ? t('product.added') : t('product.addToCart')}</button>
            </div>
          ) : (
            <p className="mt-8 rounded-2xl bg-white/70 p-4 text-center text-sm text-choco/70">{t('product.outOfStock')}</p>
          )}
          {added && <Link to="/panier" className="mt-3 block text-center text-sm text-burgundy underline">{t('nav.cart')} →</Link>}

          <div className="mt-6 grid grid-cols-2 gap-3 text-xs text-choco/75">
            <div className="flex items-center gap-2 rounded-xl bg-white/60 p-3"><Truck width="22" height="22" className="shrink-0 text-burgundy" /> {t('trust.delivery')}</div>
            <div className="flex items-center gap-2 rounded-xl bg-white/60 p-3"><Cash width="22" height="22" className="shrink-0 text-burgundy" /> {t('trust.cod')}</div>
          </div>

          <div className="mt-8 divide-y divide-choco/10 border-y border-choco/10">
            <details open className="group py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between text-xs font-semibold uppercase tracking-wider [&::-webkit-details-marker]:hidden">
                {t('product.description')}<span className="text-lg font-normal text-burgundy transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 leading-relaxed text-choco/80" lang={lang}>{pick(p, 'description')}</p>
            </details>
            <details className="group py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between text-xs font-semibold uppercase tracking-wider [&::-webkit-details-marker]:hidden">
                {t('product.care')}<span className="text-lg font-normal text-burgundy transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 leading-relaxed text-choco/80">{t('product.careText')}</p>
            </details>
          </div>
          <p className="mt-4 text-xs italic text-choco/55">🎀 {t('product.authentic')}</p>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="section-title mb-6 text-center">{t('product.related')}</h2>
          <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 md:grid-cols-4">
            {related.map((r) => <ProductCard key={r.id} product={r} />)}
          </div>
        </section>
      )}

      {p.in_stock && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-choco/10 bg-cream/95 px-4 py-3 backdrop-blur md:hidden">
          <div className="flex items-center gap-3">
            <button onClick={onAdd} className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-burgundy text-burgundy" aria-label={t('product.addToCart')}><Bag /></button>
            <button onClick={onOrder} className="btn-wa h-12 flex-1"><WhatsApp size={18} /> {t('order.buyNow')} · {p.price * qty} {t('common.currency')}</button>
          </div>
        </div>
      )}
      <div className="h-20 md:hidden" />
      <SizeGuideModal open={guide} onClose={closeGuide} />
    </div>
  )
}
