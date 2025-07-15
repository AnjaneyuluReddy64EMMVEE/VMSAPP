import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const VisitorCard = ({ item, onView }) => {
  const statusStyle =
    item.status === 'Pending'
      ? styles.statusPending
      : item.status === 'Checked In'
      ? styles.statusIn
      : styles.statusOut;

  return (
    <View style={styles.card}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.details}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.text}>{item.phone}</Text>
        <Text style={styles.text}>{item.email}</Text>
        <Text style={styles.text}>Badge: {item.badge || 'N/A'}</Text>
        <Text style={styles.text}>Location: {item.location}</Text>
      </View>
      <View style={styles.rightSection}>
        <Text style={[styles.status, statusStyle]}>{item.status}</Text>
        <Text style={styles.text}>Purpose: {item.purpose}</Text>
        <Text style={styles.text}>To Meet: {item.personToMeet}</Text>
        <Text style={styles.text}>
          {item.inTime} - {item.outTime || 'N/A'}
        </Text>
        <TouchableOpacity style={styles.viewButton} onPress={() => onView(item)}>
          <Text style={styles.viewText}>View</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default VisitorCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    elevation: 2,
  },
  avatar: { width: 44, height: 44, borderRadius: 22, marginRight: 10 },
  details: { flex: 1 },
  rightSection: { flex: 1.2, alignItems: 'flex-end' },
  name: { fontSize: 16, fontWeight: '600' },
  text: { fontSize: 12, color: '#444' },
  status: {
    fontWeight: '600',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    fontSize: 12,
    marginBottom: 4,
  },
  statusIn: { backgroundColor: '#ccf5d3', color: '#2e7d32' },
  statusOut: { backgroundColor: '#ffeeba', color: '#8d6e63' },
  statusPending: { backgroundColor: '#ffe0e0', color: '#c62828' },
  viewButton: {
    marginTop: 6,
    backgroundColor: '#007bff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  viewText: { color: 'white', fontWeight: '600', fontSize: 12 },
});
