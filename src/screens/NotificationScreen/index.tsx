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




import React, { useState } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';


import Header from '../../components/Header';
import { SafeAreaView } from 'react-native';
import BranchFilterPicker from '../../components/Notification/BranchFilterPicker';
import SecurityUserRow from '../../components/Notification/SecurityUserRow';
import InputField from '../../components/InputField';

const mockSecurityUsers = [
  { id: 'EMP001', location: 'Head Office' },
  { id: 'EMP002', location: 'Dabaspet' },
  { id: 'EMP003', location: 'Head Office' },
  { id: 'EMP004', location: 'Dabaspet' },
];

const branches = ['All', 'Head Office', 'Dabaspet'];

const NotificationScreen = () => {
  const [selectedBranch, setSelectedBranch] = useState('All');

  const filteredUsers = mockSecurityUsers.filter(user =>
    selectedBranch === 'All' ? true : user.location === selectedBranch
  );

  const handleResetPassword = (id: string) => {
    alert(`Reset password for ${id}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <NotificationHeader /> */}
      <Header title="Notifications" showBackButton />

      {/* <BranchFilterPicker
        selectedBranch={selectedBranch}
        onChange={setSelectedBranch}
        branches={branches}
      /> */}

      {/* Table Header */}
      <View style={[styles.row, styles.headerRow]}>
        <Text style={[styles.cell, styles.headerText]}>Employee Id</Text>
        <Text style={[styles.cell, styles.headerText]}>Location</Text>
        <Text style={[styles.cell, styles.headerText]}>Reset Password</Text>
      </View>

      <FlatList
        data={filteredUsers}
        renderItem={({ item }) => (
          <SecurityUserRow {...item} onReset={handleResetPassword} />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

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
});
