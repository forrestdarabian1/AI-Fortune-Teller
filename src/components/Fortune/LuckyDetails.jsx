import { REVEAL_BASE, REVEAL_DELAYS } from '../../lib/revealClasses'

const COLOR_MAP = {
  red: '#e74c3c',
  orange: '#f37032',
  yellow: '#fdc115',
  green: '#a4cf57',
  blue: '#27b0c2',
  purple: '#9b59b6',
  pink: '#e91e8c',
  gold: '#d4af37',
  silver: '#c0c0c0',
  white: '#f5f5f5',
  black: '#000000',
  brown: '#8b4513',
  wood: '#8b6914',
  fire: '#ff4500',
  water: '#1e90ff',
  earth: '#6b4423',
}

function resolveColor(name) {
  if (!name) return null
  const key = name.toLowerCase()
  return COLOR_MAP[key] || null
}

export default function LuckyDetails({
  luckyNumbers,
  luckyColor,
  luckyElement,
  luckyDay,
}) {
  const swatchColor = resolveColor(luckyColor)

  return (
    <section
      className={`rounded-2xl border-[3px] border-ink bg-surface px-6 py-5 shadow-[8px_8px_0_0_var(--color-ink)] ${REVEAL_BASE} ${REVEAL_DELAYS.third}`}
      aria-label="Lucky details"
    >
      <h3 className="m-0 mb-4 font-display text-xs font-bold tracking-[0.18em] text-ink uppercase">
        Lucky signs
      </h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {luckyNumbers?.length > 0 && (
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold tracking-[0.14em] text-muted uppercase">Numbers</span>
            <span className="font-display text-lg font-bold tracking-wide text-ink">{luckyNumbers.join(', ')}</span>
          </div>
        )}
        {luckyColor && (
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold tracking-[0.14em] text-muted uppercase">Color</span>
            <span className="flex items-center gap-2 font-display font-bold text-ink">
              {swatchColor && (
                <span
                  className="inline-block size-5 shrink-0 rounded-full border-2 border-ink"
                  style={{ backgroundColor: swatchColor }}
                  aria-hidden="true"
                />
              )}
              {luckyColor}
            </span>
          </div>
        )}
        {luckyElement && (
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold tracking-[0.14em] text-muted uppercase">Element</span>
            <span className="font-display font-bold text-ink">{luckyElement}</span>
          </div>
        )}
        {luckyDay && (
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold tracking-[0.14em] text-muted uppercase">Day</span>
            <span className="font-display font-bold text-ink">{luckyDay}</span>
          </div>
        )}
      </div>
    </section>
  )
}
