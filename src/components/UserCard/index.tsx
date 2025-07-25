import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface AdminUserCardProps {
  _id: string;
  userName: string;
  employeeId: string;
  email: string;
  password: string;
  phoneNumber: string;
  officeLocation: string[];
  role: string;
  onDelete: (employeeId: string) => void;
  sourceScreen: string;
}

const UserCard: React.FC<AdminUserCardProps> = ({
  userName,
  employeeId,
  email,
  password,
  phoneNumber,
  officeLocation,
  role,
  onDelete,
  sourceScreen,
}) => (
  <View style={styles.card}>
    <Text style={styles.name}>{userName}</Text>
    <Text style={styles.role}>Role: {role}</Text>
    {<Text style={styles.text}>Email: {email}</Text>}
    <Text style={styles.text}>Password: {password}</Text>
    <Text style={styles.text}>Phone: {phoneNumber}</Text>
    <Text style={styles.text}>Emp ID: {employeeId}</Text>
    <Text style={styles.branch}>
      Offices: {officeLocation?.join(', ') || 'N/A'}
    </Text>

    <TouchableOpacity
      onPress={() => onDelete(employeeId)}
      style={styles.deleteButton}
    >
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
  role: {
    fontSize: 14,
    color: '#008000',
    marginBottom: 4,
  },
  text: {
    fontSize: 14,
    color: '#555',
    marginVertical: 2,
  },
  branch: {
    fontSize: 14,
    color: '#007AFF',
    marginVertical: 2,
  },
  deleteButton: {
    backgroundColor: '#b03a3a',
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 10,
  },
  deleteText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
