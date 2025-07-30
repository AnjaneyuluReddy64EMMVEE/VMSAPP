import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';

interface AdminFilterBarProps {
  name: string;
  setName: (val: string) => void;
  phone: string;
  setPhone: (val: string) => void;
  empId: string;
  setEmpId: (val: string) => void;
  onReset: () => void;
}

const AdminFilterBar: React.FC<AdminFilterBarProps> = ({
  name,
  setName,
  phone,
  setPhone,
  empId,
  setEmpId,
  onReset,
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search by Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Search by Employee ID"
        value={empId}
        onChangeText={setEmpId}
      />
      <TextInput
        style={styles.input}
        placeholder="Search by Phone"
        keyboardType="number-pad"
        value={phone}
        onChangeText={setPhone}
      />

      <TouchableOpacity style={styles.resetButton} onPress={onReset}>
        <Text style={styles.resetButtonText}>Reset</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AdminFilterBar;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    gap: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 40,
    backgroundColor: '#fff',
  },
  resetButton: {
    marginTop: 8,
    alignSelf: 'flex-start',
    backgroundColor: '#b03a3a',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  resetButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
