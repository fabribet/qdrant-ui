import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '.';

describe('<Home>', () => {
  test('Renders the page title', () => {
    render(<Home />);
    const title = screen.getByText(/Qdrant Simplistic UI/i);
    expect(title).toBeInTheDocument();
  });
});
