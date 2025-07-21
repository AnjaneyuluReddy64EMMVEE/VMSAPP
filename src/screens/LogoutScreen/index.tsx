import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { useAuth } from '../../contexts/AuthContext';

const LogoutScreen = () => {
  const navigation = useNavigation();
  const { setUserRole, setUserName, setUserEmail, setUserBranch } = useAuth();

  useEffect(() => {
    const confirmLogout = () => {
      Alert.alert(
        'Logout Confirmation',
        'Are you sure you want to logout?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
            onPress: () => navigation.goBack(),
          },
          {
            text: 'Logout',
            style: 'destructive',
            onPress: async () => {
              try {
                await AsyncStorage.clear();

                // Reset Auth Context
                setUserRole(null);
                setUserName(null);
                setUserEmail(null);
                setUserBranch(null);

                // Reset navigation to Login screen
                navigation.dispatch(
                  CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'Login' }],
                  }),
                );
              } catch (error) {
                console.error('Error during logout:', error);
              }
            },
          },
        ],
        { cancelable: false },
      );
    };

    confirmLogout();
  }, []);

  return null; // No UI needed; Alert handles everything
};

export default LogoutScreen;
