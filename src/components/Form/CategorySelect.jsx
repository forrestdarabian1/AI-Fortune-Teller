import { VALID_CATEGORIES } from '../../api/fortuneTeller'

const CATEGORY_LABELS = {
  general: 'General',
  love: 'Love',
  career: 'Career',
  health: 'Health',
  wealth: 'Wealth',
  travel: 'Travel',
}

export default function CategorySelect({ value, onChange, disabled }) {
  return (
    <fieldset disabled={disabled}>
      <legend>Choose your focus</legend>
      <div className="flex flex-wrap gap-2.5" role="radiogroup" aria-label="Fortune category">
        {VALID_CATEGORIES.map((cat) => {
          const isActive = value === cat
          return (
            <label
              key={cat}
              className={`cursor-pointer rounded-full border-2 border-ink px-4 py-1.5 font-display text-sm font-semibold transition-colors ${
                isActive
                  ? 'bg-ink text-brand'
                  : 'bg-surface text-ink hover:bg-cream'
              } ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
            >
              <input
                type="radio"
                name="category"
                value={cat}
                checked={isActive}
                onChange={() => onChange(cat)}
                disabled={disabled}
                className="sr-only"
              />
              {CATEGORY_LABELS[cat]}
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}
