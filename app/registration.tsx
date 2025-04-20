import Registration from '../components/Registration';
import { Redirect } from 'expo-router';
import { useUser } from '../context/UserContext';
import { useAdmin } from '../context/AdminContext';

export default function RegistrationPage() {
  const { currentUser } = useUser();
  const { currentAdmin } = useAdmin();

  // If user or admin is already logged in, redirect to dashboard
  if (currentUser || currentAdmin) {
    return <Redirect href="/dashboard" />;
  }

  return <Registration />;
} 