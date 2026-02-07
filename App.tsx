import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import UserListScreen from './src/screens/UserListScreen';
import UserDetailScreen from './src/screens/UserDetailScreen';
import { RootStackParamList } from './src/types/navigation';
import { SCREENS, API_CONFIG } from './src/utils/constants';

const Stack = createNativeStackNavigator<RootStackParamList>();
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: API_CONFIG.STALE_TIME,
      gcTime: API_CONFIG.CACHE_TIME * 2,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name={SCREENS.USER_LIST} component={UserListScreen} options={{ title: 'Users' }} />
          <Stack.Screen name={SCREENS.USER_DETAIL} component={UserDetailScreen} options={{ title: 'User Details' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}

export default App;
