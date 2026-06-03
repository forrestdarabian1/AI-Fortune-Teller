export default function LoadingState() {
  return (
    <div className="px-4 py-10 text-center" role="status" aria-live="polite" aria-busy="true">
      <div
        className="mb-4 text-6xl drop-shadow-[0_0_12px_rgba(212,175,55,0.5)] motion-reduce:animate-none motion-safe:animate-pulse"
        aria-hidden="true"
      >
        🔮
      </div>
      <p className="m-0 font-display text-gold-light">Consulting the stars…</p>
      <p className="mt-2 text-base text-fortune-muted italic">The cosmos is weaving your fortune</p>
    </div>
  )
}
