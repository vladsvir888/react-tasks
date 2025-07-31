import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import type { Character } from '../types';
import Results from '../components/Results';
import { BrowserRouter } from 'react-router';

const data: Character[] = [
  {
    id: 1,
    name: 'Rick Sanchez',
    gender: 'Male',
    species: 'Human',
    status: 'Alive',
    image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
  },
  {
    id: 2,
    name: 'Morty Smith',
    gender: 'Male',
    species: 'Human',
    status: 'Alive',
    image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
  },
];

const emptyData: Character[] = [];

const errorMessage = 'There is nothing here';
const noResultsMessage = 'no results';

describe('Results', () => {
  it('renders correct number of items when data is provided', () => {
    const { container } = render(
      <BrowserRouter>
        <Results results={data} loading={false} />
      </BrowserRouter>
    );

    const listElementItems = container.querySelectorAll('.results ul li');
    expect(listElementItems.length).toEqual(data.length);
  });

  it(`displays ${noResultsMessage} message when data array is empty`, () => {
    render(<Results results={emptyData} loading={false} />);

    const noResultsElement = screen.getByText(noResultsMessage);
    expect(noResultsElement).toBeInTheDocument();
  });

  it('correctly displays item names and descriptions', () => {
    const { container } = render(
      <BrowserRouter>
        <Results results={data} loading={false} />
      </BrowserRouter>
    );

    const resultsElement = container.querySelector('.results');
    const listElementItems = resultsElement?.querySelectorAll('ul li');
    listElementItems?.forEach((item, index) => {
      const dataItem = data[index];

      const nameElement = item.querySelector('a');
      expect(nameElement?.textContent).toEqual(dataItem.name);

      const descriptionElement = item.querySelector('p');
      const description = `${dataItem.gender}, ${dataItem.species}, ${dataItem.status}`;
      expect(descriptionElement?.textContent).toEqual(description);
    });
  });

  it('shows loading state while fetching data', () => {
    const { container } = render(
      <BrowserRouter>
        <Results results={emptyData} loading={true} />
      </BrowserRouter>
    );

    const skeletonElement = container.querySelector('.skeleton');
    expect(skeletonElement).toBeInTheDocument();
  });

  it('displays error message when API call fails', () => {
    render(
      <BrowserRouter>
        <Results results={emptyData} loading={false} error={errorMessage} />
      </BrowserRouter>
    );

    const errorMessageElement = screen.getByText(errorMessage);
    expect(errorMessageElement).toBeInTheDocument();
  });
});
