import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface AdminUserCardProps {
  id: string;
  name: string;
  email: string;
  branch: string;
  password: string;
  onDelete: (id: string) => void;
}

const UserCard: React.FC<AdminUserCardProps> = ({
  id,
  name,
  email,
  branch,
  password,
  onDelete,
}) => (
  <View style={styles.card}>
    <Text style={styles.name}>{name}</Text>
    <Text style={styles.email}>{email}</Text>
    <Text style={styles.branch}>Branch: {branch}</Text>
    <Text style={styles.email}>Password: {password}</Text>
    <TouchableOpacity onPress={() => onDelete(id)} style={styles.deleteButton}>
      <Text style={styles.deleteText}>Remove</Text>
    </TouchableOpacity>
  </View>
);

export default UserCard;

const styles = StyleSheet.create({
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
