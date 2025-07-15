import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const StatCard = ({ title, value }: { title: string; value: string }) => (
  <View style={styles.card}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

export default StatCard;

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    width: '48%',
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    elevation: 2,
  },
  title: { fontSize: 14, color: '#666' },
  value: { fontSize: 24, fontWeight: 'bold', color: '#333' },
});
