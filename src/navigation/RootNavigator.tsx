// import React from 'react';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import SplashScreen from '../screens/SplashScreen';
// import LoginScreen from '../screens/LoginScreen';
// // import VisitorFormScreen from '../screens/VisitorFormScreen';
// import AdminDashboardScreen from '../screens/AdminDashboardScreen';
// import SuperAdminDrawerNavigator from './SuperAdminDrawerNavigator';
// import SecurityDrawerNavigator from './SecurityDrawerNavigator';
// import AdminDrawerNavigator from './AdminDrawerNavigator';



// const Stack = createNativeStackNavigator();

// const RootNavigator = () => {
//   return (
//     <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="Splash" component={SplashScreen} />
//       <Stack.Screen name="Login" component={LoginScreen} />
//       <Stack.Screen name="SecurityDashboard" component={SecurityDrawerNavigator} />
//       <Stack.Screen name="AdminDashboard" component={AdminDrawerNavigator} />
//       <Stack.Screen name="SuperAdminDashboard" component={SuperAdminDrawerNavigator} />
//     </Stack.Navigator>
//   );
// };

// export default RootNavigator;

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {
  View, Text, TextInput, Button, StyleSheet, ScrollView
} from 'react-native';

const AppScreen = () => {
  const [email, setEmail] = useState('');
  const [submittedEmail, setSubmittedEmail] = useState('');
  const inputRef = useRef(null);

  // Memoized email length
  const emailLength = useMemo(() => email.length, [email]);

  // Callback to submit email
  const handleSubmit = useCallback(() => {
    setSubmittedEmail(email);
    inputRef.current?.blur(); // blur keyboard using ref
  }, [email]);

  useEffect(() => {
    console.log('Component mounted or email changed');
  }, [email]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Enter your email:</Text>
      <TextInput
        ref={inputRef}
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <Button title="Submit" onPress={handleSubmit} />
      {submittedEmail !== '' && (
        <Text style={styles.result}>You submitted: {submittedEmail}</Text>
      )}
      <Text>Email Length: {emailLength}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  label: { fontSize: 16, fontWeight: 'bold' },
  result: { marginTop: 20, fontSize: 16, color: 'green' },
});

export default AppScreen;
