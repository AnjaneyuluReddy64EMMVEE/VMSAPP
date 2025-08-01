import React, { useState } from 'react';
import {
  View,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import Header from '../../components/Header';
import { useGetNotificationsQuery, useResetAppMutation } from '../../api';
import { useAuth } from '../../contexts/AuthContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const UserPasswordReset = () => {
  const [resetModalVisible, setResetModalVisible] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(
    null,
  );
  const [newPassword, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { user, selectedBranch } = useAuth();
  const {
    data: notifications,
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useGetNotificationsQuery();

  const [resetApp, { isLoading: isResetting }] = useResetAppMutation();

  const openResetModal = (id: string) => {
    setSelectedEmployeeId(id);
    setResetModalVisible(true);
  };

  const handleSubmit = async () => {
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    if (!selectedEmployeeId) return;

    try {
      await resetApp({
        employeeId: selectedEmployeeId,
        newPassword,
      }).unwrap();
      alert('Password reset successful');
      setResetModalVisible(false);
      setPassword('');
      setConfirmPassword('');
    } catch (error) {
      alert('Failed to reset password');
    }
  };

  const renderRow = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.employeeId}</Text>
      <Text style={styles.cell}>{item.officeLocation}</Text>
      <View style={styles.cell}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#b03a3a' }]}
          onPress={() => openResetModal(item.employeeId)}
        >
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header title="User Password Reset" showMenuButton />

      <View style={[styles.row, styles.headerRow]}>
        <Text style={[styles.cell, styles.headerText]}>Employee Id</Text>
        <Text style={[styles.cell, styles.headerText]}>Location</Text>
        <Text style={[styles.cell, styles.headerText]}>Reset Password</Text>
      </View>

      {isLoading ? (
        <ActivityIndicator
          size="large"
          color="#003366"
          style={{ marginTop: 20 }}
        />
      ) : isError ? (
        <Text style={{ textAlign: 'center', marginTop: 20, color: 'red' }}>
          Failed to load data.
        </Text>
      ) : (
        <FlatList
          data={notifications?.data}
          renderItem={renderRow}
          keyExtractor={item => item.employeeId}
          contentContainerStyle={{ paddingBottom: 100 }}
          refreshing={isFetching}
          onRefresh={refetch}
        />
      )}

      {/* 🔐 Password Reset Modal */}
      <Modal
        visible={resetModalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setResetModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={styles.modalWrapper}
          >
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Reset Password</Text>

              {/* Password */}
              <View style={styles.inputWrapper}>
                <TextInput
                  placeholder="New Password"
                  secureTextEntry={!showPassword}
                  value={newPassword}
                  onChangeText={setPassword}
                  style={styles.input}
                />
                <TouchableOpacity
                  style={styles.eyeIcon}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Icon name={showPassword ? 'eye' : 'eye-off'} size={20} />
                </TouchableOpacity>
              </View>

              {/* Confirm Password */}
              <View style={styles.inputWrapper}>
                <TextInput
                  placeholder="Confirm Password"
                  secureTextEntry={!showConfirmPassword}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  style={styles.input}
                />
                <TouchableOpacity
                  style={styles.eyeIcon}
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <Icon
                    name={showConfirmPassword ? 'eye' : 'eye-off'}
                    size={20}
                  />
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={[
                  styles.button,
                  { backgroundColor: '#007AFF', marginTop: 20 },
                ]}
                onPress={handleSubmit}
                disabled={isResetting}
              >
                <Text style={styles.buttonText}>
                  {isResetting ? 'Submitting...' : 'Submit'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setResetModalVisible(false)}
                style={[
                  styles.button,
                  { backgroundColor: '#b03a3a', marginTop: 20 },
                ]}
              >
                <Text style={{ color: 'white' }}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
};

export default UserPasswordReset;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fbfd',
    paddingHorizontal: 0,
    paddingTop: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  cell: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
  headerText: {
    fontWeight: 'bold',
    color: '#003366',
    textAlign: 'center',
  },
  headerRow: {
    backgroundColor: '#e6eef8',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  modalWrapper: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    elevation: 4,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#003366',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 6,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    height: 44,
    fontSize: 16,
  },
  eyeIcon: {
    padding: 4,
  },
});
