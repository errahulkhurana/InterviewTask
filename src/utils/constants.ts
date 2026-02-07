/**
 * Application Constants
 * Centralized configuration values used across the app
 */

// API Configuration
export const API_CONFIG = {
  BASE_URL: 'https://jsonplaceholder.typicode.com',
  USERS_PER_PAGE: 5,
  AVATAR_API_URL: 'https://ui-avatars.com/api/',
};

// Timing Constants
export const TIMING = {
  DEBOUNCE_DELAY: 300, // milliseconds
};

// FlatList Performance
export const FLATLIST_CONFIG = {
  END_REACHED_THRESHOLD: 0.5,
  MAX_TO_RENDER_PER_BATCH: 10,
  WINDOW_SIZE: 10,
};

// Avatar Sizes
export const AVATAR_SIZE = {
  SMALL: 40,
  LARGE: 100,
};

// Messages
export const MESSAGES = {
  SEARCH_PLACEHOLDER: 'Search by name',
  NO_USERS_FOUND: 'No users found',
  NO_USERS_AVAILABLE: 'No users available',
  FAILED_TO_LOAD: 'Failed to load users',
  RETRY: 'Retry',
};

// Screen Names
export const SCREENS = {
  USER_LIST: 'UserList',
  USER_DETAIL: 'UserDetail',
};
