import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  ActivityIndicator,
  Platform,
  Modal,
  KeyboardAvoidingView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { useAuth } from '../../contexts/AuthContext';
import {
  useLoginUserMutation,
  useNotifyForgotPasswordMutation,
} from '../../api';
import { BRANCHES } from '../../constants';
import InputField from '../../components/InputField';
import BranchPicker from '../../components/SuperAdminPanel/BranchPicker';

const LoginScreen: React.FC = () => {
  const navigation = useNavigation();
  const { setUserRole, setUserName, setUserEmail, setUserBranch } = useAuth();

  const [usernameInput, setUsernameInput] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const passwordRef = useRef<TextInput>(null);

  const [loginUser, { isLoading }] = useLoginUserMutation();
  const [notifyForgotPassword, { isLoading: isSending }] =
    useNotifyForgotPasswordMutation();

  const [modalVisible, setModalVisible] = useState(false);
  const [employeeId, setEmployeeId] = useState('');
  const [officeLocation, setOfficeLocation] = useState('Head Office');
  const [branchPickerVisible, setBranchPickerVisible] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await loginUser({
        employeeId: usernameInput.trim(),
        password,
      }).unwrap();

      const { token, user } = response.data;
      // console.log(user);
      setUserRole(user.role || null);
      setUserName(user.userName || null);
      setUserEmail(user.email || null);
      setUserBranch(user.officeLocation || '');

      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('user', JSON.stringify(user));
      await AsyncStorage.setItem('userName', user.userName || '');
      await AsyncStorage.setItem('userRole', user.role || '');

      switch (user.role) {
        case 'admin':
          navigation.navigate('AdminDashboard', {
            role: user.role,
            branch: user.officeLocation || 'All',
          });
          break;
        case 'superadmin':
          navigation.navigate('SuperAdminDashboard', { role: user.role });
          break;
        case 'security':
          navigation.navigate('SecurityDashboard');
          break;
        default:
          Alert.alert('Login Failed', 'User role is not recognized');
      }
    } catch (error: any) {
      console.log('❌ Login error:', error);
      Alert.alert(
        'Login Failed',
        error?.data?.message || 'Invalid credentials',
      );
    }
  };

  const handleSendForgotPassword = async () => {
    if (!employeeId || !officeLocation) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      const response = await notifyForgotPassword({
        employeeId,
        officeLocation,
      }).unwrap();

      Alert.alert('Success', response?.message || 'Request sent to admin.');
      setModalVisible(false);
      setEmployeeId('');
    } catch (error) {
      console.log('❌ Forgot password error:', error);
      Alert.alert('Error', 'Failed to send request. Try again later.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        enableOnAndroid
        extraScrollHeight={Platform.OS === 'ios' ? 60 : 100}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.logoContainer}>
          <Image
            source={{
              uri: 'https://emmvee.com/wp-content/uploads/2019/08/emvlogo.png',
            }}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.appTitle}>GATEVUE</Text>
        <Text style={styles.signinTitle}>Sign in</Text>

        <TextInput
          style={styles.input}
          placeholder="Employee ID"
          value={usernameInput}
          onChangeText={setUsernameInput}
          autoCapitalize="none"
          keyboardType="email-address"
          returnKeyType="next"
          onSubmitEditing={() => passwordRef.current?.focus()}
        />

        <View style={styles.passwordContainer}>
          <TextInput
            ref={passwordRef}
            style={styles.passwordInput}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            returnKeyType="done"
            onSubmitEditing={handleLogin}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Icon
              name={showPassword ? 'eye-off' : 'eye'}
              size={24}
              color="#888"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Login</Text>
          )}
        </TouchableOpacity>
      </KeyboardAwareScrollView>

      {/* Forgot Password Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.modalOverlay}
        >
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Forgot Password</Text>

            <InputField
              placeholder="Enter Employee ID"
              style={styles.input}
              value={employeeId}
              onChangeText={setEmployeeId}
            />

            <Text style={styles.label}>Select Branch</Text>
            <TouchableOpacity
              style={styles.customDropdown}
              onPress={() => setBranchPickerVisible(true)}
            >
              <Text style={styles.dropdownText}>
                {'Choose a branch' || officeLocation}
              </Text>
            </TouchableOpacity>

            <BranchPicker
              visible={branchPickerVisible}
              onClose={() => setBranchPickerVisible(false)}
              branches={BRANCHES.filter(b => b !== 'All')}
              onSelect={branch => setOfficeLocation(branch)}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSendForgotPassword}>
                {isSending ? (
                  <ActivityIndicator size="small" color="#003366" />
                ) : (
                  <Text style={styles.modalButtonText}>Send</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003366',
    paddingHorizontal: wp(6),
  },
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: hp(5.5),
  },
  logo: {
    width: wp(45),
    height: hp(7),
  },
  appTitle: {
    textAlign: 'center',
    fontSize: hp(4),
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: hp(6),
    marginBottom: hp(6),
  },
  signinTitle: {
    fontSize: hp(2.8),
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: hp(3),
  },
  input: {
    backgroundColor: '#ffffff',
    borderRadius: wp(2),
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.5),
    fontSize: hp(2),
    marginBottom: hp(1.5),
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: wp(2),
    paddingHorizontal: wp(4),
    paddingVertical: Platform.OS === 'ios' ? hp(0.3) : 0,
    marginBottom: hp(1.5),
  },
  passwordInput: {
    flex: 1,
    fontSize: hp(2),
    paddingVertical: hp(1.5),
  },

  forgotPassword: {
    color: '#00AEEF',
    textAlign: 'right',
    marginBottom: hp(2),
    textDecorationLine: 'underline',
    fontSize: hp(1.8),
  },
  button: {
    backgroundColor: '#00AEEF',
    paddingVertical: hp(2),
    borderRadius: wp(2),
    marginTop: hp(1),
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: hp(2),
    textAlign: 'center',
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: wp(6),
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: hp(2.5),
    fontWeight: 'bold',
    marginBottom: 10,
  },
  label: {
    marginBottom: 5,
    fontSize: hp(1.9),
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  modalButtonText: {
    color: '#003366',
    fontWeight: 'bold',
  },
  customDropdown: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 12,
    backgroundColor: '#f9f9f9',
    marginTop: 5,
  },
  dropdownText: {
    fontSize: hp(2),
    color: '#333',
  },
});
