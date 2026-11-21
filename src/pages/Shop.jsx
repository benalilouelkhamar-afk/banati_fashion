import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import products from '../data/products.json'
import { CATEGORIES } from '../data/config.js'
import { useLang } from '../context/LangContext.jsx'
import ProductCard from '../components/ProductCard.jsx'
import { Search } from '../components/Icons.jsx'

const ALL_SIZES = [...new Set(products.flatMap((p) => p.sizes))]
const norm = (s) => (s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
const PAGE = 24

export default function Shop() {
  const { t, pick } = useLang()
  const [params, setParams] = useSearchParams()
  const cat = params.get('cat') || ''
  const size = params.get('taille') || ''
  const sort = params.get('tri') || ''
  const [q, setQ] = useState(params.get('q') || '')
  const [shown, setShown] = useState(PAGE)

  const set = (key, val) => {
    const next = new URLSearchParams(params)
    if (val) next.set(key, val); else next.delete(key)
    setParams(next, { replace: true })
    setShown(PAGE)
  }

  const list = useMemo(() => {
    const nq = norm(q.trim())
    let r = products.filter((p) =>
      (!cat || p.category === cat) &&
      (!size || p.sizes.includes(size)) &&
      (!nq || norm(`${p.name_fr} ${p.name_ar} ${t(`categories.${p.category}`)}`).includes(nq)))
    if (sort === 'asc') r = [...r].sort((a, b) => a.price - b.price)
    else if (sort === 'desc') r = [...r].sort((a, b) => b.price - a.price)
    else r = [...r].sort((a, b) => (b.is_new - a.is_new) || (b.in_stock - a.in_stock) || a.id - b.id)
    return r
  }, [cat, size, sort, q, t])

  const chip = (active) => `chip whitespace-nowrap ${active ? 'border-burgundy bg-burgundy text-cream' : 'border-choco/15 bg-white/70 text-choco hover:border-burgundy'}`
  const hasFilters = cat || size || sort || q

  return (
    <div className="container-x pt-8">
      <div className="text-center">
        <p className="kicker">BANATI FASHION</p>
        <h1 className="section-title mt-1">{cat ? t(`categories.${cat}`) : t('shop.title')}</h1>
      </div>

      {/* recherche */}
      <div className="relative mx-auto mt-6 max-w-md">
        <Search className="pointer-events-none absolute start-4 top-1/2 -translate-y-1/2 text-choco/40" />
        <input
          type="search" value={q} placeholder={t('shop.search')}
          onChange={(e) => { setQ(e.target.value); setShown(PAGE) }}
          className="field rounded-full ps-11"
          aria-label={t('shop.search')}
        />
      </div>

      {/* catégories */}
      <div className="no-scrollbar -mx-4 mt-6 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0">
        <button className={chip(!cat)} onClick={() => set('cat', '')}>{t('shop.all')}</button>
        {CATEGORIES.map((c) => (
          <button key={c.id} className={chip(cat === c.id)} onClick={() => set('cat', c.id)}>{t(`categories.${c.id}`)}</button>
        ))}
      </div>

      {/* taille + tri */}
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-y border-choco/10 py-3">
        <div className="flex items-center gap-2">
          <label htmlFor="f-size" className="text-xs uppercase tracking-wider text-choco/60">{t('shop.size')}</label>
          <select id="f-size" value={size} onChange={(e) => set('taille', e.target.value)} className="rounded-full border border-choco/15 bg-white px-3 py-1.5 text-sm">
            <option value="">{t('shop.allSizes')}</option>
            {ALL_SIZES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="f-sort" className="text-xs uppercase tracking-wider text-choco/60">{t('shop.sort')}</label>
          <select id="f-sort" value={sort} onChange={(e) => set('tri', e.target.value)} className="rounded-full border border-choco/15 bg-white px-3 py-1.5 text-sm">
            <option value="">{t('shop.sortDefault')}</option>
            <option value="asc">{t('shop.sortAsc')}</option>
            <option value="desc">{t('shop.sortDesc')}</option>
          </select>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between text-xs text-choco/60">
        <span>{t('shop.results', { n: list.length })}</span>
        {hasFilters && <button onClick={() => { setQ(''); setParams({}, { replace: true }) }} className="text-burgundy underline">{t('shop.reset')}</button>}
      </div>

      {list.length === 0 ? (
        <p className="py-20 text-center text-choco/60">{t('shop.empty')}</p>
      ) : (
        <div className="mt-5 grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 md:grid-cols-3 lg:grid-cols-4">
          {list.slice(0, shown).map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
      {shown < list.length && (
        <div className="mt-10 text-center">
          <button className="btn-outline" onClick={() => setShown((s) => s + PAGE)}>+ {list.length - shown}</button>
        </div>
      )}
    </div>
  )
}
