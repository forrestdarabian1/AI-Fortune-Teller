export default function LoadingState() {
  return (
    <div
      className="flex flex-col items-center gap-4 rounded-2xl border-[3px] border-ink bg-surface px-6 py-10 text-center shadow-[8px_8px_0_0_var(--color-ink)]"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <span
        className="size-10 animate-spin rounded-full border-4 border-ink/20 border-t-ink motion-reduce:animate-none"
        aria-hidden="true"
      />
      <p className="m-0 font-display text-lg font-bold lowercase text-ink">reading the signs…</p>
      <p className="m-0 text-base font-medium text-muted">Lining up your fortune.</p>
    </div>
  )
}
