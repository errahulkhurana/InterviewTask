/**
 * Helper Utilities
 * Reusable utility functions
 */
import { API_CONFIG, AVATAR_SIZE } from './constants';

/**
 * Generates avatar URL for a user
 * @param name - User's name
 * @param size - Avatar size (default: SMALL)
 * @returns Avatar URL
 */
export const getAvatarUrl = (name: string, size: number = AVATAR_SIZE.SMALL): string => {
  return `${API_CONFIG.AVATAR_API_URL}?name=${encodeURIComponent(name)}&size=${size}&background=random`;
};

/**
 * Filters array by search term (case-insensitive)
 * @param items - Array to filter
 * @param searchTerm - Search string
 * @param key - Object key to search in
 * @returns Filtered array
 */
export const filterBySearch = <T extends Record<string, any>>(
  items: T[],
  searchTerm: string,
  key: keyof T,
): T[] => {
  if (!searchTerm) return items;
  return items.filter(item =>
    String(item[key]).toLowerCase().includes(searchTerm.toLowerCase()),
  );
};
