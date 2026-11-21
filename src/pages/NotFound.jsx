import { Link } from 'react-router-dom'
import { useLang } from '../context/LangContext.jsx'

export default function NotFound() {
  const { t } = useLang()
  return (
    <div className="container-x py-24 text-center">
      <p className="font-serif text-7xl text-blush">404</p>
      <Link to="/" className="btn-primary mt-8">{t('nav.home')}</Link>
    </div>
  )
}
