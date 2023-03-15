import React from 'react';
import { render, screen } from '@testing-library/react';
import Sidebar from '.';
import { MemoryRouter } from 'react-router-dom';

describe('<Sidebar>', () => {
  test('Renders links components', () => {
    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    );
    const homeLink = screen.getByText(/Home/i);
    const collecionsLink = screen.getByText(/Collections/i);
    expect(homeLink).toBeInTheDocument();
    expect(collecionsLink).toBeInTheDocument();
  });

  test('Selects active page', () => {
    render(
      <MemoryRouter initialEntries={['/collections']}>
        <Sidebar />
      </MemoryRouter>
    );
    const homeLink =
      screen.getByText(/Collections/i).parentElement?.parentElement;
    expect(homeLink).toHaveClass('Mui-selected');
  });
});
