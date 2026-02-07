/**
 * Navigation Types
 * Type definitions for navigation
 */
import { User } from './User';

export type RootStackParamList = {
  UserList: undefined;
  UserDetail: { user: User };
};
