// import React from 'react';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import SplashScreen from '../screens/SplashScreen';
// import LoginScreen from '../screens/LoginScreen';
// import SuperAdminDrawerNavigator from './SuperAdminDrawerNavigator';
// import SecurityDrawerNavigator from './SecurityDrawerNavigator';
// import AdminDrawerNavigator from './AdminDrawerNavigator';

// const Stack = createNativeStackNavigator();

// const RootNavigator = () => {
//   return (
//     <Stack.Navigator
//       initialRouteName="Splash"
//       screenOptions={{ headerShown: false }}
//     >
//       <Stack.Screen name="Splash" component={SplashScreen} />
//       <Stack.Screen name="Login" component={LoginScreen} />

//       <Stack.Screen
//         name="SecurityDashboard"
//         component={SecurityDrawerNavigator}
//       />
//       <Stack.Screen name="AdminDashboard" component={AdminDrawerNavigator} />
//       <Stack.Screen
//         name="SuperAdminDashboard"
//         component={SuperAdminDrawerNavigator}
//       />
//     </Stack.Navigator>
//   );
// };

// export default RootNavigator;
// src/navigation/RootNavigator.tsx

import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import LoginScreen from '../screens/LoginScreen';
import AdminDrawerNavigator from './AdminDrawerNavigator';
import SuperAdminDrawerNavigator from './SuperAdminDrawerNavigator';
import SecurityDrawerNavigator from './SecurityDrawerNavigator';
import SplashScreen from '../screens/SplashScreen';
import Home from '../screens/Home';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const [initialRoute, setInitialRoute] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [branch, setBranch] = useState<string | null>(null);

  useEffect(() => {
    const checkUserLogin = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const userData = await AsyncStorage.getItem('user');

        if (token && userData) {
          const user = JSON.parse(userData);
          const userRole = user.role;
          const userBranch = user.officeLocation?.[0] || 'Default Branch';

          setRole(userRole);
          setBranch(userBranch);

          if (userRole === 'admin') {
            setInitialRoute('AdminDashboard');
          } else if (userRole === 'superadmin') {
            setInitialRoute('SuperAdminDashboard');
          } else if (userRole === 'security') {
            setInitialRoute('SecurityDashboard');
          } else {
            setInitialRoute('Login');
          }
        } else {
          setInitialRoute('Login');
        }
      } catch (error) {
        console.log('Error in RootNavigator login check:', error);
        setInitialRoute('Login');
      }
    };

    setTimeout(checkUserLogin, 1500); // simulate splash delay
  }, []);

  if (!initialRoute) {
    // Splash UI while checking login
    return <SplashScreen />;
  }

  return (
    <Stack.Navigator
      initialRouteName={initialRoute}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen
        name="SuperAdminDashboard"
        component={SuperAdminDrawerNavigator}
        initialParams={{ role }}
      />
      <Stack.Screen
        name="AdminDashboard"
        component={AdminDrawerNavigator}
        initialParams={{ role, branch }}
      />

      <Stack.Screen
        name="SecurityDashboard"
        component={SecurityDrawerNavigator}
        
      />
    </Stack.Navigator>
  );
};

export default RootNavigator;

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    backgroundColor: '#003366',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 20,
  },
});
