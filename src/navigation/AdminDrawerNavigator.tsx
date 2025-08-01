import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

// Import your screens
import VisitorsScreen from '../screens/VisitorsScreen';
import UserPasswordReset from '../screens/UserPasswordReset';
import SecurityUsersScreen from '../screens/SecurityUsersScreen';
import Home from '../screens/Home';
import LogoutScreen from '../screens/LogoutScreen';

const Drawer = createDrawerNavigator();

// ✅ Custom Drawer Content
const CustomDrawerContent = props => {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.header}>
        <Text style={styles.headerText}>GATEVUE</Text>
      </View>
      <View style={styles.drawerItemWrapper}>
        <DrawerItemList {...props} />
      </View>
    </DrawerContentScrollView>
  );
};

// ✅ Admin Drawer Navigator
const AdminDrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: { width: 250 },
      }}
    >
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Visitors" component={VisitorsScreen} />
      <Drawer.Screen name="Security Users" component={SecurityUsersScreen} />
      <Drawer.Screen name="User Password Reset" component={UserPasswordReset} />
      <Drawer.Screen name="Logout" component={LogoutScreen} />
    </Drawer.Navigator>
  );
};

export default AdminDrawerNavigator;

// ✅ Styles
const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 30,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#1f2937', // Optional: dark text
  },
  drawerItemWrapper: {
    paddingHorizontal: 10,
    paddingVertical: 10,

    gap: 15, // Adds spacing between drawer items
  },
  drawerLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
});
