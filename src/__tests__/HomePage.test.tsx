import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import HomePage from '../pages/HomePage';
import { BrowserRouter } from 'react-router';
import { Provider } from 'react-redux';
import store from '../store';

describe('HomePage', () => {
  it('renders home page', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <HomePage />
        </Provider>
      </BrowserRouter>
    );

    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
  });
});
