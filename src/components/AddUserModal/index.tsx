import React from 'react';
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface AddAdminModalProps {
  visible: boolean;
  title: string;
  name: string;
  email: string;
  password: string;
  branch: string;
  branches: string[];
  onClose: () => void;
  onAdd: () => void;
  setName: (text: string) => void;
  setEmail: (text: string) => void;
  setPassword: (text: string) => void;
  setBranch: (branch: string) => void;
}

const AddUserModal: React.FC<AddAdminModalProps> = ({
  title,
  visible,
  name,
  email,
  password,
  branch,
  branches,
  onClose,
  onAdd,
  setName,
  setEmail,
  setPassword,
  setBranch,
}) => (
  <Modal visible={visible} animationType="slide" transparent>
    <View style={styles.overlay}>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>

        <TextInput
          placeholder="Full Name"
          style={styles.input}
          value={name}
          onChangeText={setName}
        />
        <TextInput
          placeholder="Email"
          style={styles.input}
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="Password"
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <Text style={styles.label}>Select Branch</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={branch}
            onValueChange={value => setBranch(value)}
            style={Platform.OS === 'android' ? styles.picker : undefined}
            itemStyle={Platform.OS === 'ios' ? styles.pickerItemIOS : undefined}
          >
            {branches.map(branch => (
              <Picker.Item key={branch} label={branch} value={branch} />
            ))}
          </Picker>
        </View>

        <TouchableOpacity onPress={onAdd} style={styles.addButton}>
          <Text style={styles.addText}>Add</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onClose}
          style={[styles.addButton, { backgroundColor: '#ccc' }]}
        >
          <Text style={styles.addText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

export default AddUserModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#fff',
    width: '85%',
    borderRadius: 12,
    padding: 20,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#003366',
    marginBottom: 12,
    alignSelf: 'center',
  },
  input: {
    backgroundColor: '#f2f2f2',
    padding: 10,
    marginVertical: 6,
    borderRadius: 6,
    fontSize: 16,
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginTop: 10,
    marginBottom: 4,
  },
  pickerWrapper: {
    backgroundColor: '#f2f2f2',
    borderRadius: 6,
    marginBottom: 10,
  },
  picker: {
    height: 50,
    color: '#333',
  },
  pickerItemIOS: {
    fontSize: 16,
    height: 50,
  },
  addButton: {
    backgroundColor: '#00AEEF',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 10,
  },
  addText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
