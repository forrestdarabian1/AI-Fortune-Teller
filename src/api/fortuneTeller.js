const API_URL = 'https://api.apiverve.com/v1/fortuneteller'
const MAX_QUESTION_LENGTH = 500

const VALID_CATEGORIES = [
  'general',
  'love',
  'career',
  'health',
  'wealth',
  'travel',
]

export function validateQuestion(question) {
  if (!question?.trim()) return null
  if (question.length > MAX_QUESTION_LENGTH) {
    throw new Error(`Question must be ${MAX_QUESTION_LENGTH} characters or fewer.`)
  }
  return question.trim()
}

export async function fetchFortune(category = 'general', question = '') {
  const apiKey = import.meta.env.VITE_API_KEY
  if (!apiKey) {
    throw new Error('Missing API key. Add VITE_API_KEY to your .env file.')
  }

  const trimmedQuestion = validateQuestion(question)

  const params = new URLSearchParams({ category })
  if (trimmedQuestion) {
    params.set('question', trimmedQuestion)
  }

  let response
  try {
    response = await fetch(`${API_URL}?${params}`, {
      method: 'GET',
      headers: {
        'X-API-Key': apiKey,
        Accept: 'application/json',
      },
    })
  } catch {
    throw new Error('Unable to reach the fortune teller. Check your connection and try again.')
  }

  let body
  try {
    body = await response.json()
  } catch {
    throw new Error('Received an invalid response from the server.')
  }

  if (!response.ok) {
    const message =
      body?.error ||
      body?.message ||
      `Request failed with status ${response.status}.`
    throw new Error(message)
  }

  if (body.status === 'error') {
    throw new Error(body.error || 'The fortune teller could not answer your question.')
  }

  if (!body.data) {
    throw new Error('No fortune data was returned.')
  }

  return body.data
}

export { VALID_CATEGORIES, MAX_QUESTION_LENGTH }
