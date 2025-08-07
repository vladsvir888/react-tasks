import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import BaseLayout from '../layouts/Base';
import { BrowserRouter } from 'react-router';
import ThemeProvider from '../providers/theme';
import ReduxProvider from '../providers/redux';

describe('BaseLayout', () => {
  it('renders base layout with header', () => {
    globalThis.matchMedia = vi.fn().mockReturnValue({
      matches: false,
    });

    render(
      <BrowserRouter>
        <ReduxProvider>
          <ThemeProvider>
            <BaseLayout />
          </ThemeProvider>
        </ReduxProvider>
      </BrowserRouter>
    );

    expect(screen.getByRole('banner')).toBeInTheDocument();
  });
});
