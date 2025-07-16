import { render, screen } from '@testing-library/react';
import App from './App';

test('renders All-Star Vibe heading', () => {
  render(<App />);
  const heading = screen.getByText(/All-Star Vibe/i);
  expect(heading).toBeInTheDocument();
});
