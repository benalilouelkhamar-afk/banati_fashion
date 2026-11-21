import { useEffect, useRef, useState, useCallback } from 'react'
import { Link, useParams } from 'react-router-dom'
import products from '../data/products.json'
import { COLOR_HEX, waLink, openWhatsApp } from '../data/config.js'
import { useLang } from '../context/LangContext.jsx'
import { useCart } from '../context/CartContext.jsx'
import Img from '../components/Img.jsx'
import Price from '../components/Price.jsx'
import ProductCard from '../components/ProductCard.jsx'
import SizeGuideModal from '../components/SizeGuideModal.jsx'
import { WhatsApp, Ruler, Chevron } from '../components/Icons.jsx'

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
  const p = products.find((x) => x.slug === slug)
  const [size, setSize] = useState('')
  const [color, setColor] = useState(p?.colors?.[0] || '')
  const [err, setErr] = useState(false)
  const [added, setAdded] = useState(false)
  const [guide, setGuide] = useState(false)
  const closeGuide = useCallback(() => setGuide(false), [])

  useEffect(() => { setSize(''); setColor(p?.colors?.[0] || ''); setErr(false); setAdded(false) }, [slug]) // eslint-disable-line

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
    if (p.sizes.length && !size) { setErr(true); return false }
    return true
  }
  const onAdd = () => {
    if (!needSize()) return
    add(p.id, size, color)
    setAdded(true)
    setTimeout(() => setAdded(false), 2200)
  }
  const onWa = () => {
    if (!needSize()) return
    const msg = t('product.waMsg', { name: p.name_fr, size: size || '-', color: color || '-', price: p.price, url: window.location.href })
    openWhatsApp(waLink(msg))
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
            <div className="mt-6">
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

          {p.in_stock ? (
            <div className="mt-8 flex flex-col gap-3">
              <button onClick={onAdd} className="btn-primary w-full py-4">{added ? t('product.added') : t('product.addToCart')}</button>
              <button onClick={onWa} className="btn-wa w-full py-4"><WhatsApp size={20} /> {t('product.orderWa')}</button>
            </div>
          ) : (
            <p className="mt-8 rounded-2xl bg-white/70 p-4 text-center text-sm text-choco/70">{t('product.outOfStock')}</p>
          )}
          {added && <Link to="/panier" className="mt-3 block text-center text-sm text-burgundy underline">{t('nav.cart')} →</Link>}

          <p className="mt-5 text-center text-xs text-choco/60">🚚 {t('product.delivery')}</p>

          <div className="mt-8 border-t border-choco/10 pt-6">
            <h2 className="mb-2 font-sans text-xs font-semibold uppercase tracking-wider text-choco/60">{t('product.description')}</h2>
            <p className="leading-relaxed text-choco/80" lang={lang}>{pick(p, 'description')}</p>
          </div>
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

      <SizeGuideModal open={guide} onClose={closeGuide} />
    </div>
  )
}
