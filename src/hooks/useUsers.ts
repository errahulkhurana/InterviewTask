/**
 * useUsers Hook
 * Custom hook for managing user data with pagination using React Query
 */
import { useState, useCallback, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { User } from '../types/User';
import { fetchUsers as fetchUsersApi } from '../api/userApi';
import { API_CONFIG, MESSAGES } from '../utils/constants';

export const useUsers = () => {
  const [page, setPage] = useState(1);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [hasMore, setHasMore] = useState(true);

  // Fetch users for current page using React Query
  const { data, isLoading, isRefetching, error, refetch } = useQuery({
    queryKey: ['users', page],
    queryFn: () => fetchUsersApi(page),
    enabled: hasMore,
    staleTime: 5 * 60 * 1000,
  });

  // Update allUsers when new data arrives
  useEffect(() => {
    if (data && data.length > 0) {
      setAllUsers(prev => {
        const existing = new Set(prev.map(u => u.id));
        const newUsers = data.filter(u => !existing.has(u.id));
        return [...prev, ...newUsers];
      });
      
      // Check if we've reached the end
      if (data.length < API_CONFIG.USERS_PER_PAGE) {
        setHasMore(false);
      }
    }
  }, [data]);

  /**
   * Refreshes the user list from the beginning
   */
  const refresh = useCallback(async () => {
    setAllUsers([]);
    setHasMore(true);
    setPage(1);
    await refetch();
  }, [refetch]);

  /**
   * Loads the next page of users
   */
  const loadMore = useCallback(() => {
    if (hasMore && !isLoading) {
      setPage(p => p + 1);
    }
  }, [hasMore, isLoading]);

  return {
    users: allUsers,
    loading: isLoading && page > 1,
    initialLoading: isLoading && page === 1,
    refreshing: isRefetching,
    error: error ? MESSAGES.FAILED_TO_LOAD : '',
    hasMore,
    loadMore,
    refresh,
    fetchUsers: refetch,
  };
};
