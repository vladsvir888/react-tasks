import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import ResultsItem from '../components/ResultsItem';
import type { CharacterSummary } from '../types';

const item: CharacterSummary = {
  id: 1,
  name: 'Rick Sanchez',
  description: 'Some description',
};

describe('ResultsItem', () => {
  it('displays item name and description correctly', () => {
    render(<ResultsItem {...item} />);
    const nameElement = screen.getByText(item.name);
    const descriptionElement = screen.getByText(item.description);
    expect(nameElement).not.toBeNull();
    expect(descriptionElement).not.toBeNull();
  });
});
