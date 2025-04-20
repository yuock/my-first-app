import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

const users = [
  { id: '1', name: 'Park Guide 1', role: 'guide' },
  { id: '2', name: 'Park Guide 2', role: 'guide' },
  { id: '3', name: 'Park Guide 3', role: 'guide' },
  { id: '4', name: 'Park Guide 4', role: 'guide' },
];

export default function ManageUsers() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Admin Manage User</Text>
      <View style={styles.tabs}>
        <Text style={styles.activeTab}>Admin</Text>
        <Text style={styles.tab}>Park Guide</Text>
      </View>

      <FlatList
        data={users}
        renderItem={({ item }) => (
          <View style={styles.userRow}>
            <Text style={styles.userBadge}>A</Text>
            <Text style={styles.userName}>{item.name}</Text>
          </View>
        )}
        keyExtractor={item => item.id}
      />

      <View style={styles.bottomNav}>
        <Link href="/(admin)/" asChild>
          <Text style={styles.navItem}>Home</Text>
        </Link>
        <Text style={[styles.navItem, styles.activeNav]}>Manage User</Text>
        <Link href="/profile" asChild>
          <Text style={styles.navItem}>Profile</Text>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  tabs: { flexDirection: 'row', marginBottom: 20 },
  tab: { padding: 10, color: '#666' },
  activeTab: { padding: 10, fontWeight: 'bold', color: '#007AFF' },
  userRow: { flexDirection: 'row', alignItems: 'center', padding: 15, borderBottomWidth: 1, borderBottomColor: '#eee' },
  userBadge: { backgroundColor: '#007AFF', color: 'white', borderRadius: 15, width: 30, height: 30, textAlign: 'center', lineHeight: 30, marginRight: 10 },
  userName: { fontSize: 16 },
  bottomNav: { flexDirection: 'row', justifyContent: 'space-around', padding: 15, borderTopWidth: 1, borderTopColor: '#eee' },
  navItem: { color: '#666' },
  activeNav: { color: '#007AFF', fontWeight: 'bold' },
});