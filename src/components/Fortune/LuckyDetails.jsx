import { REVEAL_BASE, REVEAL_DELAYS } from '../../lib/revealClasses'

const COLOR_MAP = {
  red: '#e74c3c',
  orange: '#e67e22',
  yellow: '#f1c40f',
  green: '#2ecc71',
  blue: '#3498db',
  purple: '#9b59b6',
  pink: '#e91e8c',
  gold: '#d4af37',
  silver: '#c0c0c0',
  white: '#f5f5f5',
  black: '#1a1a2e',
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
      className={`rounded-xl border border-gold/25 bg-bg-card px-6 py-5 ${REVEAL_BASE} ${REVEAL_DELAYS.third}`}
      aria-label="Lucky details"
    >
      <h3 className="m-0 mb-4 font-display text-sm tracking-widest text-gold uppercase">Lucky signs</h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {luckyNumbers?.length > 0 && (
          <div className="flex flex-col gap-1">
            <span className="text-xs tracking-wide text-fortune-muted uppercase">Numbers</span>
            <span className="font-display tracking-wide text-gold-light">{luckyNumbers.join(', ')}</span>
          </div>
        )}
        {luckyColor && (
          <div className="flex flex-col gap-1">
            <span className="text-xs tracking-wide text-fortune-muted uppercase">Color</span>
            <span className="flex items-center gap-2">
              {swatchColor && (
                <span
                  className="inline-block size-5 shrink-0 rounded-full border border-gold/25"
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
            <span className="text-xs tracking-wide text-fortune-muted uppercase">Element</span>
            <span>{luckyElement}</span>
          </div>
        )}
        {luckyDay && (
          <div className="flex flex-col gap-1">
            <span className="text-xs tracking-wide text-fortune-muted uppercase">Day</span>
            <span>{luckyDay}</span>
          </div>
        )}
      </div>
    </section>
  )
}
