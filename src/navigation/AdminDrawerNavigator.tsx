import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

// Import your screens
import VisitorsScreen from '../screens/VisitorsScreen';
import NotificationScreen from '../screens/NotificationScreen';
import SecurityUsersScreen from '../screens/SecurityUsersScreen';
import AdminHome from '../screens/AdminHome';
import AdminUsersScreen from '../screens/AdminUsersScreen';
import LogoutScreen from '../screens/LogoutScreen';

const Drawer = createDrawerNavigator();

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
