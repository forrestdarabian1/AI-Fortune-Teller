import { describe, expect, it } from 'vitest'
import { validateQuestion, VALID_CATEGORIES } from './fortuneTeller.js'

describe('validateQuestion', () => {
  it('returns null for empty or whitespace-only input', () => {
    expect(validateQuestion('')).toBeNull()
    expect(validateQuestion('   ')).toBeNull()
    expect(validateQuestion(null)).toBeNull()
    expect(validateQuestion(undefined)).toBeNull()
  })

  it('returns trimmed text for valid questions', () => {
    expect(validateQuestion('  What does tomorrow hold?  ')).toBe(
      'What does tomorrow hold?',
    )
  })

  it('throws when question exceeds max length', () => {
    const tooLong = 'a'.repeat(501)
    expect(() => validateQuestion(tooLong)).toThrow(
      'Question must be 500 characters or fewer.',
    )
  })
})

describe('VALID_CATEGORIES', () => {
  it('includes the six API categories', () => {
    expect(VALID_CATEGORIES).toEqual([
      'general',
      'love',
      'career',
      'health',
      'wealth',
      'travel',
    ])
  })
})
