import { useState, useEffect } from 'react';
import { User } from '../types/User';
import { fetchUsers as fetchUsersApi } from '../api/userApi';
import { getCache, setCache } from '../utils/cache';

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState('');
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (page > 1 || users.length === 0) {
      fetchUsers();
    }
  }, [page]);

  const fetchUsers = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    setError('');
    try {
      const cacheKey = `users_page_${page}`;
      const cached = getCache(cacheKey);
      if (cached) {
        setUsers(prev => {
          const existing = new Set(prev.map(u => u.id));
          const newUsers = cached.filter((u: User) => !existing.has(u.id));
          return [...prev, ...newUsers];
        });
        if (cached.length < 5) setHasMore(false);
        setLoading(false);
        setInitialLoading(false);
        return;
      }
      const data = await fetchUsersApi(page);
      if (data.length === 0 || data.length < 5) {
        setHasMore(false);
      }
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

  const loadMore = () => {
    if (hasMore && !loading) {
      setPage(p => p + 1);
    }
  };

  return { users, loading, initialLoading, error, hasMore, loadMore, refresh, fetchUsers };
};
