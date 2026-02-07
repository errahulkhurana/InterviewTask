/**
 * UserItem Component
 * Renders individual user item in the list
 */
import React, { memo } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { User } from '../types/User';
import { getAvatarUrl } from '../utils/helpers';
import { AVATAR_SIZE } from '../utils/constants';
import { COLORS } from '../utils/colors';

interface UserItemProps {
  user: User;
  onPress: (user: User) => void;
}

const UserItem = ({ user, onPress }: UserItemProps) => (
  <View>
    <TouchableOpacity style={styles.item} onPress={() => onPress(user)}>
      <Image
        source={{ uri: getAvatarUrl(user.name, AVATAR_SIZE.SMALL) }}
        style={styles.avatar}
      />
      <View style={styles.info}>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>
    </TouchableOpacity>
    <View style={styles.separator} />
  </View>
);

const styles = StyleSheet.create({
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
    color: COLORS.GRAY_DARK,
  },
  separator: {
    height: 1,
    backgroundColor: COLORS.SEPARATOR,
  },
});

export default memo(UserItem);
