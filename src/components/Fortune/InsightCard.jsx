import { REVEAL_BASE, REVEAL_DELAYS } from '../../lib/revealClasses'

export default function InsightCard({ insight }) {
  if (!insight) return null

  return (
    <aside
      className={`rounded-xl border border-purple/35 bg-purple/10 px-6 py-5 ${REVEAL_BASE} ${REVEAL_DELAYS.second}`}
    >
      <h3 className="m-0 mb-2 font-display text-sm tracking-widest text-purple-light uppercase">Insight</h3>
      <p className="m-0 text-fortune-muted">{insight}</p>
    </aside>
  )
}
