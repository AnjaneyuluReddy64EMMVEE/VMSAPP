import React, { useEffect } from 'react';
import { View, ActivityIndicator, Alert } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useNavigation, CommonActions } from '@react-navigation/native';

// Import your screens
import VisitorsScreen from '../screens/VisitorsScreen';
import NotificationScreen from '../screens/NotificationScreen';
import Home from '../screens/Home';
import SecurityUsersScreen from '../screens/SecurityUsersScreen';
import AdminHome from '../screens/AdminHome';
import AdminUsersScreen from '../screens/AdminUsersScreen';

const Drawer = createDrawerNavigator();

const LogoutScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel', onPress: () => navigation.goBack() },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: () => {
          // Simply navigate to login screen
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            }),
          );
        },
      },
    ]);
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#003366" />
    </View>
  );
};

const AdminDrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: false, drawerStyle: { width: 250 } }}
    >
      <Drawer.Screen name="Home" component={AdminHome} />
      <Drawer.Screen name="Visitors" component={VisitorsScreen} />
      <Drawer.Screen name="Admin Users" component={AdminUsersScreen} />

      <Drawer.Screen name="Security Users" component={SecurityUsersScreen} />
      <Drawer.Screen name="Notifications" component={NotificationScreen} />
      <Drawer.Screen name="Logout" component={LogoutScreen} />
    </Drawer.Navigator>
  );
};

export default AdminDrawerNavigator;
