import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import fr from '../i18n/fr.json'
import ar from '../i18n/ar.json'

const DICTS = { fr, ar }
const LangContext = createContext(null)

const read = (obj, path) => path.split('.').reduce((o, k) => (o == null ? o : o[k]), obj)

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try { return localStorage.getItem('banati_lang') === 'ar' ? 'ar' : 'fr' } catch { return 'fr' }
  })

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
    try { localStorage.setItem('banati_lang', lang) } catch { /* ignore */ }
  }, [lang])

  const t = useCallback((key, vars) => {
    let s = read(DICTS[lang], key) ?? read(DICTS.fr, key) ?? key
    if (typeof s === 'string' && vars) {
      s = s.replace(/\{(\w+)\}/g, (_, k) => (vars[k] ?? ''))
    }
    return s
  }, [lang])

  const toggle = () => setLang((l) => (l === 'fr' ? 'ar' : 'fr'))
  // nom / description d'un produit dans la langue courante
  const pick = (p, field) => p[`${field}_${lang}`] || p[`${field}_fr`]

  return (
    <LangContext.Provider value={{ lang, t, toggle, pick, isAr: lang === 'ar' }}>
      {children}
    </LangContext.Provider>
  )
}

export const useLang = () => useContext(LangContext)
