import React from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const VisitorFilterBar = ({
  phone,
  setPhone,
  badge,
  setBadge,
  statusFilter,
  setStatusFilter,
}) => {
  const handleReset = () => {
    setPhone('');
    setBadge('');
    setStatusFilter('All');
  };

  return (
    <View style={styles.filters}>
      <TextInput
        style={styles.filterInput}
        placeholder="Phone Number"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
      />
      <TextInput
        style={styles.filterInput}
        placeholder="Badge No"
        value={badge}
        onChangeText={setBadge}
      />
      <TouchableOpacity
        style={styles.filterInput}
        onPress={() =>
          setStatusFilter(prev =>
            prev === 'All'
              ? 'pending'
              : prev === 'pending'
              ? 'checkedIn'
              : prev === 'checkedIn'
              ? 'checkedOut'
              : 'All',
          )
        }
      >
        <Text>{statusFilter}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
        <Text style={styles.resetText}>Reset</Text>
      </TouchableOpacity>
    </View>
  );
};

export default VisitorFilterBar;

const styles = StyleSheet.create({
  filters: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 12,
  },
  filterInput: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    flexGrow: 1,
    minWidth: '45%',
    elevation: 2,
  },
  resetButton: {
    backgroundColor: '#e74c3c',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    elevation: 2,
  },
  resetText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
