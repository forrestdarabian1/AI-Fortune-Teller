import AppShell from './components/Layout/AppShell'
import Header from './components/Layout/Header'
import FortuneForm from './components/Form/FortuneForm'
import FortuneReveal from './components/Fortune/FortuneReveal'
import LoadingState from './components/Feedback/LoadingState'
import ErrorMessage from './components/Feedback/ErrorMessage'
import { useFortune } from './hooks/useFortune'

function App() {
  const { loading, error, fortune, revealFortune, clearError } = useFortune()

  return (
    <AppShell>
      <Header />
      <div className="flex flex-col gap-6">
        <FortuneForm onSubmit={revealFortune} loading={loading} />
        <ErrorMessage message={error} onDismiss={clearError} />
        {loading && <LoadingState />}
        {!loading && fortune && <FortuneReveal data={fortune} />}
      </div>
    </AppShell>
  )
}

export default App
