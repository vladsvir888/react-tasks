import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import BaseLayout from '../layouts/Base';
import { BrowserRouter } from 'react-router';
import ThemeProvider from '../components/theme/ThemeProvider';

describe('BaseLayout', () => {
  it('renders base layout with header', () => {
    render(
      <BrowserRouter>
        <ThemeProvider>
          <BaseLayout />
        </ThemeProvider>
      </BrowserRouter>
    );

    expect(screen.getByRole('banner')).toBeInTheDocument();
  });
});
