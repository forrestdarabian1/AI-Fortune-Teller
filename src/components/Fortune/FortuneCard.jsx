import { REVEAL_BASE, REVEAL_DELAYS } from '../../lib/revealClasses'

const CATEGORY_LABELS = {
  general: 'General',
  love: 'Love',
  career: 'Career',
  health: 'Health',
  wealth: 'Wealth',
  travel: 'Travel',
}

export default function FortuneCard({ fortune, timeframe, category }) {
  const label = CATEGORY_LABELS[category] || category

  return (
    <article
      className={`rounded-xl border border-gold/25 bg-bg-card p-6 shadow-[0_8px_32px_rgba(0,0,0,0.4)] ${REVEAL_BASE} ${REVEAL_DELAYS.first}`}
    >
      <span className="mb-4 inline-block rounded-full border border-purple bg-purple/25 px-3 py-1 font-display text-xs tracking-widest text-purple-light uppercase">
        {label}
      </span>
      <blockquote className="m-0 text-xl leading-relaxed text-fortune-text italic">{fortune}</blockquote>
      {timeframe && <p className="mt-4 mb-0 text-[0.95rem] text-gold">{timeframe}</p>}
    </article>
  )
}
