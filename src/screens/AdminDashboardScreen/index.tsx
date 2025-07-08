// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   FlatList,
//   StyleSheet,
//   Image,
//   SafeAreaView,
//   TextInput,
//   TouchableOpacity,
// } from 'react-native';

// const initialVisitors = [
//   {
//     id: '1',
//     name: 'John Doe',
//     company: 'ABC Corp',
//     purpose: 'Meeting',
//     time: '10:30 AM',
//     photo: 'https://via.placeholder.com/100',
//     status: 'Checked In',
//   },
//   {
//     id: '2',
//     name: 'Jane Smith',
//     company: 'XYZ Ltd',
//     purpose: 'Delivery',
//     time: '11:00 AM',
//     photo: 'https://via.placeholder.com/100',
//     status: 'Checked Out',
//   },
//   {
//     id: '3',
//     name: 'Raj Patel',
//     company: 'Emmvee',
//     purpose: 'Interview',
//     time: '12:15 PM',
//     photo: 'https://via.placeholder.com/100',
//     status: 'Checked In',
//   },
// ];

// const AdminDashboardScreen = () => {
//   const [visitors, setVisitors] = useState(initialVisitors);
//   const [search, setSearch] = useState('');

//   const handleCheckOut = (id: string) => {
//     const updated = visitors.map(visitor =>
//       visitor.id === id ? { ...visitor, status: 'Checked Out' } : visitor
//     );
//     setVisitors(updated);
//   };

//   const filteredVisitors = visitors
//     .filter(v =>
//       v.name.toLowerCase().includes(search.toLowerCase()) ||
//       v.company.toLowerCase().includes(search.toLowerCase())
//     )
//     .sort((a, b) => b.time.localeCompare(a.time)); // Latest first

//   return (
//     <SafeAreaView style={styles.safe}>
//       <View style={styles.container}>
//         <Text style={styles.title}>Admin Dashboard</Text>

//         <TextInput
//           style={styles.search}
//           placeholder="Search by name or company"
//           value={search}
//           onChangeText={setSearch}
//         />

//         <FlatList
//           data={filteredVisitors}
//           keyExtractor={item => item.id}
//           renderItem={({ item }) => (
//             <View style={styles.card}>
//               <Image source={{ uri: item.photo }} style={styles.photo} />
//               <View style={styles.info}>
//                 <Text style={styles.name}>{item.name}</Text>
//                 <Text style={styles.details}>
//                   {item.company} • {item.purpose}
//                 </Text>
//                 <Text style={styles.time}>Time: {item.time}</Text>
//                 <Text
//                   style={[
//                     styles.status,
//                     item.status === 'Checked In'
//                       ? styles.checkedIn
//                       : styles.checkedOut,
//                   ]}
//                 >
//                   {item.status}
//                 </Text>
//               </View>
//               {item.status === 'Checked In' && (
//                 <TouchableOpacity
//                   style={styles.outButton}
//                   onPress={() => handleCheckOut(item.id)}
//                 >
//                   <Text style={styles.outText}>Check Out</Text>
//                 </TouchableOpacity>
//               )}
//             </View>
//           )}
//           contentContainerStyle={{ paddingBottom: 20 }}
//         />
//       </View>
//     </SafeAreaView>
//   );
// };

// export default AdminDashboardScreen;

// const styles = StyleSheet.create({
//   safe: {
//     flex: 1,
//     backgroundColor: '#f0f6ff',
//   },
//   container: {
//     flex: 1,
//     padding: 16,
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     color: '#003366',
//     marginBottom: 16,
//     alignSelf: 'center',
//   },
//   search: {
//     backgroundColor: 'white',
//     borderRadius: 10,
//     paddingHorizontal: 15,
//     height: 48,
//     fontSize: 16,
//     marginBottom: 16,
//     borderWidth: 1,
//     borderColor: '#ccc',
//   },
//   card: {
//     flexDirection: 'row',
//     backgroundColor: 'white',
//     padding: 14,
//     borderRadius: 12,
//     marginBottom: 12,
//     alignItems: 'center',
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOpacity: 0.05,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 6,
//   },
//   photo: {
//     width: 64,
//     height: 64,
//     borderRadius: 32,
//     marginRight: 14,
//   },
//   info: {
//     flex: 1,
//     justifyContent: 'center',
//   },
//   name: {
//     fontSize: 17,
//     fontWeight: '600',
//     color: '#003366',
//   },
//   details: {
//     fontSize: 14,
//     color: '#555',
//     marginTop: 2,
//   },
//   time: {
//     fontSize: 12,
//     color: '#999',
//     marginTop: 2,
//   },
//   status: {
//     marginTop: 6,
//     fontWeight: '600',
//     fontSize: 13,
//     paddingHorizontal: 10,
//     paddingVertical: 4,
//     borderRadius: 8,
//     alignSelf: 'flex-start',
//     overflow: 'hidden',
//   },
//   checkedIn: {
//     backgroundColor: '#d1f2eb',
//     color: '#1e8449',
//   },
//   checkedOut: {
//     backgroundColor: '#f9e79f',
//     color: '#b9770e',
//   },
//   outButton: {
//     backgroundColor: '#ff4757',
//     paddingHorizontal: 10,
//     paddingVertical: 6,
//     borderRadius: 8,
//     marginLeft: 10,
//   },
//   outText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
// });


// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
//   TextInput,
//   ActivityIndicator,
//   Image,
//   Alert,
// } from 'react-native';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// // Replace this with your actual RTK Query hook
// // import { useGetVisitorsQuery } from '../api/visitorsApi';

// const AdminDashboardScreen = () => {
//   const [search, setSearch] = useState('');
//   const [branch, setBranch] = useState('All');
//   const [startDate, setStartDate] = useState(new Date(Date.now() - 180 * 86400000)); // last 180 days
//   const [endDate, setEndDate] = useState(new Date());
//   const [showStartPicker, setShowStartPicker] = useState(false);
//   const [showEndPicker, setShowEndPicker] = useState(false);

//   // Dummy data to simulate visitor list
//   const visitors = [
//     {
//       id: '1',
//       name: 'John Doe',
//       mobile: '9876543210',
//       company: 'ABC Ltd',
//       purpose: 'Meeting',
//       checkIn: '2025-07-02 10:15',
//       checkOut: '2025-07-02 11:30',
//       branch: 'Bangalore Plant',
//       photo: 'https://randomuser.me/api/portraits/men/1.jpg',
//     },
//     {
//       id: '2',
//       name: 'Jane Smith',
//       mobile: '9123456789',
//       company: 'XYZ Corp',
//       purpose: 'Inspection',
//       checkIn: '2025-07-01 09:45',
//       checkOut: null,
//       branch: 'Corporate Office',
//       photo: 'https://randomuser.me/api/portraits/women/2.jpg',
//     },
//   ];

//   const filteredVisitors = visitors.filter(
//     v =>
//       (!search || v.name.toLowerCase().includes(search.toLowerCase())) &&
//       (branch === 'All' || v.branch === branch)
//   );

//   const handleExport = () => {
//     Alert.alert('Export', 'Export to Excel coming soon.');
//   };

//   const renderVisitor = ({ item }: any) => (
//     <View style={styles.card}>
//       <Image source={{ uri: item.photo }} style={styles.photo} />
//       <View style={styles.details}>
//         <Text style={styles.name}>{item.name}</Text>
//         <Text>Company: {item.company}</Text>
//         <Text>Purpose: {item.purpose}</Text>
//         <Text>Check-In: {item.checkIn}</Text>
//         <Text>Check-Out: {item.checkOut || 'Not Checked Out'}</Text>
//         <Text>Branch: {item.branch}</Text>
//       </View>
//     </View>
//   );

//   return (
//     <SafeAreaView style={styles.safe}>
//       {/* <View style={styles.header}>
//         <Text style={styles.headerText}>Admin Dashboard</Text>
//         <TouchableOpacity onPress={handleExport}>
//           <Icon name="file-excel" size={26} color="#fff" />
//         </TouchableOpacity>
//       </View> */}
//       <View style={styles.header}>
//         <Text style={styles.headerText}>Admin Dashboard</Text>
//         <View style={{ flexDirection: 'row', gap: 16 }}>
//           <TouchableOpacity >
//             <Icon name="cog-outline" size={24} color="#fff" />
//           </TouchableOpacity>
//           <TouchableOpacity >
//             <Icon name="logout" size={24} color="#fff" />
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* Search & Filter */}
//       <View style={styles.filterContainer}>
//         <TextInput
//           style={styles.searchInput}
//           placeholder="Search by name..."
//           value={search}
//           onChangeText={setSearch}
//         />

//         <TouchableOpacity style={styles.dateBtn} onPress={() => setShowStartPicker(true)}>
//           <Text>From: {startDate.toDateString()}</Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.dateBtn} onPress={() => setShowEndPicker(true)}>
//           <Text>To: {endDate.toDateString()}</Text>
//         </TouchableOpacity>

//         {showStartPicker && (
//           <DateTimePicker
//             value={startDate}
//             mode="date"
//             display="default"
//             onChange={(_, date) => {
//               setShowStartPicker(false);
//               if (date) setStartDate(date);
//             }}
//           />
//         )}

//         {showEndPicker && (
//           <DateTimePicker
//             value={endDate}
//             mode="date"
//             display="default"
//             onChange={(_, date) => {
//               setShowEndPicker(false);
//               if (date) setEndDate(date);
//             }}
//           />
//         )}

//         {/* Branch Picker (you can enhance this with a dropdown) */}
//         <Text style={{ marginTop: 10, fontWeight: 'bold' }}>Branch:</Text>
//         <View style={styles.branchRow}>
//           {['All', 'Corporate Office', 'Bangalore Plant'].map(b => (
//             <TouchableOpacity
//               key={b}
//               style={[
//                 styles.branchButton,
//                 branch === b && styles.branchSelected,
//               ]}
//               onPress={() => setBranch(b)}
//             >
//               <Text style={branch === b ? styles.branchTextSelected : styles.branchText}>
//                 {b}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </View>
//       </View>

//       {/* Visitor List */}
//       <FlatList
//         data={filteredVisitors}
//         keyExtractor={item => item.id}
//         renderItem={renderVisitor}
//         ListEmptyComponent={
//           <Text style={{ textAlign: 'center', marginTop: 40 }}>
//             No visitors found.
//           </Text>
//         }
//       />
//     </SafeAreaView>
//   );
// };

// export default AdminDashboardScreen;

// const styles = StyleSheet.create({
//   safe: {
//     flex: 1,
//     backgroundColor: '#f0f6ff',
//   },
//   header: {
//     backgroundColor: '#003366',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     padding: 16,
//     alignItems: 'center',
//   },
//   headerText: {
//     fontSize: 20,
//     color: 'white',
//     fontWeight: 'bold',
//   },
//   filterContainer: {
//     padding: 16,
//     backgroundColor: '#fff',
//   },
//   searchInput: {
//     borderWidth: 1,
//     borderColor: '#aaa',
//     borderRadius: 8,
//     paddingHorizontal: 12,
//     marginBottom: 10,
//     height: 45,
//   },
//   dateBtn: {
//     paddingVertical: 6,
//     marginVertical: 4,
//   },
//   branchRow: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     gap: 10,
//     marginTop: 6,
//   },
//   branchButton: {
//     paddingVertical: 6,
//     paddingHorizontal: 12,
//     backgroundColor: '#eee',
//     borderRadius: 8,
//     marginRight: 8,
//     marginTop: 4,
//   },
//   branchSelected: {
//     backgroundColor: '#003366',
//   },
//   branchText: {
//     color: '#000',
//   },
//   branchTextSelected: {
//     color: '#fff',
//   },
//   card: {
//     backgroundColor: '#fff',
//     margin: 10,
//     padding: 14,
//     borderRadius: 10,
//     flexDirection: 'row',
//     elevation: 2,
//   },
//   photo: {
//     width: 64,
//     height: 64,
//     borderRadius: 8,
//     marginRight: 12,
//   },
//   details: {
//     flex: 1,
//   },
//   name: {
//     fontWeight: 'bold',
//     fontSize: 16,
//     marginBottom: 4,
//   },
// });


import { View, Text } from 'react-native'
import React from 'react'

const AdminDashboardScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>AdminDashboardScreen</Text>
    </View>
  )
}

export default AdminDashboardScreen