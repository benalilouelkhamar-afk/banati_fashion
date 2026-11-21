import { Link } from 'react-router-dom'
import products from '../data/products.json'
import { CATEGORIES, SHOP, waLink } from '../data/config.js'
import { useLang } from '../context/LangContext.jsx'
import ProductCard from '../components/ProductCard.jsx'
import Reveal from '../components/Reveal.jsx'
import Img from '../components/Img.jsx'
import TrustBar from '../components/TrustBar.jsx'
import StoreMap from '../components/StoreMap.jsx'
import { Bow } from '../components/Logo.jsx'
import { WhatsApp, Insta, Chevron } from '../components/Icons.jsx'

// photos de la bande Instagram (images statiques → lien vers le compte)
const IG = [42, 44, 28, 18, 37, 43, 6, 17].map((n) => `/images/products/product_${String(n).padStart(3, '0')}.jpg`)

export default function Home() {
  const { t } = useLang()
  const news = products.filter((p) => p.is_new).slice(0, 8)

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="container-x grid items-center gap-8 py-8 md:grid-cols-2 md:py-16">
          <div className="order-2 text-center md:order-1 md:text-start">
            <p className="kicker">{t('home.kicker')}</p>
            <h1 className="mt-4 font-serif text-[2.6rem] font-semibold leading-[1.05] text-choco sm:text-6xl">
              {t('home.heroTitle')}
            </h1>
            <p className="mt-3 font-serif text-xl italic text-burgundy" dir="ltr">{t('brand.tagline')}</p>
            <p className="mx-auto mt-5 max-w-md text-[15px] leading-relaxed text-choco/75 md:mx-0">{t('home.heroText')}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center md:justify-start">
              <Link to="/boutique" className="btn-primary">{t('home.discover')}</Link>
              <a href={waLink(t('home.waHello'))} target="_blank" rel="noopener noreferrer" className="btn-outline"><WhatsApp size={18} /> {t('home.orderWa')}</a>
            </div>
            <p className="mt-6 text-xs tracking-[0.3em] text-choco/50" dir="ltr">{t('brand.style').toUpperCase()}</p>
          </div>
          <div className="relative order-1 md:order-2">
            <div className="absolute -inset-3 -z-10 rotate-2 rounded-[2rem] bg-blush/50" />
            <div className="aspect-portrait overflow-hidden rounded-[1.75rem] shadow-xl shadow-choco/10">
              <Img src="/images/site/hero.jpg" alt="BANATI FASHION — collection" eager fetchpriority="high" />
            </div>
            <div className="absolute -bottom-4 start-4 flex items-center gap-2 rounded-full bg-cream px-4 py-2 text-xs font-medium text-burgundy shadow-md">
              <Bow className="h-3 w-5" /> Kenitra · Maroc
            </div>
          </div>
        </div>
      </section>

      <TrustBar />

      {/* CATEGORIES */}
      <section className="container-x mt-16">
        <Reveal className="mb-8 text-center">
          <h2 className="section-title">{t('home.categoriesTitle')}</h2>
          <p className="mt-2 text-sm text-choco/60">{t('home.categoriesSub')}</p>
        </Reveal>
        <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3">
          {CATEGORIES.map((c, i) => (
            <Reveal key={c.id} delay={i * 60}>
              <Link to={`/boutique?cat=${c.id}`} className="group relative block aspect-portrait overflow-hidden rounded-2xl">
                <Img src={c.cover} alt={t(`categories.${c.id}`)} className="transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-choco/75 via-choco/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-3 sm:p-5">
                  <span className="font-serif text-lg font-semibold leading-tight text-cream sm:text-2xl">{t(`categories.${c.id}`)}</span>
                  <Chevron className="mb-1 shrink-0 text-cream rtl:rotate-180" />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* NOUVEAUTES */}
      <section className="container-x mt-20">
        <Reveal className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="kicker">New in</p>
            <h2 className="section-title mt-1">{t('home.newTitle')}</h2>
            <p className="mt-1 text-sm text-choco/60">{t('home.newSub')}</p>
          </div>
          <Link to="/boutique" className="hidden shrink-0 text-sm text-burgundy underline-offset-4 hover:underline sm:block">{t('home.seeAll')}</Link>
        </Reveal>
        <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 md:grid-cols-4">
          {news.map((p, i) => <Reveal key={p.id} delay={(i % 4) * 60}><ProductCard product={p} /></Reveal>)}
        </div>
        <div className="mt-10 text-center"><Link to="/boutique" className="btn-outline">{t('home.seeAll')}</Link></div>
      </section>

      {/* BOUTIQUE */}
      <section className="mt-20 bg-white/60 py-16">
        <div className="container-x grid items-center gap-8 md:grid-cols-2">
          <Reveal>
            <p className="kicker">Kenitra</p>
            <h2 className="section-title mt-1">{t('home.storeTitle')}</h2>
            <p className="mt-4 max-w-md leading-relaxed text-choco/75">{t('home.storeText')}</p>
            <p className="mt-4 font-medium text-choco">{t('common.address')}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={SHOP.mapsLink} target="_blank" rel="noopener noreferrer" className="btn-primary">{t('home.directions')}</a>
              <a href={waLink(t('home.waHello'))} target="_blank" rel="noopener noreferrer" className="btn-outline"><WhatsApp size={18} /> WhatsApp</a>
            </div>
          </Reveal>
          <Reveal><StoreMap /></Reveal>
        </div>
      </section>

      {/* INSTAGRAM */}
      <section className="mt-20">
        <Reveal className="container-x mb-6 text-center">
          <h2 className="section-title">{t('home.igTitle')}</h2>
          <a href={SHOP.instagram} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-2 text-sm text-burgundy hover:underline" dir="ltr">
            <Insta width="16" /> {SHOP.instagramHandle}
          </a>
          <p className="mt-1 text-xs text-choco/60">{t('home.igSub')}</p>
        </Reveal>
        <div className="no-scrollbar flex snap-x gap-2 overflow-x-auto px-4 sm:grid sm:grid-cols-4 sm:gap-3 sm:overflow-visible sm:px-6 lg:grid-cols-8 mx-auto max-w-6xl">
          {IG.map((src, i) => (
            <a key={i} href={SHOP.instagram} target="_blank" rel="noopener noreferrer" className="group relative aspect-square w-36 shrink-0 snap-start overflow-hidden rounded-xl sm:w-auto" aria-label="Instagram">
              <Img src={src} alt="" className="transition duration-500 group-hover:scale-110" />
              <span className="absolute inset-0 flex items-center justify-center bg-burgundy/0 text-cream opacity-0 transition group-hover:bg-burgundy/40 group-hover:opacity-100"><Insta /></span>
            </a>
          ))}
        </div>
      </section>

      {/* AVIS (cartes vides : à remplir avec de vrais avis) */}
      <section className="container-x mt-20">
        <Reveal className="mb-8 text-center">
          <h2 className="section-title">{t('home.testiTitle')}</h2>
          <p className="mt-2 text-sm text-choco/60">{t('home.testiSub')}</p>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <Reveal key={i} delay={i * 80} className="flex min-h-40 flex-col items-center justify-center rounded-2xl border border-dashed border-burgundy/25 bg-white/50 p-6 text-center">
              <span className="text-lg tracking-widest text-blush">★★★★★</span>
              <p className="mt-3 font-serif text-lg italic text-choco/45">{t('home.testiEmpty')}</p>
            </Reveal>
          ))}
        </div>
        <div className="mt-6 text-center">
          <a href={waLink()} target="_blank" rel="noopener noreferrer" className="text-sm text-burgundy underline-offset-4 hover:underline">{t('home.testiCta')}</a>
        </div>
      </section>
    </>
  )
}
