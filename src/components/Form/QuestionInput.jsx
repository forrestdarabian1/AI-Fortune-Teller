import { MAX_QUESTION_LENGTH } from '../../api/fortuneTeller'

const PLACEHOLDERS = {
  general: 'What does the future hold for me?',
  love: 'Will I find harmony in my relationships?',
  career: 'What opportunities await in my work life?',
  health: 'What guidance is there for my wellbeing?',
  wealth: 'What fortunes lie on my financial horizon?',
  travel: 'Where might my next journey lead me?',
}

export default function QuestionInput({ category, value, onChange, disabled }) {
  const placeholder = PLACEHOLDERS[category] || PLACEHOLDERS.general
  const remaining = MAX_QUESTION_LENGTH - value.length

  return (
    <div>
      <label
        htmlFor="question"
        className="mb-3 block font-display text-xs font-bold tracking-[0.18em] text-ink uppercase"
      >
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
        className="min-h-[4.5rem] w-full resize-y rounded-xl border-2 border-ink bg-surface px-4 py-3 font-body text-base text-ink placeholder:text-muted/60 focus:border-ink focus:ring-4 focus:ring-brand focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
      />
      <span
        className={`mt-1.5 block text-right text-sm font-semibold ${remaining < 50 ? 'text-accent-orange' : 'text-muted'}`}
        aria-live="polite"
      >
        {value.length} / {MAX_QUESTION_LENGTH}
      </span>
    </div>
  )
}
