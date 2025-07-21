// components/Notification/BranchFilterPicker.tsx
import React from 'react';
import { View, Text, Platform, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface Props {
  selectedBranch: string;
  onChange: (branch: string) => void;
  branches: string[];
}

const BranchFilterPicker = ({ selectedBranch, onChange, branches }: Props) => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Security Users</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={selectedBranch}
          onValueChange={onChange}
          style={Platform.OS === 'android' ? styles.picker : undefined}
        >
          {branches.map(branch => (
            <Picker.Item key={branch} label={branch} value={branch} />
          ))}
        </Picker>
      </View>
    </View>
  );
};

export default BranchFilterPicker;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#003366',
  },
  pickerWrapper: {
    backgroundColor: '#fff',
    borderRadius: 6,
    paddingHorizontal: 10,
    elevation: 2,
  },
  picker: {
    height: 50,
    width: 140,
    color: '#333',
  },
});
