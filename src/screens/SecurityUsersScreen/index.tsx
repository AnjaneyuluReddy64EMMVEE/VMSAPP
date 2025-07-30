import React, { useState, useCallback } from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  SafeAreaView,
  Text,
  ActivityIndicator,
} from 'react-native';

import Header from '../../components/Header';
import AdminFilterBar from '../../components/AdminFilterBar'; // ✅ reused

import {
  useGetAllSecurityQuery,
  useCreateSecurityMutation,
  useDeleteSecurityMutation,
} from '../../api';

import { useAuth } from '../../contexts/AuthContext';
import AddSecurityUserModal from '../../components/AddSecurityUserModal';
import SecurityUserCard from '../../components/SecurityUserCard';
import { showErrorMessage, showSuccessMessage } from '../../utils/Globals';
import { images } from '../../utils/Images';

const SecurityUsersScreen = () => {
  const { selectedBranch, userBranch } = useAuth();
  const officeLocation = selectedBranch === 'All' ? '' : selectedBranch;
  const branchList = Array.isArray(userBranch)
    ? userBranch
    : typeof userBranch === 'string'
    ? userBranch
        .split(',')
        .map(b => b.trim())
        .filter(Boolean)
    : [];

  const {
    data: securityUsers = [],
    isLoading,
    refetch,
  } = useGetAllSecurityQuery({ officeLocation });

  const [createSecurity] = useCreateSecurityMutation();
  const [deleteSecurity] = useDeleteSecurityMutation();

  const [modalVisible, setModalVisible] = useState(false);
  const [newName, setNewName] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newBranch, setNewBranch] = useState<string[]>([]);
  const [newPhone, setNewPhone] = useState('');
  const [employeeId, setEmployeeId] = useState('');

  // 🔍 Filters
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
            await deleteSecurity(employeeId).unwrap();
            showSuccessMessage({ message: 'User deleted successfully!' }); // ✅ Snackbar
            refetch(); // optional: refresh the list
          } catch (err) {
            console.error('Security delete error:', err);
            Alert.alert('Error', 'Failed to delete user');
          }
        },
      },
    ]);
  };
  const handleAdd = async () => {
    const nameRegex = /^[A-Za-z\s]+$/;

    if (
      !newName ||
      !employeeId ||
      !newPhone ||
      !newPassword ||
      newBranch.length === 0
    ) {
      Alert.alert('Validation Error', 'Please fill all the fields.');
      return;
    }

    if (!nameRegex.test(newName)) {
      Alert.alert('Invalid Name', 'Only letters and spaces are allowed.');
      return;
    }

    if (newPhone.length !== 10 || !/^\d+$/.test(newPhone)) {
      Alert.alert('Invalid Phone', 'Enter a valid 10-digit phone number.');
      return;
    }

    if (newBranch.length > 1) {
      Alert.alert(
        'Only One Branch Allowed',
        'Please select only one location.',
      );
      return;
    }

    const payload = {
      userName: newName,
      phoneNumber: newPhone,
      password: newPassword,
      officeLocation: newBranch[0],
      employeeId,
      role: 3,
    };
    try {
      await createSecurity(payload).unwrap();
      showSuccessMessage({ message: 'Security user added successfully!' });
      clearForm();
      refetch();
    } catch (err) {
      console.error('Security create error:', err);
      showErrorMessage({ message: 'Failed to add security user' });
    }
  };

  const clearForm = () => {
    setModalVisible(false);
    setNewName('');
    setNewPassword('');
    setNewBranch([]);
    setNewPhone('');
    setEmployeeId('');
  };

  const filteredUsers = securityUsers.filter(user => {
    const nameMatch = user.userName.toLowerCase().includes(name.toLowerCase());
    const phoneMatch = user.phoneNumber
      .toLowerCase()
      .includes(phone.toLowerCase());
    const idMatch = user.employeeId.toLowerCase().includes(empId.toLowerCase());

    return nameMatch && phoneMatch && idMatch;
  });

  useCallback(() => {
    refetch();
  }, [selectedBranch]);

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Security Users" showMenuButton />

      {/* ➕ Add Header */}
      <View style={styles.headerRow}>
        <Image source={images.Logo} style={styles.logo} />
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.addButtonText}>+ Add Security</Text>
        </TouchableOpacity>
      </View>
      {/* 🧪 Filter Bar */}
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
      {/* 👮 Security List */}
      {isLoading ? (
        <ActivityIndicator
          size="large"
          color="#28a745"
          style={{ marginTop: 20 }}
        />
      ) : (
        <FlatList
          data={filteredUsers}
          keyExtractor={item => item._id}
          renderItem={({ item }) => (
            <SecurityUserCard
              _id={item._id}
              userName={item.userName}
              phoneNumber={item.phoneNumber}
              password={item.password}
              employeeId={item.employeeId}
              officeLocation={[item.officeLocation]}
              role={item.role}
              onDelete={handleDelete}
            />
          )}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}

      {/* ➕ Add Modal */}
      <AddSecurityUserModal
        visible={modalVisible}
        title="Add Security User"
        name={newName}
        password={newPassword}
        phoneNumber={newPhone}
        employeeId={employeeId}
        branch={newBranch}
        branches={branchList}
        setName={setNewName}
        setPassword={setNewPassword}
        setPhoneNumber={setNewPhone}
        setEmployeeId={setEmployeeId}
        setBranch={setNewBranch}
        onClose={() => setModalVisible(false)}
        onAdd={handleAdd}
      />
    </SafeAreaView>
  );
};

export default SecurityUsersScreen;

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
    backgroundColor: '#28a745',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
