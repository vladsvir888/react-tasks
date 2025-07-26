import ErrorBoundary from '../ErrorBoundary';
import { render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const textWithoutError = 'Everything is fine.';

describe('ErrorBoundary', () => {
  const realError = console.error;

  const ThrowError = () => {
    throw new Error('Test');
  };

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

    expect(screen.getByText(textWithoutError)).toBeInTheDocument();
  });

  it('displays fallback UI when error occurs', () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(screen.getByText('Oops, something went wrong.')).toBeInTheDocument();
  });
});
