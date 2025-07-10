import React,{useEffect} from 'react';
import { View,ActivityIndicator, Alert } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useNavigation, CommonActions } from '@react-navigation/native';

// Import your screens
import VisitorsScreen from '../screens/VisitorsScreen';
import NotificationScreen from '../screens/SettingsScreen';


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
            })
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
    <Drawer.Navigator screenOptions={{ headerShown: true,drawerStyle:{width: 250,} }}>
      <Drawer.Screen name="Home"  component={Home}/>
      <Drawer.Screen name="Visitors" component={VisitorsScreen} />
      <Drawer.Screen name="Notifications" component={NotificationScreen} />
      <Drawer.Screen name="Logout" component={LogoutScreen} />
    </Drawer.Navigator>
  );
};

export default AdminDrawerNavigator;

