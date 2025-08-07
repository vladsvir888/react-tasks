import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CharacterSummary, CharacterSummaryWithChecked } from '../types';

export type FavoriteState = {
  items: CharacterSummaryWithChecked[];
  downloadLink?: string;
};

const initialState: FavoriteState = {
  items: [],
  downloadLink: undefined,
};

const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  selectors: {
    selectFavoriteItemsCount: (state) => state.items.length,
    selectFavoriteItem: (state, id: number) =>
      state.items.find((item) => item.id === id),
    selectFavoriteDownloadLink: (state) => state.downloadLink,
  },
  reducers: {
    addFavorite(state, action: PayloadAction<CharacterSummary>) {
      state.items.push({ ...action.payload, checked: true });
    },
    removeFavorite(state, action: PayloadAction<number>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    removeAllFavorite(state) {
      state.items = [];
    },
    createDownloadFavoriteLink(state) {
      const headers = ['id', 'name', 'description', 'url'].join(';');
      const rows = state.items.map((item) =>
        [item.id, item.name, item.description, item.url].join(';')
      );
      const csvString = [headers, ...rows].join('\r\n');
      const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      state.downloadLink = url;
    },
  },
});

export const {
  selectFavoriteItemsCount,
  selectFavoriteItem,
  selectFavoriteDownloadLink,
} = favoriteSlice.selectors;
export const {
  addFavorite,
  removeFavorite,
  removeAllFavorite,
  createDownloadFavoriteLink,
} = favoriteSlice.actions;

export default favoriteSlice;
