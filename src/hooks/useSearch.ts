/**
 * useSearch Hook
 * Custom hook for managing search functionality with debouncing
 */
import { useState } from 'react';
import { useDebounce } from './useDebounce';
import { filterBySearch } from '../utils/helpers';
import { TIMING } from '../utils/constants';

/**
 * Hook for search with debouncing and filtering
 * @param items - Array of items to search
 * @param searchKey - Key to search in
 * @returns Search state and filtered results
 */
export const useSearch = <T extends Record<string, any>>(
  items: T[],
  searchKey: keyof T,
) => {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, TIMING.DEBOUNCE_DELAY);
  const filteredItems = filterBySearch(items, debouncedSearch, searchKey);

  return {
    search,
    setSearch,
    debouncedSearch,
    filteredItems,
  };
};
