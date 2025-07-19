import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, Alert } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useNavigation, CommonActions } from '@react-navigation/native';

// Import your screens
import Home from '../screens/Home';
import VisitorsScreen from '../screens/VisitorsScreen';
import SecurityUsersScreen from '../screens/SecurityUsersScreen';
import ReportsScreen from '../screens/ReportsScreen';
import NotificationScreen from '../screens/NotificationScreen';
import AdminUserScreen from '../screens/AdminUsersScreen';
import LogoutScreen from '../screens/LogoutScreen';
import AdminHome from '../screens/AdminHome';

const Drawer = createDrawerNavigator();

// const LogoutScreen = () => {
//   const navigation = useNavigation();

//   useEffect(() => {
//     Alert.alert('Logout', 'Are you sure you want to logout?', [
//       { text: 'Cancel', style: 'cancel', onPress: () => navigation.goBack() },
//       {
//         text: 'Logout',
//         style: 'destructive',
//         onPress: () => {
//           // Simply navigate to login screen
//           navigation.dispatch(
//             CommonActions.reset({
//               index: 0,
//               routes: [{ name: 'Login' }],
//             }),
//           );
//         },
//       },
//     ]);
//   }, []);

//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <ActivityIndicator size="large" color="#003366" />
//     </View>
//   );
// };

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
