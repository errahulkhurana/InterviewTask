import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { User } from '../types/User';

const UserDetailScreen = ({ route }: any) => {
  const { user }: { user: User } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image
          source={{
            uri: `https://ui-avatars.com/api/?name=${encodeURIComponent(
              user.name,
            )}&size=100&background=random`,
          }}
          style={styles.avatar}
        />
        <Text style={styles.label}>Name</Text>
        <Text style={styles.value}>{user.name}</Text>

        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{user.email}</Text>

        <Text style={styles.label}>Phone</Text>
        <Text style={styles.value}>{user.phone}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  label: {
    fontSize: 12,
    color: '#666',
    marginTop: 16,
    marginBottom: 4,
    textTransform: 'uppercase',
    alignSelf: 'flex-start',
  },
  value: {
    fontSize: 16,
    color: '#000',
    alignSelf: 'flex-start',
    width: '100%',
  },
});

export default UserDetailScreen;
