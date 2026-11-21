import { useLang } from '../context/LangContext.jsx'
import { waLink } from '../data/config.js'
import { WhatsApp } from './Icons.jsx'

export default function WhatsAppFloat() {
  const { t } = useLang()
  return (
    <a
      href={waLink(t('home.waHello'))}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t('common.whatsappFloat')}
      className="fixed bottom-4 end-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 transition hover:scale-105 sm:bottom-6 sm:end-6"
    >
      <WhatsApp size={30} />
    </a>
  )
}
