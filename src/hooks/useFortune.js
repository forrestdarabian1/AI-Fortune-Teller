import { useCallback, useState } from 'react'
import { fetchFortune } from '../api/fortuneTeller'

export function useFortune() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [fortune, setFortune] = useState(null)

  const clearError = useCallback(() => setError(null), [])

  const revealFortune = useCallback(async (category, question) => {
    setLoading(true)
    setError(null)

    try {
      const data = await fetchFortune(category, question)
      setFortune(data)
    } catch (err) {
      setFortune(null)
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [])

  const reset = useCallback(() => {
    setFortune(null)
    setError(null)
  }, [])

  return { loading, error, fortune, revealFortune, clearError, reset }
}
