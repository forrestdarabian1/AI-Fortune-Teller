export default function Header() {
  return (
    <header className="mb-10">
      <p className="mb-3 font-display text-xs font-bold tracking-[0.22em] text-ink uppercase">
        AI Fortune Teller
      </p>
      <h1 className="m-0 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-[clamp(2.25rem,8vw,3.75rem)] lowercase">
        <span>what&apos;s your</span>
        <span className="inline-block -rotate-1 bg-ink px-3 py-0.5 text-brand">
          fortune
        </span>
        <span aria-hidden="true">?</span>
      </h1>
      <p className="mt-4 mb-0 max-w-md text-lg font-medium text-ink/80">
        Pick a focus, ask the universe anything, and get a bold little reading —
        no crystal ball required.
      </p>
    </header>
  )
}
