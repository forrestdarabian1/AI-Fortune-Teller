export default function AppShell({ children }) {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[radial-gradient(ellipse_at_50%_0%,var(--color-bg-mid)_0%,var(--color-bg-deep)_60%)]">
      <div className="stars" aria-hidden="true" />
      <main className="relative z-10 mx-auto max-w-[640px] px-5 py-8 pb-16">{children}</main>
    </div>
  )
}
