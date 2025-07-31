import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import Pagination from '../components/Pagination';

const info = {
  count: 826,
  pages: 42,
  next: 'https://rickandmortyapi.com/api/character/?page=2',
  prev: null,
};
const info2 = {
  count: 826,
  pages: 42,
  next: 'https://rickandmortyapi.com/api/character/?page=3',
  prev: 'https://rickandmortyapi.com/api/character/?page=2',
};

describe('Pagination', () => {
  it('renders pagination with next link', () => {
    render(
      <BrowserRouter>
        <Pagination {...info} />
      </BrowserRouter>
    );

    expect(screen.getByText(`1 of ${info.pages}`)).toBeInTheDocument();
    expect(screen.queryByText('Prev')).not.toBeInTheDocument();
    expect(screen.getByText('Next')).toHaveAttribute('href', '/?page=2');
  });

  it('renders pagination with prev and next link', () => {
    render(
      <BrowserRouter>
        <Pagination {...info2} />
      </BrowserRouter>
    );

    expect(screen.getByText(`1 of ${info.pages}`)).toBeInTheDocument();
    expect(screen.getByText('Prev')).toHaveAttribute('href', '/?page=2');
    expect(screen.getByText('Next')).toHaveAttribute('href', '/?page=3');
  });
});
