import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UserProvider } from './context/UserContext';
import { AdminProvider } from './context/AdminContext';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <UserProvider>
      <AdminProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen 
              name="Login" 
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen 
              name="Dashboard" 
              component={Dashboard}
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
          </Stack.Navigator>
        </NavigationContainer>
      </AdminProvider>
    </UserProvider>
  );
}
