import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import HomePage from '../pages/HomePage';
import { BrowserRouter } from 'react-router';

describe('HomePage', () => {
  it('renders home page', () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
  });
});
