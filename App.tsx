import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserListScreen from './src/screens/UserListScreen';
import UserDetailScreen from './src/screens/UserDetailScreen';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="UserList" component={UserListScreen} options={{ title: 'Users' }} />
        <Stack.Screen name="UserDetail" component={UserDetailScreen} options={{ title: 'User Details' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
