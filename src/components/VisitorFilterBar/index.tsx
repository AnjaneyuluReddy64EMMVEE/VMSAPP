import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

type VisitorFilterBarProps = {
  phone: string;
  setPhone: (val: string) => void;
  badge: string;
  setBadge: (val: string) => void;
  statusFilter: string;
  setStatusFilter: (val: string) => void;
  onResetFilters: () => void;
};

const VisitorFilterBar: React.FC<VisitorFilterBarProps> = ({
  phone,
  setPhone,
  badge,
  setBadge,
  statusFilter,
  setStatusFilter,
  onResetFilters,
}) => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: 'All', value: 'All' },
    { label: 'Pending', value: 'pending' },
    { label: 'Checked In', value: 'checkedIn' },
    { label: 'Checked Out', value: 'checkedOut' },
  ]);

  const handleReset = () => {
    setOpen(false);
    onResetFilters();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Badge Number"
        value={badge}
        onChangeText={setBadge}
      />
      {/* Wrap dropdown with zIndex fix */}
      <View style={{ zIndex: 1000, width: '100%' }}>
        <DropDownPicker
          open={open}
          value={statusFilter}
          items={items}
          setOpen={setOpen}
          setValue={setStatusFilter}
          setItems={setItems}
          placeholder="Select Status"
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropdownContainer}
        />
      </View>

      <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
        <Text style={styles.resetText}>Reset</Text>
      </TouchableOpacity>
    </View>
  );
};

export default VisitorFilterBar;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    gap: 10,
    zIndex: 100, // Helps with dropdown overlap
  },
  input: {
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  dropdown: {
    borderColor: '#ccc',
    height: 45,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  dropDownContainer: {
    borderColor: '#ccc',
    zIndex: 1000,
  },
  resetButton: {
    backgroundColor: '#b03a3a',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  resetText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
