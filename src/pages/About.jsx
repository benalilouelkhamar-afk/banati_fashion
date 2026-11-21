import { Link } from 'react-router-dom'
import { useLang } from '../context/LangContext.jsx'
import Img from '../components/Img.jsx'
import Reveal from '../components/Reveal.jsx'
import { Bow } from '../components/Logo.jsx'

export default function About() {
  const { t } = useLang()
  return (
    <div className="container-x pt-10">
      <div className="grid items-center gap-10 md:grid-cols-2">
        <Reveal>
          <p className="kicker">BANATI FASHION</p>
          <h1 className="section-title mt-1">{t('about.title')}</h1>
          <Bow className="mt-4 h-4 w-8 text-burgundy" />
          <div className="mt-5 space-y-4 leading-relaxed text-choco/80">
            <p>{t('about.p1')}</p><p>{t('about.p2')}</p><p>{t('about.p3')}</p>
          </div>
          <Link to="/boutique" className="btn-primary mt-8">{t('home.discover')}</Link>
        </Reveal>
        <Reveal className="grid grid-cols-2 gap-3">
          <div className="aspect-portrait overflow-hidden rounded-2xl"><Img src="/images/products/product_043.jpg" alt="" /></div>
          <div className="mt-10 aspect-portrait overflow-hidden rounded-2xl"><Img src="/images/products/product_044.jpg" alt="" /></div>
        </Reveal>
      </div>
      <section className="mt-20">
        <h2 className="section-title mb-8 text-center">{t('about.values')}</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Reveal key={i} delay={i * 80} className="rounded-2xl bg-white/70 p-6 text-center">
              <h3 className="font-serif text-2xl font-semibold text-burgundy">{t(`about.v${i}t`)}</h3>
              <p className="mt-2 text-sm text-choco/75">{t(`about.v${i}`)}</p>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  )
}
