import React, { useState, useEffect, useRef } from 'react';
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

const UserListScreen = ({ navigation }: any) => {
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
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const debounceTimer = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => setDebouncedSearch(search), 300);
    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, [search]);

  useEffect(() => {
    setFilteredUsers(
      users.filter(u =>
        u.name.toLowerCase().includes(debouncedSearch.toLowerCase()),
      ),
    );
  }, [debouncedSearch, users]);

  const onRefresh = async () => {
    setRefreshing(true);
    await refresh();
    setRefreshing(false);
  };

  const renderItem = ({ item }: { item: User }) => (
    <View>
      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate('UserDetail', { user: item })}
      >
        <Image
          source={{
            uri: `https://ui-avatars.com/api/?name=${encodeURIComponent(
              item.name,
            )}&size=40&background=random`,
          }}
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

  if (initialLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.search}
        placeholder="Search by name"
        value={search}
        onChangeText={setSearch}
      />
      {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.error}>{error}</Text>
          <TouchableOpacity style={styles.retry} onPress={() => fetchUsers()}>
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : null}
      <FlatList
        data={filteredUsers}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        onEndReached={() => {
          if (!debouncedSearch && hasMore && !loading) {
            loadMore();
          }
        }}
        onEndReachedThreshold={0.5}
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
              {debouncedSearch ? 'No users found' : 'No users available'}
            </Text>
          ) : null
        }
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        windowSize={10}
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
