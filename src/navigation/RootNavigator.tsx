import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import VisitorFormScreen from '../screens/VisitorFormScreen';
import AdminDashboardScreen from '../screens/AdminDashboardScreen';
import SuperAdminDrawerNavigator from './SuperAdminDrawerNavigator';
import SecurityDrawerNavigator from './SecurityDrawerNavigator';



const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SecurityDashboard" component={SecurityDrawerNavigator} />
      <Stack.Screen name="AdminDashboard" component={AdminDashboardScreen} />
      <Stack.Screen name="SuperAdminDrawer" component={SuperAdminDrawerNavigator} />

    </Stack.Navigator>
  );
};

export default RootNavigator;