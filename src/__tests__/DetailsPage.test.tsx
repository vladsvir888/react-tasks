import { render, screen, waitFor } from '@testing-library/react';
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
  type Mock,
} from 'vitest';
import { BrowserRouter } from 'react-router';
import DetailsPage from '../pages/DetailsPage';
import type { Character } from '../types';

const DetailsWithRouter = () => {
  return (
    <BrowserRouter>
      <DetailsPage />
    </BrowserRouter>
  );
};

const mockData: Character = {
  id: 2,
  name: 'Morty Smith',
  status: 'Alive',
  species: 'Human',
  gender: 'Male',
  image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
  url: 'https://rickandmortyapi.com/api/character/2',
};

describe('DetailsPage', () => {
  beforeEach(() => {
    globalThis.fetch = vi.fn();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('fetches and displays details data', async () => {
    (globalThis.fetch as Mock).mockResolvedValue({
      json: async () => mockData,
    });

    render(<DetailsWithRouter />);

    await waitFor(() => {
      expect(screen.getByAltText('')).toBeInTheDocument();
      expect(screen.getByText(mockData.name)).toBeInTheDocument();
      expect(
        screen.getByText(`Gender: ${mockData.gender}`)
      ).toBeInTheDocument();
      expect(
        screen.getByText(`Status: ${mockData.status}`)
      ).toBeInTheDocument();
      expect(
        screen.getByText(`Species: ${mockData.species}`)
      ).toBeInTheDocument();
    });
  });

  it('handles fetch error successfully', async () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    (globalThis.fetch as Mock).mockRejectedValue(new Error('Fetch failed'));

    render(<DetailsWithRouter />);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalled();
    });
  });
});
