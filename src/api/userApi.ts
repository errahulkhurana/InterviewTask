/**
 * User API Service
 * Handles all API calls related to user data
 */
import { User } from '../types/User';
import { API_CONFIG } from '../utils/constants';

/**
 * Fetches paginated users from the API
 * @param page - Page number to fetch
 * @param limit - Number of users per page
 * @returns Promise with array of users
 */
export const fetchUsers = async (
  page: number,
  limit: number = API_CONFIG.USERS_PER_PAGE,
): Promise<User[]> => {
  const res = await fetch(`${API_CONFIG.BASE_URL}/users?_page=${page}&_limit=${limit}`);
  if (!res.ok) throw new Error('Network error');
  return res.json();
};
