import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import NotFoundPage from '../pages/NotFoundPage';
import { BrowserRouter } from 'react-router';

describe('NotFoundPage', () => {
  it('renders not found page', () => {
    render(
      <BrowserRouter>
        <NotFoundPage />
      </BrowserRouter>
    );

    expect(screen.getByText('404')).toBeInTheDocument();
  });
});
