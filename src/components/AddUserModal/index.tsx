import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  ScrollView,
} from 'react-native';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import BranchSelector from '../BranchSelector';

interface AddAdminModalProps {
  visible: boolean;
  title: string;
  name: string;
  email: string;
  password: string;
  employeeId: string;
  phoneNumber: string;
  branch: string[]; // ✅ single branch
  setBranch: (branch: string[]) => void;
  branches: string[];
  onClose: () => void;
  onAdd: () => void;
  setName: (text: string) => void;
  setEmail: (text: string) => void;
  setPassword: (text: string) => void;
  setEmployeeId: (text: string) => void;
  setPhoneNumber: (text: string) => void;
  // sourceScreen: 'admin' | 'security';
}

const AddUserModal: React.FC<AddAdminModalProps> = ({
  title,
  visible,
  name,
  email,
  password,
  employeeId,
  phoneNumber,
  branch,
  branches,
  onClose,
  onAdd,
  setName,
  setEmail,
  setPassword,
  setEmployeeId,
  setPhoneNumber,
  setBranch,
  sourceScreen,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showBranchPicker, setShowBranchPicker] = useState(false);
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>{title}</Text>

          <TextInput
            placeholder="Full Name"
            style={styles.input}
            value={name}
            onChangeText={setName}
          />
          {sourceScreen !== 'security' && (
            <TextInput
              placeholder="Email"
              style={styles.input}
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
          )}
          <TextInput
            placeholder="Password"
            style={styles.input}
            secureTextEntry={!showPassword && Platform.OS !== 'web'}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            onPress={() => setShowPassword(prev => !prev)}
            style={styles.toggleBtn}
          >
            <Text style={styles.toggleText}>
              {showPassword ? 'Hide' : 'Show'} Password
            </Text>
          </TouchableOpacity>

          <TextInput
            placeholder="Employee ID"
            style={styles.input}
            value={employeeId}
            onChangeText={setEmployeeId}
          />
          <TextInput
            placeholder="Phone Number"
            style={styles.input}
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />

          <View style={styles.branchContainer}>
            {branch.length > 0 ? (
              branch.map((b, index) => (
                <View key={index} style={styles.branchTag}>
                  <Text style={styles.branchText}>{b}</Text>
                  <TouchableOpacity
                    onPress={() => {
                      const updated = branch.filter(item => item !== b);
                      setBranch(updated);
                    }}
                  >
                    <Text style={styles.removeText}>×</Text>
                  </TouchableOpacity>
                </View>
              ))
            ) : (
              <Text style={styles.officeSelectText}>Choose Branch</Text>
            )}
          </View>

          <TouchableOpacity
            style={styles.officeSelectButton}
            onPress={() => setShowBranchPicker(true)}
          >
            <Text style={styles.officeSelectText}>Select Branches</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onAdd} style={styles.addButton}>
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onClose}
            style={[
              styles.addButton,
              { backgroundColor: '#b03a3a', marginTop: 8 },
            ]}
          >
            <Text style={styles.addButtonText}>Cancel</Text>
          </TouchableOpacity>
        </ScrollView>

        <BranchSelector
          visible={showBranchPicker}
          branches={branches}
          selectedBranches={branch}
          onSelect={(selected: string[]) => {
            setBranch(selected);
            setShowBranchPicker(false);
          }}
          onClose={() => setShowBranchPicker(false)}
        />
      </View>
    </Modal>
  );
};

export default AddUserModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#00000088',
    justifyContent: 'center',
    marginTop: heightPercentageToDP('5%'),
  },
  container: {
    backgroundColor: '#fff',
    marginTop: heightPercentageToDP('10%'),

    margin: 20,
    borderRadius: 12,
    padding: 16,
    elevation: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    backgroundColor: '#f2f2f2',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    fontSize: 16,
  },
  label: {
    marginTop: 10,
    fontWeight: '500',
    color: '#333',
    fontSize: 16,
  },
  officeSelectButton: {
    backgroundColor: '#e9e9e9',
    padding: 12,
    borderRadius: 6,
    marginBottom: 12,
  },
  officeSelectText: {
    fontSize: 16,
    color: '#333',
  },
  addButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  toggleBtn: {
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  toggleText: {
    color: '#007AFF',
    fontSize: 14,
  },
  branchContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 8,
  },
  branchTag: {
    flexDirection: 'row',
    backgroundColor: '#cce5ff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
    alignItems: 'center',
    marginRight: 6,
    marginBottom: 6,
  },
  branchText: {
    color: '#004085',
    fontSize: 14,
    marginRight: 4,
  },
  removeText: {
    color: '#004085',
    fontWeight: 'bold',
  },
});
