// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   FlatList,
//   StyleSheet,
//   TouchableOpacity,
//   Alert,
//   Modal,
//   TextInput,
//   Image,
//   Platform,
// } from 'react-native';
// import { Picker } from '@react-native-picker/picker';
// import Header from '../../components/Header';

// const mockAdminUsers = [
//   {
//     id: '1',
//     name: 'Ravi Kumar',
//     email: 'ravi.admin@emmvee.in',
//     branch: 'Head Office',
//     password: 'Admin@123',
//   },
//   {
//     id: '2',
//     name: 'Pooja Reddy',
//     email: 'pooja.admin@emmvee.in',
//     branch: 'Dabaspet',
//     password: 'Pooja@456',
//   },
//   {
//     id: '3',
//     name: 'Manoj Shetty',
//     email: 'manoj.s@emmvee.in',
//     branch: 'Head Office',
//     password: 'Manoj@789',
//   },
//   {
//     id: '4',
//     name: 'Neha Jain',
//     email: 'neha.j@emmvee.in',
//     branch: 'Dabaspet',
//     password: 'Neha@321',
//   },
// ];

// const AdminUsersScreen = () => {
//   const [adminUsers, setAdminUsers] = useState(mockAdminUsers);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [newName, setNewName] = useState('');
//   const [newEmail, setNewEmail] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [newBranch, setNewBranch] = useState('Head Office');

//   const branches = ['Head Office', 'Dabaspet'];

//   const handleDelete = (id: string) => {
//     Alert.alert('Confirm Delete', 'Are you sure you want to remove this user?', [
//       { text: 'Cancel', style: 'cancel' },
//       {
//         text: 'Delete',
//         style: 'destructive',
//         onPress: () => setAdminUsers(prev => prev.filter(user => user.id !== id)),
//       },
//     ]);
//   };

//   const renderItem = ({ item }: any) => (
//     console.log(item),
//     <View style={styles.card}>
//       <Text style={styles.name}>{item.name}</Text>
//       <Text style={styles.email}>{item.email}</Text>
//       <Text style={styles.branch}>Branch: {item.branch}</Text>
//       <Text style={styles.email}>Password:{item.password}</Text>
//       <Text>{item.newPassword}</Text>
//       <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.deleteButton}>
//         <Text style={styles.deleteText}>Remove</Text>
//       </TouchableOpacity>
//     </View>
//   );

//   const handleAddAdmin = () => {
//   if (!newName || !newEmail || !newPassword || !newBranch) {
//     Alert.alert('Please fill all fields');
//     return;
//   }
//   const newUser = {
//     id: Date.now().toString(),
//     name: newName,
//     email: newEmail,
//     branch: newBranch,
//     password: newPassword, // ✅ Add this line
//   };
//   setAdminUsers(prev => [...prev, newUser]);
//   setNewName('');
//   setNewEmail('');
//   setNewPassword('');
//   setNewBranch('Head Office');
//   setModalVisible(false);
// };

//   return (
//     <View style={styles.container}>
//       <Header title="Admin Users" showBackButton />

//       {/* Header */}
//       <View style={styles.headerRow}>
//         <Image
//           source={{ uri: 'https://emmvee.com/wp-content/uploads/2019/08/emvlogo.png' }}
//           style={styles.logo}
//         />
//         <TouchableOpacity style={styles.addButtonTop} onPress={() => setModalVisible(true)}>
//           <Text style={styles.addButtonTextTop}>+ Add Admin</Text>
//         </TouchableOpacity>
//       </View>

//       <FlatList
//         data={adminUsers}
//         keyExtractor={(item) => item.id}
//         renderItem={renderItem}
//         contentContainerStyle={{ paddingBottom: 20 }}
//       />

//       {/* Modal for Adding Admin */}
//       <Modal visible={modalVisible} animationType="slide" transparent>
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContainer}>
//             <Text style={styles.modalTitle}>Add Admin User</Text>

//             <TextInput
//               placeholder="Full Name"
//               style={styles.input}
//               value={newName}
//               onChangeText={setNewName}
//             />
//             <TextInput
//               placeholder="Email"
//               style={styles.input}
//               keyboardType="email-address"
//               value={newEmail}
//               onChangeText={setNewEmail}
//             />
//             <TextInput
//               placeholder="Password"
//               style={styles.input}
//               secureTextEntry
//               value={newPassword}
//               onChangeText={setNewPassword}
//             />

//             <Text style={styles.label}>Select Branch</Text>
//             <View style={styles.pickerWrapper}>
//               <Picker
//                 selectedValue={newBranch}
//                 onValueChange={(itemValue) => setNewBranch(itemValue)}
//                 style={Platform.OS === 'android' ? styles.picker : undefined}
//               >
//                 {branches.map(branch => (
//                   <Picker.Item key={branch} label={branch} value={branch} />
//                 ))}
//               </Picker>
//             </View>

//             <TouchableOpacity onPress={handleAddAdmin} style={styles.modalAddButton}>
//               <Text style={styles.modalAddButtonText}>Add</Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//               onPress={() => setModalVisible(false)}
//               style={[styles.modalAddButton, { backgroundColor: '#ccc' }]}
//             >
//               <Text style={styles.modalAddButtonText}>Cancel</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// export default AdminUsersScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f0f6ff',
//     paddingHorizontal: 16,
//     paddingTop: 20,
//   },
//   headerRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   logo: {
//     width: 100,
//     height: 40,
//     resizeMode: 'contain',
//   },
//   addButtonTop: {
//     backgroundColor: '#007AFF',
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     borderRadius: 6,
//   },
//   addButtonTextTop: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     color: '#003366',
//     marginVertical: 20,
//     alignSelf: 'center',
//   },
//   card: {
//     backgroundColor: 'white',
//     borderRadius: 12,
//     padding: 16,
//     marginBottom: 12,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 6,
//     elevation: 3,
//   },
//   name: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#333',
//   },
//   email: {
//     fontSize: 14,
//     color: '#555',
//     marginVertical: 4,
//   },
//   branch: {
//     fontSize: 14,
//     color: '#007AFF',
//     marginBottom: 8,
//   },
//   deleteButton: {
//     backgroundColor: '#b03a3a',
//     paddingVertical: 8,
//     borderRadius: 6,
//     alignItems: 'center',
//     marginTop: 5,
//   },
//   deleteText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.3)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   modalContainer: {
//     backgroundColor: '#fff',
//     width: '85%',
//     borderRadius: 12,
//     padding: 20,
//     elevation: 5,
//   },
//   modalTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#003366',
//     marginBottom: 12,
//   },
//   input: {
//     backgroundColor: '#f2f2f2',
//     padding: 10,
//     marginVertical: 6,
//     borderRadius: 6,
//     fontSize: 16,
//   },
//   pickerWrapper: {
//     backgroundColor: '#f2f2f2',
//     borderRadius: 6,
//     marginTop: 6,
//     marginBottom: 10,
//   },
//   picker: {
//     height: 48,
//     color: '#333',
//   },
//   label: {
//     fontSize: 14,
//     color: '#333',
//     marginTop: 10,
//     marginBottom: 4,
//   },
//   modalAddButton: {
//     backgroundColor: '#00AEEF',
//     padding: 12,
//     borderRadius: 6,
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   modalAddButtonText: {
//     color: 'white',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
// });

// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   FlatList,
//   TouchableOpacity,
//   Image,
//   Alert,
//   StyleSheet,
// } from 'react-native';
// import Header from '../../components/Header';
// import AddUserModal from '../../components/AddUserModal';
// import UserCard from '../../components/UserCard';
// import { SafeAreaView } from 'react-native';

// const mockAdminUsers = [
//   {
//     id: '1',
//     name: 'Ravi Kumar',
//     email: 'ravi.admin@emmvee.in',
//     branch: 'Head Office',
//     password: 'Admin@123',
//   },
//   {
//     id: '2',
//     name: 'Pooja Reddy',
//     email: 'pooja.admin@emmvee.in',
//     branch: 'Dabaspet',
//     password: 'Pooja@456',
//   },
//   {
//     id: '3',
//     name: 'Manoj Shetty',
//     email: 'manoj.s@emmvee.in',
//     branch: 'Head Office',
//     password: 'Manoj@789',
//   },
//   {
//     id: '4',
//     name: 'Neha Jain',
//     email: 'neha.j@emmvee.in',
//     branch: 'Dabaspet',
//     password: 'Neha@321',
//   },
//   {
//     id: '5',
//     name: 'Ravi Kumar',
//     email: 'ravi.admin@emmvee.in',
//     branch: 'Head Office',
//     password: 'Admin@123',
//   },
//   {
//     id: '6',
//     name: 'Pooja Reddy',
//     email: 'pooja.admin@emmvee.in',
//     branch: 'Dabaspet',
//     password: 'Pooja@456',
//   },
//   {
//     id: '7',
//     name: 'Manoj Shetty',
//     email: 'manoj.s@emmvee.in',
//     branch: 'Head Office',
//     password: 'Manoj@789',
//   },
//   {
//     id: '8',
//     name: 'Neha Jain',
//     email: 'neha.j@emmvee.in',
//     branch: 'Dabaspet',
//     password: 'Neha@321',
//   },
// ];

// const branches = ['Head Office', 'Dabaspet'];

// const AdminUsersScreen = () => {
//   const [adminUsers, setAdminUsers] = useState(mockAdminUsers);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [newName, setNewName] = useState('');
//   const [newEmail, setNewEmail] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [newBranch, setNewBranch] = useState(branches[0]);

//   const handleDelete = (id: string) => {
//     Alert.alert(
//       'Confirm Delete',
//       'Are you sure you want to remove this user?',
//       [
//         { text: 'Cancel', style: 'cancel' },
//         {
//           text: 'Delete',
//           style: 'destructive',
//           onPress: () =>
//             setAdminUsers(prev => prev.filter(user => user.id !== id)),
//         },
//       ],
//     );
//   };

//   const handleAdd = () => {
//     if (!newName || !newEmail || !newPassword || !newBranch) {
//       Alert.alert('Please fill all fields');
//       return;
//     }

//     const newUser = {
//       id: Date.now().toString(),
//       name: newName,
//       email: newEmail,
//       branch: newBranch,
//       password: newPassword,
//     };

//     setAdminUsers(prev => [...prev, newUser]);
//     setModalVisible(false);
//     setNewName('');
//     setNewEmail('');
//     setNewPassword('');
//     setNewBranch(branches[0]);
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <Header title="Admin Users" showBackButton />

//       <View style={styles.headerRow}>
//         <Image
//           source={{
//             uri: 'https://emmvee.com/wp-content/uploads/2019/08/emvlogo.png',
//           }}
//           style={styles.logo}
//         />
//         <TouchableOpacity
//           style={styles.addButton}
//           onPress={() => setModalVisible(true)}
//         >
//           <Text style={styles.addButtonText}>+ Add Admin</Text>
//         </TouchableOpacity>
//       </View>

//       <FlatList
//         data={adminUsers}
//         keyExtractor={item => item.id}
//         renderItem={({ item }) => (
//           <UserCard {...item} onDelete={handleDelete} />
//         )}
//         contentContainerStyle={{ paddingBottom: 20 }}
//       />

//       <AddUserModal
//         title="Add Admin User"
//         visible={modalVisible}
//         name={newName}
//         email={newEmail}
//         password={newPassword}
//         branch={newBranch}
//         branches={branches}
//         setName={setNewName}
//         setEmail={setNewEmail}
//         setPassword={setNewPassword}
//         setBranch={setNewBranch}
//         onClose={() => setModalVisible(false)}
//         onAdd={handleAdd}
//       />
//     </SafeAreaView>
//   );
// };

// export default AdminUsersScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f0f6ff',
//     paddingHorizontal: 16,
//     paddingTop: 20,
//   },
//   headerRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   logo: {
//     width: 100,
//     height: 40,
//     resizeMode: 'contain',
//   },
//   addButton: {
//     backgroundColor: '#007AFF',
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     borderRadius: 6,
//   },
//   addButtonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
// });

// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   FlatList,
//   TouchableOpacity,
//   Image,
//   Alert,
//   StyleSheet,
//   SafeAreaView,
//   ActivityIndicator,
// } from 'react-native';

// import Header from '../../components/Header';
// import AddUserModal from '../../components/AddUserModal';
// import UserCard from '../../components/UserCard';

// import {
//   useGetAllAdminsQuery,
//   useCreateAdminMutation,
//   useDeleteAdminMutation,
// } from '../../api';
// import { useAuth } from '../../contexts/AuthContext';

// const branches = ['Head Office', 'Dabaspet'];

// const AdminUsersScreen = () => {
//   const { userName, userRole } = useAuth();

//   const { data: adminUsers = [], isLoading, refetch } = useGetAllAdminsQuery();
//   const [createAdmin] = useCreateAdminMutation();
//   const [deleteAdmin] = useDeleteAdminMutation();

//   const [modalVisible, setModalVisible] = useState(false);
//   const [newName, setNewName] = useState('');
//   const [newEmail, setNewEmail] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [newBranch, setNewBranch] = useState(branches[0]);

//   const handleDelete = (id: string) => {
//     Alert.alert('Confirm Delete', 'Are you sure?', [
//       { text: 'Cancel', style: 'cancel' },
//       {
//         text: 'Delete',
//         style: 'destructive',
//         onPress: async () => {
//           await deleteAdmin(id);
//           refetch();
//         },
//       },
//     ]);
//   };

//   const handleAdd = async () => {
//     if (!newName || !newEmail || !newPassword || !newBranch) {
//       Alert.alert('Please fill all fields');
//       return;
//     }

//     try {
//       await createAdmin({
//         name: newName,
//         email: newEmail,
//         password: newPassword,
//         branch: newBranch,
//       });
//       setModalVisible(false);
//       setNewName('');
//       setNewEmail('');
//       setNewPassword('');
//       setNewBranch(branches[0]);
//       refetch();
//     } catch (err) {
//       Alert.alert('Error', 'Failed to add admin.');
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <Header title="Admin Users" showBackButton />

//       <View style={styles.headerRow}>
//         <Image
//           source={{
//             uri: 'https://emmvee.com/wp-content/uploads/2019/08/emvlogo.png',
//           }}
//           style={styles.logo}
//         />
//         <TouchableOpacity
//           style={styles.addButton}
//           onPress={() => setModalVisible(true)}
//         >
//           <Text style={styles.addButtonText}>+ Add Admin</Text>
//         </TouchableOpacity>
//       </View>

//       {isLoading ? (
//         <ActivityIndicator size="large" color="#007AFF" style={{ marginTop: 20 }} />
//       ) : (
//         <FlatList
//           data={adminUsers}
//           keyExtractor={item => item.id}
//           renderItem={({ item }) => (
//             <UserCard {...item} onDelete={handleDelete} />
//           )}
//           contentContainerStyle={{ paddingBottom: 20 }}
//         />
//       )}

//       <AddUserModal
//         title="Add Admin User"
//         visible={modalVisible}
//         name={newName}
//         email={newEmail}
//         password={newPassword}
//         branch={newBranch}
//         branches={branches}
//         setName={setNewName}
//         setEmail={setNewEmail}
//         setPassword={setNewPassword}
//         setBranch={setNewBranch}
//         onClose={() => setModalVisible(false)}
//         onAdd={handleAdd}
//       />
//     </SafeAreaView>
//   );
// };

// export default AdminUsersScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f0f6ff',
//     paddingHorizontal: 16,
//     paddingTop: 20,
//   },
//   headerRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   logo: {
//     width: 100,
//     height: 40,
//     resizeMode: 'contain',
//   },
//   addButton: {
//     backgroundColor: '#007AFF',
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     borderRadius: 6,
//   },
//   addButtonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
// });

// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   FlatList,
//   TouchableOpacity,
//   Image,
//   Alert,
//   StyleSheet,
//   SafeAreaView,
//   ActivityIndicator,
// } from 'react-native';

// import Header from '../../components/Header';
// import AddUserModal from '../../components/AddUserModal';
// import UserCard from '../../components/UserCard';
// import { useFocusEffect } from '@react-navigation/native';
// import { useCallback } from 'react';

// import {
//   useGetAllAdminsQuery,
//   useCreateAdminMutation,
//   useDeleteAdminMutation,
// } from '../../api';
// import { useAuth } from '../../contexts/AuthContext';

// const branches = ['All', 'Head Office', 'Dabaspet', 'AirPort'];

// const AdminUsersScreen = () => {
//   const { userName, userRole, selectedBranch, userBranch } = useAuth();
//   // console.log(`kvrbranch`, selectedBranch);
//   const location = selectedBranch === 'All' ? '' : selectedBranch;

//   const {
//     data: adminUsers = [],
//     isLoading,
//     refetch,
//   } = useGetAllAdminsQuery({ officeLocation: location });

//   const [createAdmin] = useCreateAdminMutation();
//   const [deleteAdmin] = useDeleteAdminMutation();

//   const [modalVisible, setModalVisible] = useState(false);
//   const [newName, setNewName] = useState('');
//   const [employeeId, setEmployeeId] = useState('');
//   const [newEmail, setNewEmail] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [newBranch, setNewBranch] = useState(branches[0]);

//   const handleDelete = (employeeId: string) => {
//     Alert.alert('Confirm Delete', 'Are you sure?', [
//       { text: 'Cancel', style: 'cancel' },
//       {
//         text: 'Delete',
//         style: 'destructive',
//         onPress: async () => {
//           try {
//             await deleteAdmin(employeeId).unwrap(); // ✅ important
//             // refetch(); // ❌ Not needed if invalidate works
//           } catch (err) {
//             console.error('Delete error:', err);
//             Alert.alert('Error', 'Failed to delete admin');
//           }
//         },
//       },
//     ]);
//   };

//   const handleAdd = async () => {
//     if (
//       !newName ||
//       !employeeId ||
//       !newEmail ||
//       !phoneNumber ||
//       !newPassword ||
//       !newBranch
//     ) {
//       Alert.alert('Validation Error', 'Please fill all the fields.');
//       return;
//     }

//     try {
//       await createAdmin({
//         userName: newName,
//         employeeId,
//         email: newEmail,
//         phoneNumber,
//         password: newPassword,
//         officeLocation: [newBranch],
//         role: 'admin',
//       });

//       // ✅ Clear form & close modal
//       setModalVisible(false);
//       setNewName('');
//       setEmployeeId('');
//       setNewEmail('');
//       setPhoneNumber('');
//       setNewPassword('');
//       setNewBranch(branches[0]);

//       refetch(); // 🔄 Reload admin list
//     } catch (err) {
//       console.error('Add admin error:', err);
//       Alert.alert('Error', 'Failed to add admin. Please try again.');
//     }
//   };
//   useFocusEffect(
//     useCallback(() => {
//       refetch(); // 🔄 force re-fetch when screen gains focus
//     }, [selectedBranch]),
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       <Header title="Admin Users" showBackButton />
//       <Text>{selectedBranch}</Text>
//       <View style={styles.headerRow}>
//         <Image
//           source={{
//             uri: 'https://emmvee.com/wp-content/uploads/2019/08/emvlogo.png',
//           }}
//           style={styles.logo}
//         />
//         <TouchableOpacity
//           style={styles.addButton}
//           onPress={() => setModalVisible(true)}
//         >
//           <Text style={styles.addButtonText}>+ Add Admin</Text>
//         </TouchableOpacity>
//       </View>

//       {isLoading ? (
//         <ActivityIndicator
//           size="large"
//           color="#007AFF"
//           style={{ marginTop: 20 }}
//         />
//       ) : (
//         <FlatList
//           data={adminUsers}
//           keyExtractor={item => item._id} // ✅ not item.id
//           renderItem={({ item }) => (
//             <UserCard {...item} onDelete={handleDelete} />
//           )}
//           contentContainerStyle={{ paddingBottom: 20 }}
//         />
//       )}

//       <AddUserModal
//         title="Add Admin User"
//         visible={modalVisible}
//         name={newName}
//         setName={setNewName}
//         employeeId={employeeId}
//         setEmployeeId={setEmployeeId}
//         email={newEmail}
//         setEmail={setNewEmail}
//         phoneNumber={phoneNumber}
//         setPhoneNumber={setPhoneNumber}
//         password={newPassword}
//         setPassword={setNewPassword}
//         branch={newBranch}
//         branches={branches}
//         setBranch={setNewBranch}
//         onClose={() => setModalVisible(false)}
//         onAdd={handleAdd}
//       />
//     </SafeAreaView>
//   );
// };

// export default AdminUsersScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f0f6ff',
//     paddingHorizontal: 16,
//     paddingTop: 20,
//   },
//   headerRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   logo: {
//     width: 100,
//     height: 40,
//     resizeMode: 'contain',
//   },
//   addButton: {
//     backgroundColor: '#007AFF',
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     borderRadius: 6,
//   },
//   addButtonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
// });

import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import Header from '../../components/Header';
import AddUserModal from '../../components/AddUserModal';
import UserCard from '../../components/UserCard';
import { useFocusEffect } from '@react-navigation/native';

import {
  useGetAllAdminsQuery,
  useCreateAdminMutation,
  useDeleteAdminMutation,
} from '../../api';
import { useAuth } from '../../contexts/AuthContext';
import AdminFilterBar from '../../components/AdminFilterBar';
import { BRANCHES, BRANCHESOFFORM } from '../../constants';

const AdminUsersScreen = () => {
  const { selectedBranch, userBranch } = useAuth();

  const location = selectedBranch === 'All' ? '' : selectedBranch;

  const {
    data: adminUsers = [],
    isLoading,
    refetch,
  } = useGetAllAdminsQuery({ officeLocation: location });

  const [createAdmin] = useCreateAdminMutation();
  const [deleteAdmin] = useDeleteAdminMutation();

  const [modalVisible, setModalVisible] = useState(false);
  const [newName, setNewName] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newBranch, setNewBranch] = useState<string[]>([]);

  // Filters
  const [name, setName] = useState('');
  const [empId, setEmpId] = useState('');
  const [phone, setPhone] = useState('');

  const handleDelete = (employeeId: string) => {
    Alert.alert('Confirm Delete', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            await deleteAdmin(employeeId).unwrap();
          } catch (err) {
            console.error('Delete error:', err);
            Alert.alert('Error', 'Failed to delete admin');
          }
        },
      },
    ]);
  };

  const handleAdd = async () => {
    const nameRegex = /^[A-Za-z\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !newName ||
      !employeeId ||
      !newEmail ||
      !phoneNumber ||
      !newPassword ||
      newBranch.length === 0
    ) {
      Alert.alert('Validation Error', 'Please fill all the fields.');
      return;
    }

    if (!nameRegex.test(newName)) {
      Alert.alert(
        'Invalid Name',
        'Name should only contain letters and spaces.',
      );
      return;
    }

    if (!emailRegex.test(newEmail)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }

    if (phoneNumber.length !== 10 || !/^\d+$/.test(phoneNumber)) {
      Alert.alert('Invalid Phone', 'Enter a valid 10-digit phone number.');
      return;
    }

    try {
      await createAdmin({
        userName: newName,
        employeeId,
        email: newEmail,
        phoneNumber,
        password: newPassword,
        officeLocation: newBranch,
        role: 'admin',
      }).unwrap();

      setModalVisible(false);
      setNewName('');
      setEmployeeId('');
      setNewEmail('');
      setPhoneNumber('');
      setNewPassword('');
      setNewBranch([]);

      refetch();
    } catch (err: any) {
      console.error('Add admin error:', err);
      const message =
        err?.data?.message || 'Failed to add admin. Please try again.';
      Alert.alert('Error', message);
    }
  };

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [selectedBranch]),
  );

  const filteredUsers = adminUsers.filter(user => {
    const nameMatch = user.userName.toLowerCase().includes(name.toLowerCase());
    const phoneMatch = user.phoneNumber
      .toLowerCase()
      .includes(phone.toLowerCase());
    const idMatch = user.employeeId.toLowerCase().includes(empId.toLowerCase());

    return nameMatch && phoneMatch && idMatch;
  });

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Admin Users" showMenuButton />

      {/* Add Admin Header */}
      <View style={styles.headerRow}>
        <Image
          source={{
            uri: 'https://emmvee.com/wp-content/uploads/2019/08/emvlogo.png',
          }}
          style={styles.logo}
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.addButtonText}>+ Add Admin</Text>
        </TouchableOpacity>
      </View>

      {/* Filter Bar */}
      <AdminFilterBar
        name={name}
        setName={setName}
        empId={empId}
        setEmpId={setEmpId}
        phone={phone}
        setPhone={setPhone}
        onReset={() => {
          setName('');
          setEmpId('');
          setPhone('');
        }}
      />

      {/* Admin List */}
      {isLoading ? (
        <ActivityIndicator
          size="large"
          color="#007AFF"
          style={{ marginTop: 20 }}
        />
      ) : (
        <FlatList
          data={filteredUsers}
          keyExtractor={item => item._id}
          renderItem={({ item }) => (
            <UserCard {...item} onDelete={handleDelete} />
          )}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}

      {/* Add Modal */}
      <AddUserModal
        title="Add Admin User"
        visible={modalVisible}
        name={newName}
        setName={setNewName}
        employeeId={employeeId}
        setEmployeeId={setEmployeeId}
        email={newEmail}
        setEmail={setNewEmail}
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
        password={newPassword}
        setPassword={setNewPassword}
        branch={newBranch}
        branches={BRANCHESOFFORM}
        setBranch={setNewBranch}
        onClose={() => setModalVisible(false)}
        onAdd={handleAdd}
      />
    </SafeAreaView>
  );
};

export default AdminUsersScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f6ff',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 40,
    resizeMode: 'contain',
  },
  addButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  officeSelectButton: {
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderRadius: 6,
    marginVertical: 6,
  },
  officeSelectText: {
    color: '#333',
    fontSize: 16,
  },
});
