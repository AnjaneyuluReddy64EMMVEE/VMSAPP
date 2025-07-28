import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import AdminDrawerNavigator from './AdminDrawerNavigator';
import SuperAdminDrawerNavigator from './SuperAdminDrawerNavigator';
import SecurityDrawerNavigator from './SecurityDrawerNavigator';

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

        // console.log('🔐 Token:', token);
        // console.log('👤 UserData:', userData);

        if (token && userData) {
          const user = JSON.parse(userData);
          const userRole = user.role;
          const userBranch = user.officeLocation?.[0] || '';

          // console.log('✅ Role:', userRole);
          // console.log('🏢 Branch:', userBranch);

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
        console.log('❌ Error in RootNavigator login check:', error);
        setInitialRoute('Login');
      }
    };

    setTimeout(checkUserLogin, 1500); // Simulate splash delay
  }, []);

  if (!initialRoute) {
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
        initialParams={{ role, branch }}
      />
    </Stack.Navigator>
  );
};

export default RootNavigator;
