import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
  Image,
  Platform,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

const mockAdminUsers = [
  {
    id: '1',
    name: 'Ravi Kumar',
    email: 'ravi.admin@emmvee.in',
    branch: 'Head Office',
    password: 'Admin@123',
  },
  {
    id: '2',
    name: 'Pooja Reddy',
    email: 'pooja.admin@emmvee.in',
    branch: 'Dabaspet',
    password: 'Pooja@456',
  },
  {
    id: '3',
    name: 'Manoj Shetty',
    email: 'manoj.s@emmvee.in',
    branch: 'Head Office',
    password: 'Manoj@789',
  },
  {
    id: '4',
    name: 'Neha Jain',
    email: 'neha.j@emmvee.in',
    branch: 'Dabaspet',
    password: 'Neha@321',
  },
];


const AdminUsersScreen = () => {
  const [adminUsers, setAdminUsers] = useState(mockAdminUsers);
  const [modalVisible, setModalVisible] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newBranch, setNewBranch] = useState('Head Office');

  const branches = ['Head Office', 'Dabaspet'];

  const handleDelete = (id: string) => {
    Alert.alert('Confirm Delete', 'Are you sure you want to remove this user?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => setAdminUsers(prev => prev.filter(user => user.id !== id)),
      },
    ]);
  };

  const renderItem = ({ item }: any) => (
    console.log(item),
    <View style={styles.card}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.email}>{item.email}</Text>
      <Text style={styles.branch}>Branch: {item.branch}</Text>
      <Text style={styles.email}>Password:{item.password}</Text>
      <Text>{item.newPassword}</Text>
      <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.deleteButton}>
        <Text style={styles.deleteText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  const handleAddAdmin = () => {
  if (!newName || !newEmail || !newPassword || !newBranch) {
    Alert.alert('Please fill all fields');
    return;
  }
  const newUser = {
    id: Date.now().toString(),
    name: newName,
    email: newEmail,
    branch: newBranch,
    password: newPassword, // ✅ Add this line
  };
  setAdminUsers(prev => [...prev, newUser]);
  setNewName('');
  setNewEmail('');
  setNewPassword('');
  setNewBranch('Head Office');
  setModalVisible(false);
};


  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <Image
          source={{ uri: 'https://emmvee.com/wp-content/uploads/2019/08/emvlogo.png' }}
          style={styles.logo}
        />
        <TouchableOpacity style={styles.addButtonTop} onPress={() => setModalVisible(true)}>
          <Text style={styles.addButtonTextTop}>+ Add Admin</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Admin Users</Text>

      <FlatList
        data={adminUsers}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      {/* Modal for Adding Admin */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Add Admin User</Text>

            <TextInput
              placeholder="Full Name"
              style={styles.input}
              value={newName}
              onChangeText={setNewName}
            />
            <TextInput
              placeholder="Email"
              style={styles.input}
              keyboardType="email-address"
              value={newEmail}
              onChangeText={setNewEmail}
            />
            <TextInput
              placeholder="Password"
              style={styles.input}
              secureTextEntry
              value={newPassword}
              onChangeText={setNewPassword}
            />

            <Text style={styles.label}>Select Branch</Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={newBranch}
                onValueChange={(itemValue) => setNewBranch(itemValue)}
                style={Platform.OS === 'android' ? styles.picker : undefined}
              >
                {branches.map(branch => (
                  <Picker.Item key={branch} label={branch} value={branch} />
                ))}
              </Picker>
            </View>

            <TouchableOpacity onPress={handleAddAdmin} style={styles.modalAddButton}>
              <Text style={styles.modalAddButtonText}>Add</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={[styles.modalAddButton, { backgroundColor: '#ccc' }]}
            >
              <Text style={styles.modalAddButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AdminUsersScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f6ff',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 40,
    resizeMode: 'contain',
  },
  addButtonTop: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  addButtonTextTop: {
    color: '#fff',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#003366',
    marginVertical: 20,
    alignSelf: 'center',
  },
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
  email: {
    fontSize: 14,
    color: '#555',
    marginVertical: 4,
  },
  branch: {
    fontSize: 14,
    color: '#007AFF',
    marginBottom: 8,
  },
  deleteButton: {
    backgroundColor: '#b03a3a',
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 5,
  },
  deleteText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    width: '85%',
    borderRadius: 12,
    padding: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#003366',
    marginBottom: 12,
  },
  input: {
    backgroundColor: '#f2f2f2',
    padding: 10,
    marginVertical: 6,
    borderRadius: 6,
    fontSize: 16,
  },
  pickerWrapper: {
    backgroundColor: '#f2f2f2',
    borderRadius: 6,
    marginTop: 6,
    marginBottom: 10,
  },
  picker: {
    height: 48,
    color: '#333',
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginTop: 10,
    marginBottom: 4,
  },
  modalAddButton: {
    backgroundColor: '#00AEEF',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 10,
  },
  modalAddButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
