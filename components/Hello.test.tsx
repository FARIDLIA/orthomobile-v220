import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Hello from './Hello';

describe('Hello', () => {
  it('renders heading level 1', () => {
    render(<Hello />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Hello world');
  });

  it('renders no other text', () => {
    const { container } = render(<Hello />);
    expect(container).toHaveTextContent(/^Hello world$/);
  });
});
