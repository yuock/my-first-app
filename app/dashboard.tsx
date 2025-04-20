import { Redirect } from 'expo-router';
import { useUser } from '../context/UserContext';
import { useAdmin } from '../context/AdminContext';
import Dashboard from '../components/Dashboard';

export default function DashboardScreen() {
  const { currentUser } = useUser();
  const { currentAdmin } = useAdmin();

  // If no user or admin is logged in, redirect to login
  if (!currentUser && !currentAdmin) {
    return <Redirect href="/" />;
  }

  return <Dashboard />;
} 