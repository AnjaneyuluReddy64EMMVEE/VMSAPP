import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import VisitorFormScreen from '../screens/VisitorFormScreen';
import AdminDashboardScreen from '../screens/AdminDashboardScreen';
import SuperAdminDrawerNavigator from './SuperAdminDrawerNavigator';



const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="VisitorForm" component={VisitorFormScreen} />
      <Stack.Screen name="AdminDashboard" component={AdminDashboardScreen} />
      <Stack.Screen name="SuperAdminDrawer" component={SuperAdminDrawerNavigator} />

    </Stack.Navigator>
  );
};

export default RootNavigator;