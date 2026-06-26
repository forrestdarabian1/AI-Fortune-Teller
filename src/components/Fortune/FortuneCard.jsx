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
      className={`rounded-2xl border-[3px] border-ink bg-brand p-6 shadow-[8px_8px_0_0_var(--color-ink)] sm:p-7 ${REVEAL_BASE} ${REVEAL_DELAYS.first}`}
    >
      <span className="mb-4 inline-block rounded-full border-2 border-ink bg-ink px-3 py-1 font-display text-xs font-bold tracking-[0.18em] text-brand uppercase">
        {label}
      </span>
      <blockquote className="m-0 font-display text-2xl leading-snug font-semibold text-ink">
        {fortune}
      </blockquote>
      {timeframe && (
        <p className="mt-4 mb-0 font-display text-sm font-bold tracking-wide text-ink/70 uppercase">
          {timeframe}
        </p>
      )}
    </article>
  )
}
