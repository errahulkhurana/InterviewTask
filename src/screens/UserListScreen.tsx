/**
 * UserListScreen Component
 * Displays a paginated, searchable list of users with infinite scroll
 */
import React, { useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { User } from '../types/User';
import { RootStackParamList } from '../types/navigation';
import { useUsers } from '../hooks/useUsers';
import { useSearch } from '../hooks/useSearch';
import UserItem from '../components/UserItem';
import { FLATLIST_CONFIG, MESSAGES, SCREENS } from '../utils/constants';
import { COLORS } from '../utils/colors';

type UserListScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'UserList'
>;

interface UserListScreenProps {
  navigation: UserListScreenNavigationProp;
}

const UserListScreen = ({ navigation }: UserListScreenProps) => {
  // Get user data and actions from custom hook
  const {
    users,
    loading,
    initialLoading,
    refreshing,
    error,
    hasMore,
    loadMore,
    refresh,
    fetchUsers,
  } = useUsers();

  // Search functionality with debouncing
  const { search, setSearch, debouncedSearch, filteredItems } = useSearch(
    users,
    'name',
  );

  // Memoize keyExtractor
  const keyExtractor = useCallback((item: User) => item.id.toString(), []);

  // Handle user item press
  const handleUserPress = useCallback(
    (user: User) => {
      navigation.navigate('UserDetail', { user });
    },
    [navigation],
  );

  // Render individual user item
  const renderItem = useCallback(
    ({ item }: { item: User }) => (
      <UserItem user={item} onPress={handleUserPress} />
    ),
    [handleUserPress],
  );

  // Show loading spinner on initial load
  if (initialLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Search input */}
      <TextInput
        style={styles.search}
        placeholder={MESSAGES.SEARCH_PLACEHOLDER}
        value={search}
        onChangeText={setSearch}
      />

      {/* Error message with retry button */}
      {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.error}>{error}</Text>
          <TouchableOpacity style={styles.retry} onPress={fetchUsers}>
            <Text style={styles.retryText}>{MESSAGES.RETRY}</Text>
          </TouchableOpacity>
        </View>
      ) : null}

      {/* User list with infinite scroll and pull-to-refresh */}
      <FlatList
        data={filteredItems}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        onEndReached={() => {
          if (!debouncedSearch && hasMore && !loading) {
            loadMore();
          }
        }}
        onEndReachedThreshold={FLATLIST_CONFIG.END_REACHED_THRESHOLD}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refresh} />
        }
        ListFooterComponent={
          loading && !initialLoading ? (
            <ActivityIndicator style={styles.loader} />
          ) : null
        }
        ListEmptyComponent={
          !loading ? (
            <Text style={styles.empty}>
              {debouncedSearch
                ? MESSAGES.NO_USERS_FOUND
                : MESSAGES.NO_USERS_AVAILABLE}
            </Text>
          ) : null
        }
        removeClippedSubviews={true}
        maxToRenderPerBatch={FLATLIST_CONFIG.MAX_TO_RENDER_PER_BATCH}
        windowSize={FLATLIST_CONFIG.WINDOW_SIZE}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  search: {
    margin: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: COLORS.GRAY_LIGHT,
    borderRadius: 8,
  },
  errorContainer: {
    alignItems: 'center',
    margin: 16,
  },
  error: {
    color: COLORS.ERROR,
    textAlign: 'center',
    marginBottom: 8,
  },
  retry: {
    backgroundColor: COLORS.PRIMARY,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 6,
  },
  retryText: {
    color: COLORS.WHITE,
    fontWeight: '600',
  },
  empty: {
    textAlign: 'center',
    color: COLORS.GRAY_MEDIUM,
    marginTop: 40,
    fontSize: 16,
  },
  loader: {
    marginVertical: 16,
  },
});

export default UserListScreen;
