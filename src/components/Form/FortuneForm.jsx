import { useState } from 'react'
import CategorySelect from './CategorySelect'
import QuestionInput from './QuestionInput'
import RevealButton from './RevealButton'

export default function FortuneForm({ onSubmit, loading }) {
  const [category, setCategory] = useState('general')
  const [question, setQuestion] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    onSubmit(category, question)
  }

  return (
    <form
      className="flex flex-col gap-6 rounded-2xl border-[3px] border-ink bg-surface p-6 shadow-[8px_8px_0_0_var(--color-ink)] sm:p-7"
      onSubmit={handleSubmit}
      noValidate
    >
      <CategorySelect value={category} onChange={setCategory} disabled={loading} />
      <QuestionInput
        category={category}
        value={question}
        onChange={setQuestion}
        disabled={loading}
      />
      <RevealButton loading={loading} disabled={loading} />
    </form>
  )
}
