import React from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const VisitorFilterBar = ({
  searchDate,
  setSearchDate,
  showDatePicker,
  setShowDatePicker,
  phone,
  setPhone,
  badge,
  setBadge,
  statusFilter,
  setStatusFilter,
}) => {
  return (
    <View style={styles.filters}>
      <TouchableOpacity
        onPress={() => setShowDatePicker(true)}
        style={styles.filterInput}
      >
        <Text>{searchDate.toLocaleDateString()}</Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={searchDate}
          mode="date"
          display="default"
          onChange={(e, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) setSearchDate(selectedDate);
          }}
        />
      )}

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
              ? 'Pending'
              : prev === 'Pending'
              ? 'Checked In'
              : prev === 'Checked In'
              ? 'Checked Out'
              : 'All'
          )
        }
      >
        <Text>{statusFilter}</Text>
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
});
