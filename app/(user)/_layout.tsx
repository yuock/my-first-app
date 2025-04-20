import { Stack } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import { Redirect } from 'expo-router';

export default function UserLayout() {
  const { user } = useAuth();

  if (!user || user.role !== 'user') {
    return <Redirect href="/" />;
  }

  return <Stack />;
}