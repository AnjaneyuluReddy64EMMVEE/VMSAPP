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
import UserCard from '../../components/UserCard';
import AddUserModal from '../../components/AddUserModal';
import AdminFilterBar from '../../components/AdminFilterBar'; // ✅ reused

import {
  useGetAllSecurityQuery,
  useCreateSecurityMutation,
  useDeleteSecurityMutation,
} from '../../api';

import { useAuth } from '../../contexts/AuthContext';
import { BRANCHES, BRANCHESOFFORM } from '../../constants';

const SecurityUsersScreen = () => {
  const { selectedBranch } = useAuth();
  const officeLocation = selectedBranch === 'All' ? '' : selectedBranch;

  const {
    data: securityUsers = [],
    isLoading,
    refetch,
  } = useGetAllSecurityQuery({ officeLocation });

  const [createSecurity] = useCreateSecurityMutation();
  const [deleteSecurity] = useDeleteSecurityMutation();

  const [modalVisible, setModalVisible] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
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
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !newName ||
      !employeeId ||
      !newEmail ||
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

    if (!emailRegex.test(newEmail)) {
      Alert.alert('Invalid Email', 'Enter a valid email address.');
      return;
    }

    if (newPhone.length !== 10 || !/^\d+$/.test(newPhone)) {
      Alert.alert('Invalid Phone', 'Enter a valid 10-digit phone number.');
      return;
    }

    const payload = {
      userName: newName,
      phoneNumber: newPhone,
      password: newPassword,
      officeLocation: newBranch,
      employeeId,
      // email: newEmail,
      role: 'security',
    };

    try {
      await createSecurity(payload).unwrap();
      clearForm();
      refetch();
    } catch (err) {
      console.error('Security create error:', err);
      Alert.alert('Error', 'Failed to add security user');
    }
  };

  const clearForm = () => {
    setModalVisible(false);
    setNewName('');
    setNewEmail('');
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
            <UserCard
              _id={item._id}
              userName={item.userName}
              email={item.email || '-'}
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
      <AddUserModal
        visible={modalVisible}
        title="Add Security User"
        name={newName}
        email={newEmail}
        password={newPassword}
        phoneNumber={newPhone}
        employeeId={employeeId}
        branch={newBranch}
        branches={BRANCHESOFFORM}
        setName={setNewName}
        setEmail={setNewEmail}
        setPassword={setNewPassword}
        setPhoneNumber={setNewPhone}
        setEmployeeId={setEmployeeId}
        setBranch={setNewBranch}
        onClose={() => setModalVisible(false)}
        onAdd={handleAdd}
        sourceScreen="security"
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
