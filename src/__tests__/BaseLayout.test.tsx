import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import BaseLayout from '../layouts/Base';
import { BrowserRouter } from 'react-router';
import ThemeProvider from '../providers/theme';
import ReduxProvider from '../providers/redux';

describe('BaseLayout', () => {
  it('renders base layout with header', () => {
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
