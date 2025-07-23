// // import React, { useState } from 'react';
// // import {
// //   View,
// //   Text,
// //   StyleSheet,
// //   FlatList,
// //   TouchableOpacity,
// //   StatusBar,
// //   SafeAreaView,
// //   Alert,
// // } from 'react-native';
// // import Icon from 'react-native-vector-icons/Ionicons';
// // // import RNPickerSelect from 'react-native-picker-select';
// // import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

// // const securityUsers = [
// //   { id: '1', empId: 'EMP001', name: 'security1', phone: '9875632765', location: 'Airport Office', password: '123456' },
// //   { id: '2', empId: 'EMP002', name: 'security2', phone: '7895432156', location: 'Dabaspet', password: 'abc123' },
// //   { id: '3', empId: 'EMP003', name: 'security3', phone: '7835432150', location: 'Head Office', password: 'pwd321' },
// //   { id: '4', empId: 'EMP004', name: 'security4', phone: '7835432151', location: 'Head Office', password: 'admin@123' },
// // ];

// // const SecurityUsersScreen = () => {
// //   const [filterLocation, setFilterLocation] = useState('All');

// //   const filteredUsers =
// //     filterLocation === 'All'
// //       ? securityUsers
// //       : securityUsers.filter((user) => user.location === filterLocation);

// //   const handleDelete = (id: string) => {
// //     Alert.alert('Delete User', 'Are you sure you want to delete this user?', [
// //       { text: 'Cancel', style: 'cancel' },
// //       { text: 'Delete', style: 'destructive', onPress: () => console.log('Delete user:', id) },
// //     ]);
// //   };

// //   const renderItem = ({ item }: { item: typeof securityUsers[0] }) => (
// //     <View style={styles.card}>
// //       <Text style={styles.item}><Text style={styles.label}>Emp ID:</Text> {item.empId}</Text>
// //       <Text style={styles.item}><Text style={styles.label}>Name:</Text> {item.name}</Text>
// //       <Text style={styles.item}><Text style={styles.label}>Phone:</Text> {item.phone}</Text>
// //       <Text style={styles.item}><Text style={styles.label}>Location:</Text> {item.location || '-'}</Text>
// //       <Text style={styles.item}><Text style={styles.label}>Password:</Text> {item.password}</Text>

// //       <View style={styles.cardFooter}>
// //         <TouchableOpacity style={styles.viewButton}>
// //           <Text style={styles.viewButtonText}>View</Text>
// //         </TouchableOpacity>
// //         <TouchableOpacity onPress={() => handleDelete(item.id)}>
// //           <Icon name="trash-outline" size={22} color="#FF3B30" />
// //         </TouchableOpacity>
// //       </View>
// //     </View>
// //   );

// //   return (
// //     <SafeAreaView style={styles.safeArea}>
// //       <StatusBar barStyle="dark-content" />
// //       <View style={styles.header}>
// //         <Text style={styles.title}>Security Users</Text>
// //         <View style={styles.filterWrapper}>
// //           {/* <RNPickerSelect
// //             onValueChange={(value) => setFilterLocation(value)}
// //             value={filterLocation}
// //             items={[
// //               { label: 'All', value: 'All' },
// //               { label: 'Dabaspet', value: 'Dabaspet' },
// //               { label: 'Head Office', value: 'Head Office' },
// //             ]}
// //             style={pickerStyles}
// //             useNativeAndroidPickerStyle={false}
// //             Icon={() => <Icon name="chevron-down" size={20} color="#000" />}
// //           /> */}
// //         </View>
// //       </View>

// //       <FlatList
// //         data={filteredUsers}
// //         keyExtractor={(item) => item.id}
// //         contentContainerStyle={styles.list}
// //         renderItem={renderItem}
// //         showsVerticalScrollIndicator={false}
// //       />

// //       <TouchableOpacity style={styles.fab} onPress={() => Alert.alert('Add User')}>
// //         <Icon name="add" size={28} color="#fff" />
// //       </TouchableOpacity>
// //     </SafeAreaView>
// //   );
// // };

// // export default SecurityUsersScreen;

// // const styles = StyleSheet.create({
// //   safeArea: {
// //     flex: 1,
// //     backgroundColor: '#F5F7FA',
// //   },
// //   header: {
// //     paddingHorizontal: wp(5),
// //     paddingVertical: hp(2),
// //     backgroundColor: '#fff',
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //     alignItems: 'center',
// //   },
// //   title: {
// //     fontSize: hp(2.6),
// //     fontWeight: '600',
// //     color: '#000',
// //   },
// //   filterWrapper: {
// //     width: wp(40),
// //     backgroundColor: '#f2f2f2',
// //     borderRadius: wp(2),
// //     paddingHorizontal: wp(2),
// //   },
// //   list: {
// //     paddingHorizontal: wp(5),
// //     paddingBottom: hp(8),
// //   },
// //   card: {
// //     backgroundColor: '#fff',
// //     borderRadius: wp(3),
// //     padding: wp(4),
// //     marginBottom: hp(2),
// //     shadowColor: '#000',
// //     shadowOpacity: 0.05,
// //     shadowOffset: { width: 0, height: 1 },
// //     shadowRadius: 4,
// //     elevation: 2,
// //   },
// //   label: {
// //     fontWeight: '600',
// //     color: '#444',
// //   },
// //   item: {
// //     fontSize: hp(2),
// //     marginBottom: hp(0.8),
// //   },
// //   cardFooter: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //     alignItems: 'center',
// //     marginTop: hp(1.5),
// //   },
// //   viewButton: {
// //     backgroundColor: '#007AFF',
// //     paddingVertical: hp(1),
// //     paddingHorizontal: wp(4),
// //     borderRadius: wp(2),
// //   },
// //   viewButtonText: {
// //     color: '#fff',
// //     fontWeight: '500',
// //     fontSize: hp(1.9),
// //   },
// //   fab: {
// //     position: 'absolute',
// //     bottom: hp(3),
// //     right: wp(5),
// //     backgroundColor: '#007AFF',
// //     width: wp(14),
// //     height: wp(14),
// //     borderRadius: wp(7),
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     shadowColor: '#000',
// //     shadowOpacity: 0.2,
// //     shadowOffset: { width: 0, height: 2 },
// //     shadowRadius: 6,
// //     elevation: 6,
// //   },
// // });

// // const pickerStyles = StyleSheet.create({
// //   inputIOS: {
// //     fontSize: hp(2),
// //     paddingVertical: hp(1.2),
// //     paddingHorizontal: wp(2),
// //     color: '#000',
// //   },
// //   inputAndroid: {
// //     fontSize: hp(2),
// //     paddingVertical: hp(1.2),
// //     paddingHorizontal: wp(2),
// //     color: '#000',
// //   },
// // });

// // import React, { useState } from 'react';
// // import {
// //   View,
// //   Text,
// //   FlatList,
// //   StyleSheet,
// //   TouchableOpacity,
// //   Alert,
// //   Modal,
// //   TextInput,
// //   Image,
// //   Platform,
// //   SafeAreaView,
// // } from 'react-native';
// // import { Picker } from '@react-native-picker/picker';
// // import Header from '../../components/Header';

// // const mockSecurityUsers = [
// //   {
// //     id: '1',
// //     name: 'Rahul Yadav',
// //     email: 'rahul.security@emmvee.in',
// //     branch: 'Head Office',
// //     password: 'Rahul@123',
// //   },
// //   {
// //     id: '2',
// //     name: 'Deepa Singh',
// //     email: 'deepa.security@emmvee.in',
// //     branch: 'Dabaspet',
// //     password: 'Deepa@456',
// //   },
// // ];

// // const SecurityUsersScreen = () => {
// //   const [securityUsers, setSecurityUsers] = useState(mockSecurityUsers);
// //   const [modalVisible, setModalVisible] = useState(false);
// //   const [newName, setNewName] = useState('');
// //   const [newEmail, setNewEmail] = useState('');
// //   const [newPassword, setNewPassword] = useState('');
// //   const [newBranch, setNewBranch] = useState('Head Office');

// //   const branches = ['Head Office', 'Dabaspet'];

// //   const handleDelete = (id: string) => {
// //     Alert.alert(
// //       'Confirm Delete',
// //       'Are you sure you want to remove this user?',
// //       [
// //         { text: 'Cancel', style: 'cancel' },
// //         {
// //           text: 'Delete',
// //           style: 'destructive',
// //           onPress: () =>
// //             setSecurityUsers(prev => prev.filter(user => user.id !== id)),
// //         },
// //       ],
// //     );
// //   };

// //   const handleAddSecurity = () => {
// //     if (!newName || !newEmail || !newPassword || !newBranch) {
// //       Alert.alert('Please fill all fields');
// //       return;
// //     }
// //     const newUser = {
// //       id: Date.now().toString(),
// //       name: newName,
// //       email: newEmail,
// //       branch: newBranch,
// //       password: newPassword,
// //     };
// //     setSecurityUsers(prev => [...prev, newUser]);
// //     setNewName('');
// //     setNewEmail('');
// //     setNewPassword('');
// //     setNewBranch('Head Office');
// //     setModalVisible(false);
// //   };

// //   const renderItem = ({ item }: any) => (
// //     <View style={styles.card}>
// //       <Text style={styles.name}>{item.name}</Text>
// //       <Text style={styles.email}>{item.email}</Text>
// //       <Text style={styles.branch}>Branch: {item.branch}</Text>
// //       <Text style={styles.email}>Password: {item.password}</Text>
// //       <TouchableOpacity
// //         onPress={() => handleDelete(item.id)}
// //         style={styles.deleteButton}
// //       >
// //         <Text style={styles.deleteText}>Remove</Text>
// //       </TouchableOpacity>
// //     </View>
// //   );

// //   return (
// //     <SafeAreaView style={styles.container}>
// //       {/* Header */}
// //       <Header title="Security Users" showBackButton />

// //       <View style={styles.headerRow}>
// //         <Image
// //           source={{
// //             uri: 'https://emmvee.com/wp-content/uploads/2019/08/emvlogo.png',
// //           }}
// //           style={styles.logo}
// //         />
// //         <TouchableOpacity
// //           style={styles.addButtonTop}
// //           onPress={() => setModalVisible(true)}
// //         >
// //           <Text style={styles.addButtonTextTop}>+ Add Security</Text>
// //         </TouchableOpacity>
// //       </View>

// //       <FlatList
// //         data={securityUsers}
// //         keyExtractor={item => item.id}
// //         renderItem={renderItem}
// //         contentContainerStyle={{ paddingBottom: 20 }}
// //       />

// //       {/* Modal */}
// //       <Modal visible={modalVisible} animationType="slide" transparent>
// //         <View style={styles.modalOverlay}>
// //           <View style={styles.modalContainer}>
// //             <Text style={styles.modalTitle}>Add Security User</Text>

// //             <TextInput
// //               placeholder="Full Name"
// //               style={styles.input}
// //               value={newName}
// //               onChangeText={setNewName}
// //             />
// //             <TextInput
// //               placeholder="Email"
// //               style={styles.input}
// //               keyboardType="email-address"
// //               value={newEmail}
// //               onChangeText={setNewEmail}
// //             />
// //             <TextInput
// //               placeholder="Password"
// //               style={styles.input}
// //               secureTextEntry
// //               value={newPassword}
// //               onChangeText={setNewPassword}
// //             />

// //             <View style={styles.pickerWrapper}>
// //               <Picker
// //                 selectedValue={newBranch}
// //                 onValueChange={itemValue => setNewBranch(itemValue)}
// //                 style={Platform.OS === 'android' ? styles.picker : undefined}
// //                 itemStyle={
// //                   Platform.OS === 'ios' ? styles.pickerItemIOS : undefined
// //                 }
// //               >
// //                 {branches.map(branch => (
// //                   <Picker.Item key={branch} label={branch} value={branch} />
// //                 ))}
// //               </Picker>
// //             </View>

// //             <TouchableOpacity
// //               onPress={handleAddSecurity}
// //               style={styles.modalAddButton}
// //             >
// //               <Text style={styles.modalAddButtonText}>Add</Text>
// //             </TouchableOpacity>

// //             <TouchableOpacity
// //               onPress={() => setModalVisible(false)}
// //               style={[styles.modalAddButton, { backgroundColor: '#ccc' }]}
// //             >
// //               <Text style={styles.modalAddButtonText}>Cancel</Text>
// //             </TouchableOpacity>
// //           </View>
// //         </View>
// //       </Modal>
// //     </SafeAreaView>
// //   );
// // };

// // export default SecurityUsersScreen;

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: '#f0f6ff',
// //     paddingHorizontal: 16,
// //     paddingTop: 20,
// //   },
// //   headerRow: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //     alignItems: 'center',
// //     marginBottom: 20,
// //   },
// //   logo: {
// //     width: 100,
// //     height: 40,
// //     resizeMode: 'contain',
// //   },
// //   addButtonTop: {
// //     backgroundColor: '#28a745',
// //     paddingHorizontal: 16,
// //     paddingVertical: 8,
// //     borderRadius: 6,
// //   },
// //   addButtonTextTop: {
// //     color: '#fff',
// //     fontWeight: 'bold',
// //   },
// //   title: {
// //     fontSize: 22,
// //     fontWeight: 'bold',
// //     color: '#003366',
// //     marginVertical: 20,
// //     alignSelf: 'center',
// //   },
// //   card: {
// //     backgroundColor: 'white',
// //     borderRadius: 12,
// //     padding: 16,
// //     marginBottom: 12,
// //     shadowColor: '#000',
// //     shadowOpacity: 0.1,
// //     shadowRadius: 6,
// //     elevation: 3,
// //   },
// //   name: {
// //     fontSize: 18,
// //     fontWeight: '600',
// //     color: '#333',
// //   },
// //   email: {
// //     fontSize: 14,
// //     color: '#555',
// //     marginVertical: 4,
// //   },
// //   branch: {
// //     fontSize: 14,
// //     color: '#007AFF',
// //     marginBottom: 8,
// //   },
// //   deleteButton: {
// //     backgroundColor: '#b03a3a',
// //     paddingVertical: 8,
// //     borderRadius: 6,
// //     alignItems: 'center',
// //     marginTop: 5,
// //   },
// //   deleteText: {
// //     color: 'white',
// //     fontWeight: 'bold',
// //   },
// //   modalOverlay: {
// //     flex: 1,
// //     backgroundColor: 'rgba(0,0,0,0.3)',
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //   },
// //   modalContainer: {
// //     backgroundColor: '#fff',
// //     width: '85%',
// //     borderRadius: 12,
// //     padding: 20,
// //     elevation: 5,
// //   },
// //   modalTitle: {
// //     fontSize: 20,
// //     fontWeight: 'bold',
// //     color: '#003366',
// //     marginBottom: 12,
// //   },
// //   input: {
// //     backgroundColor: '#f2f2f2',
// //     padding: 10,
// //     marginVertical: 6,
// //     borderRadius: 6,
// //     fontSize: 16,
// //   },
// //   pickerWrapper: {
// //     backgroundColor: '#f2f2f2',
// //     borderRadius: 6,
// //     marginTop: 6,
// //     marginBottom: 10,
// //   },
// //   picker: {
// //     height: 50,
// //     color: '#333',
// //   },
// //   pickerItemIOS: {
// //     fontSize: 16,
// //     height: 50,
// //   },
// //   modalAddButton: {
// //     backgroundColor: '#28a745',
// //     padding: 12,
// //     borderRadius: 6,
// //     alignItems: 'center',
// //     marginTop: 10,
// //   },
// //   modalAddButtonText: {
// //     color: 'white',
// //     fontWeight: 'bold',
// //     fontSize: 16,
// //   },
// // });

// import React, { useState } from 'react';
// import {
//   View,
//   FlatList,
//   TouchableOpacity,
//   Image,
//   StyleSheet,
//   Alert,
//   SafeAreaView,
//   Text,
// } from 'react-native';
// import Header from '../../components/Header';
// import UserCard from '../../components/UserCard';
// import AddUserModal from '../../components/AddUserModal';

// const mockSecurityUsers = [
//   {
//     id: '1',
//     name: 'Rahul Yadav',
//     email: 'rahul.security@emmvee.in',
//     branch: 'Head Office',
//     password: 'Rahul@123',
//   },
//   {
//     id: '2',
//     name: 'Deepa Singh',
//     email: 'deepa.security@emmvee.in',
//     branch: 'Dabaspet',
//     password: 'Deepa@456',
//   },
// ];

// const branches = ['Head Office', 'Dabaspet'];

// const SecurityUsersScreen = () => {
//   const [securityUsers, setSecurityUsers] = useState(mockSecurityUsers);
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
//             setSecurityUsers(prev => prev.filter(user => user.id !== id)),
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

//     setSecurityUsers(prev => [...prev, newUser]);
//     setModalVisible(false);
//     setNewName('');
//     setNewEmail('');
//     setNewPassword('');
//     setNewBranch(branches[0]);
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <Header title="Security Users" showBackButton />

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
//           <Text style={styles.addButtonText}>+ Add Security</Text>
//         </TouchableOpacity>
//       </View>

//       <FlatList
//         data={securityUsers}
//         keyExtractor={item => item.id}
//         renderItem={({ item }) => (
//           <UserCard {...item} onDelete={handleDelete} />
//         )}
//       />

//       <AddUserModal
//         visible={modalVisible}
//         title="Add Security User"
//         name={newName}
//         email={newEmail}
//         password={newPassword}
//         branch={newBranch}
//         branches={branches}
//         onClose={() => setModalVisible(false)}
//         onAdd={handleAdd}
//         setName={setNewName}
//         setEmail={setNewEmail}
//         setPassword={setNewPassword}
//         setBranch={setNewBranch}
//         primaryColor="#28a745"
//       />
//     </SafeAreaView>
//   );
// };

// export default SecurityUsersScreen;

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
//     backgroundColor: '#28a745',
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
//   FlatList,
//   TouchableOpacity,
//   Image,
//   StyleSheet,
//   Alert,
//   SafeAreaView,
//   Text,
//   ActivityIndicator,
// } from 'react-native';

// import Header from '../../components/Header';
// import UserCard from '../../components/UserCard';
// import AddUserModal from '../../components/AddUserModal';

// import {
//   useGetAllSecurityQuery,
//   useCreateSecurityMutation,
//   useDeleteSecurityMutation,
// } from '../../api';

// const branches = ['Head Office', 'Dabaspet'];

// const SecurityUsersScreen = () => {
//   const {
//     data: securityUsers = [],
//     isLoading,
//     refetch,
//   } = useGetAllSecurityQuery();
//   console.log(securityUsers);
//   const [createSecurity] = useCreateSecurityMutation();
//   const [deleteSecurity] = useDeleteSecurityMutation();

//   const [modalVisible, setModalVisible] = useState(false);
//   const [newName, setNewName] = useState('');
//   const [newEmail, setNewEmail] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [newBranch, setNewBranch] = useState(branches[0]);
//   const [newPhone, setNewPhone] = useState('');
//   const [employeeId, setEmployeeId] = useState('');

//   const handleDelete = (employeeId: string) => {
//     Alert.alert('Confirm Delete', 'Are you sure?', [
//       { text: 'Cancel', style: 'cancel' },
//       {
//         text: 'Delete',
//         style: 'destructive',
//         onPress: async () => {
//           try {
//             await deleteSecurity(employeeId).unwrap(); // ⚠️ If your API expects id in body, update accordingly
//             // refetch(); // Optional if tags invalidate correctly
//           } catch (err) {
//             console.error('Security delete error:', err);
//             Alert.alert('Error', 'Failed to delete user');
//           }
//         },
//       },
//     ]);
//   };

//   const handleAdd = async () => {
//     if (!newName || !newPassword || !newBranch || !newPhone || !employeeId) {
//       Alert.alert('Please fill all required fields');
//       return;
//     }

//     const payload = {
//       userName: newName,
//       phoneNumber: newPhone,
//       password: newPassword,
//       officeLocation: newBranch,
//       employeeId,
//     };

//     console.log('🔧 Creating security user with payload:', payload);

//     try {
//       const response = await createSecurity(payload);
//       console.log('✅ Security user created:', response);

//       // Clear modal & form state
//       setModalVisible(false);
//       setNewName('');
//       setNewEmail('');
//       setNewPassword('');
//       setNewBranch(branches[0]);
//       setNewPhone('');
//       setEmployeeId('');

//       // Refresh list
//       refetch();
//     } catch (err) {
//       console.error('❌ Security create error:', err);
//       Alert.alert('Error', 'Failed to add security user');
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <Header title="Security Users" showBackButton />

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
//           <Text style={styles.addButtonText}>+ Add Security</Text>
//         </TouchableOpacity>
//       </View>

//       {isLoading ? (
//         <ActivityIndicator
//           size="large"
//           color="#28a745"
//           style={{ marginTop: 20 }}
//         />
//       ) : (
//         <FlatList
//           data={securityUsers?.response || []}
//           keyExtractor={item => item._id}
//           renderItem={({ item }) => (
//             <UserCard
//               _id={item._id}
//               userName={item.userName}
//               email={item.email || '-'}
//               phoneNumber={item.phoneNumber}
//               password={item.password}
//               employeeId={item.employeeId}
//               officeLocation={[item.officeLocation]} // 🔁 make it an array
//               role={item.role}
//               onDelete={handleDelete}
//             />
//           )}
//           contentContainerStyle={{ paddingBottom: 20 }}
//         />
//       )}

//       <AddUserModal
//         visible={modalVisible}
//         title="Add Security User"
//         name={newName}
//         email={newEmail}
//         password={newPassword}
//         phoneNumber={newPhone}
//         employeeId={employeeId}
//         branch={newBranch}
//         branches={branches}
//         setName={setNewName}
//         setEmail={setNewEmail}
//         setPassword={setNewPassword}
//         setPhoneNumber={setNewPhone}
//         setEmployeeId={setEmployeeId}
//         setBranch={setNewBranch}
//         onClose={() => setModalVisible(false)}
//         onAdd={handleAdd}
//       />
//     </SafeAreaView>
//   );
// };

// export default SecurityUsersScreen;

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
//     backgroundColor: '#28a745',
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
//   FlatList,
//   TouchableOpacity,
//   Image,
//   StyleSheet,
//   Alert,
//   SafeAreaView,
//   Text,
//   ActivityIndicator,
// } from 'react-native';

// import Header from '../../components/Header';
// import UserCard from '../../components/UserCard';
// import AddUserModal from '../../components/AddUserModal';

// import {
//   useGetAllSecurityQuery,
//   useCreateSecurityMutation,
//   useDeleteSecurityMutation,
// } from '../../api';

// import { useAuth } from '../../contexts/AuthContext';

// const branches = ['All', 'Head Office', 'Dabaspet'];

// const SecurityUsersScreen = () => {
//   const { selectedBranch } = useAuth(); // 👈 Get selected branch from context
//   const officeLocation = selectedBranch === 'All' ? '' : selectedBranch;

//   const {
//     data: securityUsers = [],
//     isLoading,
//     refetch,
//   } = useGetAllSecurityQuery({ officeLocation });

//   const [createSecurity] = useCreateSecurityMutation();
//   const [deleteSecurity] = useDeleteSecurityMutation();

//   const [modalVisible, setModalVisible] = useState(false);
//   const [newName, setNewName] = useState('');
//   const [newEmail, setNewEmail] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [newBranch, setNewBranch] = useState(branches[0]);
//   const [newPhone, setNewPhone] = useState('');
//   const [employeeId, setEmployeeId] = useState('');

//   const handleDelete = (employeeId: string) => {
//     Alert.alert('Confirm Delete', 'Are you sure?', [
//       { text: 'Cancel', style: 'cancel' },
//       {
//         text: 'Delete',
//         style: 'destructive',
//         onPress: async () => {
//           try {
//             await deleteSecurity(employeeId).unwrap();
//           } catch (err) {
//             console.error('Security delete error:', err);
//             Alert.alert('Error', 'Failed to delete user');
//           }
//         },
//       },
//     ]);
//   };

//   const handleAdd = async () => {
//     if (!newName || !newPassword || !newBranch || !newPhone || !employeeId) {
//       Alert.alert('Please fill all required fields');
//       return;
//     }

//     const payload = {
//       userName: newName,
//       phoneNumber: newPhone,
//       password: newPassword,
//       officeLocation: newBranch,
//       employeeId,
//     };

//     try {
//       await createSecurity(payload);
//       clearForm();
//       refetch(); // 🔄 Refresh data
//     } catch (err) {
//       console.error('Security create error:', err);
//       Alert.alert('Error', 'Failed to add security user');
//     }
//   };

//   const clearForm = () => {
//     setModalVisible(false);
//     setNewName('');
//     setNewEmail('');
//     setNewPassword('');
//     setNewBranch(branches[0]);
//     setNewPhone('');
//     setEmployeeId('');
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <Header title="Security Users" showBackButton />
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
//           <Text style={styles.addButtonText}>+ Add Security</Text>
//         </TouchableOpacity>
//       </View>

//       {isLoading ? (
//         <ActivityIndicator
//           size="large"
//           color="#28a745"
//           style={{ marginTop: 20 }}
//         />
//       ) : (
//         <FlatList
//           data={securityUsers}
//           keyExtractor={item => item._id}
//           renderItem={({ item }) => (
//             <UserCard
//               _id={item._id}
//               userName={item.userName}
//               email={item.email || '-'}
//               phoneNumber={item.phoneNumber}
//               password={item.password}
//               employeeId={item.employeeId}
//               officeLocation={[item.officeLocation]}
//               role={item.role}
//               onDelete={handleDelete}
//             />
//           )}
//           contentContainerStyle={{ paddingBottom: 20 }}
//         />
//       )}

//       <AddUserModal
//         visible={modalVisible}
//         title="Add Security User"
//         name={newName}
//         email={newEmail}
//         password={newPassword}
//         phoneNumber={newPhone}
//         employeeId={employeeId}
//         branch={newBranch}
//         branches={branches}
//         setName={setNewName}
//         setEmail={setNewEmail}
//         setPassword={setNewPassword}
//         setPhoneNumber={setNewPhone}
//         setEmployeeId={setEmployeeId}
//         setBranch={setNewBranch}
//         onClose={() => setModalVisible(false)}
//         onAdd={handleAdd}
//       />
//     </SafeAreaView>
//   );
// };

// export default SecurityUsersScreen;

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
//     backgroundColor: '#28a745',
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
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  SafeAreaView,
  Text,
  ActivityIndicator,
} from 'react-native';

import Header from '../../components/Header';
import UserCard from '../../components/UserCard';
import AddUserModal from '../../components/AddUserModal';
import AdminFilterBar from '../../components/AdminFilterBar'; // ✅ reused

import {
  useGetAllSecurityQuery,
  useCreateSecurityMutation,
  useDeleteSecurityMutation,
} from '../../api';

import { useAuth } from '../../contexts/AuthContext';
import { BRANCHES, BRANCHESOFFORM } from '../../constants';

const SecurityUsersScreen = () => {
  const { selectedBranch } = useAuth();
  const officeLocation = selectedBranch === 'All' ? '' : selectedBranch;

  const {
    data: securityUsers = [],
    isLoading,
    refetch,
  } = useGetAllSecurityQuery({ officeLocation });

  const [createSecurity] = useCreateSecurityMutation();
  const [deleteSecurity] = useDeleteSecurityMutation();

  const [modalVisible, setModalVisible] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newBranch, setNewBranch] = useState<string[]>([]);
  const [newPhone, setNewPhone] = useState('');
  const [employeeId, setEmployeeId] = useState('');

  // 🔍 Filters
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
            await deleteSecurity(employeeId).unwrap();
          } catch (err) {
            console.error('Security delete error:', err);
            Alert.alert('Error', 'Failed to delete user');
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
      !newPhone ||
      !newPassword ||
      newBranch.length === 0
    ) {
      Alert.alert('Validation Error', 'Please fill all the fields.');
      return;
    }

    if (!nameRegex.test(newName)) {
      Alert.alert('Invalid Name', 'Only letters and spaces are allowed.');
      return;
    }

    if (!emailRegex.test(newEmail)) {
      Alert.alert('Invalid Email', 'Enter a valid email address.');
      return;
    }

    if (newPhone.length !== 10 || !/^\d+$/.test(newPhone)) {
      Alert.alert('Invalid Phone', 'Enter a valid 10-digit phone number.');
      return;
    }

    const payload = {
      userName: newName,
      phoneNumber: newPhone,
      password: newPassword,
      officeLocation: newBranch,
      employeeId,
      email: newEmail,
      role: 'security',
    };

    try {
      await createSecurity(payload).unwrap();
      clearForm();
      refetch();
    } catch (err) {
      console.error('Security create error:', err);
      Alert.alert('Error', 'Failed to add security user');
    }
  };

  const clearForm = () => {
    setModalVisible(false);
    setNewName('');
    setNewEmail('');
    setNewPassword('');
    setNewBranch([]);
    setNewPhone('');
    setEmployeeId('');
  };

  const filteredUsers = securityUsers.filter(user => {
    const nameMatch = user.userName.toLowerCase().includes(name.toLowerCase());
    const phoneMatch = user.phoneNumber
      .toLowerCase()
      .includes(phone.toLowerCase());
    const idMatch = user.employeeId.toLowerCase().includes(empId.toLowerCase());

    return nameMatch && phoneMatch && idMatch;
  });

  useCallback(() => {
    refetch();
  }, [selectedBranch]);

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Security Users" showMenuButton />

      {/* ➕ Add Header */}
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
          <Text style={styles.addButtonText}>+ Add Security</Text>
        </TouchableOpacity>
      </View>
      {/* 🧪 Filter Bar */}
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
      {/* 👮 Security List */}
      {isLoading ? (
        <ActivityIndicator
          size="large"
          color="#28a745"
          style={{ marginTop: 20 }}
        />
      ) : (
        <FlatList
          data={filteredUsers}
          keyExtractor={item => item._id}
          renderItem={({ item }) => (
            <UserCard
              _id={item._id}
              userName={item.userName}
              email={item.email || '-'}
              phoneNumber={item.phoneNumber}
              password={item.password}
              employeeId={item.employeeId}
              officeLocation={[item.officeLocation]}
              role={item.role}
              onDelete={handleDelete}
            />
          )}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}

      {/* ➕ Add Modal */}
      <AddUserModal
        visible={modalVisible}
        title="Add Security User"
        name={newName}
        email={newEmail}
        password={newPassword}
        phoneNumber={newPhone}
        employeeId={employeeId}
        branch={newBranch}
        branches={BRANCHESOFFORM}
        setName={setNewName}
        setEmail={setNewEmail}
        setPassword={setNewPassword}
        setPhoneNumber={setNewPhone}
        setEmployeeId={setEmployeeId}
        setBranch={setNewBranch}
        onClose={() => setModalVisible(false)}
        onAdd={handleAdd}
      />
    </SafeAreaView>
  );
};

export default SecurityUsersScreen;

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
    backgroundColor: '#28a745',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
