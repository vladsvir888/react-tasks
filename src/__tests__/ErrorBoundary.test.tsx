import ErrorBoundary from '../ErrorBoundary';
import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import Main from '../components/Main';

const textWithoutError = 'Everything is fine.';

describe('ErrorBoundary', () => {
  const realError = console.error;
  beforeEach(() => {
    console.error = vi.fn();
  });
  afterEach(() => {
    console.error = realError;
  });

  it('renders children when everything is fine', () => {
    render(
      <ErrorBoundary>
        <p>{textWithoutError}</p>
      </ErrorBoundary>
    );
    expect(screen.getByText(textWithoutError)).not.toBeNull();
  });

  it('displays fallback UI when error occurs', () => {
    render(
      <ErrorBoundary>
        <Main />
      </ErrorBoundary>
    );

    const errorButtonElement = screen.getByText('Make an error');
    fireEvent.click(errorButtonElement);

    expect(screen.getByText('Oops, something went wrong.')).not.toBeNull();
  });
});
