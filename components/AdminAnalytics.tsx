import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useAdmin } from '../context/AdminContext';
import { exportToExcel } from '../utils/exportData';

const AdminAnalytics = () => {
  const { isAuthenticated } = useAdmin();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleExport = async (type: 'users' | 'reviews') => {
    try {
      setLoading(true);
      setError('');

      await exportToExcel(type);
    } catch (err) {
      setError('Failed to export data. Please try again.');
      console.error('Export error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Please log in as admin to access this page</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Analytics Dashboard</Text>
      
      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : null}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Data Export</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, loading && styles.disabledButton]}
            onPress={() => handleExport('users')}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? 'Exporting...' : 'Export User Data'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, loading && styles.disabledButton]}
            onPress={() => handleExport('reviews')}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? 'Exporting...' : 'Export Review Data'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Analysis Tips</Text>
        <View style={styles.tipContainer}>
          <Text style={styles.tipText}>
            • User data includes performance metrics, certifications, and check-in history
          </Text>
          <Text style={styles.tipText}>
            • Review data includes ratings, comments, and visitor feedback
          </Text>
          <Text style={styles.tipText}>
            • Use Excel's pivot tables to analyze guide performance by park
          </Text>
          <Text style={styles.tipText}>
            • Filter reviews by date range to track improvement over time
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  section: {
    marginBottom: 30,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: '#FF5252',
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  tipContainer: {
    marginTop: 10,
  },
  tipText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
});

export default AdminAnalytics; 