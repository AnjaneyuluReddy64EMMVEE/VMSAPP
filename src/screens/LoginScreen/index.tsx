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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import { useAuth } from '../../contexts/AuthContext';
import { useLoginUserMutation } from '../../api';

const LoginScreen: React.FC = () => {
  const navigation = useNavigation();
  const { setUserRole, setUserName, setUserEmail, setUserBranch } = useAuth();

  const [usernameInput, setUsernameInput] = useState('Superadmin3');
  const [password, setPassword] = useState('Superadmin3@8861');
  const passwordRef = useRef<TextInput>(null);

  const [loginUser, { isLoading }] = useLoginUserMutation();

  // const handleLogin = async () => {
  //   try {
  //     const response = await loginUser({
  //       userName: usernameInput.trim(),
  //       password,
  //     }).unwrap();

  //     const { token, user } = response.data;
  //     // console.log('✅ Login response:', user.userName);

  //     // Set Auth Context
  //     setUserRole(user.role || null);
  //     setUserName(user.userName || null);
  //     setUserEmail(user.email || null);
  //     setUserBranch(user.officeLocation?.[0] || 'Unknown');

  //     // Store in AsyncStorage
  //     await AsyncStorage.setItem('token', token);
  //     await AsyncStorage.setItem('user', JSON.stringify(user));

  //     // Navigate based on role
  //     if (user.role === 'admin') {
  //       navigation.navigate('AdminDashboard', {
  //         role: user.role,
  //         branch: user.officeLocation[0] || 'Unknown',
  //       });
  //     } else if (user.role === 'superadmin') {
  //       navigation.navigate('SuperAdminDashboard', { role: user.role });
  //     } else if (user.role === 'security') {
  //       navigation.navigate('SecurityDashboard');
  //     } else {
  //       Alert.alert('Login Failed', 'User role is not recognized');
  //     }
  //   } catch (error: any) {
  //     console.log('❌ Login error:', error);
  //     Alert.alert(
  //       'Login Failed',
  //       error?.data?.message || 'Invalid credentials',
  //     );
  //   }
  // };
  const handleLogin = async () => {
    try {
      const response = await loginUser({
        userName: usernameInput.trim(),
        password,
      }).unwrap();

      const { token, user } = response.data;

      console.log('✅ Login Token:', token);
      console.log('✅ Logged-in User:', user);

      // Set Auth Context
      setUserRole(user.role || null);
      setUserName(user.userName || null);
      setUserEmail(user.email || null);
      setUserBranch(user.officeLocation?.[0] || 'Unknown');

      // Store in AsyncStorage
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('user', JSON.stringify(user));

      // Navigate based on role
      if (user.role === 'admin') {
        navigation.navigate('AdminDashboard', {
          role: user.role,
          branch: user.officeLocation?.[0] || 'Unknown',
        });
      } else if (user.role === 'superadmin') {
        navigation.navigate('SuperAdminDashboard', { role: user.role });
      } else if (user.role === 'security') {
        navigation.navigate('SecurityDashboard');
      } else {
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

  const handleForgotPassword = () => {
    Alert.alert(
      'Forgot Password',
      'Please contact your admin to reset your password.',
    );
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
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image
            source={{
              uri: 'https://emmvee.com/wp-content/uploads/2019/08/emvlogo.png',
            }}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* Title */}
        <Text style={styles.appTitle}>GATEVUE</Text>
        <Text style={styles.signinTitle}>Signin</Text>

        {/* Username Input */}
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={usernameInput}
          onChangeText={setUsernameInput}
          autoCapitalize="none"
          keyboardType="email-address"
          returnKeyType="next"
          onSubmitEditing={() => passwordRef.current?.focus()}
        />

        {/* Password Input */}
        <TextInput
          ref={passwordRef}
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          returnKeyType="done"
          onSubmitEditing={handleLogin}
        />

        {/* Forgot Password */}
        <TouchableOpacity onPress={handleForgotPassword}>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>

        {/* Login Button */}
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Login</Text>
          )}
        </TouchableOpacity>
      </KeyboardAwareScrollView>
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
});
