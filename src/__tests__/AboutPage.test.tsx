import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import AboutPage from '../pages/AboutPage';

describe('AboutPage', () => {
  it('renders about page', () => {
    render(<AboutPage />);

    expect(screen.getByText('RS School React course')).toBeInTheDocument();
  });
});
