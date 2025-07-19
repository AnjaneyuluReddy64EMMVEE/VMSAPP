// // import { View, Text } from 'react-native'
// // import React from 'react'

// // const NotificationScreen = () => {
// //   return (
// //     <View>
// //       <Text>NotificationScreen</Text>
// //     </View>
// //   )
// // }

// // export default NotificationScreen

// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
//   Image,
//   Platform,
// } from 'react-native';
// import { Picker } from '@react-native-picker/picker';

// const mockSecurityUsers = [
//   { id: 'EMP001', location: 'Head Office' },
//   { id: 'EMP002', location: 'Dabaspet' },
//   { id: 'EMP003', location: 'Head Office' },
//   { id: 'EMP004', location: 'Dabaspet' },
// ];

// const branches = ['All', 'Head Office', 'Dabaspet'];

// const NotificationScreen = () => {
//   const [selectedBranch, setSelectedBranch] = useState('All');

//   const filteredUsers = mockSecurityUsers.filter(user =>
//     selectedBranch === 'All' ? true : user.location === selectedBranch
//   );

//   const handleResetPassword = (id: string) => {
//     // Add real logic here
//     alert(`Reset password for ${id}`);
//   };

//   const renderItem = ({ item }: any) => (
//     <View style={styles.row}>
//       <Text style={styles.cell}>{item.id}</Text>
//       <Text style={styles.cell}>{item.location}</Text>
//       <TouchableOpacity
//         onPress={() => handleResetPassword(item.id)}
//         style={styles.resetButton}
//       >
//         <Text style={styles.resetButtonText}>Reset</Text>
//       </TouchableOpacity>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <Text style={styles.title}>Notification</Text>
//         <View style={styles.pickerWrapper}>
//           <Picker
//             selectedValue={selectedBranch}
//             onValueChange={value => setSelectedBranch(value)}
//             style={Platform.OS === 'android' ? styles.picker : undefined}
//           >
//             {branches.map(branch => (
//               <Picker.Item key={branch} label={branch} value={branch} />
//             ))}
//           </Picker>
//         </View>
//       </View>

//       {/* Table Header */}
//       <View style={[styles.row, styles.headerRow]}>
//         <Text style={[styles.cell, styles.headerText]}>Employee Id</Text>
//         <Text style={[styles.cell, styles.headerText]}>Location</Text>
//         <Text style={[styles.cell, styles.headerText]}>Reset Password</Text>
//       </View>

//       {/* List */}
//       <FlatList
//         data={filteredUsers}
//         renderItem={renderItem}
//         keyExtractor={(item) => item.id}
//         contentContainerStyle={{ paddingBottom: 100 }}
//       />
//     </View>
//   );
// };

// export default NotificationScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f9fbfd',
//     paddingHorizontal: 16,
//     paddingTop: 16,
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     color: '#003366',
//   },
//   pickerWrapper: {
//     backgroundColor: '#fff',
//     borderRadius: 6,
//     paddingHorizontal: 10,
//     elevation: 2,
//   },
//   picker: {
//     height: 40,
//     width: 140,
//     color: '#333',
//   },
//   headerRow: {
//     backgroundColor: '#e6eef8',
//     borderTopLeftRadius: 8,
//     borderTopRightRadius: 8,
//   },
//   row: {
//     flexDirection: 'row',
//     paddingVertical: 12,
//     paddingHorizontal: 10,
//     borderBottomWidth: 1,
//     borderColor: '#ddd',
//     backgroundColor: '#fff',
//   },
//   cell: {
//     flex: 1,
//     fontSize: 14,
//     color: '#333',
//   },
//   headerText: {
//     fontWeight: 'bold',
//     color: '#003366',
//   },
//   resetButton: {
//     backgroundColor: '#007AFF',
//     paddingVertical: 6,
//     paddingHorizontal: 12,
//     borderRadius: 6,
//   },
//   resetButtonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: 12,
//     textAlign: 'center',
//   },
// });

// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
//   Platform,
// } from 'react-native';
// import { Picker } from '@react-native-picker/picker';
// import { useNavigation } from '@react-navigation/native';
// import Icon from 'react-native-vector-icons/Ionicons';

// const mockSecurityUsers = [
//   { id: 'EMP001', location: 'Head Office' },
//   { id: 'EMP002', location: 'Dabaspet' },
//   { id: 'EMP003', location: 'Head Office' },
//   { id: 'EMP004', location: 'Dabaspet' },
// ];

// const branches = ['All', 'Head Office', 'Dabaspet'];

// const NotificationScreen = () => {
//   const [selectedBranch, setSelectedBranch] = useState('All');
//   const navigation = useNavigation();

//   const filteredUsers = mockSecurityUsers.filter(user =>
//     selectedBranch === 'All' ? true : user.location === selectedBranch
//   );

//   const handleResetPassword = (id: string) => {
//     alert(`Reset password for ${id}`);
//   };

//   const renderItem = ({ item }: any) => (
//     <View style={styles.row}>
//       <Text style={styles.cell}>{item.id}</Text>
//       <Text style={styles.cell}>{item.location}</Text>
//       <TouchableOpacity
//         onPress={() => handleResetPassword(item.id)}
//         style={styles.resetButton}
//       >
//         <Text style={styles.resetButtonText}>Reset</Text>
//       </TouchableOpacity>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       {/* Back Header */}
//       <View style={styles.navHeader}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Icon name="arrow-back" size={24} color="#003366" />
//         </TouchableOpacity>
//         <Text style={styles.navTitle}>Notification</Text>
//         <View style={{ width: 24 }} /> {/* to center title */}
//       </View>

//       {/* Branch Picker */}
//       <View style={styles.header}>
//         <Text style={styles.title}>Security Users</Text>
//         <View style={styles.pickerWrapper}>
//           <Picker
//             selectedValue={selectedBranch}
//             onValueChange={value => setSelectedBranch(value)}
//             style={Platform.OS === 'android' ? styles.picker : undefined}
//           >
//             {branches.map(branch => (
//               <Picker.Item key={branch} label={branch} value={branch} />
//             ))}
//           </Picker>
//         </View>
//       </View>

//       {/* Table Header */}
//       <View style={[styles.row, styles.headerRow]}>
//         <Text style={[styles.cell, styles.headerText]}>Employee Id</Text>
//         <Text style={[styles.cell, styles.headerText]}>Location</Text>
//         <Text style={[styles.cell, styles.headerText]}>Reset Password</Text>
//       </View>

//       {/* List */}
//       <FlatList
//         data={filteredUsers}
//         renderItem={renderItem}
//         keyExtractor={(item) => item.id}
//         contentContainerStyle={{ paddingBottom: 100 }}
//       />
//     </View>
//   );
// };

// export default NotificationScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f9fbfd',
//     paddingHorizontal: 16,
//     paddingTop: 16,
//   },
//   navHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 12,
//     justifyContent: 'space-between',
//   },
//   navTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#003366',
//     textAlign: 'center',
//     flex: 1,
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#003366',
//   },
//   pickerWrapper: {
//     backgroundColor: '#fff',
//     borderRadius: 6,
//     paddingHorizontal: 10,
//     elevation: 2,
//   },
//   picker: {
//     height: 50,
//     width: 140,
//     color: '#333',
//   },
//   headerRow: {
//     backgroundColor: '#e6eef8',
//     borderTopLeftRadius: 8,
//     borderTopRightRadius: 8,
//   },
//   row: {
//     flexDirection: 'row',
//     paddingVertical: 12,
//     paddingHorizontal: 10,
//     borderBottomWidth: 1,
//     borderColor: '#ddd',
//     backgroundColor: '#fff',
//   },
//   cell: {
//     flex: 1,
//     fontSize: 14,
//     color: '#333',
//   },
//   headerText: {
//     fontWeight: 'bold',
//     color: '#003366',
//   },
//   resetButton: {
//     backgroundColor: '#007AFF',
//     paddingVertical: 6,
//     paddingHorizontal: 12,
//     borderRadius: 6,
//   },
//   resetButtonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: 12,
//     textAlign: 'center',
//   },
// });

// import React, { useState } from 'react';
// import { View, FlatList, Text, StyleSheet } from 'react-native';

// import Header from '../../components/Header';
// import { SafeAreaView } from 'react-native';
// import SecurityUserRow from '../../components/Notification/SecurityUserRow';
// import InputField from '../../components/InputField';

// const mockSecurityUsers = [
//   { id: 'EMP001', location: 'Head Office' },
//   { id: 'EMP002', location: 'Dabaspet' },
//   { id: 'EMP003', location: 'Head Office' },
//   { id: 'EMP004', location: 'Dabaspet' },
// ];

// const branches = ['All', 'Head Office', 'Dabaspet'];

// const NotificationScreen = () => {
//   const [selectedBranch, setSelectedBranch] = useState('All');

//   const filteredUsers = mockSecurityUsers.filter(user =>
//     selectedBranch === 'All' ? true : user.location === selectedBranch
//   );

//   const handleResetPassword = (id: string) => {
//     alert(`Reset password for ${id}`);
//   };

//   return (
//     <SafeAreaView style={styles.container}>

//       <Header title="Notifications" showBackButton />

//       {/* Table Header */}
//       <View style={[styles.row, styles.headerRow]}>
//         <Text style={[styles.cell, styles.headerText]}>Employee Id</Text>
//         <Text style={[styles.cell, styles.headerText]}>Location</Text>
//         <Text style={[styles.cell, styles.headerText]}>Reset Password</Text>
//       </View>

//       <FlatList
//         data={filteredUsers}
//         renderItem={({ item }) => (
//           <SecurityUserRow {...item} onReset={handleResetPassword} />
//         )}
//         keyExtractor={(item) => item.id}
//         contentContainerStyle={{ paddingBottom: 100 }}
//       />

//     </SafeAreaView>
//   );
// };

// export default NotificationScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f9fbfd',
//     paddingHorizontal: 16,
//     paddingTop: 16,
//   },
//   row: {
//     flexDirection: 'row',
//     paddingVertical: 12,
//     paddingHorizontal: 10,
//     borderBottomWidth: 1,
//     borderColor: '#ddd',
//     backgroundColor: '#fff',
//   },
//   cell: {
//     flex: 1,
//     fontSize: 14,
//     color: '#333',
//   },
//   headerText: {
//     fontWeight: 'bold',
//     color: '#003366',
//   },
//   headerRow: {
//     backgroundColor: '#e6eef8',
//     borderTopLeftRadius: 8,
//     borderTopRightRadius: 8,
//   },
// });

// import React, { useState } from 'react';
// import {
//   View,
//   FlatList,
//   Text,
//   StyleSheet,
//   SafeAreaView,
//   ActivityIndicator,
// } from 'react-native';

// import Header from '../../components/Header';
// import BranchFilterPicker from '../../components/Notification/BranchFilterPicker';
// import SecurityUserRow from '../../components/Notification/SecurityUserRow';
// import { useGetNotificationsQuery } from '../../api'; // 🔁 Replace with your actual API path

// const branches = ['All', 'Head Office', 'Dabaspet'];

// const NotificationScreen = () => {
//   const [selectedBranch, setSelectedBranch] = useState('All');

//   // 👇 Fetch notifications data
//   const {
//     data: notifications,
//     isLoading,
//     isError,
//     refetch,
//   } = useGetNotificationsQuery();
//   console.log(notifications);
//   const handleResetPassword = (id: string) => {
//     alert(`Reset password for ${id}`);
//   };

//   const filteredUsers = (notifications ?? []).filter(user =>
//     selectedBranch === 'All' ? true : user.location === selectedBranch,
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       <Header title="Notifications" showBackButton />

//       {/* Table Header */}
//       <View style={[styles.row, styles.headerRow]}>
//         <Text style={[styles.cell, styles.headerText]}>Employee Id</Text>
//         <Text style={[styles.cell, styles.headerText]}>Location</Text>
//         <Text style={[styles.cell, styles.headerText]}>Reset Password</Text>
//       </View>

//       {isLoading ? (
//         <ActivityIndicator
//           size="large"
//           color="#003366"
//           style={{ marginTop: 20 }}
//         />
//       ) : isError ? (
//         <Text style={{ textAlign: 'center', marginTop: 20, color: 'red' }}>
//           Failed to load data.
//         </Text>
//       ) : (
//         <FlatList
//           data={filteredUsers}
//           renderItem={({ item }) => (
//             <SecurityUserRow
//               id={item.employeeId}
//               location={item.location}
//               onReset={handleResetPassword}
//             />
//           )}
//           keyExtractor={item => item.employeeId}
//           contentContainerStyle={{ paddingBottom: 100 }}
//         />
//       )}
//     </SafeAreaView>
//   );
// };

// export default NotificationScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f9fbfd',
//     paddingHorizontal: 16,
//     paddingTop: 16,
//   },
//   row: {
//     flexDirection: 'row',
//     paddingVertical: 12,
//     paddingHorizontal: 10,
//     borderBottomWidth: 1,
//     borderColor: '#ddd',
//     backgroundColor: '#fff',
//   },
//   cell: {
//     flex: 1,
//     fontSize: 14,
//     color: '#333',
//   },
//   headerText: {
//     fontWeight: 'bold',
//     color: '#003366',
//   },
//   headerRow: {
//     backgroundColor: '#e6eef8',
//     borderTopLeftRadius: 8,
//     borderTopRightRadius: 8,
//   },
// });

// import React from 'react';
// import {
//   View,
//   FlatList,
//   SafeAreaView,
//   ActivityIndicator,
//   Text,
//   StyleSheet,
// } from 'react-native';
// import Header from '../../components/Header';
// import { useGetNotificationsQuery } from '../../api';
// import SecurityUserRow from '../../components/SecurityUserRow';
// import { useAuth } from '../../contexts/AuthContext';
// const NotificationScreen = () => {
//   const { user } = useAuth();
//   const userLocation = user?.officeLocation;
//   const {
//     data: notifications,
//     isLoading,
//     isError,
//   } = useGetNotificationsQuery();

//   const filteredUsers =
//     notifications?.data?.filter(user => user.officeLocation === userLocation) ??
//     [];
//   console.log(notifications);
//   const handleResetPassword = (id: string) => {
//     alert(`Reset password for ${id}`);
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <Header title="Notifications" showBackButton />

//       {/* Table Header */}
//       <View style={[styles.row, styles.headerRow]}>
//         <Text style={[styles.cell, styles.headerText]}>Employee Id</Text>
//         <Text style={[styles.cell, styles.headerText]}>Location</Text>
//         <Text style={[styles.cell, styles.headerText]}>Reset Password</Text>
//       </View>

//       {isLoading ? (
//         <ActivityIndicator
//           size="large"
//           color="#003366"
//           style={{ marginTop: 20 }}
//         />
//       ) : isError ? (
//         <Text style={{ textAlign: 'center', marginTop: 20, color: 'red' }}>
//           Failed to load data.
//         </Text>
//       ) : (
//         <FlatList
//           data={notifications.data}
//           renderItem={({ item }) => (
//             <SecurityUserRow
//               id={item.employeeId}
//               location={item.officeLocation}
//               onReset={handleResetPassword}
//             />
//           )}
//           keyExtractor={item => item.employeeId}
//           contentContainerStyle={{ paddingBottom: 100 }}
//         />
//       )}
//     </SafeAreaView>
//   );
// };

// export default NotificationScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f9fbfd',
//     paddingHorizontal: 16,
//     paddingTop: 16,
//   },
//   row: {
//     flexDirection: 'row',
//     paddingVertical: 12,
//     paddingHorizontal: 10,
//     borderBottomWidth: 1,
//     borderColor: '#ddd',
//     backgroundColor: '#fff',
//   },
//   cell: {
//     flex: 1,
//     fontSize: 14,
//     color: '#333',
//   },
//   headerText: {
//     fontWeight: 'bold',
//     color: '#003366',
//   },
//   headerRow: {
//     backgroundColor: '#e6eef8',
//     borderTopLeftRadius: 8,
//     borderTopRightRadius: 8,
//   },
// });

// import React from 'react';
// import {
//   View,
//   FlatList,
//   SafeAreaView,
//   ActivityIndicator,
//   Text,
//   StyleSheet,
// } from 'react-native';
// import Header from '../../components/Header';
// import { useGetNotificationsQuery } from '../../api';
// import SecurityUserRow from '../../components/SecurityUserRow';

// const NotificationScreen = () => {
//   const {
//     data: notifications,
//     isLoading,
//     isError,
//   } = useGetNotificationsQuery();

//   const handleResetPassword = (id: string) => {
//     alert(`Reset password for ${id}`);
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <Header title="Notifications" showBackButton />

//       {/* Table Header */}
//       <View style={[styles.row, styles.headerRow]}>
//         <Text style={[styles.cell, styles.headerText]}>Employee Id</Text>
//         <Text style={[styles.cell, styles.headerText]}>Location</Text>
//         <Text style={[styles.cell, styles.headerText]}>Reset Password</Text>
//       </View>

//       {isLoading ? (
//         <ActivityIndicator
//           size="large"
//           color="#003366"
//           style={{ marginTop: 20 }}
//         />
//       ) : isError ? (
//         <Text style={{ textAlign: 'center', marginTop: 20, color: 'red' }}>
//           Failed to load data.
//         </Text>
//       ) : (
//         <FlatList
//           data={notifications?.data ?? []}
//           renderItem={({ item }) => (
//             <SecurityUserRow
//               id={item.employeeId}
//               location={item.officeLocation}
//               onReset={handleResetPassword}
//             />
//           )}
//           keyExtractor={item => item.employeeId}
//           contentContainerStyle={{ paddingBottom: 100 }}
//         />
//       )}
//     </SafeAreaView>
//   );
// };

// export default NotificationScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f9fbfd',
//     paddingHorizontal: 16,
//     paddingTop: 16,
//   },
//   row: {
//     flexDirection: 'row',
//     paddingVertical: 12,
//     paddingHorizontal: 10,
//     borderBottomWidth: 1,
//     borderColor: '#ddd',
//     backgroundColor: '#fff',
//   },
//   cell: {
//     flex: 1,
//     fontSize: 14,
//     color: '#333',
//   },
//   headerText: {
//     fontWeight: 'bold',
//     color: '#003366',
//   },
//   headerRow: {
//     backgroundColor: '#e6eef8',
//     borderTopLeftRadius: 8,
//     borderTopRightRadius: 8,
//   },
// });


import React, { useState } from 'react';
import {
  View,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import Header from '../../components/Header';
import { useGetNotificationsQuery, useResetAppMutation } from '../../api';
import { useAuth } from '../../contexts/AuthContext';
import Icon from 'react-native-vector-icons/Feather';

const NotificationScreen = () => {
  const { user,selectedBranch } = useAuth();
  const userLocation = user?.officeLocation;
  const {
    data: notifications,
    isLoading,
    isError,
  } = useGetNotificationsQuery();

  const [resetModalVisible, setResetModalVisible] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(
    null,
  );
  const [newPassword, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [resetApp, { isLoading: isResetting }] = useResetAppMutation();

  const openResetModal = (id: string) => {
    setSelectedEmployeeId(id);
    setResetModalVisible(true);
  };

  const handleSubmit = async () => {
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    if (!selectedEmployeeId) return;

    try {
      await resetApp({
        employeeId: selectedEmployeeId,
        newPassword,
      }).unwrap();
      alert('Password reset successful');
      setResetModalVisible(false);
      setPassword('');
      setConfirmPassword('');
    } catch (error) {
      alert('Failed to reset password');
    }
  };

  const renderRow = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.employeeId}</Text>
      <Text style={styles.cell}>{item.officeLocation}</Text>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#ff4d4d' }]}
        onPress={() => openResetModal(item.employeeId)}
      >
        <Text style={styles.buttonText}>Reset</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Notifications" showBackButton />

      <View style={[styles.row, styles.headerRow]}>
        <Text style={[styles.cell, styles.headerText]}>Employee Id</Text>
        <Text style={[styles.cell, styles.headerText]}>Location</Text>
        <Text style={[styles.cell, styles.headerText]}>Reset Password</Text>
      </View>

      {isLoading ? (
        <ActivityIndicator
          size="large"
          color="#003366"
          style={{ marginTop: 20 }}
        />
      ) : isError ? (
        <Text style={{ textAlign: 'center', marginTop: 20, color: 'red' }}>
          Failed to load data.
        </Text>
      ) : (
        <FlatList
          data={notifications?.data}
          renderItem={renderRow}
          keyExtractor={item => item.employeeId}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      )}

      {/* 🔐 Password Reset Modal */}
      <Modal
        visible={resetModalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setResetModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={styles.modalWrapper}
          >
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Reset Password</Text>

              {/* Password */}
              <View style={styles.inputWrapper}>
                <TextInput
                  placeholder="New Password"
                  secureTextEntry={!showPassword}
                  value={newPassword}
                  onChangeText={setPassword}
                  style={styles.input}
                />
                <TouchableOpacity
                  style={styles.eyeIcon}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Icon name={showPassword ? 'eye' : 'eye-off'} size={20} />
                </TouchableOpacity>
              </View>

              {/* Confirm Password */}
              <View style={styles.inputWrapper}>
                <TextInput
                  placeholder="Confirm Password"
                  secureTextEntry={!showConfirmPassword}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  style={styles.input}
                />
                <TouchableOpacity
                  style={styles.eyeIcon}
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <Icon
                    name={showConfirmPassword ? 'eye' : 'eye-off'}
                    size={20}
                  />
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={[
                  styles.button,
                  { backgroundColor: '#28a745', marginTop: 20 },
                ]}
                onPress={handleSubmit}
                disabled={isResetting}
              >
                <Text style={styles.buttonText}>
                  {isResetting ? 'Submitting...' : 'Submit'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setResetModalVisible(false)}
                style={{ marginTop: 10 }}
              >
                <Text style={{ color: 'red' }}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fbfd',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  cell: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  headerText: {
    fontWeight: 'bold',
    color: '#003366',
  },
  headerRow: {
    backgroundColor: '#e6eef8',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  modalWrapper: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    elevation: 4,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#003366',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 6,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    height: 44,
    fontSize: 16,
  },
  eyeIcon: {
    padding: 4,
  },
});
