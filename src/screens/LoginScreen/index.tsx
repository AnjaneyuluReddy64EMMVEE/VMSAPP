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
    role: 'visitor',
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
        case 'visitor':
          navigation.navigate('VisitorForm');
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
    paddingHorizontal: 24,
  },
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  logoContainer: {
    marginBottom: 20,
    alignItems: 'flex-start',
  },
  logo: {
    width: 100,
    height: 50,
  },
  appTitle: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 10,
    marginBottom: 10,
  },
  signinTitle: {
    fontSize: 22,
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 24,
  },
  input: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 12,
  },
  forgotPassword: {
    color: '#00AEEF',
    textAlign: 'right',
    marginBottom: 20,
    textDecorationLine: 'underline',
    fontSize: 14,
  },
  button: {
    backgroundColor: '#00AEEF',
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 8,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});


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
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';

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

// const LoginScreen = ({ navigation }: any) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = () => {
//     const user = users.find(u => u.email === email && u.password === password);

//     if (user) {
//       switch (user.role) {
//         case 'visitor':
//           navigation.navigate('VisitorForm');
//           break;
//         case 'admin':
//           navigation.navigate('AdminDashboard', { role: 'admin', branch: user.branch });
//           break;
//         case 'superadmin':
//           navigation.navigate('SuperAdminPanel', { role: 'superadmin' });
//           break;
//         default:
//           Alert.alert('Error', 'Role not recognized');
//       }
//     } else {
//       Alert.alert('Login Failed', 'Invalid email or password');
//     }
//   };

//   const handleForgotPassword = () => {
//     Alert.alert('Forgot Password', 'Please contact your admin to reset your password.');
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* Top Logo */}
//       <View style={styles.logoContainer}>
//         <Image
//           source={{ uri: 'https://emmvee.com/wp-content/uploads/2019/08/emvlogo.png' }}
//           style={styles.logo}
//           resizeMode="contain"
//         />
//       </View>

//       {/* Centered App Title */}
//       <Text style={styles.appTitle}>GATEVUE</Text>

//       {/* Signin Label */}
//       <Text style={styles.signinTitle}>Signin</Text>

//       {/* Input Fields */}
//       <TextInput
//         style={styles.input}
//         placeholder="Email"
//         value={email}
//         onChangeText={setEmail}
//         autoCapitalize="none"
//         keyboardType="email-address"
//       />

//       <TextInput
//         style={styles.input}
//         placeholder="Password"
//         value={password}
//         onChangeText={setPassword}
//         secureTextEntry
//       />

//       {/* Forgot Password */}
//       <TouchableOpacity onPress={handleForgotPassword}>
//         <Text style={styles.forgotPassword}>Forgot Password?</Text>
//       </TouchableOpacity>

//       {/* Login Button */}
//       <TouchableOpacity style={styles.button} onPress={handleLogin}>
//         <Text style={styles.buttonText}>Login</Text>
//       </TouchableOpacity>
//     </SafeAreaView>
//   );
// };

// export default LoginScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#003366',
//     paddingHorizontal: 24,
//   },
//   logoContainer: {
//     marginTop: 10,
//     alignItems: 'flex-start',
//   },
//   logo: {
//     width: 100,
//     height: 50,
//   },
//   appTitle: {
//     textAlign: 'center',
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#ffffff',
//     marginTop: 10,
//     marginBottom: 10,
//   },
//   signinTitle: {
//     fontSize: 22,
//     color: '#ffffff',
//     fontWeight: 'bold',
//     textAlign: 'left',
//     marginBottom: 24,
//   },
//   input: {
//     backgroundColor: '#ffffff',
//     borderRadius: 8,
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     fontSize: 16,
//     marginBottom: 12,
//   },
//   forgotPassword: {
//     color: '#00AEEF',
//     textAlign: 'right',
//     marginBottom: 20,
//     textDecorationLine: 'underline',
//     fontSize: 14,
//   },
//   button: {
//     backgroundColor: '#00AEEF',
//     paddingVertical: 14,
//     borderRadius: 8,
//     marginTop: 8,
//   },
//   buttonText: {
//     color: '#ffffff',
//     fontWeight: 'bold',
//     fontSize: 16,
//     textAlign: 'center',
//   },
// });
