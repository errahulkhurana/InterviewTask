/**
 * Cache Utility
 * Simple in-memory cache for API responses
 */

// In-memory cache storage
const cache = new Map<string, any>();

/**
 * Retrieves data from cache
 * @param key - Cache key
 * @returns Cached data or undefined
 */
export const getCache = (key: string) => cache.get(key);

/**
 * Stores data in cache
 * @param key - Cache key
 * @param data - Data to cache
 */
export const setCache = (key: string, data: any) => cache.set(key, data);
