import { View, Text, Button, StyleSheet } from 'react-native';
import { useAuth } from '@/context/AuthContext';

export default function AdminDashboard() {
  const { user, logout } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, Admin {user?.username}!</Text>
      <Text>Admin Dashboard</Text>
      <Button title="Logout" onPress={logout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
});