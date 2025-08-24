import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { FormStore } from '../types';

export const countries = [
  'United States',
  'Canada',
  'Mexico',
  'United Kingdom',
  'Germany',
  'France',
  'Italy',
  'Spain',
  'Japan',
  'China',
  'India',
  'Australia',
  'Brazil',
  'Russia',
  'South Korea',
  'New Zealand',
  'Singapore',
  'South Africa',
  'Netherlands',
  'Sweden',
];

export type FormsState = {
  items: FormStore[];
  countries: string[];
};

const initialState: FormsState = {
  items: [],
  countries,
};

const formsSlice = createSlice({
  name: 'forms',
  initialState,
  selectors: {
    selectForms: (state) => state.items,
    selectCountries: (state) => state.countries,
  },
  reducers: {
    addForm(state, action: PayloadAction<FormStore>) {
      state.items.push(action.payload);
    },
  },
});

export const { selectForms, selectCountries } = formsSlice.selectors;
export const { addForm } = formsSlice.actions;

export default formsSlice;
