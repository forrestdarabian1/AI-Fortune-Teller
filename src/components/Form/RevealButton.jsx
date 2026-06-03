export default function RevealButton({ loading, disabled }) {
  return (
    <button
      type="submit"
      disabled={disabled || loading}
      className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-br from-gold to-[#b8962e] px-6 py-3.5 font-display text-base font-semibold tracking-wide text-bg-deep transition hover:-translate-y-px hover:shadow-[0_4px_20px_rgba(212,175,55,0.4)] disabled:cursor-not-allowed disabled:opacity-70 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
    >
      {loading ? (
        <>
          <span
            className="size-4 shrink-0 animate-spin rounded-full border-2 border-bg-deep/30 border-t-bg-deep motion-reduce:animate-none"
            aria-hidden="true"
          />
          Consulting the stars…
        </>
      ) : (
        'Reveal my fortune'
      )}
    </button>
  )
}
