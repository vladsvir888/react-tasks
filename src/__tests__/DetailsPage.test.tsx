import { render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi, type Mock } from 'vitest';
import { BrowserRouter } from 'react-router';
import DetailsPage from '../pages/DetailsPage';
import type { Character } from '../types';
import { useGetCharacterByIdQuery } from '../store/api';
import ReduxProvider from '../providers/redux';

const DetailsWithRouter = () => {
  return (
    <BrowserRouter>
      <ReduxProvider>
        <DetailsPage />
      </ReduxProvider>
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
  afterEach(() => {
    vi.resetAllMocks();
  });

  it('fetches and displays details data', async () => {
    (useGetCharacterByIdQuery as Mock).mockReturnValue({
      data: mockData,
      isFetching: false,
      error: undefined,
      refetch: vi.fn(),
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
    (useGetCharacterByIdQuery as Mock).mockReturnValue({
      data: null,
      isFetching: false,
      error: 'Some error',
      refetch: vi.fn(),
    });

    render(<DetailsWithRouter />);

    await waitFor(() => {
      expect(screen.getByText('No character')).toBeInTheDocument();
    });
  });
});
