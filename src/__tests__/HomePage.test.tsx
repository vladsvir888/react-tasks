import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import HomePage from '../pages/HomePage';
import { BrowserRouter } from 'react-router';
import ReduxProvider from '../providers/redux';

describe('HomePage', () => {
  it('renders home page', () => {
    render(
      <BrowserRouter>
        <ReduxProvider>
          <HomePage />
        </ReduxProvider>
      </BrowserRouter>
    );

    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
  });
});
