import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const mockAdminUsers = [
  { id: '1', name: 'Ravi Kumar', email: 'ravi.admin@emmvee.in', branch: 'Head Office' },
  { id: '2', name: 'Pooja Reddy', email: 'pooja.admin@emmvee.in', branch: 'Dabaspet' },
  { id: '3', name: 'Manoj Shetty', email: 'manoj.s@emmvee.in', branch: 'Head Office' },
  { id: '4', name: 'Neha Jain', email: 'neha.j@emmvee.in', branch: 'Dabaspet' },
];

const AdminUsersScreen = () => {
  const [adminUsers, setAdminUsers] = useState(mockAdminUsers);

  const handleDelete = (id) => {
    Alert.alert('Confirm Delete', 'Are you sure you want to remove this user?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => setAdminUsers(prev => prev.filter(user => user.id !== id)),
      },
    ]);
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.email}>{item.email}</Text>
      <Text style={styles.branch}>Branch: {item.branch}</Text>
      <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.deleteButton}>
        <Text style={styles.deleteText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Users</Text>
      <FlatList
        data={adminUsers}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

export default AdminUsersScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f6ff',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#003366',
    marginBottom: 20,
    alignSelf: 'center',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  email: {
    fontSize: 14,
    color: '#555',
    marginVertical: 4,
  },
  branch: {
    fontSize: 14,
    color: '#007AFF',
    marginBottom: 8,
  },
  deleteButton: {
    backgroundColor: '#b03a3a',
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 5,
  },
  deleteText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
