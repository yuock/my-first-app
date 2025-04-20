import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, Platform } from 'react-native';
import { exportToExcel } from '../utils/exportData';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

const AdminExport = () => {
  const [loading, setLoading] = useState(false);
  const [exportType, setExportType] = useState<'users' | 'reviews' | null>(null);

  const handleExport = async (type: 'users' | 'reviews') => {
    try {
      setLoading(true);
      setExportType(type);
      
      await exportToExcel(type);
      
      // Show success message
      alert(`${type} data download started!`);
    } catch (error) {
      console.error('Export error:', error);
      alert(
        error instanceof Error ? error.message : 'Failed to export data. Please try again.'
      );
    } finally {
      setLoading(false);
      setExportType(null);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Export Data</h2>
      
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>User Data Export</h3>
        <p style={styles.description}>
          Export all user data including guide information, certifications, and performance metrics.
        </p>
        <button
          style={{
            ...styles.button,
            ...styles.exportButton,
            ...(loading && exportType === 'users' ? styles.disabledButton : {})
          }}
          onClick={() => handleExport('users')}
          disabled={loading}
        >
          {loading && exportType === 'users' ? (
            <span>Exporting...</span>
          ) : (
            'Export User Data'
          )}
        </button>
      </div>

      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Review Data Export</h3>
        <p style={styles.description}>
          Export all review data including tour feedback, ratings, and analysis.
        </p>
        <button
          style={{
            ...styles.button,
            ...styles.exportButton,
            ...(loading && exportType === 'reviews' ? styles.disabledButton : {})
          }}
          onClick={() => handleExport('reviews')}
          disabled={loading}
        >
          {loading && exportType === 'reviews' ? (
            <span>Exporting...</span>
          ) : (
            'Export Review Data'
          )}
        </button>
      </div>

      <div style={styles.infoSection}>
        <h3 style={styles.infoTitle}>Export Information</h3>
        <p style={styles.infoText}>
          • Files are saved in your downloads folder
        </p>
        <p style={styles.infoText}>
          • Each export includes multiple sheets with detailed analysis
        </p>
        <p style={styles.infoText}>
          • Files are named with timestamps to prevent overwriting
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#333',
  },
  section: {
    marginBottom: '30px',
    padding: '20px',
    backgroundColor: '#f8f9fa',
    borderRadius: '10px',
    border: '1px solid #e9ecef',
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: '#333',
  },
  description: {
    fontSize: '14px',
    color: '#666',
    marginBottom: '15px',
    lineHeight: '20px',
  },
  button: {
    padding: '15px',
    borderRadius: '8px',
    textAlign: 'center',
    cursor: 'pointer',
    border: 'none',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: '16px',
  },
  exportButton: {
    backgroundColor: '#4CAF50',
  },
  disabledButton: {
    backgroundColor: '#A5D6A7',
    cursor: 'not-allowed',
  },
  infoSection: {
    marginTop: '20px',
    padding: '15px',
    backgroundColor: '#e3f2fd',
    borderRadius: '8px',
  },
  infoTitle: {
    fontSize: '16px',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: '#1976D2',
  },
  infoText: {
    fontSize: '14px',
    color: '#333',
    marginBottom: '5px',
  },
};

export default AdminExport; 