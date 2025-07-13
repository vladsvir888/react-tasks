import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import type { Character } from '../types';
import Results from '../components/Results';

const data: Character[] = [
  {
    id: 1,
    name: 'Rick Sanchez',
    gender: 'Male',
    species: 'Human',
    status: 'Alive',
  },
  {
    id: 2,
    name: 'Morty Smith',
    gender: 'Male',
    species: 'Human',
    status: 'Alive',
  },
];

const emptyData: Character[] = [];

const errorMessage = 'There is nothing here';
const noResultsMessage = 'no results';

describe('Results', () => {
  it('renders correct number of items when data is provided', () => {
    const { container } = render(<Results results={data} loading={false} />);
    const listElementItems = container.querySelectorAll('.results ul li');
    expect(listElementItems.length).toEqual(data.length);
  });

  it(`displays ${noResultsMessage} message when data array is empty`, () => {
    render(<Results results={emptyData} loading={false} />);
    const noResultsElement = screen.getByText(noResultsMessage);
    expect(noResultsElement).not.toBeNull();
  });

  it('correctly displays item names and descriptions', () => {
    const { container } = render(<Results results={data} loading={false} />);
    const resultsElement = container.querySelector('.results');
    const listElementItems = resultsElement?.querySelectorAll('ul li');
    listElementItems?.forEach((item, index) => {
      const nameElement = item.querySelector('p:first-child');
      expect(nameElement?.textContent).toEqual(data[index].name);
      const descriptionElement = item.querySelector('p:last-child');
      const description = `${data[index].gender}, ${data[index].species}, ${data[index].status}`;
      expect(descriptionElement?.textContent).toEqual(description);
    });
  });

  it('shows loading state while fetching data', () => {
    const { container } = render(
      <Results results={emptyData} loading={true} />
    );
    const skeletonElement = container.querySelector('.results .skeleton');
    expect(skeletonElement).not.toBeNull();
  });

  it('displays error message when API call fails', () => {
    render(
      <Results results={emptyData} loading={false} error={errorMessage} />
    );
    const errorMessageElement = screen.getByText(errorMessage);
    expect(errorMessageElement).not.toBeNull();
  });
});
