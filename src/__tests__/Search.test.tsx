import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render } from '@testing-library/react';
import Search from '../components/Search';
import { cacheKey, cacheUtil } from '../utils/local-storage';

const fetchData = vi.fn();
const searchQuery = 'Rick';

describe('Search', () => {
  beforeEach(() => {
    cacheUtil.remove(cacheKey.reactClassComponentsSearchTerm);
  });

  it('renders search input and search button', () => {
    const { container } = render(<Search fetchData={fetchData} />);
    const searchInputElement = container.querySelector('.search-input');
    const searchButtonElement = container.querySelector('.search-button');
    expect(searchInputElement).not.toBeNull();
    expect(searchButtonElement).not.toBeNull();
  });

  it('displays previously saved search term from localStorage on mount', () => {
    cacheUtil.set(cacheKey.reactClassComponentsSearchTerm, searchQuery);
    const valueFromLS = cacheUtil.get(cacheKey.reactClassComponentsSearchTerm);
    const { container } = render(<Search fetchData={fetchData} />);
    const searchInputElement = container.querySelector(
      '.search-input input'
    ) as HTMLInputElement;
    expect(searchInputElement.value).toEqual(valueFromLS);
  });

  it('shows empty input when no saved term exists', () => {
    const valueFromLS = cacheUtil.get(cacheKey.reactClassComponentsSearchTerm);
    const { container } = render(<Search fetchData={fetchData} />);
    const searchInputElement = container.querySelector(
      '.search-input input'
    ) as HTMLInputElement;
    expect(valueFromLS).toEqual(null);
    expect(searchInputElement.value).toEqual('');
  });

  it('updates input value when user types', () => {
    const { container } = render(<Search fetchData={fetchData} />);
    const searchInputElement = container.querySelector(
      '.search-input input'
    ) as HTMLInputElement;
    fireEvent.change(searchInputElement, { target: { value: searchQuery } });
    expect(searchInputElement.value).toEqual(searchQuery);
  });

  it('saves search term to localStorage when search button is clicked', () => {
    const { container } = render(<Search fetchData={fetchData} />);
    const searchInputElement = container.querySelector(
      '.search-input input'
    ) as HTMLInputElement;
    fireEvent.change(searchInputElement, { target: { value: searchQuery } });
    expect(searchInputElement.value).toEqual(searchQuery);
    const searchButtonElement = container.querySelector(
      '.search-button'
    ) as HTMLButtonElement;
    fireEvent.click(searchButtonElement);
    const valueFromLS = cacheUtil.get(cacheKey.reactClassComponentsSearchTerm);
    expect(valueFromLS).toEqual(searchQuery);
  });

  it('trims whitespace from search input before saving', () => {
    const { container } = render(<Search fetchData={fetchData} />);
    const searchInputElement = container.querySelector(
      '.search-input input'
    ) as HTMLInputElement;
    fireEvent.change(searchInputElement, {
      target: { value: `   ${searchQuery}   ` },
    });
    expect(searchInputElement.value).toEqual(searchQuery);
  });

  it('overwrites existing localStorage value when new search is performed', () => {
    const { container } = render(<Search fetchData={fetchData} />);
    const searchInputElement = container.querySelector(
      '.search-input input'
    ) as HTMLInputElement;
    fireEvent.change(searchInputElement, { target: { value: searchQuery } });
    expect(searchInputElement.value).toEqual(searchQuery);
    const searchButtonElement = container.querySelector(
      '.search-button'
    ) as HTMLButtonElement;
    fireEvent.click(searchButtonElement);
    let valueFromLS = cacheUtil.get(cacheKey.reactClassComponentsSearchTerm);
    expect(valueFromLS).toEqual(searchQuery);
    fireEvent.change(searchInputElement, {
      target: { value: `${searchQuery}${searchQuery}` },
    });
    fireEvent.click(searchButtonElement);
    valueFromLS = cacheUtil.get(cacheKey.reactClassComponentsSearchTerm);
    expect(valueFromLS).toEqual(`${searchQuery}${searchQuery}`);
  });
});
