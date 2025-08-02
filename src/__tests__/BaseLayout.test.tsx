import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import BaseLayout from '../layouts/Base';
import { BrowserRouter } from 'react-router';
import ThemeProvider from '../components/theme/ThemeProvider';
import { Provider } from 'react-redux';
import store from '../store';

describe('BaseLayout', () => {
  it('renders base layout with header', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <ThemeProvider>
            <BaseLayout />
          </ThemeProvider>
        </Provider>
      </BrowserRouter>
    );

    expect(screen.getByRole('banner')).toBeInTheDocument();
  });
});
