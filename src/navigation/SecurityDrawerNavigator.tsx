import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

// Import your screens
import VisitorsScreen from '../screens/VisitorsScreen';
import VisitorFormScreen from '../screens/VisitorFormScreen';
import AdminHome from '../screens/Home';
import LogoutScreen from '../screens/LogoutScreen';

const Drawer = createDrawerNavigator();

const SecurityDrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: false, drawerStyle: { width: 250 } }}
    >
      <Drawer.Screen name="Home" component={AdminHome} />

      <Drawer.Screen name="Form" component={VisitorFormScreen} />
      <Drawer.Screen name="Visitors" component={VisitorsScreen} />
      <Drawer.Screen name="Logout" component={LogoutScreen} />
    </Drawer.Navigator>
  );
};

export default SecurityDrawerNavigator;
