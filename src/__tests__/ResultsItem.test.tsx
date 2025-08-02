import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import ResultsItem from '../components/ResultsItem';
import type { CharacterSummary } from '../types';
import { BrowserRouter } from 'react-router';
import { Provider } from 'react-redux';
import store from '../store';

const item: CharacterSummary = {
  id: 1,
  name: 'Rick Sanchez',
  description: 'Some description',
  url: 'https://rickandmortyapi.com/api/character/1',
};

describe('ResultsItem', () => {
  it('displays item name and description correctly', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <ResultsItem {...item} />
        </Provider>
      </BrowserRouter>
    );

    const nameElement = screen.getByText(item.name);
    expect(nameElement).toBeInTheDocument();

    const descriptionElement = screen.getByText(item.description);
    expect(descriptionElement).toBeInTheDocument();
  });
});
