import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useUser } from '../context/UserContext';
import { useAdmin } from '../context/AdminContext';
import { router } from 'expo-router';
import AdminExport from './AdminExport';

const Dashboard = () => {
  const { currentUser, logout: userLogout, users } = useUser();
  const { currentAdmin, logout: adminLogout } = useAdmin();

  const handleLogout = () => {
    if (currentUser) {
      userLogout();
    } else if (currentAdmin) {
      adminLogout();
    }
    router.replace('/');
  };

  const renderUserInfo = () => {
    if (!currentUser) return null;

    return (
      <View style={styles.card}>
        <Text style={styles.title}>User Information</Text>
        <Text style={styles.text}>Name: {currentUser.fullName}</Text>
        <Text style={styles.text}>Email: {currentUser.email}</Text>
        <Text style={styles.text}>Role: {currentUser.role}</Text>
        <Text style={styles.text}>Assigned Park: {currentUser.assignedPark}</Text>
        <Text style={styles.text}>Certification Status: {currentUser.certificationStatus}</Text>
        <Text style={styles.text}>Training Completed: {currentUser.trainingCompleted ? 'Yes' : 'No'}</Text>
      </View>
    );
  };

  const renderAdminInfo = () => {
    if (!currentAdmin) return null;

    return (
      <View style={styles.card}>
        <Text style={styles.title}>Admin Information</Text>
        <Text style={styles.text}>Name: {currentAdmin.fullName}</Text>
        <Text style={styles.text}>Email: {currentAdmin.email}</Text>
        <Text style={styles.text}>Role: {currentAdmin.role}</Text>
        <Text style={styles.text}>Assigned Parks: {currentAdmin.assignedParks.join(', ')}</Text>
        <Text style={styles.text}>Permissions: {currentAdmin.permissions.join(', ')}</Text>
        <Text style={styles.text}>Status: {currentAdmin.status}</Text>
        <Text style={styles.text}>Last Login: {currentAdmin.lastLogin}</Text>
      </View>
    );
  };

  const renderUsersList = () => {
    if (!currentAdmin) return null;

    return (
      <View style={styles.card}>
        <Text style={styles.title}>Users List</Text>
        {users.map(user => (
          <View key={user.id} style={styles.userCard}>
            <Text style={styles.userTitle}>User ID: {user.id}</Text>
            <Text style={styles.text}>Name: {user.fullName}</Text>
            <Text style={styles.text}>Email: {user.email}</Text>
            <Text style={styles.text}>Role: {user.role}</Text>
            <Text style={styles.text}>Assigned Park: {user.assignedPark}</Text>
            <Text style={styles.text}>Certifications: {user.certifications.join(', ')}</Text>
            <Text style={styles.text}>Training Status: {user.trainingCompleted ? 'Completed' : 'Pending'}</Text>
            <Text style={styles.text}>Certification Status: {user.certificationStatus}</Text>
            <Text style={styles.text}>Notifications: {user.notifications.length > 0 ? user.notifications.join(', ') : 'No notifications'}</Text>
            <View style={styles.statusContainer}>
              <Text style={[styles.statusText, { color: user.status === 'active' ? '#4CAF50' : '#FF5722' }]}>
                Status: {user.status}
              </Text>
            </View>
            {currentAdmin.permissions.includes('manage_users') && (
              <View style={styles.roleActions}>
                <TouchableOpacity
                  style={[styles.roleButton, user.role === 'admin' && styles.disabledButton]}
                  onPress={() => updateUserRole(user.id, 'admin')}
                  disabled={user.role === 'admin'}
                >
                  <Text style={styles.roleButtonText}>Make Admin</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.roleButton, user.role === 'user' && styles.disabledButton]}
                  onPress={() => updateUserRole(user.id, 'user')}
                  disabled={user.role === 'user'}
                >
                  <Text style={styles.roleButtonText}>Make User</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Dashboard</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.content}>
        {renderUserInfo()}
        {renderAdminInfo()}
        {renderUsersList()}
        {currentAdmin && <AdminExport />}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#2196F3',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  logoutButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  logoutText: {
    color: '#2196F3',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  text: {
    fontSize: 16,
    marginBottom: 8,
    color: '#666',
  },
  userCard: {
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  userTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#2196F3',
  },
  statusContainer: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
  },
  statusText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  roleActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  roleButton: {
    backgroundColor: '#2196F3',
    padding: 8,
    borderRadius: 5,
    minWidth: 100,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#BDBDBD',
  },
  roleButtonText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default Dashboard; 