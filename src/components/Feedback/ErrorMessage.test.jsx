import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import ErrorMessage from './ErrorMessage.jsx'

describe('ErrorMessage', () => {
  it('renders nothing when message is empty', () => {
    const { container } = render(<ErrorMessage message="" />)
    expect(container.firstChild).toBeNull()
  })

  it('renders the message with alert semantics', () => {
    render(<ErrorMessage message="The stars are cloudy." />)
    const alert = screen.getByRole('alert')
    expect(alert).toHaveTextContent('The stars are cloudy.')
  })
})
