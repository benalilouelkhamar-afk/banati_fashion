import { Link } from 'react-router-dom'
import { useLang } from '../context/LangContext.jsx'
import Img from './Img.jsx'
import Price from './Price.jsx'

export default function ProductCard({ product: p }) {
  const { t, pick } = useLang()
  const sale = p.old_price && p.old_price > p.price
  return (
    <Link to={`/produit/${p.slug}`} className="group block">
      <div className="relative aspect-portrait overflow-hidden rounded-2xl bg-white shadow-[0_1px_0_rgba(74,44,33,.06)]">
        <Img src={p.images[0]} alt={pick(p, 'name')} className={`transition duration-700 ease-out group-hover:scale-105 ${p.in_stock ? '' : 'opacity-60 grayscale-[40%]'}`} />
        {p.images[1] && (
          <div className="absolute inset-0 hidden opacity-0 transition duration-500 group-hover:opacity-100 md:block">
            <Img src={p.images[1]} alt="" />
          </div>
        )}
        <div className="absolute start-2 top-2 flex flex-col items-start gap-1">
          {p.is_new && <span className="rounded-full bg-cream/95 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-burgundy">{t('badge.new')}</span>}
          {sale && <span className="rounded-full bg-burgundy px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-cream">{t('badge.sale')}</span>}
        </div>
        {!p.in_stock && (
          <span className="absolute inset-x-2 bottom-2 rounded-full bg-choco/85 py-1.5 text-center text-[11px] font-medium text-cream">{t('badge.out')}</span>
        )}
      </div>
      <div className="px-0.5 pt-3">
        <p className="text-[10px] uppercase tracking-[0.18em] text-choco/45">{t(`categories.${p.category}`)}</p>
        <h3 className="mt-0.5 line-clamp-1 font-sans text-[13px] font-medium text-choco sm:text-sm">{pick(p, 'name')}</h3>
        <Price price={p.price} old={p.old_price} className="mt-0.5 text-sm" />
      </div>
    </Link>
  )
}
