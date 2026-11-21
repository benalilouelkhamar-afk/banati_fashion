import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import products from '../data/products.json'

const CartContext = createContext(null)
const KEY = 'banati_cart'

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) || '[]')
      return Array.isArray(saved) ? saved : []
    } catch { return [] }
  })

  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(items)) } catch { /* ignore */ }
  }, [items])

  // on relie chaque ligne au produit actuel (prix à jour depuis products.json)
  const lines = useMemo(() => items
    .map((it) => ({ ...it, product: products.find((p) => p.id === it.id) }))
    .filter((l) => l.product), [items])

  const add = (id, size, color, qty = 1) => {
    const key = `${id}|${size}|${color}`
    setItems((prev) => {
      const found = prev.find((i) => i.key === key)
      if (found) return prev.map((i) => (i.key === key ? { ...i, qty: Math.min(i.qty + qty, 20) } : i))
      return [...prev, { key, id, size, color, qty }]
    })
  }
  const setQty = (key, qty) => setItems((prev) => prev.map((i) => (i.key === key ? { ...i, qty: Math.max(1, Math.min(qty, 20)) } : i)))
  const remove = (key) => setItems((prev) => prev.filter((i) => i.key !== key))
  const clear = () => setItems([])

  const count = lines.reduce((s, l) => s + l.qty, 0)
  const total = lines.reduce((s, l) => s + l.qty * l.product.price, 0)

  return (
    <CartContext.Provider value={{ lines, add, setQty, remove, clear, count, total }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
