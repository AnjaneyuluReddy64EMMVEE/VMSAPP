// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   StyleSheet,
//   TouchableOpacity,
//   Alert,
//   Platform,
//   Image,
//   ScrollView,
//   KeyboardAvoidingView,
//   StatusBar,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import { useNavigation } from '@react-navigation/native';
// import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

// type RootStackParamList = {
//   Login: undefined;
//   VisitorForm: undefined;
//   AdminDashboard: { role: string; branch: string };
//   SuperAdminDrawer: { role: string };
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
//     role: 'visitor',
//   },
// ];

// const LoginScreen: React.FC = () => {
//   const navigation = useNavigation<NavigationProp>();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = () => {
//     const user = users.find(
//       u => u.email === email.trim() && u.password === password
//     );

//     if (user) {
//       switch (user.role) {
//         case 'visitor':
//           navigation.navigate('VisitorForm');
//           break;
//         case 'admin':
//           navigation.navigate('AdminDashboard', {
//             role: 'admin',
//             branch: user.branch || 'Default Branch',
//           });
//           break;
//         case 'superadmin':
//           navigation.navigate('SuperAdminDrawer', { role: 'superadmin' });
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
//     <SafeAreaView style={styles.safeArea}>
//       <StatusBar barStyle="light-content" />

//       <KeyboardAvoidingView
//         style={styles.keyboardAvoid}
//         behavior={Platform.OS === 'ios' ? 'padding' : undefined}
//       >
//         <View style={styles.topSection}>
//           <Image
//             source={{
//               uri: 'https://emmvee.com/wp-content/uploads/2019/08/emvlogo.png',
//             }}
//             style={styles.logo}
//             resizeMode="contain"
//           />
//           <Text style={styles.appTitle}>GATEVUE</Text>
//         </View>

//         <View style={styles.bottomSection}>
//           <View style={styles.formCard}>
//             <Text style={styles.signinTitle}>Sign In</Text>

//             <TextInput
//               style={styles.input}
//               placeholder="Email"
//               placeholderTextColor="#999"
//               value={email}
//               onChangeText={setEmail}
//               autoCapitalize="none"
//               keyboardType="email-address"
//             />

//             <TextInput
//               style={styles.input}
//               placeholder="Password"
//               placeholderTextColor="#999"
//               value={password}
//               onChangeText={setPassword}
//               secureTextEntry
//             />

//             <TouchableOpacity onPress={handleForgotPassword}>
//               <Text style={styles.forgotPassword}>Forgot Password?</Text>
//             </TouchableOpacity>

//             <TouchableOpacity style={styles.button} onPress={handleLogin}>
//               <Text style={styles.buttonText}>Login</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// };

// export default LoginScreen;

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: '#003366',
//   },
//   keyboardAvoid: {
//     flex: 1,
//     justifyContent: 'space-between',
//   },
//   topSection: {
//     paddingHorizontal: wp(6),
//     paddingTop: hp(2),
//   },
//   logo: {
//     width: wp(26),
//     height: hp(6),
//   },
//   appTitle: {
//     fontSize: hp(5),
//     fontWeight: '600',
//     color: '#ffffff',
//     textAlign: 'center',
//     marginTop: hp(20),
//   },
//   bottomSection: {
//     paddingHorizontal: wp(6),
//     paddingBottom: hp(4),
//   },
//   formCard: {
//     backgroundColor: '#ffffff',
//     borderRadius: wp(4),
//     padding: wp(6),
//     shadowColor: '#000',
//     shadowOpacity: 0.08,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 6,
//     elevation: 5,
//   },
//   signinTitle: {
//     fontSize: hp(2.6),
//     color: '#003366',
//     fontWeight: 'bold',
//     marginBottom: hp(2),
//     textAlign: 'left',
//   },
//   input: {
//     backgroundColor: '#f2f2f2',
//     borderRadius: wp(2),
//     paddingHorizontal: wp(4),
//     paddingVertical: hp(1.6),
//     fontSize: hp(2),
//     marginBottom: hp(2),
//     color: '#000',
//   },
//   forgotPassword: {
//     color: '#007AFF',
//     textAlign: 'right',
//     marginBottom: hp(2),
//     fontSize: hp(1.8),
//     textDecorationLine: 'underline',
//   },
//   button: {
//     backgroundColor: '#007AFF',
//     paddingVertical: hp(2),
//     borderRadius: wp(2),
//   },
//   buttonText: {
//     color: '#ffffff',
//     fontWeight: '600',
//     fontSize: hp(2),
//     textAlign: 'center',
//   },
// });








import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Platform,
  Image,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { heightPercentageToDP as hp , widthPercentageToDP as wp } from 'react-native-responsive-screen';
// Replace this with your actual RootStackParamList if using React Navigation with TS
type RootStackParamList = {
  Login: undefined;
  VisitorForm: undefined;
  AdminDashboard: { role: string; branch: string };
  SuperAdminDrawer: { role: string };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

const users = [
  {
    email: 'admin@emmvee.in',
    password: 'admin123',
    role: 'admin',
    branch: 'Bangalore',
  },
  {
    email: 'super',
    password: 'super123',
    role: 'superadmin',
  },
  {
    email: '123',
    password: '123',
    role: 'security',
  },
];

const LoginScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const user = users.find(
      u => u.email === email.trim() && u.password === password
    );

    if (user) {
      switch (user.role) {
        case 'security':
          navigation.navigate('SecurityDashboard');
          break;
        case 'admin':
          navigation.navigate('AdminDashboard', {
            role: 'admin',
            branch: user.branch || "Default Branch",
          });
          break;
        case 'superadmin':
          navigation.navigate('SuperAdminDrawer', { role: 'superadmin' });
          break;
        default:
          Alert.alert('Error', 'Role not recognized');
      }
    } else {
      Alert.alert('Login Failed', 'Invalid email or password');
    }
  };

  const handleForgotPassword = () => {
    Alert.alert(
      'Forgot Password',
      'Please contact your admin to reset your password.'
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
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

          {/* Email */}
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          {/* Password */}
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          {/* Forgot Password */}
          <TouchableOpacity onPress={handleForgotPassword}>
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </TouchableOpacity>

          {/* Login Button */}
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003366',
    paddingHorizontal: wp(6), // 24px ≈ 6% of width
  },
  scroll: {
    flexGrow: 0.5,
    justifyContent: 'center',
  },
  logoContainer: {
    marginBottom: hp(2.5),
    alignItems: 'flex-start',
  },
  logo: {
    width: wp(26), 
    height: hp(7),
  },
  appTitle: {
    textAlign: 'center',
    fontSize: hp(4),
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: hp(12),
    marginBottom: hp(12),
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