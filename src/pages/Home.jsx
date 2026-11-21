import { Link } from 'react-router-dom'
import products from '../data/products.json'
import { CATEGORIES, SHOP, waLink } from '../data/config.js'
import { useLang } from '../context/LangContext.jsx'
import { useOrder } from '../context/OrderContext.jsx'
import ProductCard from '../components/ProductCard.jsx'
import Reveal from '../components/Reveal.jsx'
import Img from '../components/Img.jsx'
import TrustBar from '../components/TrustBar.jsx'
import StoreMap from '../components/StoreMap.jsx'
import SectionTitle from '../components/SectionTitle.jsx'
import { Bow } from '../components/Logo.jsx'
import { WhatsApp, Insta, Chevron, Truck, Cash, Store } from '../components/Icons.jsx'

// photos de la bande Instagram (images statiques → lien vers le compte)
const IG = [42, 44, 28, 18, 37, 43, 6, 17].map((n) => `/images/products/product_${String(n).padStart(3, '0')}.jpg`)

export default function Home() {
  const { t } = useLang()
  const { openOrder } = useOrder()
  const news = products.filter((p) => p.is_new).slice(0, 8)

  const heroButtons = (
    <>
      <Link to="/boutique" className="btn-primary px-8">{t('home.discover')}</Link>
      <button onClick={() => openOrder()} className="btn-outline px-8">
        <WhatsApp size={18} /> {t('home.orderWa')}
      </button>
    </>
  )

  return (
    <>
      {/* HERO — mobile : photo plein écran ; desktop : éditorial en deux colonnes */}
      <section className="relative">
        <div className="md:hidden">
          <div className="relative h-[58svh] min-h-[380px] overflow-hidden bg-white">
            <Img src="/images/site/hero.jpg" alt="BANATI FASHION" eager fetchpriority="high" className="object-[50%_15%]" />
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-cream to-transparent" />
          </div>
          <div className="relative -mt-10 px-5 pb-10 text-center">
            <Bow className="mx-auto h-4 w-8 text-burgundy" />
            <p className="kicker mt-2">{t('home.kicker')}</p>
            <h1 className="mt-3 font-serif text-[2.4rem] font-semibold leading-[1.05] text-choco">{t('home.heroTitle')}</h1>
            <p className="mt-2 font-serif text-lg italic text-burgundy" dir="ltr">{t('brand.tagline')}</p>
            <div className="mt-6 flex flex-col gap-3">{heroButtons}</div>
          </div>
        </div>

        <div className="container-x hidden grid-cols-12 items-center gap-10 py-16 md:grid lg:py-20">
          <div className="col-span-6 lg:col-span-5">
            <p className="kicker flex items-center gap-3"><span className="h-px w-10 bg-burgundy/40" />{t('home.kicker')}</p>
            <h1 className="mt-5 font-serif text-6xl font-semibold leading-[1.02] text-choco lg:text-7xl">{t('home.heroTitle')}</h1>
            <p className="mt-4 font-serif text-2xl italic text-burgundy" dir="ltr">{t('brand.tagline')}</p>
            <p className="mt-6 max-w-md leading-relaxed text-choco/70">{t('home.heroText')}</p>
            <div className="mt-9 flex gap-3">{heroButtons}</div>
            <p className="mt-10 text-xs tracking-[0.35em] text-choco/45" dir="ltr">{t('brand.style').toUpperCase()}</p>
          </div>
          <div className="relative col-span-6 lg:col-span-7">
            <div className="ms-auto aspect-portrait w-[78%] overflow-hidden rounded-t-[999px] rounded-b-3xl shadow-2xl shadow-choco/15">
              <Img src="/images/site/hero.jpg" alt="BANATI FASHION" eager fetchpriority="high" />
            </div>
            <div className="absolute -bottom-6 start-0 aspect-portrait w-[38%] overflow-hidden rounded-2xl border-[6px] border-cream shadow-xl">
              <Img src="/images/products/product_044.jpg" alt="" />
            </div>
          </div>
        </div>
      </section>

      <TrustBar />

      {/* CATEGORIES */}
      <section className="container-x mt-16 sm:mt-24">
        <SectionTitle kicker={t('home.collection')} title={t('home.categoriesTitle')} sub={t('home.categoriesSub')} />
        <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3">
          {CATEGORIES.map((c, i) => (
            <Reveal key={c.id} delay={i * 60}>
              <Link to={`/boutique?cat=${c.id}`} className="group relative block aspect-portrait overflow-hidden rounded-2xl">
                <Img src={c.cover} alt={t(`categories.${c.id}`)} className="transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2a1712]/80 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-3 sm:p-5">
                  <span className="block font-serif text-lg font-semibold leading-tight text-cream sm:text-2xl">{t(`categories.${c.id}`)}</span>
                  <span className="mt-1 inline-flex items-center gap-1 text-[10px] font-medium uppercase tracking-[0.2em] text-blush sm:text-xs">
                    {t('nav.shop')} <Chevron width="12" className="rtl:rotate-180" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* NOUVEAUTES */}
      <section className="container-x mt-20 sm:mt-28">
        <SectionTitle kicker="New in" title={t('home.newTitle')} sub={t('home.newSub')} />
        <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 md:grid-cols-4">
          {news.map((p, i) => <Reveal key={p.id} delay={(i % 4) * 60}><ProductCard product={p} /></Reveal>)}
        </div>
        <div className="mt-10 text-center"><Link to="/boutique" className="btn-outline px-10">{t('home.seeAll')}</Link></div>
      </section>

      {/* EDITORIAL + POURQUOI NOUS */}
      <section className="mt-20 bg-choco text-cream sm:mt-28">
        <div className="container-x grid items-center gap-10 py-16 md:grid-cols-2 md:py-20">
          <Reveal className="grid grid-cols-2 gap-3">
            <div className="aspect-portrait overflow-hidden rounded-2xl"><Img src="/images/products/product_043.jpg" alt="" /></div>
            <div className="mt-10 aspect-portrait overflow-hidden rounded-2xl"><Img src="/images/products/product_046.jpg" alt="" /></div>
          </Reveal>
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-blush">BANATI FASHION</p>
            <h2 className="mt-3 font-serif text-4xl font-semibold leading-tight sm:text-5xl">{t('brand.style')}</h2>
            <p className="mt-4 max-w-md leading-relaxed text-cream/75">{t('home.editorial')}</p>
            <ul className="mt-8 space-y-5">
              {[[Store, 'why1'], [WhatsApp, 'why2'], [Cash, 'why3']].map(([Icon, k]) => (
                <li key={k} className="flex gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-cream/20 text-blush"><Icon size={20} width="20" height="20" /></span>
                  <span><span className="block font-medium">{t(`home.${k}`)}</span><span className="text-sm text-cream/65">{t(`home.${k}t`)}</span></span>
                </li>
              ))}
            </ul>
            <Link to="/notre-histoire" className="mt-9 inline-flex items-center gap-2 border-b border-blush pb-1 text-sm text-blush">{t('nav.about')} <Chevron width="14" className="rtl:rotate-180" /></Link>
          </Reveal>
        </div>
      </section>

      {/* BOUTIQUE */}
      <section className="container-x mt-20 sm:mt-28">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <Reveal>
            <p className="kicker flex items-center gap-3"><span className="h-px w-8 bg-burgundy/40" />Kenitra</p>
            <h2 className="section-title mt-2">{t('home.storeTitle')}</h2>
            <p className="mt-4 max-w-md leading-relaxed text-choco/75">{t('home.storeText')}</p>
            <p className="mt-5 font-medium text-choco">{t('common.address')}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href={SHOP.mapsLink} target="_blank" rel="noopener noreferrer" className="btn-primary">{t('home.directions')}</a>
              <a href={waLink(t('home.waHello'))} target="_blank" rel="noopener noreferrer" className="btn-outline"><WhatsApp size={18} /> WhatsApp</a>
            </div>
          </Reveal>
          <Reveal><StoreMap /></Reveal>
        </div>
      </section>

      {/* INSTAGRAM */}
      <section className="mt-20 sm:mt-28">
        <div className="container-x">
          <SectionTitle kicker="Instagram" title={t('home.igTitle')} sub={t('home.igSub')} />
        </div>
        <div className="no-scrollbar mx-auto flex max-w-6xl snap-x gap-2 overflow-x-auto px-4 sm:grid sm:grid-cols-4 sm:gap-3 sm:overflow-visible sm:px-6 lg:grid-cols-8">
          {IG.map((src, i) => (
            <a key={i} href={SHOP.instagram} target="_blank" rel="noopener noreferrer" className="group relative aspect-square w-36 shrink-0 snap-start overflow-hidden rounded-xl sm:w-auto" aria-label="Instagram">
              <Img src={src} alt="" className="transition duration-500 group-hover:scale-110" />
              <span className="absolute inset-0 flex items-center justify-center bg-burgundy/0 text-cream opacity-0 transition group-hover:bg-burgundy/40 group-hover:opacity-100"><Insta /></span>
            </a>
          ))}
        </div>
        <div className="mt-6 text-center">
          <a href={SHOP.instagram} target="_blank" rel="noopener noreferrer" className="btn-outline" dir="ltr"><Insta width="18" /> {SHOP.instagramHandle}</a>
        </div>
      </section>

      {/* AVIS (cartes vides : à remplir avec de vrais avis) */}
      <section className="container-x mt-20 sm:mt-28">
        <SectionTitle kicker="Reviews" title={t('home.testiTitle')} sub={t('home.testiSub')} />
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
