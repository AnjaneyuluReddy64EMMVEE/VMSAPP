import React from 'react';
import { View, Text } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import SuperAdminPanelScreen from '../screens/SuperAdminPanelScreen';
import VisitorsScreen from '../screens/VisitorsScreen';
import SecurityUsersScreen from '../screens/SecurityUsersScreen';
import ReportsScreen from '../screens/ReportsScreen';
import SettingsScreen from '../screens/SettingsScreen';


const Drawer = createDrawerNavigator();

const LogoutScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Logging out...</Text>
    {/* Add logout logic here */}
  </View>
);

const SuperAdminDrawerNavigator = () => {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: true,drawerStyle:{width: 250,} }}>
      <Drawer.Screen name="Home"  component={SuperAdminPanelScreen}/>
      <Drawer.Screen name="Visitors" component={VisitorsScreen} />
      <Drawer.Screen name="Security Users" component={SecurityUsersScreen} />
      <Drawer.Screen name="Reports" component={ReportsScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
      <Drawer.Screen name="Logout" component={LogoutScreen} />
    </Drawer.Navigator>
  );
};

export default SuperAdminDrawerNavigator;

