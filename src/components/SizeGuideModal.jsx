import { useEffect } from 'react'
import { useLang } from '../context/LangContext.jsx'
import { Close } from './Icons.jsx'

const ROWS = [
  ['S', '36', '84–88', '66–70', '90–94'],
  ['M', '38', '88–92', '70–74', '94–98'],
  ['L', '40', '92–98', '74–80', '98–104'],
  ['XL', '42', '98–104', '80–86', '104–110'],
  ['XXL', '44', '104–110', '86–92', '110–116'],
]

export default function SizeGuideModal({ open, onClose }) {
  const { t } = useLang()
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [open, onClose])
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center" role="dialog" aria-modal="true" aria-label={t('product.guideTitle')}>
      <div className="absolute inset-0 bg-choco/50" onClick={onClose} />
      <div className="relative w-full max-w-lg rounded-t-3xl bg-cream p-6 shadow-2xl sm:rounded-3xl">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-serif text-2xl font-semibold">{t('product.guideTitle')}</h3>
          <button onClick={onClose} className="p-1" aria-label={t('nav.close')}><Close /></button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-center text-sm">
            <thead>
              <tr className="border-b border-choco/15 text-xs uppercase text-choco/60">
                <th className="py-2">{t('product.size')}</th><th>{t('product.jeanSize')}</th><th>{t('product.chest')}</th><th>{t('product.waist')}</th><th>{t('product.hips')}</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r[0]} className="border-b border-choco/10 last:border-0">
                  {r.map((c, i) => <td key={i} className={`py-2.5 ${i === 0 ? 'font-semibold text-burgundy' : ''}`}>{c}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-xs text-choco/70">{t('product.guideNote')}</p>
      </div>
    </div>
  )
}
