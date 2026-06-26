export default function ErrorMessage({ message, onDismiss }) {
  if (!message) return null

  return (
    <div
      className="flex items-start justify-between gap-4 rounded-2xl border-[3px] border-ink bg-accent-orange px-5 py-4 shadow-[8px_8px_0_0_var(--color-ink)]"
      role="alert"
      aria-live="assertive"
    >
      <p className="m-0 font-medium text-ink">{message}</p>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss error"
          className="shrink-0 rounded-md border-2 border-ink px-2 text-lg leading-none font-bold text-ink transition hover:bg-ink hover:text-accent-orange"
        >
          ×
        </button>
      )}
    </div>
  )
}
