/**
 * UserDetailScreen Component
 * Displays detailed information about a selected user
 */
import React, { memo } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { User } from '../types/User';
import { RootStackParamList } from '../types/navigation';
import { getAvatarUrl } from '../utils/helpers';
import { AVATAR_SIZE } from '../utils/constants';
import { COLORS } from '../utils/colors';

type UserDetailScreenRouteProp = RouteProp<RootStackParamList, 'UserDetail'>;

interface UserDetailScreenProps {
  route: UserDetailScreenRouteProp;
}

const UserDetailScreen = ({ route }: UserDetailScreenProps) => {
  const { user } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image
          source={{ uri: getAvatarUrl(user.name, AVATAR_SIZE.LARGE) }}
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
    backgroundColor: COLORS.BACKGROUND,
    padding: 16,
  },
  card: {
    backgroundColor: COLORS.WHITE,
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
    color: COLORS.GRAY_DARK,
    marginTop: 16,
    marginBottom: 4,
    textTransform: 'uppercase',
    alignSelf: 'flex-start',
  },
  value: {
    fontSize: 16,
    color: COLORS.BLACK,
    alignSelf: 'flex-start',
    width: '100%',
  },
});

export default memo(UserDetailScreen);
