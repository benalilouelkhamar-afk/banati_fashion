import Reveal from './Reveal.jsx'

export default function SectionTitle({ kicker, title, sub, align = 'center', action }) {
  const center = align === 'center'
  return (
    <Reveal className={`mb-8 sm:mb-10 ${center ? 'text-center' : 'flex items-end justify-between gap-4'}`}>
      <div>
        {kicker && (
          <p className={`kicker flex items-center gap-3 ${center ? 'justify-center' : ''}`}>
            <span className="h-px w-8 bg-burgundy/40" />{kicker}{center && <span className="h-px w-8 bg-burgundy/40" />}
          </p>
        )}
        <h2 className="section-title mt-2">{title}</h2>
        {sub && <p className="mt-2 text-sm text-choco/60">{sub}</p>}
      </div>
      {action}
    </Reveal>
  )
}
