export default function RevealButton({ loading, disabled }) {
  return (
    <button
      type="submit"
      disabled={disabled || loading}
      className="flex w-full items-center justify-center gap-2.5 rounded-xl border-[3px] border-ink bg-ink px-6 py-3.5 font-display text-base font-bold tracking-wide text-brand shadow-[4px_4px_0_0_var(--color-ink)] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-brand hover:text-ink hover:shadow-none disabled:cursor-not-allowed disabled:opacity-60 motion-reduce:transition-none motion-reduce:hover:translate-x-0 motion-reduce:hover:translate-y-0"
    >
      {loading ? (
        <>
          <span
            className="size-4 shrink-0 animate-spin rounded-full border-2 border-brand/40 border-t-brand motion-reduce:animate-none"
            aria-hidden="true"
          />
          Reading the signs…
        </>
      ) : (
        'Reveal my fortune'
      )}
    </button>
  )
}
