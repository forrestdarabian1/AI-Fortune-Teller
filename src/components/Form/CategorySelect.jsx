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
      <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Fortune category">
        {VALID_CATEGORIES.map((cat) => {
          const isActive = value === cat
          return (
            <label
              key={cat}
              className={`cursor-pointer rounded-full border px-4 py-2 text-sm transition-colors ${
                isActive
                  ? 'border-gold bg-gold/15 text-gold-light'
                  : 'border-gold/25 bg-black/20 text-fortune-muted hover:border-gold hover:text-fortune-text'
              } ${disabled ? 'cursor-not-allowed opacity-60' : ''}`}
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
