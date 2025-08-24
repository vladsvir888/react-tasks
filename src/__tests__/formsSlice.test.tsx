import { configureStore, type Store } from '@reduxjs/toolkit';
import { describe, it, expect, beforeEach } from 'vitest';
import formsSlice, { addForm, selectForms } from '../store/formsSlice';
import type { FormStore } from '../types';

const mockForm: FormStore = {
  name: 'Ivan Petrov',
  age: '30',
  email: 'iv.petr@gmail.com',
  gender: 'male',
  country: 'USA',
  password: 'qwertyQ1&',
  passwordConfirmation: 'qwertyQ1&',
  pictureSrc: 'data:image/jpeg;base64...',
  conditionsAgreement: true,
  type: 'controlled',
};

const createStore = () => configureStore({ reducer: formsSlice.reducer });

describe('formsSlice', () => {
  let store: Store;

  beforeEach(() => (store = createStore()));

  it('should handle addForm action', () => {
    store.dispatch(addForm(mockForm));
    const state = store.getState();
    expect(state.items[0]).toEqual(mockForm);
  });

  it('should select forms correctly', () => {
    store.dispatch(addForm(mockForm));
    store.dispatch(addForm(mockForm));
    const state = store.getState();
    const selectedForms = selectForms({ forms: state });
    expect(selectedForms.length).toEqual(2);
  });
});
