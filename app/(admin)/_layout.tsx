import { Stack } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import { Redirect } from 'expo-router';

export default function AdminLayout() {
  const { user } = useAuth();

  if (!user || user.role !== 'admin') {
    return <Redirect href="/" />;
  }

  return <Stack />;
}