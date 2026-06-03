export default function ErrorMessage({ message, onDismiss }) {
  if (!message) return null

  return (
    <div
      className="flex items-start justify-between gap-4 rounded-lg border border-fortune-error bg-fortune-error/15 px-5 py-4"
      role="alert"
      aria-live="assertive"
    >
      <p className="m-0 text-fortune-error">{message}</p>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss error"
          className="shrink-0 rounded px-1 text-xl leading-none text-fortune-error transition hover:bg-fortune-error/20"
        >
          ×
        </button>
      )}
    </div>
  )
}
