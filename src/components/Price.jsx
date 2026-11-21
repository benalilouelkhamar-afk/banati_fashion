import { useLang } from '../context/LangContext.jsx'

export const fmt = (n) => new Intl.NumberFormat('fr-FR').format(n)

export default function Price({ price, old, className = '' }) {
  const { t } = useLang()
  const cur = t('common.currency')
  return (
    <span className={`inline-flex flex-wrap items-baseline gap-2 ${className}`}>
      <span className="font-semibold text-burgundy">{fmt(price)} {cur}</span>
      {old && old > price ? <span className="text-sm text-choco/50 line-through">{fmt(old)} {cur}</span> : null}
    </span>
  )
}
