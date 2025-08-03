import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import ResultsItem from '../components/ResultsItem';
import type { CharacterSummaryWithChecked } from '../types';
import { BrowserRouter } from 'react-router';
import ReduxProvider from '../providers/redux';
import FlyOutPanel from '../components/FlyOutPanel';
import store from '../store';

describe('FlyOutPanel', () => {
  const item: CharacterSummaryWithChecked = {
    id: 1,
    name: 'Rick Sanchez',
    description: 'Some description',
    url: 'https://rickandmortyapi.com/api/character/1',
    checked: true,
  };
  const mockLink = 'link';

  const TestWrapper = () => {
    return (
      <BrowserRouter>
        <ReduxProvider>
          <ResultsItem {...item} />
          <FlyOutPanel />
        </ReduxProvider>
      </BrowserRouter>
    );
  };

  it('should render FlyOutPanel', () => {
    render(<TestWrapper />);

    const checkbox = screen.getByRole('checkbox');

    fireEvent.click(checkbox);

    expect(screen.queryByText('Unselect all')).toBeInTheDocument();
    expect(screen.queryByText('Download')).toBeInTheDocument();
    expect(screen.queryByText('Selected items: 1')).toBeInTheDocument();

    fireEvent.click(checkbox);

    expect(screen.queryByText('Unselect all')).not.toBeInTheDocument();
    expect(screen.queryByText('Download')).not.toBeInTheDocument();
    expect(screen.queryByText('Selected items: 1')).not.toBeInTheDocument();
  });

  it('should unselect all on click button', () => {
    render(<TestWrapper />);

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    const unselectButton = screen.getByText('Unselect all');
    expect(unselectButton).toBeInTheDocument();
    fireEvent.click(unselectButton);

    expect(store.getState().favorite.items.length).toEqual(0);
    expect(screen.queryByText('Unselect all')).not.toBeInTheDocument();
  });

  it('should generate link on click button', () => {
    globalThis.URL.createObjectURL = vi.fn().mockReturnValue(mockLink);

    render(<TestWrapper />);

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    const downloadButton = screen.getByText('Download') as HTMLAnchorElement;
    expect(downloadButton).toBeInTheDocument();
    fireEvent.click(downloadButton);
    expect(downloadButton.href).toContain(mockLink);

    fireEvent.click(checkbox);
    expect(screen.queryByText('Download')).not.toBeInTheDocument();
  });
});
