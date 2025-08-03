import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import ResultsItem from '../components/ResultsItem';
import type { CharacterSummary, CharacterSummaryWithChecked } from '../types';
import { BrowserRouter } from 'react-router';
import ReduxProvider from '../providers/redux';
import store from '../store';

const item: CharacterSummary = {
  id: 1,
  name: 'Rick Sanchez',
  description: 'Some description',
  url: 'https://rickandmortyapi.com/api/character/1',
};

const TestWrapper = () => {
  return (
    <BrowserRouter>
      <ReduxProvider>
        <ResultsItem {...item} />
      </ReduxProvider>
    </BrowserRouter>
  );
};

describe('ResultsItem', () => {
  it('displays item name and description correctly', () => {
    render(<TestWrapper />);

    const nameElement = screen.getByText(item.name);
    expect(nameElement).toBeInTheDocument();

    const descriptionElement = screen.getByText(item.description);
    expect(descriptionElement).toBeInTheDocument();
  });

  it('should handle checkbox', () => {
    render(<TestWrapper />);

    const checkbox = screen.getByRole('checkbox');

    fireEvent.click(checkbox);

    expect(checkbox).toBeChecked();
    const itemWithChecked: CharacterSummaryWithChecked = {
      ...item,
      checked: true,
    };
    expect(store.getState().favorite.items[0]).toEqual(itemWithChecked);

    fireEvent.click(checkbox);

    expect(checkbox).not.toBeChecked();
    expect(store.getState().favorite.items.length).toEqual(0);
  });
});
