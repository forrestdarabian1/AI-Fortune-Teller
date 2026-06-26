import { REVEAL_BASE, REVEAL_DELAYS } from '../../lib/revealClasses'

export default function InsightCard({ insight }) {
  if (!insight) return null

  return (
    <aside
      className={`rounded-2xl border-[3px] border-ink bg-accent-blue px-6 py-5 shadow-[8px_8px_0_0_var(--color-ink)] ${REVEAL_BASE} ${REVEAL_DELAYS.second}`}
    >
      <h3 className="m-0 mb-2 font-display text-xs font-bold tracking-[0.18em] text-ink uppercase">
        Insight
      </h3>
      <p className="m-0 text-lg font-medium text-ink">{insight}</p>
    </aside>
  )
}
