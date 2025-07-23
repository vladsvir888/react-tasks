import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
  type Mock,
} from 'vitest';
import Main from '../components/Main';

const searchQuery = 'Rick';
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
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('fetches and displays results', async () => {
    (global.fetch as Mock).mockResolvedValue({
      json: async () => mockData,
    });

    const { container } = render(<Main />);

    expect(container.querySelector('.skeleton')).not.toBeNull();

    await waitFor(() => {
      expect(screen.getByText('Rick Sanchez')).not.toBeNull();
      expect(container.querySelector('.pagination')).not.toBeNull();
    });
  });

  it('fetches and displays error', async () => {
    (global.fetch as Mock).mockResolvedValue({
      json: async () => mockDataError,
    });

    const { container } = render(<Main />);

    expect(container.querySelector('.skeleton')).not.toBeNull();

    await waitFor(() => {
      expect(screen.getByText('no results')).not.toBeNull();
      expect(container.querySelector('.pagination')).toBeNull();
    });
  });

  it('calls api with correct name parameter', async () => {
    (global.fetch as Mock).mockResolvedValue({
      json: async () => mockData,
    });
    const { container } = render(<Main />);

    const searchInputElement = container.querySelector(
      '.search-input input'
    ) as HTMLInputElement;
    fireEvent.change(searchInputElement, { target: { value: searchQuery } });
    expect(searchInputElement.value).toEqual(searchQuery);

    const searchButtonElement = container.querySelector(
      '.search-button'
    ) as HTMLButtonElement;
    fireEvent.click(searchButtonElement);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        `${import.meta.env.VITE_API_URL}/character/?name=${searchQuery}`
      );
    });
  });
});
