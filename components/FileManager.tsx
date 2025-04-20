import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert, ScrollView } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { listExportedFiles } from '../utils/exportData';

const FileManager = () => {
  const [files, setFiles] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [showPath, setShowPath] = useState(false);

  const loadFiles = async () => {
    try {
      setLoading(true);
      const fileList = await listExportedFiles();
      setFiles(fileList);
    } catch (error) {
      console.error('Error loading files:', error);
      Alert.alert('Error', 'Failed to load files');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFiles();
  }, []);

  const handleShare = async (filename: string) => {
    try {
      const fileUri = `${FileSystem.documentDirectory}exports/${filename}`;
      await Sharing.shareAsync(fileUri, {
        mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        dialogTitle: `Share ${filename}`,
      });
    } catch (error) {
      console.error('Error sharing file:', error);
      Alert.alert('Error', 'Failed to share file');
    }
  };

  const handleDelete = async (filename: string) => {
    try {
      const fileUri = `${FileSystem.documentDirectory}exports/${filename}`;
      await FileSystem.deleteAsync(fileUri);
      await loadFiles();
      Alert.alert('Success', 'File deleted successfully');
    } catch (error) {
      console.error('Error deleting file:', error);
      Alert.alert('Error', 'Failed to delete file');
    }
  };

  const renderFileItem = ({ item }: { item: string }) => (
    <View style={styles.fileItem}>
      <Text style={styles.fileName}>{item}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.shareButton]}
          onPress={() => handleShare(item)}
        >
          <Text style={styles.buttonText}>Share</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.deleteButton]}
          onPress={() => handleDelete(item)}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Exported Files</Text>
      
      <TouchableOpacity
        style={styles.pathButton}
        onPress={() => setShowPath(!showPath)}
      >
        <Text style={styles.pathButtonText}>
          {showPath ? 'Hide File Location' : 'Show File Location'}
        </Text>
      </TouchableOpacity>

      {showPath && (
        <View style={styles.pathContainer}>
          <Text style={styles.pathTitle}>Files are saved at:</Text>
          <Text style={styles.pathText}>{FileSystem.documentDirectory}exports/</Text>
          <Text style={styles.pathNote}>
            On Android: Internal Storage/Android/data/host.exp.exponent/files/exports/
          </Text>
          <Text style={styles.pathNote}>
            On iOS: Files app → On My iPhone/[Your App Name]/exports/
          </Text>
        </View>
      )}

      {loading ? (
        <Text>Loading files...</Text>
      ) : files.length === 0 ? (
        <Text>No exported files found</Text>
      ) : (
        <FlatList
          data={files}
          renderItem={renderFileItem}
          keyExtractor={(item) => item}
          style={styles.list}
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  pathButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    alignItems: 'center',
  },
  pathButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  pathContainer: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 5,
    marginBottom: 20,
  },
  pathTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  pathText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
    fontFamily: 'monospace',
  },
  pathNote: {
    fontSize: 12,
    color: '#888',
    marginTop: 5,
  },
  list: {
    flex: 1,
  },
  fileItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  fileName: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    padding: 8,
    borderRadius: 5,
    marginLeft: 10,
    minWidth: 70,
    alignItems: 'center',
  },
  shareButton: {
    backgroundColor: '#4CAF50',
  },
  deleteButton: {
    backgroundColor: '#f44336',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default FileManager; 