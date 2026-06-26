export default function AppShell({ children }) {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <main className="relative z-10 mx-auto max-w-[680px] px-5 py-10 pb-20">{children}</main>
    </div>
  )
}
