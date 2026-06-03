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
      className="flex flex-col gap-5 rounded-xl border border-gold/25 bg-bg-card p-6 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-md"
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
