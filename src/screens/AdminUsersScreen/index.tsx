import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import Header from '../../components/Header';
import AdminUserCard from '../../components/AdminUserCard';
import { useFocusEffect } from '@react-navigation/native';

import {
  useGetAllAdminsQuery,
  useCreateAdminMutation,
  useDeleteAdminMutation,
} from '../../api';
import { useAuth } from '../../contexts/AuthContext';
import AdminFilterBar from '../../components/AdminFilterBar';
import { BRANCHESOFFORM } from '../../constants';
import AddAdmminUserModal from '../../components/AddAdminUserModal';
import { showErrorMessage, showSuccessMessage } from '../../utils/Globals';

const AdminUsersScreen = () => {
  const { selectedBranch, userBranch } = useAuth();

  const location = selectedBranch === 'All' ? '' : selectedBranch;

  const {
    data: adminUsers = [],
    isLoading,
    refetch,
  } = useGetAllAdminsQuery({ officeLocation: location });

  const [createAdmin] = useCreateAdminMutation();
  const [deleteAdmin] = useDeleteAdminMutation();

  const [modalVisible, setModalVisible] = useState(false);
  const [newName, setNewName] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newBranch, setNewBranch] = useState<string[]>([]);

  // Filters
  const [name, setName] = useState('');
  const [empId, setEmpId] = useState('');
  const [phone, setPhone] = useState('');

  const handleDelete = (employeeId: string) => {
    Alert.alert('Confirm Delete', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            await deleteAdmin(employeeId).unwrap();
            showSuccessMessage({ message: 'Admin deleted successfully.' });
            refetch();
          } catch (err) {
            console.error('Delete error:', err);
            const message =
              err?.data?.message || 'Failed to delete admin. Please try again.';
            showErrorMessage({ message });
          }
        },
      },
    ]);
  };

  const handleAdd = async () => {
    const nameRegex = /^[A-Za-z\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !newName ||
      !employeeId ||
      !newEmail ||
      !phoneNumber ||
      !newPassword ||
      newBranch.length === 0
    ) {
      Alert.alert('Validation Error', 'Please fill all the fields.');
      return;
    }

    if (!nameRegex.test(newName)) {
      Alert.alert(
        'Invalid Name',
        'Name should only contain letters and spaces.',
      );
      return;
    }

    if (!emailRegex.test(newEmail)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }

    if (phoneNumber.length !== 10 || !/^\d+$/.test(phoneNumber)) {
      Alert.alert('Invalid Phone', 'Enter a valid 10-digit phone number.');
      return;
    }

    try {
      await createAdmin({
        userName: newName,
        employeeId,
        email: newEmail,
        phoneNumber,
        password: newPassword,
        officeLocation: newBranch,
        role: 'admin',
      }).unwrap();
      showSuccessMessage({ message: 'Admin added successfully!' });

      setModalVisible(false);
      setNewName('');
      setEmployeeId('');
      setNewEmail('');
      setPhoneNumber('');
      setNewPassword('');
      setNewBranch([]);

      refetch();
    } catch (err: any) {
      console.error('Add admin error:', err);
      const message =
        err?.data?.message || 'Failed to add admin. Please try again.';
      showErrorMessage({ message });
    }
  };

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [selectedBranch]),
  );

  const filteredUsers = adminUsers.filter(user => {
    const nameMatch = user.userName.toLowerCase().includes(name.toLowerCase());
    const phoneMatch = user.phoneNumber
      .toLowerCase()
      .includes(phone.toLowerCase());
    const idMatch = user.employeeId.toLowerCase().includes(empId.toLowerCase());

    return nameMatch && phoneMatch && idMatch;
  });

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Admin Users" showMenuButton />

      {/* Add Admin Header */}
      <View style={styles.headerRow}>
        <Image
          source={{
            uri: 'https://emmvee.com/wp-content/uploads/2019/08/emvlogo.png',
          }}
          style={styles.logo}
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.addButtonText}>+ Add Admin</Text>
        </TouchableOpacity>
      </View>

      {/* Filter Bar */}
      <AdminFilterBar
        name={name}
        setName={setName}
        empId={empId}
        setEmpId={setEmpId}
        phone={phone}
        setPhone={setPhone}
        onReset={() => {
          setName('');
          setEmpId('');
          setPhone('');
        }}
      />

      {/* Admin List */}
      {isLoading ? (
        <ActivityIndicator
          size="large"
          color="#007AFF"
          style={{ marginTop: 20 }}
        />
      ) : (
        <FlatList
          data={filteredUsers}
          keyExtractor={item => item._id}
          renderItem={({ item }) => (
            <AdminUserCard {...item} onDelete={handleDelete} />
          )}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}

      {/* Add Modal */}
      <AddAdmminUserModal
        title="Add Admin User"
        visible={modalVisible}
        name={newName}
        setName={setNewName}
        employeeId={employeeId}
        setEmployeeId={setEmployeeId}
        email={newEmail}
        setEmail={setNewEmail}
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
        password={newPassword}
        setPassword={setNewPassword}
        branch={newBranch}
        branches={BRANCHESOFFORM}
        setBranch={setNewBranch}
        onClose={() => setModalVisible(false)}
        onAdd={handleAdd}
      />
    </SafeAreaView>
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
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 40,
    resizeMode: 'contain',
  },
  addButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  officeSelectButton: {
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderRadius: 6,
    marginVertical: 6,
  },
  officeSelectText: {
    color: '#333',
    fontSize: 16,
  },
});
