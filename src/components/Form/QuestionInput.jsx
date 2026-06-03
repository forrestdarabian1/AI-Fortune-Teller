import { MAX_QUESTION_LENGTH } from '../../api/fortuneTeller'

const PLACEHOLDERS = {
  general: 'What does the future hold for me?',
  love: 'Will I find harmony in my relationships?',
  career: 'What opportunities await in my work life?',
  health: 'What guidance do the stars offer for my wellbeing?',
  wealth: 'What fortunes lie on my financial horizon?',
  travel: 'Where might my next journey lead me?',
}

export default function QuestionInput({ category, value, onChange, disabled }) {
  const placeholder = PLACEHOLDERS[category] || PLACEHOLDERS.general
  const remaining = MAX_QUESTION_LENGTH - value.length

  return (
    <div>
      <label htmlFor="question" className="mb-2 block font-display text-sm font-semibold tracking-wider text-gold uppercase">
        Your question (optional)
      </label>
      <textarea
        id="question"
        name="question"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={MAX_QUESTION_LENGTH}
        rows={3}
        disabled={disabled}
        className="min-h-[4.5rem] w-full resize-y rounded-lg border border-gold/25 bg-black/30 px-4 py-3 font-body text-base text-fortune-text placeholder:text-fortune-muted/70 focus:border-gold focus:ring-2 focus:ring-gold/20 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
      />
      <span
        className={`mt-1 block text-right text-sm ${remaining < 50 ? 'text-gold' : 'text-fortune-muted'}`}
        aria-live="polite"
      >
        {value.length} / {MAX_QUESTION_LENGTH}
      </span>
    </div>
  )
}
