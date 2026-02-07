/**
 * UserListScreen Component
 * Displays a paginated, searchable list of users with infinite scroll
 */
import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  Image,
} from 'react-native';
import { User } from '../types/User';
import { useUsers } from '../hooks/useUsers';
import { useDebounce } from '../hooks/useDebounce';
import { getAvatarUrl, filterBySearch } from '../utils/helpers';
import {
  TIMING,
  FLATLIST_CONFIG,
  MESSAGES,
  SCREENS,
  AVATAR_SIZE,
} from '../utils/constants';

const UserListScreen = ({ navigation }: any) => {
  // Get user data and actions from custom hook
  const {
    users,
    loading,
    initialLoading,
    error,
    hasMore,
    loadMore,
    refresh,
    fetchUsers,
  } = useUsers();

  const [search, setSearch] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  // Debounce search input to avoid excessive filtering
  const debouncedSearch = useDebounce(search, TIMING.DEBOUNCE_DELAY);

  // Filter users based on debounced search term
  const filteredUsers = filterBySearch(users, debouncedSearch, 'name');

  // Handle pull-to-refresh action
  const onRefresh = async () => {
    setRefreshing(true);
    await refresh();
    setRefreshing(false);
  };

  // Render individual user item
  const renderItem = ({ item }: { item: User }) => (
    <View>
      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate(SCREENS.USER_DETAIL, { user: item })}
      >
        <Image
          source={{ uri: getAvatarUrl(item.name, AVATAR_SIZE.SMALL) }}
          style={styles.avatar}
        />
        <View style={styles.info}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.email}>{item.email}</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.separator} />
    </View>
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
          <TouchableOpacity style={styles.retry} onPress={() => fetchUsers()}>
            <Text style={styles.retryText}>{MESSAGES.RETRY}</Text>
          </TouchableOpacity>
        </View>
      ) : null}

      {/* User list with infinite scroll and pull-to-refresh */}
      <FlatList
        data={filteredUsers}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        onEndReached={() => {
          if (!debouncedSearch && hasMore && !loading) {
            loadMore();
          }
        }}
        onEndReachedThreshold={FLATLIST_CONFIG.END_REACHED_THRESHOLD}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
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
    backgroundColor: '#fff',
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
    borderColor: '#ddd',
    borderRadius: 8,
  },
  item: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    marginVertical: 16,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: '#666',
  },
  separator: {
    height: 1,
    backgroundColor: '#eee',
  },
  errorContainer: {
    alignItems: 'center',
    margin: 16,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 8,
  },
  retry: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 6,
  },
  retryText: {
    color: '#fff',
    fontWeight: '600',
  },
  empty: {
    textAlign: 'center',
    color: '#999',
    marginTop: 40,
    fontSize: 16,
  },
  loader: {
    marginVertical: 16,
  },
});

export default UserListScreen;
