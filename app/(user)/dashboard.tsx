import React from 'react'; // Add React import
import { View, Text, Button, StyleSheet } from 'react-native';
import { useAuth } from '@/context/AuthContext';

export default function UserDashboard() {
  const { user, logout } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, {user?.username}!</Text>
      <Text>User Dashboard</Text>
      <Button title="Logout" onPress={logout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
});