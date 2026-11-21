import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from './LangContext.jsx'
import { useCart } from './CartContext.jsx'
import OrderForm from '../components/OrderForm.jsx'
import Img from '../components/Img.jsx'
import { fmt } from '../components/Price.jsx'
import { Close } from '../components/Icons.jsx'

const OrderContext = createContext(null)

// Fenêtre « Commander » : toujours le formulaire COD avant d'ouvrir WhatsApp.
export function OrderProvider({ children }) {
  const { t, pick } = useLang()
  const { lines: cartLines, clear } = useCart()
  const [state, setState] = useState(null) // { lines, fromCart }
  const [sentUrl, setSentUrl] = useState('')

  const openOrder = useCallback((opts = {}) => {
    setSentUrl('')
    if (opts.lines) setState({ lines: opts.lines, fromCart: false })
    else setState({ lines: cartLines, fromCart: cartLines.length > 0 })
  }, [cartLines])
  const close = useCallback(() => { setState(null); setSentUrl('') }, [])

  useEffect(() => {
    if (!state) return
    const onKey = (e) => e.key === 'Escape' && close()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [state, close])

  const onSent = (url) => {
    setSentUrl(url)
    if (state?.fromCart) clear()
  }

  return (
    <OrderContext.Provider value={{ openOrder }}>
      {children}
      {state && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center" role="dialog" aria-modal="true" aria-label={t('order.title')}>
          <div className="absolute inset-0 bg-choco/55 backdrop-blur-[2px]" onClick={close} />
          <div className="relative max-h-[92vh] w-full max-w-md overflow-y-auto rounded-t-[1.75rem] bg-cream shadow-2xl sm:rounded-[1.75rem]">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-choco/10 bg-cream/95 px-5 py-4 backdrop-blur">
              <div>
                <h2 className="font-serif text-2xl font-semibold leading-none">{sentUrl ? t('cart.thanksTitle') : t('order.title')}</h2>
                {!sentUrl && <p className="mt-1 text-xs text-choco/60">{t('order.sub')}</p>}
              </div>
              <button onClick={close} className="-me-1 rounded-full p-2 hover:bg-choco/5" aria-label={t('nav.close')}><Close /></button>
            </div>

            {sentUrl ? (
              <div className="px-6 py-10 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blush/60 text-3xl">🌸</div>
                <p className="mt-5 text-choco/75">{t('cart.thanksText')}</p>
                <a href={sentUrl} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-sm text-burgundy underline">{t('cart.thanksWa')}</a>
                <div className="mt-8"><Link to="/boutique" onClick={close} className="btn-primary">{t('cart.continue')}</Link></div>
              </div>
            ) : (
              <div className="px-5 pb-6 pt-4">
                {state.lines.length > 0 && (
                  <ul className="mb-5 space-y-3 rounded-2xl bg-white/70 p-3">
                    {state.lines.map((l) => (
                      <li key={l.key} className="flex items-center gap-3">
                        <div className="aspect-portrait w-12 shrink-0 overflow-hidden rounded-lg"><Img src={l.product.images[0]} alt="" /></div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium">{pick(l.product, 'name')}</p>
                          <p className="text-xs text-choco/60">{l.size && `${t('cart.size')}: ${l.size}`}{l.color && ` · ${l.color}`} · {t('cart.qty')}: {l.qty}</p>
                        </div>
                        <span className="shrink-0 text-sm font-semibold text-burgundy">{fmt(l.qty * l.product.price)} {t('common.currency')}</span>
                      </li>
                    ))}
                  </ul>
                )}
                <OrderForm lines={state.lines} onSent={onSent} idPrefix="m" />
              </div>
            )}
          </div>
        </div>
      )}
    </OrderContext.Provider>
  )
}

export const useOrder = () => useContext(OrderContext)
