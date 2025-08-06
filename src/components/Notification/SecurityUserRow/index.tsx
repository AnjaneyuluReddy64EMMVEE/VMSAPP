import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface Props {
  id: string;
  location: string;
  onReset: (id: string) => void;
}

const SecurityUserRow = ({ id, location, onReset }: Props) => {
  return (
    <View style={styles.row}>
      <Text style={styles.cell}>{id}</Text>
      <Text style={styles.cell}>{location}</Text>
      <TouchableOpacity onPress={() => onReset(id)} style={styles.resetButton}>
        <Text style={styles.resetButtonText}>Reset</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SecurityUserRow;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  cell: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  resetButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  resetButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
    textAlign: 'center',
  },
});
