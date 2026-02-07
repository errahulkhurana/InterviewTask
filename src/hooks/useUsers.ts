/**
 * useUsers Hook
 * Custom hook for managing user data with pagination, caching, and refresh functionality
 */
import { useState, useEffect } from 'react';
import { User } from '../types/User';
import { fetchUsers as fetchUsersApi } from '../api/userApi';
import { getCache, setCache } from '../utils/cache';
import { API_CONFIG } from '../utils/constants';

export const useUsers = () => {
  // State management
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState('');
  const [hasMore, setHasMore] = useState(true);

  // Fetch users when page changes
  useEffect(() => {
    if (page > 1 || users.length === 0) {
      fetchUsers();
    }
  }, [page]);

  /**
   * Fetches users from API or cache
   * Implements pagination and duplicate prevention
   */
  const fetchUsers = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    setError('');
    try {
      const cacheKey = `users_page_${page}`;
      const cached = getCache(cacheKey);
      
      // Return cached data if available
      if (cached) {
        setUsers(prev => {
          const existing = new Set(prev.map(u => u.id));
          const newUsers = cached.filter((u: User) => !existing.has(u.id));
          return [...prev, ...newUsers];
        });
        if (cached.length < API_CONFIG.USERS_PER_PAGE) setHasMore(false);
        setLoading(false);
        setInitialLoading(false);
        return;
      }
      
      // Fetch from API
      const data = await fetchUsersApi(page);
      
      // Check if we've reached the end
      if (data.length === 0 || data.length < API_CONFIG.USERS_PER_PAGE) {
        setHasMore(false);
      }
      
      // Add new users and cache the result
      if (data.length > 0) {
        setCache(cacheKey, data);
        setUsers(prev => {
          const existing = new Set(prev.map(u => u.id));
          const newUsers = data.filter((u: User) => !existing.has(u.id));
          return [...prev, ...newUsers];
        });
      }
    } catch {
      setError('Failed to load users');
    } finally {
      setLoading(false);
      setInitialLoading(false);
    }
  };

  /**
   * Refreshes the user list from the beginning
   * Resets pagination and fetches first page
   */
  const refresh = async () => {
    setHasMore(true);
    setError('');
    setPage(1);
    try {
      const data = await fetchUsersApi(1);
      setCache('users_page_1', data);
      setUsers(data);
    } catch {
      setError('Failed to load users');
    }
  };

  /**
   * Loads the next page of users
   * Called when user scrolls to bottom
   */
  const loadMore = () => {
    if (hasMore && !loading) {
      setPage(p => p + 1);
    }
  };

  return { users, loading, initialLoading, error, hasMore, loadMore, refresh, fetchUsers };
};
