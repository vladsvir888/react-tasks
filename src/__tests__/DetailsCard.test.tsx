import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import DetailsCard from '../components/DetailsCard';
import type { Character } from '../types';
import { BrowserRouter } from 'react-router';

const item: Character = {
  id: 1,
  name: 'Rick Sanchez',
  gender: 'Male',
  status: 'Alive',
  species: 'Human',
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  url: 'https://rickandmortyapi.com/api/character/1',
};
const noDataMessage = 'No character';

describe('DetailsCard', () => {
  it('displays details card correctly', () => {
    render(
      <BrowserRouter>
        <DetailsCard data={item} loading={false} search="" />
      </BrowserRouter>
    );

    expect(screen.getByAltText('')).toBeInTheDocument();
    expect(screen.getByText(item.name)).toBeInTheDocument();
    expect(screen.getByText(`Gender: ${item.gender}`)).toBeInTheDocument();
    expect(screen.getByText(`Status: ${item.status}`)).toBeInTheDocument();
    expect(screen.getByText(`Species: ${item.species}`)).toBeInTheDocument();
  });

  it('displays skeleton while data is loading', () => {
    const { container } = render(
      <BrowserRouter>
        <DetailsCard data={null} loading={true} search="" />
      </BrowserRouter>
    );

    expect(container.querySelector('.skeleton')).toBeInTheDocument();
  });

  it(`displays message "${noDataMessage}" when no data`, () => {
    render(
      <BrowserRouter>
        <DetailsCard data={null} loading={false} search="" />
      </BrowserRouter>
    );

    expect(screen.getByText(noDataMessage)).toBeInTheDocument();
  });
});
