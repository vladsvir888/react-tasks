import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CharacterSummary, CharacterSummaryWithChecked } from '../types';

export type FavoriteState = {
  items: CharacterSummaryWithChecked[];
};

const initialState: FavoriteState = {
  items: [],
};

const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  selectors: {
    selectFavoriteItemsCount: (state) => state.items.length,
    selectFavoriteItem: (state, id: number) =>
      state.items.find((item) => item.id === id),
    selectFavouriteItems: (state) => state.items,
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
  },
});

export const {
  selectFavoriteItemsCount,
  selectFavoriteItem,
  selectFavouriteItems,
} = favoriteSlice.selectors;
export const { addFavorite, removeFavorite, removeAllFavorite } =
  favoriteSlice.actions;

export default favoriteSlice;
