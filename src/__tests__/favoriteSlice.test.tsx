import { describe, expect, it, vi } from 'vitest';
import favoriteSlice, {
  addFavorite,
  removeFavorite,
  removeAllFavorite,
  createDownloadFavoriteLink,
  type FavoriteState,
} from '../store/favoriteSlice';
import type { CharacterSummaryWithChecked } from '../types';

describe('favoriteSlice', () => {
  const initialState: FavoriteState = {
    items: [],
    downloadLink: undefined,
  };
  const mockLink = 'link';

  it('should handle addFavorite', () => {
    const newFavorite: CharacterSummaryWithChecked = {
      id: 1,
      name: 'Rick Sanchez',
      description: 'Some description',
      url: 'https://rickandmortyapi.com/api/character/1',
      checked: true,
    };
    const expectedState: FavoriteState = {
      ...initialState,
      items: [newFavorite],
    };

    expect(
      favoriteSlice.reducer(initialState, addFavorite(newFavorite))
    ).toEqual(expectedState);
  });

  it('should handle removeFavorite', () => {
    const newFavorite: CharacterSummaryWithChecked = {
      id: 1,
      name: 'Rick Sanchez',
      description: 'Some description',
      url: 'https://rickandmortyapi.com/api/character/1',
      checked: true,
    };
    const favoriteState: FavoriteState = {
      ...initialState,
      items: [newFavorite],
    };
    const expectedState = { ...initialState };

    expect(
      favoriteSlice.reducer(favoriteState, removeFavorite(newFavorite.id))
    ).toEqual(expectedState);
  });

  it('should handle removeAllFavorite', () => {
    const newFavorite1: CharacterSummaryWithChecked = {
      id: 1,
      name: 'Rick Sanchez',
      description: 'Some description',
      url: 'https://rickandmortyapi.com/api/character/1',
      checked: true,
    };
    const newFavorite2: CharacterSummaryWithChecked = {
      id: 2,
      name: 'Morty Smith',
      description: 'Some description',
      url: 'https://rickandmortyapi.com/api/character/2',
      checked: true,
    };
    const favoriteState: FavoriteState = {
      ...initialState,
      items: [newFavorite1, newFavorite2],
    };
    const expectedState = { ...initialState };

    expect(favoriteSlice.reducer(favoriteState, removeAllFavorite())).toEqual(
      expectedState
    );
  });

  it('should handle createDownloadFavoriteLink', () => {
    globalThis.URL.createObjectURL = vi.fn().mockReturnValue(mockLink);

    const newFavorite: CharacterSummaryWithChecked = {
      id: 1,
      name: 'Rick Sanchez',
      description: 'Some description',
      url: 'https://rickandmortyapi.com/api/character/1',
      checked: true,
    };
    const favoriteState: FavoriteState = {
      ...initialState,
      items: [newFavorite],
    };

    expect(
      favoriteSlice.reducer(favoriteState, createDownloadFavoriteLink())
        .downloadLink
    ).toEqual(mockLink);
  });
});
