// app/(tabs)/screens/AdminDashboard.tsx

import React from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';

const guides = [
  { id: '1', name: 'John Doe', certificationStatus: 'Pending' },
  { id: '2', name: 'Jane Smith', certificationStatus: 'Approved' },
];

export default function AdminDashboard() {
  const handleApprove = (id) => {
    // Handle certification approval logic
    console.log('Approving guide with ID:', id);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Dashboard</Text>
      <FlatList
        data={guides}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.name}</Text>
            <Text>Status: {item.certificationStatus}</Text>
            <Button title="Approve" onPress={() => handleApprove(item.id)} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  item: { marginBottom: 16 },
});
