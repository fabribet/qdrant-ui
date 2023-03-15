import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { MemoryRouter } from 'react-router-dom';

describe('<App>', () => {
  test('renders Home page title', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const homeTitle = screen.getByText(/Qdrant Simplistic UI/i);
    expect(homeTitle).toBeInTheDocument();
  });
});
