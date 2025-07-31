import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import Home from '../screens/Home';
import VisitorsScreen from '../screens/VisitorsScreen';
import AdminUsersScreen from '../screens/AdminUsersScreen';
import SecurityUsersScreen from '../screens/SecurityUsersScreen';
import ReportsScreen from '../screens/ReportsScreen';
import UserPasswordReset from '../screens/UserPasswordReset';
import LogoutScreen from '../screens/LogoutScreen';

const Drawer = createDrawerNavigator();

const CustomDrawerContent = props => {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>GATEVUE</Text>
      </View>
      <View style={styles.drawerItemWrapper}>
        <DrawerItemList {...props} />
      </View>
    </DrawerContentScrollView>
  );
};

export default function AdminDrawerNavigator() {
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
      <Drawer.Screen name="Admin Users" component={AdminUsersScreen} />
      <Drawer.Screen name="Security Users" component={SecurityUsersScreen} />
      <Drawer.Screen name="Reports" component={ReportsScreen} />
      <Drawer.Screen name="User Password Reset" component={UserPasswordReset} />
      <Drawer.Screen name="Logout" component={LogoutScreen} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#1f2937', // dark gray/black
  },
  drawerItemWrapper: {
    paddingHorizontal: 10,
    // paddingVertical: 0,
    gap: 1, // Adds spacing between drawer items
  },
  drawerLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
});
