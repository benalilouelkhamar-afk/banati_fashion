import { useLocation } from 'react-router-dom'
import { useLang } from '../context/LangContext.jsx'
import { useOrder } from '../context/OrderContext.jsx'
import { WhatsApp } from './Icons.jsx'

// Bouton flottant : ouvre d'abord le formulaire de commande (COD), puis WhatsApp.
export default function WhatsAppFloat() {
  const { t } = useLang()
  const { openOrder } = useOrder()
  const { pathname } = useLocation()
  // sur la fiche produit (mobile) une barre de commande fixe remplace le bouton
  const hideMobile = pathname.startsWith('/produit/') || pathname === '/panier'
  return (
    <button
      onClick={() => openOrder()}
      aria-label={t('common.whatsappFloat')}
      className={`fixed bottom-4 ${hideMobile ? 'hidden md:flex' : 'flex'} end-4 z-40 h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/25 ring-4 ring-white/70 transition hover:scale-105 sm:bottom-6 sm:end-6`}
    >
      <WhatsApp size={30} />
    </button>
  )
}
