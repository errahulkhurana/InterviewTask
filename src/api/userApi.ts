import { User } from '../types/User';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

export const fetchUsers = async (page: number, limit: number = 5): Promise<User[]> => {
  const res = await fetch(`${BASE_URL}/users?_page=${page}&_limit=${limit}`);
  if (!res.ok) throw new Error('Network error');
  return res.json();
};
