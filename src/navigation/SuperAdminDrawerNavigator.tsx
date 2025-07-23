import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

// Import your screens
import VisitorsScreen from '../screens/VisitorsScreen';
import SecurityUsersScreen from '../screens/SecurityUsersScreen';
import ReportsScreen from '../screens/ReportsScreen';
import NotificationScreen from '../screens/NotificationScreen';
import AdminUserScreen from '../screens/AdminUsersScreen';
import LogoutScreen from '../screens/LogoutScreen';
import AdminHome from '../screens/Home';

const Drawer = createDrawerNavigator();

const SuperAdminDrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: false, drawerStyle: { width: 250 } }}
    >
      <Drawer.Screen name="Home" component={AdminHome} />
      <Drawer.Screen name="Visitors" component={VisitorsScreen} />
      <Drawer.Screen name="Admin Users" component={AdminUserScreen} />
      <Drawer.Screen name="Security Users" component={SecurityUsersScreen} />
      <Drawer.Screen name="Reports" component={ReportsScreen} />
      <Drawer.Screen name="Notifications" component={NotificationScreen} />
      <Drawer.Screen name="Logout" component={LogoutScreen} />
    </Drawer.Navigator>
  );
};

export default SuperAdminDrawerNavigator;
