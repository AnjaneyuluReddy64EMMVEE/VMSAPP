// import React, { useState, useRef } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   StyleSheet,
//   TouchableOpacity,
//   Alert,
//   Image,
//   Platform,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import { useNavigation } from '@react-navigation/native';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import {
//   heightPercentageToDP as hp,
//   widthPercentageToDP as wp,
// } from 'react-native-responsive-screen';

// // Navigation type
// type RootStackParamList = {
//   Login: undefined;
//   VisitorForm: undefined;
//   AdminDashboard: { role: string; branch: string };
//   SuperAdminDrawer: { role: string };
//   SecurityDashboard: undefined;
// };

// type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

// const users = [
//   {
//     email: 'admin@emmvee.in',
//     password: 'admin123',
//     role: 'admin',
//     branch: 'Bangalore',
//   },
//   {
//     email: 'super',
//     password: 'super123',
//     role: 'superadmin',
//   },
//   {
//     email: '123',
//     password: '123',
//     role: 'security',
//   },
// ];

// const LoginScreen: React.FC = () => {
//   const navigation = useNavigation<NavigationProp>();
//   const [email, setEmail] = useState("Admin5");
//   const [password, setPassword] = useState("Admin5@8861");
//   const passwordRef = useRef<TextInput>(null);

//   const handleLogin = () => {
//     const user = users.find(
//       u => u.email === email.trim() && u.password === password
//     );

//     if (user) {
//       switch (user.role) {
//         case 'security':
//           navigation.navigate('SecurityDashboard');
//           break;
//         case 'admin':
//           navigation.navigate('AdminDashboard', {
//             role: 'admin',
//             branch: user.branch || 'Default Branch',
//           });
//           break;
//         case 'superadmin':
//           navigation.navigate('SuperAdminDashboard', { role: 'superadmin' });
//           break;
//         default:
//           Alert.alert('Error', 'Role not recognized');
//       }
//     } else {
//       Alert.alert('Login Failed', 'Invalid email or password');
//     }
//   };

//   const handleForgotPassword = () => {
//     Alert.alert(
//       'Forgot Password',
//       'Please contact your admin to reset your password.'
//     );
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <KeyboardAwareScrollView
//         contentContainerStyle={styles.scroll}
//         keyboardShouldPersistTaps="handled"
//         enableOnAndroid
//         extraScrollHeight={Platform.OS === 'ios' ? 60 : 100}
//         showsVerticalScrollIndicator={false}
//       >
//         {/* Logo */}
//         <View style={styles.logoContainer}>
//           <Image
//             source={{
//               uri: 'https://emmvee.com/wp-content/uploads/2019/08/emvlogo.png',
//             }}
//             style={styles.logo}
//             resizeMode="contain"
//           />
//         </View>

//         {/* Title */}
//         <Text style={styles.appTitle}>GATEVUE</Text>
//         <Text style={styles.signinTitle}>Signin</Text>

//         {/* Email */}
//         <TextInput
//           style={styles.input}
//           placeholder="Email"
//           value={email}
//           onChangeText={setEmail}
//           autoCapitalize="none"
//           keyboardType="email-address"
//           returnKeyType="next"
//           onSubmitEditing={() => passwordRef.current?.focus()}
//         />

//         {/* Password */}
//         <TextInput
//           ref={passwordRef}
//           style={styles.input}
//           placeholder="Password"
//           value={password}
//           onChangeText={setPassword}
//           secureTextEntry
//           returnKeyType="done"
//           onSubmitEditing={handleLogin}
//         />

//         {/* Forgot Password */}
//         <TouchableOpacity onPress={handleForgotPassword}>
//           <Text style={styles.forgotPassword}>Forgot Password?</Text>
//         </TouchableOpacity>

//         {/* Login Button */}
//         <TouchableOpacity style={styles.button} onPress={handleLogin}>
//           <Text style={styles.buttonText}>Login</Text>
//         </TouchableOpacity>
//       </KeyboardAwareScrollView>
//     </SafeAreaView>
//   );
// };

// export default LoginScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#003366',
//     paddingHorizontal: wp(6),
//   },
//   scroll: {
//     flexGrow: 1,
//     justifyContent: 'center',
//   },
//   logoContainer: {
//     alignItems: 'flex-start',
//     marginBottom: hp(2.5),
//   },
//   logo: {
//     width: wp(26),
//     height: hp(7),
//   },
//   appTitle: {
//     textAlign: 'center',
//     fontSize: hp(4),
//     fontWeight: 'bold',
//     color: '#ffffff',
//     marginTop: hp(6),
//     marginBottom: hp(6),
//   },
//   signinTitle: {
//     fontSize: hp(2.8),
//     color: '#ffffff',
//     fontWeight: 'bold',
//     textAlign: 'left',
//     marginBottom: hp(3),
//   },
//   input: {
//     backgroundColor: '#ffffff',
//     borderRadius: wp(2),
//     paddingHorizontal: wp(4),
//     paddingVertical: hp(1.5),
//     fontSize: hp(2),
//     marginBottom: hp(1.5),
//   },
//   forgotPassword: {
//     color: '#00AEEF',
//     textAlign: 'right',
//     marginBottom: hp(2),
//     textDecorationLine: 'underline',
//     fontSize: hp(1.8),
//   },
//   button: {
//     backgroundColor: '#00AEEF',
//     paddingVertical: hp(2),
//     borderRadius: wp(2),
//     marginTop: hp(1),
//   },
//   buttonText: {
//     color: '#ffffff',
//     fontWeight: 'bold',
//     fontSize: hp(2),
//     textAlign: 'center',
//   },
// });
// src/screens/LoginScreen.tsx

// import React, { useState, useRef } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   StyleSheet,
//   TouchableOpacity,
//   Alert,
//   Image,
//   ActivityIndicator,
//   Platform,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { useNavigation } from '@react-navigation/native';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {
//   heightPercentageToDP as hp,
//   widthPercentageToDP as wp,
// } from 'react-native-responsive-screen';

// import { useAuth } from '../../contexts/AuthContext';
// import { useLoginUserMutation } from '../../api';

// const LoginScreen: React.FC = () => {
//   const navigation = useNavigation();
//   const { setUserRole, setUserName, setUserEmail, setUserBranch } = useAuth();

//   const [usernameInput, setUsernameInput] = useState('Admin201');
//   const [password, setPassword] = useState('Admin@8861');
//   const passwordRef = useRef<TextInput>(null);

//   const [loginUser, { isLoading }] = useLoginUserMutation();

//   const handleLogin = async () => {
//     try {
//       const response = await loginUser({
//         userName: usernameInput.trim(),
//         password,
//       }).unwrap();

//       const { token, user } = response.data;

//       console.log('✅ Login Token:', token);
//       console.log('✅ Logged-in User:', user);

//       // Set Auth Context
//       setUserRole(user.role || null);
//       setUserName(user.userName || null);
//       setUserEmail(user.email || null);
//       setUserBranch(user.officeLocation?.[0] || 'All');

//       // Store in AsyncStorage
//       await AsyncStorage.setItem('token', token);
//       await AsyncStorage.setItem('user', JSON.stringify(user));

//       // Navigate based on role
//       if (user.role === 'admin') {
//         navigation.navigate('AdminDashboard', {
//           role: user.role,
//           branch: user.officeLocation?.[0] || 'All',
//         });
//       } else if (user.role === 'superadmin') {
//         navigation.navigate('SuperAdminDashboard', { role: user.role });
//       } else if (user.role === 'security') {
//         navigation.navigate('SecurityDashboard');
//       } else {
//         Alert.alert('Login Failed', 'User role is not recognized');
//       }
//     } catch (error: any) {
//       console.log('❌ Login error:', error);
//       Alert.alert(
//         'Login Failed',
//         error?.data?.message || 'Invalid credentials',
//       );
//     }
//   };

//   const handleForgotPassword = () => {
//     Alert.alert(
//       'Forgot Password',
//       'Please contact your admin to reset your password.',
//     );
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <KeyboardAwareScrollView
//         contentContainerStyle={styles.scroll}
//         keyboardShouldPersistTaps="handled"
//         enableOnAndroid
//         extraScrollHeight={Platform.OS === 'ios' ? 60 : 100}
//         showsVerticalScrollIndicator={false}
//       >
//         {/* Logo */}
//         <View style={styles.logoContainer}>
//           <Image
//             source={{
//               uri: 'https://emmvee.com/wp-content/uploads/2019/08/emvlogo.png',
//             }}
//             style={styles.logo}
//             resizeMode="contain"
//           />
//         </View>

//         {/* Title */}
//         <Text style={styles.appTitle}>GATEVUE</Text>
//         <Text style={styles.signinTitle}>Signin</Text>

//         {/* Username Input */}
//         <TextInput
//           style={styles.input}
//           placeholder="Email"
//           value={usernameInput}
//           onChangeText={setUsernameInput}
//           autoCapitalize="none"
//           keyboardType="email-address"
//           returnKeyType="next"
//           onSubmitEditing={() => passwordRef.current?.focus()}
//         />

//         {/* Password Input */}
//         <TextInput
//           ref={passwordRef}
//           style={styles.input}
//           placeholder="Password"
//           value={password}
//           onChangeText={setPassword}
//           secureTextEntry
//           returnKeyType="done"
//           onSubmitEditing={handleLogin}
//         />

//         {/* Forgot Password */}
//         <TouchableOpacity onPress={handleForgotPassword}>
//           <Text style={styles.forgotPassword}>Forgot Password?</Text>
//         </TouchableOpacity>

//         {/* Login Button */}
//         <TouchableOpacity style={styles.button} onPress={handleLogin}>
//           {isLoading ? (
//             <ActivityIndicator color="#fff" />
//           ) : (
//             <Text style={styles.buttonText}>Login</Text>
//           )}
//         </TouchableOpacity>
//       </KeyboardAwareScrollView>
//     </SafeAreaView>
//   );
// };

// export default LoginScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#003366',
//     paddingHorizontal: wp(6),
//   },
//   scroll: {
//     flexGrow: 1,
//     justifyContent: 'center',
//   },
//   logoContainer: {
//     alignItems: 'center',
//     marginBottom: hp(5.5),
//   },
//   logo: {
//     width: wp(45),
//     height: hp(7),
//   },
//   appTitle: {
//     textAlign: 'center',
//     fontSize: hp(4),
//     fontWeight: 'bold',
//     color: '#ffffff',
//     marginTop: hp(6),
//     marginBottom: hp(6),
//   },
//   signinTitle: {
//     fontSize: hp(2.8),
//     color: '#ffffff',
//     fontWeight: 'bold',
//     textAlign: 'left',
//     marginBottom: hp(3),
//   },
//   input: {
//     backgroundColor: '#ffffff',
//     borderRadius: wp(2),
//     paddingHorizontal: wp(4),
//     paddingVertical: hp(1.5),
//     fontSize: hp(2),
//     marginBottom: hp(1.5),
//   },
//   forgotPassword: {
//     color: '#00AEEF',
//     textAlign: 'right',
//     marginBottom: hp(2),
//     textDecorationLine: 'underline',
//     fontSize: hp(1.8),
//   },
//   button: {
//     backgroundColor: '#00AEEF',
//     paddingVertical: hp(2),
//     borderRadius: wp(2),
//     marginTop: hp(1),
//   },
//   buttonText: {
//     color: '#ffffff',
//     fontWeight: 'bold',
//     fontSize: hp(2),
//     textAlign: 'center',
//   },
// });

// import React, { useState, useRef } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   StyleSheet,
//   TouchableOpacity,
//   Alert,
//   Image,
//   ActivityIndicator,
//   Platform,
//   Modal,
//   KeyboardAvoidingView,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { useNavigation } from '@react-navigation/native';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {
//   heightPercentageToDP as hp,
//   widthPercentageToDP as wp,
// } from 'react-native-responsive-screen';

// import { useAuth } from '../../contexts/AuthContext';
// import {
//   useLoginUserMutation,
//   useNotifyForgotPasswordMutation,
// } from '../../api';
// import { BRANCHES } from '../../constants';
// import { Picker } from '@react-native-picker/picker';
// const LoginScreen: React.FC = () => {
//   const navigation = useNavigation();
//   const { setUserRole, setUserName, setUserEmail, setUserBranch } = useAuth();

//   const [usernameInput, setUsernameInput] = useState('Admin201');
//   const [password, setPassword] = useState('Admin@8861');
//   const passwordRef = useRef<TextInput>(null);

//   const [loginUser, { isLoading }] = useLoginUserMutation();
//   const [notifyForgotPassword, { isLoading: isSending }] =
//     useNotifyForgotPasswordMutation();

//   // Forgot Password Modal State
//   const [modalVisible, setModalVisible] = useState(false);
//   const [employeeId, setEmployeeId] = useState('');
//   const [officeLocation, setOfficeLocation] = useState('Head Office');

//   const handleLogin = async () => {
//     try {
//       const response = await loginUser({
//         userName: usernameInput.trim(),
//         password,
//       }).unwrap();

//       const { token, user } = response.data;

//       setUserRole(user.role || null);
//       setUserName(user.userName || null);
//       setUserEmail(user.email || null);
//       setUserBranch(user.officeLocation?.[0] || 'All');

//       await AsyncStorage.setItem('token', token);
//       await AsyncStorage.setItem('user', JSON.stringify(user));

//       if (user.role === 'admin') {
//         navigation.navigate('AdminDashboard', {
//           role: user.role,
//           branch: user.officeLocation?.[0] || 'All',
//         });
//       } else if (user.role === 'superadmin') {
//         navigation.navigate('SuperAdminDashboard', { role: user.role });
//       } else if (user.role === 'security') {
//         navigation.navigate('SecurityDashboard');
//       } else {
//         Alert.alert('Login Failed', 'User role is not recognized');
//       }
//     } catch (error: any) {
//       console.log('❌ Login error:', error);
//       Alert.alert(
//         'Login Failed',
//         error?.data?.message || 'Invalid credentials',
//       );
//     }
//   };

//   const handleSendForgotPassword = async () => {
//     if (!employeeId || !officeLocation) {
//       Alert.alert('Error', 'Please fill in all fields');
//       return;
//     }

//     try {
//       const response = await notifyForgotPassword({
//         employeeId,
//         officeLocation,
//       }).unwrap();
//       Alert.alert('Success', response?.message || 'Request sent to admin.');
//       setModalVisible(false);
//       setEmployeeId('');
//     } catch (error) {
//       console.log('❌ Forgot password error:', error);
//       Alert.alert('Error', 'Failed to send request. Try again later.');
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <KeyboardAwareScrollView
//         contentContainerStyle={styles.scroll}
//         keyboardShouldPersistTaps="handled"
//         enableOnAndroid
//         extraScrollHeight={Platform.OS === 'ios' ? 60 : 100}
//         showsVerticalScrollIndicator={false}
//       >
//         {/* Logo */}
//         <View style={styles.logoContainer}>
//           <Image
//             source={{
//               uri: 'https://emmvee.com/wp-content/uploads/2019/08/emvlogo.png',
//             }}
//             style={styles.logo}
//             resizeMode="contain"
//           />
//         </View>

//         {/* Title */}
//         <Text style={styles.appTitle}>GATEVUE</Text>
//         <Text style={styles.signinTitle}>Signin</Text>

//         {/* Username Input */}
//         <TextInput
//           style={styles.input}
//           placeholder="Email"
//           value={usernameInput}
//           onChangeText={setUsernameInput}
//           autoCapitalize="none"
//           keyboardType="email-address"
//           returnKeyType="next"
//           onSubmitEditing={() => passwordRef.current?.focus()}
//         />

//         {/* Password Input */}
//         <TextInput
//           ref={passwordRef}
//           style={styles.input}
//           placeholder="Password"
//           value={password}
//           onChangeText={setPassword}
//           secureTextEntry
//           returnKeyType="done"
//           onSubmitEditing={handleLogin}
//         />

//         {/* Forgot Password */}
//         <TouchableOpacity onPress={() => setModalVisible(true)}>
//           <Text style={styles.forgotPassword}>Forgot Password?</Text>
//         </TouchableOpacity>

//         {/* Login Button */}
//         <TouchableOpacity style={styles.button} onPress={handleLogin}>
//           {isLoading ? (
//             <ActivityIndicator color="#fff" />
//           ) : (
//             <Text style={styles.buttonText}>Login</Text>
//           )}
//         </TouchableOpacity>
//       </KeyboardAwareScrollView>

//       {/* Forgot Password Modal */}
//       <Modal visible={modalVisible} animationType="slide" transparent>
//         <KeyboardAvoidingView
//           behavior={Platform.OS === 'ios' ? 'padding' : undefined}
//           style={{
//             flex: 1,
//             justifyContent: 'center',
//             backgroundColor: 'rgba(0,0,0,0.5)',
//             padding: wp(6),
//           }}
//         >
//           <View
//             style={{ backgroundColor: '#fff', padding: 20, borderRadius: 10 }}
//           >
//             <Text
//               style={{
//                 fontSize: hp(2.5),
//                 fontWeight: 'bold',
//                 marginBottom: 10,
//               }}
//             >
//               Forgot Password
//             </Text>

//             <TextInput
//               placeholder="Enter Employee ID"
//               style={styles.input}
//               value={employeeId}
//               onChangeText={setEmployeeId}
//             />

//             <Text style={{ marginBottom: 5, fontSize: hp(1.9) }}>
//               Select Branch
//             </Text>
//             {/* {BRANCHES.filter(b => b !== 'All').map(branch => (
//               <TouchableOpacity
//                 key={branch}
//                 onPress={() => setOfficeLocation(branch)}
//                 style={{
//                   padding: 10,
//                   backgroundColor:
//                     officeLocation === branch ? '#00AEEF' : '#f0f0f0',
//                   marginBottom: 5,
//                   borderRadius: 5,
//                 }}
//               >
//                 <Text
//                   style={{ color: officeLocation === branch ? '#fff' : '#000' }}
//                 >
//                   {branch}
//                 </Text>
//               </TouchableOpacity>
//             ))} */}
//             <View style={styles.pickerWrapper}>
//               <Picker
//                 selectedValue={officeLocation}
//                 onValueChange={itemValue => setOfficeLocation(itemValue)}
//                 style={styles.picker}
//               >
//                 <Picker.Item label="Select a Branch" value="" enabled={false} />
//                 {BRANCHES.filter(b => b !== 'All').map(branch => (
//                   <Picker.Item key={branch} label={branch} value={branch} />
//                 ))}
//               </Picker>
//             </View>

//             <View
//               style={{
//                 flexDirection: 'row',
//                 justifyContent: 'space-between',
//                 marginTop: 15,
//               }}
//             >
//               <TouchableOpacity onPress={() => setModalVisible(false)}>
//                 <Text style={{ color: '#003366', fontWeight: 'bold' }}>
//                   Cancel
//                 </Text>
//               </TouchableOpacity>
//               <TouchableOpacity onPress={handleSendForgotPassword}>
//                 {isSending ? (
//                   <ActivityIndicator size="small" color="#003366" />
//                 ) : (
//                   <Text style={{ color: '#003366', fontWeight: 'bold' }}>
//                     Send
//                   </Text>
//                 )}
//               </TouchableOpacity>
//             </View>
//           </View>
//         </KeyboardAvoidingView>
//       </Modal>
//     </SafeAreaView>
//   );
// };

// export default LoginScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#003366',
//     paddingHorizontal: wp(6),
//   },
//   scroll: {
//     flexGrow: 1,
//     justifyContent: 'center',
//   },
//   logoContainer: {
//     alignItems: 'center',
//     marginBottom: hp(5.5),
//   },
//   logo: {
//     width: wp(45),
//     height: hp(7),
//   },
//   appTitle: {
//     textAlign: 'center',
//     fontSize: hp(4),
//     fontWeight: 'bold',
//     color: '#ffffff',
//     marginTop: hp(6),
//     marginBottom: hp(6),
//   },
//   signinTitle: {
//     fontSize: hp(2.8),
//     color: '#ffffff',
//     fontWeight: 'bold',
//     textAlign: 'left',
//     marginBottom: hp(3),
//   },
//   input: {
//     backgroundColor: '#ffffff',
//     borderRadius: wp(2),
//     paddingHorizontal: wp(4),
//     paddingVertical: hp(1.5),
//     fontSize: hp(2),
//     marginBottom: hp(1.5),
//   },
//   forgotPassword: {
//     color: '#00AEEF',
//     textAlign: 'right',
//     marginBottom: hp(2),
//     textDecorationLine: 'underline',
//     fontSize: hp(1.8),
//   },
//   button: {
//     backgroundColor: '#00AEEF',
//     paddingVertical: hp(2),
//     borderRadius: wp(2),
//     marginTop: hp(1),
//   },
//   buttonText: {
//     color: '#ffffff',
//     fontWeight: 'bold',
//     fontSize: hp(2),
//     textAlign: 'center',
//   },
//   pickerWrapper: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 6,
//     overflow: 'hidden',
//   },
//   picker: {
//     height: 50,
//     width: '100%',
//   },
// });

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

// import { Picker } from '@react-native-picker/picker';

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

  const [usernameInput, setUsernameInput] = useState('SUPP001');
  const [password, setPassword] = useState('Superadmin6@8861');
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
      console.log(user);
      setUserRole(user.role || null);
      setUserName(user.userName || null);
      setUserEmail(user.email || null);
      setUserBranch(user.officeLocation || '');

      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('user', JSON.stringify(user));

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

        {/* <TextInput
          ref={passwordRef}
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          returnKeyType="done"
          onSubmitEditing={handleLogin}
        /> */}
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

            {/* <TextInput
              placeholder="Enter Employee ID"
              style={styles.input}
              value={employeeId}
              onChangeText={setEmployeeId}
            /> */}
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
                {officeLocation || 'Choose a branch'}
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
    paddingVertical: Platform.OS === 'ios' ? hp(1.5) : 0,
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
