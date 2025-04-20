import { Stack } from 'expo-router';
import { UserProvider } from '@/context/UserContext';
import { AdminProvider } from '@/context/AdminContext';

export default function RootLayout() {
  return (
    <UserProvider>
      <AdminProvider>
        <Stack>
          <Stack.Screen 
            name="index" 
            options={{ 
              headerShown: false,
              title: 'Login'
            }} 
          />
          <Stack.Screen 
            name="registration" 
            options={{ 
              title: 'Registration',
              headerStyle: {
                backgroundColor: '#2196F3',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }} 
          />
          <Stack.Screen 
            name="dashboard" 
            options={{ 
              title: 'Dashboard',
              headerStyle: {
                backgroundColor: '#2196F3',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }} 
          />
        </Stack>
      </AdminProvider>
    </UserProvider>
  );
}