// App.test.jsx

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from './App';

describe('App component', () => {
  it('renders the main heading', () => {
    render(<App />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      /vite \+ react/i
    );
  });

  it('renders the count button', () => {
    render(<App />);
    expect(screen.getByRole('button')).toHaveTextContent(/count is/i);
  });
  it('increment count after button click', async () => {
    const user = userEvent.setup();
    render(<App />);
    const button = screen.getByRole('button', { name: 'count is 0' });
    await user.click(button);

    expect(screen.getByRole('button').textContent).toMatch(/count is 1/i);
  });
  it('renders the Vite logo link', () => {
    render(<App />);
    const viteLink = screen.getByRole('link', { name: /vite logo/i });
    expect(viteLink).toHaveAttribute('href', 'https://vite.dev');
  });

  it('renders the React logo link', () => {
    render(<App />);
    const reactLink = screen.getByRole('link', { name: /react logo/i });
    expect(reactLink).toHaveAttribute('href', 'https://react.dev');
  });
});
