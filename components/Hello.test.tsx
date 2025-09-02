import { render, screen } from '@testing-library/react'
import Hello from './Hello'

describe('Hello', () => {
  it('renders greeting', () => {
    render(<Hello />)
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })
})
