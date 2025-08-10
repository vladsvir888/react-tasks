import { render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi, type Mock } from 'vitest';
import Main from '../components/Main';
import { BrowserRouter } from 'react-router';
import ReduxProvider from '../providers/redux';
import { useGetCharacterQuery } from '../store/api';

const TestWrapper = () => {
  return (
    <BrowserRouter>
      <ReduxProvider>
        <Main />
      </ReduxProvider>
    </BrowserRouter>
  );
};

const mockData = {
  info: {
    count: 826,
    pages: 42,
    next: 'https://rickandmortyapi.com/api/character?page=2',
    prev: null,
  },
  results: [
    {
      id: 1,
      name: 'Rick Sanchez',
      status: 'Alive',
      species: 'Human',
      gender: 'Male',
    },
  ],
};
const mockDataError = {
  error: 'There is nothing here',
};

describe('Main', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it('fetches and displays results', async () => {
    (useGetCharacterQuery as Mock).mockReturnValue({
      data: mockData,
      isFetching: false,
      error: undefined,
      refetch: vi.fn(),
    });

    const { container } = render(<TestWrapper />);

    await waitFor(() => {
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
      expect(container.querySelector('.pagination')).toBeInTheDocument();
    });
  });

  it('fetches and displays error', async () => {
    (useGetCharacterQuery as Mock).mockReturnValue({
      data: mockDataError,
      isFetching: false,
      error: undefined,
      refetch: vi.fn(),
    });

    const { container } = render(<TestWrapper />);

    await waitFor(() => {
      expect(screen.getByText(mockDataError.error)).toBeInTheDocument();
      expect(container.querySelector('.pagination')).not.toBeInTheDocument();
    });
  });

  it('handles fetch error successfully', async () => {
    (useGetCharacterQuery as Mock).mockReturnValue({
      data: null,
      isFetching: false,
      error: 'Some error',
      refetch: vi.fn(),
    });

    render(<TestWrapper />);

    await waitFor(() => {
      expect(screen.getByText(mockDataError.error)).toBeInTheDocument();
    });
  });
});
