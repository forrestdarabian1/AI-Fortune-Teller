export default function Header() {
  return (
    <header className="mb-8 text-center">
      <div
        className="mb-2 text-5xl drop-shadow-[0_0_12px_rgba(212,175,55,0.5)] motion-reduce:animate-none motion-safe:animate-pulse"
        aria-hidden="true"
      >
        🔮
      </div>
      <h1 className="m-0 mb-2 font-display text-[clamp(1.75rem,5vw,2.5rem)] text-gold-light drop-shadow-[0_0_20px_rgba(212,175,55,0.3)]">
        AI Fortune Teller
      </h1>
      <p className="m-0 text-lg text-fortune-muted italic">The stars align to reveal what awaits you</p>
    </header>
  )
}
