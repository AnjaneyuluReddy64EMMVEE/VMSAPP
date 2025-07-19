// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
//   Image,
//   Platform,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// // import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
// import DateTimePicker from '@react-native-community/datetimepicker';

// const VisitorsScreen = () => {
//   const [searchDate, setSearchDate] = useState(new Date());
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [phone, setPhone] = useState('');
//   const [badge, setBadge] = useState('');
//   const [statusFilter, setStatusFilter] = useState('All');

//   const visitorData = [
//   {
//     id: '1',
//     name: 'Jane Doe',
//     phone: '9876543210',
//     email: 'jane@example.com',
//     badge: 'BG123',
//     status: 'Checked In',
//     purpose: 'Meeting',
//     personToMeet: 'John Smith',
//     inTime: '10:00 AM',
//     outTime: '11:30 AM',
//     avatar: 'https://cdn-icons-png.flaticon.com/512/194/194938.png',
//   },
//   {
//     id: '2',
//     name: 'Ram Kumar',
//     phone: '9987655432',
//     email: 'ram@example.com',
//     badge: 'BG124',
//     status: 'Checked Out',
//     purpose: 'Maintenance',
//     personToMeet: 'Jane Smith',
//     inTime: '09:30 AM',
//     outTime: '10:30 AM',
//     avatar: 'https://cdn-icons-png.flaticon.com/512/194/194938.png',
//   },
//   {
//     id: '3',
//     name: 'Priya Sharma',
//     phone: '9012345678',
//     email: 'priya@example.com',
//     badge: 'BG125',
//     status: 'Checked In',
//     purpose: 'Site Visit',
//     personToMeet: 'Robert Singh',
//     inTime: '11:00 AM',
//     outTime: '12:15 PM',
//     avatar: 'https://cdn-icons-png.flaticon.com/512/194/194937.png',
//   },
//   {
//     id: '4',
//     name: 'Amit Verma',
//     phone: '9023456781',
//     email: 'amit@example.com',
//     badge: 'BG126',
//     status: 'Checked Out',
//     purpose: 'Interview',
//     personToMeet: 'Emily Clark',
//     inTime: '08:45 AM',
//     outTime: '09:30 AM',
//     avatar: 'https://cdn-icons-png.flaticon.com/512/194/194938.png',
//   },
//   {
//     id: '5',
//     name: 'Sneha Roy',
//     phone: '9034567892',
//     email: 'sneha@example.com',
//     badge: 'BG127',
//     status: 'Checked In',
//     purpose: 'Meeting',
//     personToMeet: 'John Smith',
//     inTime: '10:30 AM',
//     outTime: '11:30 AM',
//     avatar: 'https://cdn-icons-png.flaticon.com/512/194/194937.png',
//   },
//   {
//     id: '6',
//     name: 'Rahul Gupta',
//     phone: '9045678903',
//     email: 'rahul@example.com',
//     badge: 'BG128',
//     status: 'Checked Out',
//     purpose: 'Maintenance',
//     personToMeet: 'Robert Singh',
//     inTime: '09:00 AM',
//     outTime: '10:00 AM',
//     avatar: 'https://cdn-icons-png.flaticon.com/512/194/194938.png',
//   },
//   {
//     id: '7',
//     name: 'Nisha Mehta',
//     phone: '9056789014',
//     email: 'nisha@example.com',
//     badge: 'BG129',
//     status: 'Checked In',
//     purpose: 'Interview',
//     personToMeet: 'Emily Clark',
//     inTime: '11:45 AM',
//     outTime: '12:30 PM',
//     avatar: 'https://cdn-icons-png.flaticon.com/512/194/194937.png',
//   },
//   {
//     id: '8',
//     name: 'Kiran Rao',
//     phone: '9067890125',
//     email: 'kiran@example.com',
//     badge: 'BG130',
//     status: 'Checked In',
//     purpose: 'Meeting',
//     personToMeet: 'John Smith',
//     inTime: '09:30 AM',
//     outTime: '10:30 AM',
//     avatar: 'https://cdn-icons-png.flaticon.com/512/194/194938.png',
//   },
//   {
//     id: '9',
//     name: 'Divya Menon',
//     phone: '9078901236',
//     email: 'divya@example.com',
//     badge: 'BG131',
//     status: 'Checked Out',
//     purpose: 'Site Visit',
//     personToMeet: 'Robert Singh',
//     inTime: '10:00 AM',
//     outTime: '11:00 AM',
//     avatar: 'https://cdn-icons-png.flaticon.com/512/194/194937.png',
//   },
//   {
//     id: '10',
//     name: 'Manoj Nair',
//     phone: '9089012347',
//     email: 'manoj@example.com',
//     badge: 'BG132',
//     status: 'Checked In',
//     purpose: 'Interview',
//     personToMeet: 'Emily Clark',
//     inTime: '08:30 AM',
//     outTime: '09:30 AM',
//     avatar: 'https://cdn-icons-png.flaticon.com/512/194/194938.png',
//   },
//   {
//     id: '11',
//     name: 'Anita Dey',
//     phone: '9090123458',
//     email: 'anita@example.com',
//     badge: 'BG133',
//     status: 'Checked Out',
//     purpose: 'Meeting',
//     personToMeet: 'John Smith',
//     inTime: '11:00 AM',
//     outTime: '12:00 PM',
//     avatar: 'https://cdn-icons-png.flaticon.com/512/194/194937.png',
//   },
//   {
//     id: '12',
//     name: 'Suresh Reddy',
//     phone: '9101234569',
//     email: 'suresh@example.com',
//     badge: 'BG134',
//     status: 'Checked In',
//     purpose: 'Maintenance',
//     personToMeet: 'Robert Singh',
//     inTime: '10:15 AM',
//     outTime: '11:15 AM',
//     avatar: 'https://cdn-icons-png.flaticon.com/512/194/194938.png',
//   },
//   {
//     id: '13',
//     name: 'Meena Iyer',
//     phone: '9112345670',
//     email: 'meena@example.com',
//     badge: 'BG135',
//     status: 'Checked Out',
//     purpose: 'Site Visit',
//     personToMeet: 'John Smith',
//     inTime: '09:45 AM',
//     outTime: '10:45 AM',
//     avatar: 'https://cdn-icons-png.flaticon.com/512/194/194937.png',
//   },
//   {
//     id: '14',
//     name: 'Vikas Sharma',
//     phone: '9123456781',
//     email: 'vikas@example.com',
//     badge: 'BG136',
//     status: 'Checked In',
//     purpose: 'Meeting',
//     personToMeet: 'Emily Clark',
//     inTime: '10:00 AM',
//     outTime: '11:00 AM',
//     avatar: 'https://cdn-icons-png.flaticon.com/512/194/194938.png',
//   },
//   {
//     id: '15',
//     name: 'Reena Sen',
//     phone: '9134567892',
//     email: 'reena@example.com',
//     badge: 'BG137',
//     status: 'Checked Out',
//     purpose: 'Interview',
//     personToMeet: 'John Smith',
//     inTime: '09:30 AM',
//     outTime: '10:30 AM',
//     avatar: 'https://cdn-icons-png.flaticon.com/512/194/194937.png',
//   },
//   {
//     id: '16',
//     name: 'Arjun Patil',
//     phone: '9145678903',
//     email: 'arjun@example.com',
//     badge: 'BG138',
//     status: 'Checked In',
//     purpose: 'Maintenance',
//     personToMeet: 'Robert Singh',
//     inTime: '11:15 AM',
//     outTime: '12:15 PM',
//     avatar: 'https://cdn-icons-png.flaticon.com/512/194/194938.png',
//   },
//   {
//     id: '17',
//     name: 'Ritika Jain',
//     phone: '9156789014',
//     email: 'ritika@example.com',
//     badge: 'BG139',
//     status: 'Checked Out',
//     purpose: 'Site Visit',
//     personToMeet: 'Emily Clark',
//     inTime: '10:45 AM',
//     outTime: '11:45 AM',
//     avatar: 'https://cdn-icons-png.flaticon.com/512/194/194937.png',
//   },
//   {
//     id: '18',
//     name: 'Sunil Tiwari',
//     phone: '9167890125',
//     email: 'sunil@example.com',
//     badge: 'BG140',
//     status: 'Checked In',
//     purpose: 'Interview',
//     personToMeet: 'John Smith',
//     inTime: '09:00 AM',
//     outTime: '10:00 AM',
//     avatar: 'https://cdn-icons-png.flaticon.com/512/194/194938.png',
//   },
//   {
//     id: '19',
//     name: 'Kavita Joshi',
//     phone: '9178901236',
//     email: 'kavita@example.com',
//     badge: 'BG141',
//     status: 'Checked Out',
//     purpose: 'Meeting',
//     personToMeet: 'Robert Singh',
//     inTime: '10:30 AM',
//     outTime: '11:30 AM',
//     avatar: 'https://cdn-icons-png.flaticon.com/512/194/194937.png',
//   },
//   {
//     id: '20',
//     name: 'Deepak Singh',
//     phone: '9189012347',
//     email: 'deepak@example.com',
//     badge: 'BG142',
//     status: 'Checked In',
//     purpose: 'Maintenance',
//     personToMeet: 'Emily Clark',
//     inTime: '11:00 AM',
//     outTime: '12:00 PM',
//     avatar: 'https://cdn-icons-png.flaticon.com/512/194/194938.png',
//   },
// ];

//   const filteredVisitors = visitorData.filter(visitor => {
//     return (
//       (statusFilter === 'All' || visitor.status === statusFilter) &&
//       visitor.phone.includes(phone) &&
//       visitor.badge.includes(badge)
//     );
//   });

//   const renderVisitor = ({ item }:any) => (
//     <View style={styles.card}>
//       <Image source={{ uri: item.avatar }} style={styles.avatar} />
//       <View style={styles.details}>
//         <Text style={styles.name}>{item.name}</Text>
//         <Text style={styles.text}>{item.phone}</Text>
//         <Text style={styles.text}>{item.email}</Text>
//         <Text style={styles.text}>Badge: {item.badge}</Text>
//       </View>
//       <View style={styles.rightSection}>
//         <Text
//           style={[
//             styles.status,
//             item.status === 'Checked In'
//               ? styles.statusIn
//               : styles.statusOut,
//           ]}
//         >
//           {item.status}
//         </Text>
//         <Text style={styles.text}>Purpose: {item.purpose}</Text>
//         <Text style={styles.text}>To Meet: {item.personToMeet}</Text>
//         <Text style={styles.text}>
//           {item.inTime} - {item.outTime}
//         </Text>
//         <TouchableOpacity style={styles.viewButton}>
//           <Text style={styles.viewText}>View</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );

//   return (
//     <SafeAreaView style={styles.safe}>
//       <View style={styles.container}>
//         <Text style={styles.heading}>Visitor List</Text>

//         {/* Filters */}
//         <View style={styles.filters}>
//           <TouchableOpacity
//             onPress={() => setShowDatePicker(true)}
//             style={styles.filterInput}
//           >
//             <Text>{searchDate.toLocaleDateString()}</Text>
//             {/* <Ionicons name="calendar-outline" size={20} color="#666" /> */}
//           </TouchableOpacity>

//           {showDatePicker && (
//             <DateTimePicker
//               value={searchDate}
//               mode="date"
//               display="default"
//               onChange={(e, selectedDate) => {
//                 setShowDatePicker(false);
//                 if (selectedDate) setSearchDate(selectedDate);
//               }}
//             />
//           )}

//           <TextInput
//             style={styles.filterInput}
//             placeholder="Phone Number"
//             keyboardType="phone-pad"
//             value={phone}
//             onChangeText={setPhone}
//           />
//           <TextInput
//             style={styles.filterInput}
//             placeholder="Badge No"
//             value={badge}
//             onChangeText={setBadge}
//           />
//           <TouchableOpacity
//             style={styles.filterInput}
//             onPress={() =>
//               setStatusFilter(prev =>
//                 prev === 'All' ? 'Checked In' : prev === 'Checked In' ? 'Checked Out' : 'All'
//               )
//             }
//           >
//             <Text>{statusFilter}</Text>
//             {/* <MaterialCommunityIcons name="filter" size={20} color="#666" /> */}
//           </TouchableOpacity>
//         </View>

//         {/* Visitor List */}
//         <FlatList
//           data={filteredVisitors}
//           renderItem={renderVisitor}
//           keyExtractor={item => item.id}
//           contentContainerStyle={{ paddingBottom: 100 }}
//         />
//       </View>
//     </SafeAreaView>
//   );
// };

// export default VisitorsScreen;

// const styles = StyleSheet.create({
//   safe: {
//     flex: 1,
//     backgroundColor: '#f9fbfd',
//   },
//   container: {
//     flex: 1,
//     padding: 16,
//   },
//   heading: {
//     fontSize: 22,
//     fontWeight: '700',
//     marginBottom: 12,
//   },
//   filters: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     gap: 10,
//     marginBottom: 12,
//   },
//   filterInput: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 6,
//     backgroundColor: '#fff',
//     padding: 10,
//     borderRadius: 8,
//     flexGrow: 1,
//     minWidth: '45%',
//     elevation: 2,
//   },
//   card: {
//     backgroundColor: '#fff',
//     flexDirection: 'row',
//     borderRadius: 12,
//     padding: 12,
//     marginBottom: 10,
//     elevation: 2,
//   },
//   avatar: {
//     width: 44,
//     height: 44,
//     borderRadius: 22,
//     marginRight: 10,
//   },
//   details: {
//     flex: 1,
//   },
//   rightSection: {
//     flex: 1.2,
//     alignItems: 'flex-end',
//   },
//   name: {
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   text: {
//     fontSize: 12,
//     color: '#444',
//   },
//   status: {
//     fontWeight: '600',
//     paddingVertical: 4,
//     paddingHorizontal: 10,
//     borderRadius: 12,
//     fontSize: 12,
//     marginBottom: 4,
//     overflow: 'hidden',
//   },
//   statusIn: {
//     backgroundColor: '#ccf5d3',
//     color: '#2e7d32',
//   },
//   statusOut: {
//     backgroundColor: '#ffeeba',
//     color: '#8d6e63',
//   },
//   viewButton: {
//     marginTop: 6,
//     backgroundColor: '#007bff',
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     borderRadius: 8,
//   },
//   viewText: {
//     color: 'white',
//     fontWeight: '600',
//     fontSize: 12,
//   },
// });

// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
//   Image,
//   Modal,
//   Platform,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import { format } from 'date-fns';

// import { showErrorMessage } from '../../utils/Globals';
// import Header from '../../components/Header';

// const VisitorsScreen = () => {
//   const [searchDate, setSearchDate] = useState(new Date());
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [phone, setPhone] = useState('');
//   const [badge, setBadge] = useState('');
//   const [statusFilter, setStatusFilter] = useState('All');
//   const [modalVisible, setModalVisible] = useState(false);
//   const [selectedVisitor, setSelectedVisitor] = useState(null);
//   const [modalBadge, setModalBadge] = useState('');
//   const [modalStatus, setModalStatus] = useState('Pending');

//   const [visitorData, setVisitorData] = useState([
//     {
//       id: '1',
//       name: 'Jane Doe',
//       phone: '9876543210',
//       email: 'jane@example.com',
//       badge: '',
//       location: 'Airport Office',
//       status: 'Pending',
//       purpose: 'Meeting',
//       personToMeet: 'John Smith',
//       inTime: '',
//       outTime: '',
//       avatar: 'https://cdn-icons-png.flaticon.com/512/194/194938.png',
//       govtIdUrl: 'https://cdn-icons-png.flaticon.com/512/847/847969.png',
//     },
//     {
//       id: '2',
//       name: 'Ravi Kumar',
//       phone: '9988776655',
//       email: 'ravi@example.com',
//       badge: '',
//       location: 'Headquarters',
//       status: 'Pending',
//       purpose: 'Site Visit',
//       personToMeet: 'Anita Sharma',
//       inTime: '',
//       outTime: '',
//       avatar: 'https://cdn-icons-png.flaticon.com/512/194/194938.png',
//       govtIdUrl: 'https://cdn-icons-png.flaticon.com/512/2910/2910768.png',
//     },
//     {
//       id: '3',
//       name: 'Priya Sen',
//       phone: '9123456780',
//       email: 'priya@example.com',
//       badge: '',
//       location: 'Solar Plant',
//       status: 'Pending',
//       purpose: 'Interview',
//       personToMeet: 'Manish Patel',
//       inTime: '',
//       outTime: '',
//       avatar: 'https://cdn-icons-png.flaticon.com/512/194/194937.png',
//       govtIdUrl: 'https://cdn-icons-png.flaticon.com/512/848/848043.png',
//     },
//     {
//       id: '4',
//       name: 'Sunil Mehra',
//       phone: '9090909090',
//       email: 'sunil@example.com',
//       badge: '',
//       location: 'Factory Gate 1',
//       status: 'Pending',
//       purpose: 'Delivery',
//       personToMeet: 'Logistics Team',
//       inTime: '',
//       outTime: '',
//       avatar: 'https://cdn-icons-png.flaticon.com/512/194/194938.png',
//       govtIdUrl: 'https://cdn-icons-png.flaticon.com/512/4341/4341094.png',
//     },
//     {
//       id: '5',
//       name: 'Meena Reddy',
//       phone: '9871234567',
//       email: 'meena@example.com',
//       badge: '',
//       location: 'Admin Block',
//       status: 'Pending',
//       purpose: 'Maintenance',
//       personToMeet: 'Rajesh Iyer',
//       inTime: '',
//       outTime: '',
//       avatar: 'https://cdn-icons-png.flaticon.com/512/194/194937.png',
//       govtIdUrl: 'https://cdn-icons-png.flaticon.com/512/2907/2907511.png',
//     },
//     {
//       id: '6',
//       name: 'Amit Sinha',
//       phone: '9812345678',
//       email: 'amit@example.com',
//       badge: '',
//       location: 'Warehouse',
//       status: 'Pending',
//       purpose: 'Audit',
//       personToMeet: 'Nisha Jain',
//       inTime: '',
//       outTime: '',
//       avatar: 'https://cdn-icons-png.flaticon.com/512/194/194938.png',
//       govtIdUrl: 'https://cdn-icons-png.flaticon.com/512/2910/2910768.png',
//     },
//     {
//       id: '7',
//       name: 'Sneha Kapoor',
//       phone: '9765432109',
//       email: 'sneha@example.com',
//       badge: '',
//       location: 'Airport Office',
//       status: 'Pending',
//       purpose: 'Client Visit',
//       personToMeet: 'Arun Khanna',
//       inTime: '',
//       outTime: '',
//       avatar: 'https://cdn-icons-png.flaticon.com/512/194/194937.png',
//       govtIdUrl: 'https://cdn-icons-png.flaticon.com/512/2910/2910768.png',
//     },
//     {
//       id: '8',
//       name: 'Kunal Das',
//       phone: '9654321098',
//       email: 'kunal@example.com',
//       badge: '',
//       location: 'Control Room',
//       status: 'Pending',
//       purpose: 'IT Support',
//       personToMeet: 'IT Admin',
//       inTime: '',
//       outTime: '',
//       avatar: 'https://cdn-icons-png.flaticon.com/512/194/194938.png',
//       govtIdUrl: 'https://cdn-icons-png.flaticon.com/512/847/847969.png',
//     },
//     {
//       id: '9',
//       name: 'Lavanya Mishra',
//       phone: '9543210987',
//       email: 'lavanya@example.com',
//       badge: '',
//       location: 'Main Office',
//       status: 'Pending',
//       purpose: 'Demo Presentation',
//       personToMeet: 'Product Team',
//       inTime: '',
//       outTime: '',
//       avatar: 'https://cdn-icons-png.flaticon.com/512/194/194937.png',
//       govtIdUrl: 'https://cdn-icons-png.flaticon.com/512/848/848043.png',
//     },
//     {
//       id: '10',
//       name: 'Gaurav Jain',
//       phone: '9432109876',
//       email: 'gaurav@example.com',
//       badge: '',
//       location: 'Corporate Lobby',
//       status: 'Pending',
//       purpose: 'Board Meeting',
//       personToMeet: 'CEO Office',
//       inTime: '',
//       outTime: '',
//       avatar: 'https://cdn-icons-png.flaticon.com/512/194/194938.png',
//       govtIdUrl: 'https://cdn-icons-png.flaticon.com/512/2910/2910768.png',
//     },
//   ]);

//   const filteredVisitors = visitorData.filter(visitor => {
//     return (
//       (statusFilter === 'All' || visitor.status === statusFilter) &&
//       visitor.phone.includes(phone) &&
//       visitor.badge.includes(badge)
//     );
//   });

//   const handleView = visitor => {
//     setSelectedVisitor(visitor);
//     setModalBadge(visitor.badge);
//     setModalStatus(visitor.status);
//     setModalVisible(true);
//   };

//   const handleUpdate = () => {
//     const updated = visitorData.map(v => {
//       if (v.id === selectedVisitor.id) {
//         let updatedVisitor = { ...v, badge: modalBadge, status: modalStatus };

//         if (modalStatus === 'Checked In' && v.status === 'Pending') {
//           updatedVisitor.inTime = format(new Date(), 'hh:mm a');
//         }

//         if (modalStatus === 'Checked Out' && v.status === 'Checked In') {
//           updatedVisitor.outTime = format(new Date(), 'hh:mm a');
//         }

//         return updatedVisitor;
//       }
//       return v;
//     });
//     setVisitorData(updated);
//     setModalVisible(false);
//   };

//   const renderVisitor = ({ item }) => (
//     <View style={styles.card}>
//       <Image source={{ uri: item.avatar }} style={styles.avatar} />
//       <View style={styles.details}>
//         <Text style={styles.name}>{item.name}</Text>
//         <Text style={styles.text}>{item.phone}</Text>
//         <Text style={styles.text}>{item.email}</Text>
//         <Text style={styles.text}>Badge: {item.badge || 'N/A'}</Text>
//         <Text style={styles.text}>Location: {item.location}</Text>
//       </View>
//       <View style={styles.rightSection}>
//         <Text
//           style={[
//             styles.status,
//             item.status === 'Pending'
//               ? styles.statusPending
//               : item.status === 'Checked In'
//               ? styles.statusIn
//               : styles.statusOut,
//           ]}
//         >
//           {item.status}
//         </Text>
//         <Text style={styles.text}>Purpose: {item.purpose}</Text>
//         <Text style={styles.text}>To Meet: {item.personToMeet}</Text>
//         <Text style={styles.text}>
//           {item.inTime} - {item.outTime || 'N/A'}
//         </Text>
//         <TouchableOpacity
//           style={styles.viewButton}
//           onPress={() => handleView(item)}
//         >
//           <Text style={styles.viewText}>View</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );

//   useEffect(() => {
//     console.log('Visitor Data Updated:', visitorData);

//     showErrorMessage({
//       message: 'fetched visitor data successfully',
//       duration: 3000,
//     });
//   }, []);

//   return (
//     <SafeAreaView style={styles.safe}>
//       <View style={styles.container}>
//         {/* <Header screenName="Visitor List" showGoBack /> */}
//         <Header title="Visitor" showBackButton />

//         {/* Filters */}
//         <View style={styles.filters}>
//           <TouchableOpacity
//             onPress={() => setShowDatePicker(true)}
//             style={styles.filterInput}
//           >
//             <Text>{searchDate.toLocaleDateString()}</Text>
//           </TouchableOpacity>

//           {showDatePicker && (
//             <DateTimePicker
//               value={searchDate}
//               mode="date"
//               display="default"
//               onChange={(e, selectedDate) => {
//                 setShowDatePicker(false);
//                 if (selectedDate) setSearchDate(selectedDate);
//               }}
//             />
//           )}

//           <TextInput
//             style={styles.filterInput}
//             placeholder="Phone Number"
//             keyboardType="phone-pad"
//             value={phone}
//             onChangeText={setPhone}
//           />
//           <TextInput
//             style={styles.filterInput}
//             placeholder="Badge No"
//             value={badge}
//             onChangeText={setBadge}
//           />
//           <TouchableOpacity
//             style={styles.filterInput}
//             onPress={() =>
//               setStatusFilter(prev =>
//                 prev === 'All'
//                   ? 'Pending'
//                   : prev === 'Pending'
//                   ? 'Checked In'
//                   : prev === 'Checked In'
//                   ? 'Checked Out'
//                   : 'All',
//               )
//             }
//           >
//             <Text>{statusFilter}</Text>
//           </TouchableOpacity>
//         </View>

//         <FlatList
//           data={filteredVisitors}
//           renderItem={renderVisitor}
//           keyExtractor={item => item.id}
//           contentContainerStyle={{ paddingBottom: 100 }}
//         />

//         {/* Modal */}
//         <Modal visible={modalVisible} transparent animationType="slide">
//           <View style={styles.modalContainer}>
//             <View style={styles.modalContent}>
//               <Text style={styles.modalTitle}>Update Visitor</Text>
//               <TextInput
//                 placeholder="Badge Number"
//                 style={styles.modalInput}
//                 value={modalBadge}
//                 onChangeText={setModalBadge}
//               />
//               <TouchableOpacity
//                 style={styles.statusDropdown}
//                 onPress={() => {
//                   if (modalStatus === 'Pending') setModalStatus('Checked In');
//                   else if (modalStatus === 'Checked In')
//                     setModalStatus('Checked Out');
//                 }}
//               >
//                 <Text>{modalStatus}</Text>
//               </TouchableOpacity>

//               <TouchableOpacity
//                 style={styles.saveButton}
//                 onPress={handleUpdate}
//               >
//                 <Text style={styles.saveText}>Save</Text>
//               </TouchableOpacity>
//               <TouchableOpacity onPress={() => setModalVisible(false)}>
//                 <Text style={{ color: 'red', marginTop: 10 }}>Cancel</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </Modal>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default VisitorsScreen;

// const styles = StyleSheet.create({
//   safe: { flex: 1, backgroundColor: '#f9fbfd' },
//   container: { flex: 1, padding: 16 },
//   heading: { fontSize: 22, fontWeight: '700', marginBottom: 12 },
//   filters: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     gap: 10,
//     marginBottom: 12,
//   },
//   filterInput: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 6,
//     backgroundColor: '#fff',
//     padding: 10,
//     borderRadius: 8,
//     flexGrow: 1,
//     minWidth: '45%',
//     elevation: 2,
//   },
//   card: {
//     backgroundColor: '#fff',
//     flexDirection: 'row',
//     borderRadius: 12,
//     padding: 12,
//     marginBottom: 10,
//     elevation: 2,
//   },
//   avatar: { width: 44, height: 44, borderRadius: 22, marginRight: 10 },
//   details: { flex: 1 },
//   rightSection: { flex: 1.2, alignItems: 'flex-end' },
//   name: { fontSize: 16, fontWeight: '600' },
//   text: { fontSize: 12, color: '#444' },
//   status: {
//     fontWeight: '600',
//     paddingVertical: 4,
//     paddingHorizontal: 10,
//     borderRadius: 12,
//     fontSize: 12,
//     marginBottom: 4,
//   },
//   statusIn: { backgroundColor: '#ccf5d3', color: '#2e7d32' },
//   statusOut: { backgroundColor: '#ffeeba', color: '#8d6e63' },
//   statusPending: { backgroundColor: '#ffe0e0', color: '#c62828' },
//   viewButton: {
//     marginTop: 6,
//     backgroundColor: '#007bff',
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     borderRadius: 8,
//   },
//   viewText: { color: 'white', fontWeight: '600', fontSize: 12 },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0,0,0,0.5)',
//   },
//   modalContent: {
//     width: '80%',
//     backgroundColor: '#fff',
//     padding: 20,
//     borderRadius: 10,
//     elevation: 10,
//   },
//   modalTitle: { fontSize: 18, fontWeight: '600', marginBottom: 12 },
//   modalInput: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     padding: 10,
//     borderRadius: 6,
//     marginBottom: 12,
//   },
//   statusDropdown: {
//     backgroundColor: '#f2f2f2',
//     padding: 10,
//     borderRadius: 6,
//     marginBottom: 12,
//   },
//   saveButton: {
//     backgroundColor: '#28a745',
//     padding: 12,
//     borderRadius: 6,
//   },
//   saveText: { color: '#fff', textAlign: 'center', fontWeight: '600' },
// });

// import React, { useState, useEffect } from 'react';
// import { View, FlatList, SafeAreaView } from 'react-native';
// import { format } from 'date-fns';
// import Header from '../../components/Header';
// import { showErrorMessage } from '../../utils/Globals';
// import VisitorFilterBar from '../../components/VisitorFilterBar';
// import UpdateVisitorModal from '../../components/UpdateVisitorModal';
// import VisitorCard from '../../components/VisitorCard';

// const VisitorsScreen = () => {
//   const [visitorData, setVisitorData] = useState([
//     {
//       id: '1',
//       name: 'Jane Doe',
//       phone: '9876543210',
//       email: 'jane@example.com',
//       badge: '',
//       location: 'Airport Office',
//       status: 'Pending',
//       purpose: 'Meeting',
//       personToMeet: 'John Smith',
//       inTime: '',
//       outTime: '',
//       avatar: 'https://cdn-icons-png.flaticon.com/512/194/194938.png',
//       govtIdUrl: 'https://cdn-icons-png.flaticon.com/512/847/847969.png',
//     },
//     {
//       id: '2',
//       name: 'Ravi Kumar',
//       phone: '9988776655',
//       email: 'ravi@example.com',
//       badge: '',
//       location: 'Headquarters',
//       status: 'Pending',
//       purpose: 'Site Visit',
//       personToMeet: 'Anita Sharma',
//       inTime: '',
//       outTime: '',
//       avatar: 'https://cdn-icons-png.flaticon.com/512/194/194938.png',
//       govtIdUrl: 'https://cdn-icons-png.flaticon.com/512/2910/2910768.png',
//     },
//     {
//       id: '3',
//       name: 'Priya Sen',
//       phone: '9123456780',
//       email: 'priya@example.com',
//       badge: '',
//       location: 'Solar Plant',
//       status: 'Pending',
//       purpose: 'Interview',
//       personToMeet: 'Manish Patel',
//       inTime: '',
//       outTime: '',
//       avatar: 'https://cdn-icons-png.flaticon.com/512/194/194937.png',
//       govtIdUrl: 'https://cdn-icons-png.flaticon.com/512/848/848043.png',
//     },
//     {
//       id: '4',
//       name: 'Sunil Mehra',
//       phone: '9090909090',
//       email: 'sunil@example.com',
//       badge: '',
//       location: 'Factory Gate 1',
//       status: 'Pending',
//       purpose: 'Delivery',
//       personToMeet: 'Logistics Team',
//       inTime: '',
//       outTime: '',
//       avatar: 'https://cdn-icons-png.flaticon.com/512/194/194938.png',
//       govtIdUrl: 'https://cdn-icons-png.flaticon.com/512/4341/4341094.png',
//     },
//     {
//       id: '5',
//       name: 'Meena Reddy',
//       phone: '9871234567',
//       email: 'meena@example.com',
//       badge: '',
//       location: 'Admin Block',
//       status: 'Pending',
//       purpose: 'Maintenance',
//       personToMeet: 'Rajesh Iyer',
//       inTime: '',
//       outTime: '',
//       avatar: 'https://cdn-icons-png.flaticon.com/512/194/194937.png',
//       govtIdUrl: 'https://cdn-icons-png.flaticon.com/512/2907/2907511.png',
//     },
//     {
//       id: '6',
//       name: 'Amit Sinha',
//       phone: '9812345678',
//       email: 'amit@example.com',
//       badge: '',
//       location: 'Warehouse',
//       status: 'Pending',
//       purpose: 'Audit',
//       personToMeet: 'Nisha Jain',
//       inTime: '',
//       outTime: '',
//       avatar: 'https://cdn-icons-png.flaticon.com/512/194/194938.png',
//       govtIdUrl: 'https://cdn-icons-png.flaticon.com/512/2910/2910768.png',
//     },
//     {
//       id: '7',
//       name: 'Sneha Kapoor',
//       phone: '9765432109',
//       email: 'sneha@example.com',
//       badge: '',
//       location: 'Airport Office',
//       status: 'Pending',
//       purpose: 'Client Visit',
//       personToMeet: 'Arun Khanna',
//       inTime: '',
//       outTime: '',
//       avatar: 'https://cdn-icons-png.flaticon.com/512/194/194937.png',
//       govtIdUrl: 'https://cdn-icons-png.flaticon.com/512/2910/2910768.png',
//     },
//     {
//       id: '8',
//       name: 'Kunal Das',
//       phone: '9654321098',
//       email: 'kunal@example.com',
//       badge: '',
//       location: 'Control Room',
//       status: 'Pending',
//       purpose: 'IT Support',
//       personToMeet: 'IT Admin',
//       inTime: '',
//       outTime: '',
//       avatar: 'https://cdn-icons-png.flaticon.com/512/194/194938.png',
//       govtIdUrl: 'https://cdn-icons-png.flaticon.com/512/847/847969.png',
//     },
//     {
//       id: '9',
//       name: 'Lavanya Mishra',
//       phone: '9543210987',
//       email: 'lavanya@example.com',
//       badge: '',
//       location: 'Main Office',
//       status: 'Pending',
//       purpose: 'Demo Presentation',
//       personToMeet: 'Product Team',
//       inTime: '',
//       outTime: '',
//       avatar: 'https://cdn-icons-png.flaticon.com/512/194/194937.png',
//       govtIdUrl: 'https://cdn-icons-png.flaticon.com/512/848/848043.png',
//     },
//     {
//       id: '10',
//       name: 'Gaurav Jain',
//       phone: '9432109876',
//       email: 'gaurav@example.com',
//       badge: '',
//       location: 'Corporate Lobby',
//       status: 'Pending',
//       purpose: 'Board Meeting',
//       personToMeet: 'CEO Office',
//       inTime: '',
//       outTime: '',
//       avatar: 'https://cdn-icons-png.flaticon.com/512/194/194938.png',
//       govtIdUrl: 'https://cdn-icons-png.flaticon.com/512/2910/2910768.png',
//     },
//   ]);
//   const [searchDate, setSearchDate] = useState(new Date());
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [phone, setPhone] = useState('');
//   const [badge, setBadge] = useState('');
//   const [statusFilter, setStatusFilter] = useState('All');

//   const [modalVisible, setModalVisible] = useState(false);
//   const [selectedVisitor, setSelectedVisitor] = useState(null);
//   const [modalBadge, setModalBadge] = useState('');
//   const [modalStatus, setModalStatus] = useState('Pending');

//   const filteredVisitors = visitorData.filter(visitor => {
//     return (
//       (statusFilter === 'All' || visitor.status === statusFilter) &&
//       visitor.phone.includes(phone) &&
//       visitor.badge.includes(badge)
//     );
//   });

//   const handleView = visitor => {
//     setSelectedVisitor(visitor);
//     setModalBadge(visitor.badge);
//     setModalStatus(visitor.status);
//     setModalVisible(true);
//   };

//   const handleUpdate = () => {
//     const updated = visitorData.map(v => {
//       if (v.id === selectedVisitor.id) {
//         const updatedVisitor = {
//           ...v,
//           badge: modalBadge,
//           status: modalStatus,
//           inTime:
//             modalStatus === 'Checked In' && v.status === 'Pending'
//               ? format(new Date(), 'hh:mm a')
//               : v.inTime,
//           outTime:
//             modalStatus === 'Checked Out' && v.status === 'Checked In'
//               ? format(new Date(), 'hh:mm a')
//               : v.outTime,
//         };
//         return updatedVisitor;
//       }
//       return v;
//     });

//     setVisitorData(updated);
//     setModalVisible(false);
//   };

//   // useEffect(() => {
//   //   showErrorMessage({
//   //     message: 'Fetched visitor data successfully',
//   //     duration: 3000,
//   //   });
//   // }, []);

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: '#f9fbfd' }}>
//       <View style={{ flex: 1, padding: 16 }}>
//         <Header title="Visitor" showBackButton />

//         <VisitorFilterBar
//           searchDate={searchDate}
//           setSearchDate={setSearchDate}
//           showDatePicker={showDatePicker}
//           setShowDatePicker={setShowDatePicker}
//           phone={phone}
//           setPhone={setPhone}
//           badge={badge}
//           setBadge={setBadge}
//           statusFilter={statusFilter}
//           setStatusFilter={setStatusFilter}
//         />

//         <FlatList
//           data={filteredVisitors}
//           renderItem={({ item }) => <VisitorCard item={item} onView={handleView} />}
//           keyExtractor={item => item.id}
//         />

//         <UpdateVisitorModal
//           visible={modalVisible}
//           onClose={() => setModalVisible(false)}
//           onSave={handleUpdate}
//           modalBadge={modalBadge}
//           setModalBadge={setModalBadge}
//           modalStatus={modalStatus}
//           setModalStatus={setModalStatus}
//         />
//       </View>
//     </SafeAreaView>
//   );
// };

// export default VisitorsScreen;

// import React, { useState } from 'react';
// import {
//   View,
//   FlatList,
//   SafeAreaView,
//   ActivityIndicator,
//   Text,
// } from 'react-native';

// import Header from '../../components/Header';
// import { showErrorMessage } from '../../utils/Globals';
// import VisitorFilterBar from '../../components/VisitorFilterBar';
// import UpdateVisitorModal from '../../components/UpdateVisitorModal';
// import VisitorCard from '../../components/VisitorCard';

// import { useGetVisitorsByBranchQuery } from '../../api';
// import { useAuth } from '../../contexts/AuthContext';

// const VisitorsScreen = () => {
//   const { userBranch } = useAuth();
//   const selectedBranch = userBranch || 'All';

//   const [searchDate, setSearchDate] = useState(new Date());
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [phone, setPhone] = useState('');
//   const [badge, setBadge] = useState('');
//   const [statusFilter, setStatusFilter] = useState('All');

//   const [modalVisible, setModalVisible] = useState(false);
//   const [selectedVisitor, setSelectedVisitor] = useState(null);
//   const [modalBadge, setModalBadge] = useState('');
//   const [modalStatus, setModalStatus] = useState('Pending');

//   const {
//     data: response,
//     isLoading,
//     refetch,
//   } = useGetVisitorsByBranchQuery('All'); // or use selectedBranch

//   const visitorData = response?.data || [];
//   console.log('visitorData', visitorData);
//   // ✅ Filtering logic
//   const filteredVisitors = visitorData.filter(visitor => {
//     const createdAtDate = new Date(visitor.createdAt).toDateString();
//     const selectedDate = new Date(searchDate).toDateString();

//     return (
//       (statusFilter === 'All' || visitor.status === statusFilter) &&
//       (visitor.phoneNumber?.toLowerCase().includes(phone.toLowerCase()) ??
//         true) &&
//       (visitor.badge?.toLowerCase().includes(badge.toLowerCase()) ?? true) &&
//       createdAtDate === selectedDate
//     );
//   });

//   const handleView = visitor => {
//     setSelectedVisitor(visitor);
//     setModalBadge(visitor.badge || '');
//     setModalStatus(visitor.status || 'Pending');
//     setModalVisible(true);
//   };

//   const handleUpdate = () => {
//     showErrorMessage({
//       message: 'Update feature should call backend!',
//       duration: 3000,
//     });
//     setModalVisible(false);
//   };

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: '#f9fbfd' }}>
//       <View style={{ flex: 1, padding: 16 }}>
//         <Header title="Visitor" showBackButton />

//         <VisitorFilterBar
//           searchDate={searchDate}
//           setSearchDate={setSearchDate}
//           showDatePicker={showDatePicker}
//           setShowDatePicker={setShowDatePicker}
//           phone={phone}
//           setPhone={setPhone}
//           badge={badge}
//           setBadge={setBadge}
//           statusFilter={statusFilter}
//           setStatusFilter={setStatusFilter}
//         />

//         {/* Optional visitor count */}
//         {!isLoading && (
//           <Text style={{ fontSize: 14, color: '#666', marginBottom: 8 }}>
//             Total Visitors: {filteredVisitors.length}
//           </Text>
//         )}

//         {isLoading ? (
//           <ActivityIndicator
//             size="large"
//             color="#003366"
//             style={{ marginTop: 50 }}
//           />
//         ) : filteredVisitors.length === 0 ? (
//           <Text style={{ textAlign: 'center', marginTop: 30, color: '#888' }}>
//             No visitors found for selected criteria.
//           </Text>
//         ) : (
//           <FlatList
//             data={filteredVisitors}
//             keyExtractor={item => item._id || item.id}
//             renderItem={({ item }) => (
//               <VisitorCard item={item} onView={handleView} />
//             )}
//             refreshing={isLoading}
//             onRefresh={refetch}
//             contentContainerStyle={{ paddingBottom: 20 }}
//           />
//         )}

//         <UpdateVisitorModal
//           visible={modalVisible}
//           onClose={() => setModalVisible(false)}
//           onSave={handleUpdate}
//           modalBadge={modalBadge}
//           setModalBadge={setModalBadge}
//           modalStatus={modalStatus}
//           setModalStatus={setModalStatus}
//         />
//       </View>
//     </SafeAreaView>
//   );
// };

// export default VisitorsScreen;

// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   FlatList,
//   SafeAreaView,
//   ActivityIndicator,
//   Text,
// } from 'react-native';

// import AsyncStorage from '@react-native-async-storage/async-storage';

// import Header from '../../components/Header';
// import { showErrorMessage } from '../../utils/Globals';
// import VisitorFilterBar from '../../components/VisitorFilterBar';
// import UpdateVisitorModal from '../../components/UpdateVisitorModal';
// import VisitorCard from '../../components/VisitorCard';

// import { useGetVisitorsByBranchQuery } from '../../api';

// const VisitorsScreen = () => {
//   const [selectedBranch, setSelectedBranch] = useState('All');
//   const [isBranchLoading, setIsBranchLoading] = useState(true);

//   // Filters
//   const [searchDate, setSearchDate] = useState(new Date());
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [phone, setPhone] = useState('');
//   const [badge, setBadge] = useState('');
//   const [statusFilter, setStatusFilter] = useState('All');

//   const [modalVisible, setModalVisible] = useState(false);
//   const [selectedVisitor, setSelectedVisitor] = useState(null);
//   const [modalBadge, setModalBadge] = useState('');
//   const [modalStatus, setModalStatus] = useState('Pending');

//   // 🚀 Fetch selected branch from AsyncStorage on mount
//   useEffect(() => {
//     const fetchBranch = async () => {
//       try {
//         const storedBranch = await AsyncStorage.getItem('selectedBranch');
//         if (storedBranch) {
//           setSelectedBranch(storedBranch);
//           setStatusFilter('All'); // Optional: reset status filter
//         }
//       } catch (err) {
//         console.error('Failed to load branch from AsyncStorage:', err);
//       } finally {
//         setIsBranchLoading(false);
//       }
//     };

//     fetchBranch();
//   }, []);

//   // Fetch visitor data for selected branch
//   const {
//     data: response,
//     isLoading,
//     refetch,
//   } = useGetVisitorsByBranchQuery(selectedBranch);

//   const visitorData = response?.data || [];

//   // Filter logic
//   const filteredVisitors = visitorData.filter(visitor => {
//     const createdAtDate = new Date(visitor.createdAt).toDateString();
//     const selectedDate = new Date(searchDate).toDateString();

//     return (
//       (statusFilter === 'All' || visitor.status === statusFilter) &&
//       (visitor.phoneNumber?.toLowerCase().includes(phone.toLowerCase()) ?? true) &&
//       (visitor.badge?.toLowerCase().includes(badge.toLowerCase()) ?? true) &&
//       createdAtDate === selectedDate
//     );
//   });

//   const handleView = visitor => {
//     setSelectedVisitor(visitor);
//     setModalBadge(visitor.badge || '');
//     setModalStatus(visitor.status || 'Pending');
//     setModalVisible(true);
//   };

//   const handleUpdate = () => {
//     showErrorMessage({
//       message: 'Update feature should call backend!',
//       duration: 3000,
//     });
//     setModalVisible(false);
//   };

//   if (isBranchLoading) {
//     return (
//       <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <ActivityIndicator size="large" color="#003366" />
//         <Text>Loading branch...</Text>
//       </SafeAreaView>
//     );
//   }

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: '#f9fbfd' }}>
//       <View style={{ flex: 1, padding: 16 }}>
//         <Header title={`Visitor - ${selectedBranch}`} showBackButton />

//         <VisitorFilterBar
//           searchDate={searchDate}
//           setSearchDate={setSearchDate}
//           showDatePicker={showDatePicker}
//           setShowDatePicker={setShowDatePicker}
//           phone={phone}
//           setPhone={setPhone}
//           badge={badge}
//           setBadge={setBadge}
//           statusFilter={statusFilter}
//           setStatusFilter={setStatusFilter}
//         />

//         {!isLoading && (
//           <Text style={{ fontSize: 14, color: '#666', marginBottom: 8 }}>
//             Total Visitors: {filteredVisitors.length}
//           </Text>
//         )}

//         {isLoading ? (
//           <ActivityIndicator
//             size="large"
//             color="#003366"
//             style={{ marginTop: 50 }}
//           />
//         ) : filteredVisitors.length === 0 ? (
//           <Text style={{ textAlign: 'center', marginTop: 30, color: '#888' }}>
//             No visitors found for selected criteria.
//           </Text>
//         ) : (
//           <FlatList
//             data={filteredVisitors}
//             keyExtractor={item => item._id}
//             renderItem={({ item }) => (
//               <VisitorCard item={item} onView={handleView} />
//             )}
//             refreshing={isLoading}
//             onRefresh={refetch}
//             contentContainerStyle={{ paddingBottom: 20 }}
//           />
//         )}

//         <UpdateVisitorModal
//           visible={modalVisible}
//           onClose={() => setModalVisible(false)}
//           onSave={handleUpdate}
//           modalBadge={modalBadge}
//           setModalBadge={setModalBadge}
//           modalStatus={modalStatus}
//           setModalStatus={setModalStatus}
//         />
//       </View>
//     </SafeAreaView>
//   );
// };

// export default VisitorsScreen;

// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   FlatList,
//   SafeAreaView,
//   ActivityIndicator,
//   Text,
// } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// import Header from '../../components/Header';
// import { showErrorMessage } from '../../utils/Globals';
// import VisitorFilterBar from '../../components/VisitorFilterBar';
// import UpdateVisitorModal from '../../components/UpdateVisitorModal';
// import VisitorCard from '../../components/VisitorCard';
// import { useFocusEffect } from '@react-navigation/native';
// import { useCallback } from 'react';
// import { useGetVisitorsByBranchQuery } from '../../api';
// import { useAuth } from '../../contexts/AuthContext';

// const VisitorsScreen = () => {
//   // const [selectedBranch, setSelectedBranch] = useState('All');
//   const { userBranch: selectedBranch } = useAuth();

//   const [isBranchLoading, setIsBranchLoading] = useState(true);

//   const [searchDate, setSearchDate] = useState(new Date());
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [phone, setPhone] = useState('');
//   const [badge, setBadge] = useState('');
//   const [statusFilter, setStatusFilter] = useState('All');

//   const [modalVisible, setModalVisible] = useState(false);
//   const [selectedVisitor, setSelectedVisitor] = useState(null);
//   const [modalBadge, setModalBadge] = useState('');
//   const [modalStatus, setModalStatus] = useState('pending');

//   useFocusEffect(
//     useCallback(() => {
//       const fetchBranch = async () => {
//         try {
//           const storedBranch = await AsyncStorage.getItem('selectedBranch');
//           if (storedBranch) {
//             setSelectedBranch(storedBranch);
//             setStatusFilter('All');
//           }
//         } catch (err) {
//           console.error('❌ Error fetching branch from AsyncStorage:', err);
//         } finally {
//           setIsBranchLoading(false);
//         }
//       };

//       fetchBranch();
//     }, []),
//   );

//   // 📆 Format date for API (YYYY-MM-DD)
//   const formattedDate = searchDate.toISOString().split('T')[0];

//   // 🟢 Fetch visitors by branch & date
//   const {
//     data: response,
//     isLoading,
//     refetch,
//   } = useGetVisitorsByBranchQuery({
//     branch: selectedBranch,
//     date: formattedDate,
//   });

//   const visitorData = response?.data || [];
//   console.log('🔥 Visitor Data:', visitorData);

//   // 🔍 Local filtering logic
//   const filteredVisitors = visitorData.filter(visitor => {
//     const createdAtDate = new Date(visitor.createdAt).toDateString();
//     const selectedDateStr = new Date(searchDate).toDateString();

//     return (
//       (statusFilter === 'All' || visitor.status === statusFilter) &&
//       (visitor.phoneNumber?.toLowerCase().includes(phone.toLowerCase()) ??
//         true) &&
//       (visitor.badge?.toLowerCase().includes(badge.toLowerCase()) ?? true) &&
//       createdAtDate === selectedDateStr
//     );
//   });

//   const handleView = visitor => {
//     setSelectedVisitor(visitor);
//     setModalBadge(visitor.badge || '');
//     setModalStatus(visitor.status || 'pending');
//     setModalVisible(true);
//   };

//   const handleUpdate = () => {
//     showErrorMessage({
//       message: 'Update feature should call backend!',
//       duration: 3000,
//     });
//     setModalVisible(false);
//   };

//   if (isBranchLoading) {
//     return (
//       <SafeAreaView
//         style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
//       >
//         <ActivityIndicator size="large" color="#003366" />
//         <Text>Loading branch...</Text>
//       </SafeAreaView>
//     );
//   }

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: '#f9fbfd' }}>
//       <View style={{ flex: 1, padding: 16 }}>
//         <Header title={`Visitor - ${selectedBranch}`} showBackButton />

//         <VisitorFilterBar
//           searchDate={searchDate}
//           setSearchDate={setSearchDate}
//           showDatePicker={showDatePicker}
//           setShowDatePicker={setShowDatePicker}
//           phone={phone}
//           setPhone={setPhone}
//           badge={badge}
//           setBadge={setBadge}
//           statusFilter={statusFilter}
//           setStatusFilter={setStatusFilter}
//         />

//         {!isLoading && (
//           <Text style={{ fontSize: 14, color: '#666', marginBottom: 8 }}>
//             Total Visitors: {filteredVisitors.length}
//           </Text>
//         )}

//         {isLoading ? (
//           <ActivityIndicator
//             size="large"
//             color="#003366"
//             style={{ marginTop: 50 }}
//           />
//         ) : filteredVisitors.length === 0 ? (
//           <Text style={{ textAlign: 'center', marginTop: 30, color: '#888' }}>
//             No visitors found for selected criteria.
//           </Text>
//         ) : (
//           <FlatList
//             data={filteredVisitors}
//             keyExtractor={item => item._id}
//             renderItem={({ item }) => (
//               <VisitorCard item={item} onView={handleView} />
//             )}
//             refreshing={isLoading}
//             onRefresh={refetch}
//             contentContainerStyle={{ paddingBottom: 20 }}
//           />
//         )}

//         <UpdateVisitorModal
//           visible={modalVisible}
//           onClose={() => setModalVisible(false)}
//           onSave={handleUpdate}
//           modalBadge={modalBadge}
//           setModalBadge={setModalBadge}
//           modalStatus={modalStatus}
//           setModalStatus={setModalStatus}
//         />
//       </View>
//     </SafeAreaView>
//   );
// };

// export default VisitorsScreen;

// import React, { useEffect, useState, useCallback } from 'react';
// import {
//   View,
//   FlatList,
//   SafeAreaView,
//   ActivityIndicator,
//   Text,
// } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// import Header from '../../components/Header';
// import { showErrorMessage } from '../../utils/Globals';
// import VisitorFilterBar from '../../components/VisitorFilterBar';
// import UpdateVisitorModal from '../../components/UpdateVisitorModal';
// import VisitorCard from '../../components/VisitorCard';
// import { useFocusEffect } from '@react-navigation/native';
// import { useGetVisitorsByBranchQuery } from '../../api';
// import { useAuth } from '../../contexts/AuthContext';
// import { useMemo } from 'react';
// const VisitorsScreen = () => {
//   const { userBranch } = useAuth(); // e.g., "Suliballi"
//   const [selectedBranch, setSelectedBranch] = useState(userBranch); // <-- FIXED

//   const [isBranchLoading, setIsBranchLoading] = useState(true);
//   const [searchDate, setSearchDate] = useState(new Date());
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [phone, setPhone] = useState('');
//   const [badge, setBadge] = useState('');
//   const [statusFilter, setStatusFilter] = useState('All');

//   const [modalVisible, setModalVisible] = useState(false);
//   const [selectedVisitor, setSelectedVisitor] = useState(null);
//   const [modalBadge, setModalBadge] = useState('');
//   const [modalStatus, setModalStatus] = useState('pending');

//   const queryParams = useMemo(
//     () => ({
//       officeLocation: selectedBranch,
//       date: formattedDate,
//     }),
//     [selectedBranch, formattedDate],
//   );
//   // ✅ Load selectedBranch from AsyncStorage if exists
//   useFocusEffect(
//     useCallback(() => {
//       const fetchBranch = async () => {
//         try {
//           const storedBranch = await AsyncStorage.getItem('selectedBranch');
//           if (storedBranch) {
//             setSelectedBranch(storedBranch);
//             setStatusFilter('All');
//           }
//         } catch (err) {
//           console.error('❌ Error fetching branch from AsyncStorage:', err);
//         } finally {
//           setIsBranchLoading(false);
//         }
//       };

//       fetchBranch();
//     }, []),
//   );

//   const formattedDate = searchDate.toISOString().split('T')[0];
//   console.log('🔥 Selected Branch:', selectedBranch);
//   const {
//     data: response,
//     isLoading,
//     refetch,
//   } = useGetVisitorsByBranchQuery(queryParams);

//   const visitorData = response?.data || [];
//   console.log('🔥 Visitor Data in screen:', visitorData);
//   const filteredVisitors = visitorData.filter(visitor => {
//     const createdAtDate = new Date(visitor.createdAt).toDateString();
//     const selectedDateStr = new Date(searchDate).toDateString();

//     return (
//       (statusFilter === 'All' || visitor.status === statusFilter) &&
//       (visitor.phoneNumber?.toLowerCase().includes(phone.toLowerCase()) ??
//         true) &&
//       (visitor.badge?.toLowerCase().includes(badge.toLowerCase()) ?? true) &&
//       createdAtDate === selectedDateStr
//     );
//   });

//   const handleView = visitor => {
//     setSelectedVisitor(visitor);
//     setModalBadge(visitor.badge || '');
//     setModalStatus(visitor.status || 'pending');
//     setModalVisible(true);
//   };

//   const handleUpdate = () => {
//     showErrorMessage({
//       message: 'Update feature should call backend!',
//       duration: 3000,
//     });
//     setModalVisible(false);
//   };

//   if (isBranchLoading) {
//     return (
//       <SafeAreaView
//         style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
//       >
//         <ActivityIndicator size="large" color="#003366" />
//         <Text>Loading branch...</Text>
//       </SafeAreaView>
//     );
//   }

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: '#f9fbfd' }}>
//       <View style={{ flex: 1, padding: 16 }}>
//         <Header title={`Visitor - ${selectedBranch}`} showBackButton />

//         <VisitorFilterBar
//           searchDate={searchDate}
//           setSearchDate={setSearchDate}
//           showDatePicker={showDatePicker}
//           setShowDatePicker={setShowDatePicker}
//           phone={phone}
//           setPhone={setPhone}
//           badge={badge}
//           setBadge={setBadge}
//           statusFilter={statusFilter}
//           setStatusFilter={setStatusFilter}
//         />

//         {!isLoading && (
//           <Text style={{ fontSize: 14, color: '#666', marginBottom: 8 }}>
//             Total Visitors: {filteredVisitors.length}
//           </Text>
//         )}

//         {isLoading ? (
//           <ActivityIndicator
//             size="large"
//             color="#003366"
//             style={{ marginTop: 50 }}
//           />
//         ) : filteredVisitors.length === 0 ? (
//           <Text style={{ textAlign: 'center', marginTop: 30, color: '#888' }}>
//             No visitors found for selected criteria.
//           </Text>
//         ) : (
//           <FlatList
//             data={filteredVisitors}
//             keyExtractor={item => item._id}
//             renderItem={({ item }) => (
//               <VisitorCard item={item} onView={handleView} />
//             )}
//             refreshing={isLoading}
//             onRefresh={refetch}
//             contentContainerStyle={{ paddingBottom: 20 }}
//           />
//         )}

//         <UpdateVisitorModal
//           visible={modalVisible}
//           onClose={() => setModalVisible(false)}
//           onSave={handleUpdate}
//           modalBadge={modalBadge}
//           setModalBadge={setModalBadge}
//           modalStatus={modalStatus}
//           setModalStatus={setModalStatus}
//         />
//       </View>
//     </SafeAreaView>
//   );
// };

// export default VisitorsScreen;

// import React from 'react';
// import {
//   View,
//   Text,
//   FlatList,
//   SafeAreaView,
//   ActivityIndicator,
//   StyleSheet,
// } from 'react-native';
// import { useGetVisitorsByBranchQuery } from '../../api';

// const SulabelliVisitorsScreen = () => {
//   const branch = 'Sulaballi';
//   const date = new Date().toISOString().split('T')[0]; // format: YYYY-MM-DD

//   const {
//     data: response,
//     isLoading,
//     isError,
//     refetch,
//   } = useGetVisitorsByBranchQuery({ officeLocation: branch, date });

//   const visitorData = response?.data || [];
//   console.log('🔥 Visitor Data:', visitorData);

//   return (
//     <SafeAreaView style={styles.container}>
//       <Text style={styles.header}>Visitors – {branch}</Text>

//       {isLoading ? (
//         <ActivityIndicator size="large" color="#003366" />
//       ) : isError ? (
//         <Text style={styles.error}>Failed to fetch data.</Text>
//       ) : visitorData.length === 0 ? (
//         <Text style={styles.noData}>No visitors found for today.</Text>
//       ) : (
//         <FlatList
//           data={visitorData}
//           keyExtractor={item => item._id}
//           onRefresh={refetch}
//           refreshing={isLoading}
//           contentContainerStyle={{ paddingBottom: 20 }}
//           renderItem={({ item }) => (
//             <View style={styles.card}>
//               <Text style={styles.name}>{item.name}</Text>
//               <Text>Status: {item.status}</Text>
//               <Text>Badge: {item.badge}</Text>
//               <Text>Phone: {item.phoneNumber}</Text>
//               <Text>In Time: {item.inTime}</Text>
//               <Text>Out Time: {item.outTime || 'N/A'}</Text>
//             </View>
//           )}
//         />
//       )}
//     </SafeAreaView>
//   );
// };

// export default SulabelliVisitorsScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: '#f9fbfd',
//   },
//   header: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     marginBottom: 16,
//     textAlign: 'center',
//     color: '#003366',
//   },
//   error: {
//     color: 'red',
//     textAlign: 'center',
//   },
//   noData: {
//     textAlign: 'center',
//     color: '#666',
//   },
//   card: {
//     backgroundColor: '#fff',
//     padding: 12,
//     marginBottom: 12,
//     borderRadius: 8,
//     elevation: 2,
//   },
//   name: {
//     fontSize: 16,
//     fontWeight: '600',
//     marginBottom: 4,
//   },
// });

import React, { useState, useMemo } from 'react';
import {
  View,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
  Text,
} from 'react-native';

import Header from '../../components/Header';
import VisitorFilterBar from '../../components/VisitorFilterBar';
import UpdateVisitorModal from '../../components/UpdateVisitorModal';
import VisitorCard from '../../components/VisitorCard';
import { useAuth } from '../../contexts/AuthContext';
import {
  useGetVisitorsByBranchQuery,
  useUpdateVisitorMutation,
} from '../../api';
import { showErrorMessage, showSuccessMessage } from '../../utils/Globals';

const VisitorsScreen = () => {
  const { userBranch, userRole, selectedBranch } = useAuth();

  const [searchDate, setSearchDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [phone, setPhone] = useState('');
  const [badge, setBadge] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedVisitor, setSelectedVisitor] = useState(null);
  const [modalBadge, setModalBadge] = useState('');
  const [modalStatus, setModalStatus] = useState('pending');

  const formattedDate = searchDate.toISOString().split('T')[0];
  // const branch = selectedBranch || userBranch || 'All';
  const branch = selectedBranch || userBranch[0];

  // const branch = selectedBranch;

  // console.log('🔥 Branchkvr:', branch);

  const queryParams = useMemo(
    () => ({
      officeLocation: branch,
      date: formattedDate,
    }),
    [branch, formattedDate],
  );

  const {
    data: response,
    isLoading,
    refetch,
  } = useGetVisitorsByBranchQuery(queryParams, {
    skip: !branch,
  });

  const [updateVisitor, { isLoading: isUpdating }] = useUpdateVisitorMutation();

  const visitorData = response?.data || [];
  // console.log('🔥 Response:', visitorData);

  const filteredVisitors = visitorData.filter(visitor => {
    const createdAtDate = new Date(visitor.createdAt).toDateString();
    const selectedDateStr = new Date(searchDate).toDateString();

    return (
      (statusFilter === 'All' || visitor.status === statusFilter) &&
      (visitor.phoneNumber?.toLowerCase().includes(phone.toLowerCase()) ??
        true) &&
      (visitor.badgeNumber?.toLowerCase().includes(badge.toLowerCase()) ??
        true) &&
      createdAtDate === selectedDateStr
    );
  });

  const handleView = visitor => {
    setSelectedVisitor(visitor);
    setModalBadge(visitor.badgeNumber || '');
    setModalStatus(visitor.status || 'pending');
    setModalVisible(true);
  };

  const handleUpdate = async () => {
    if (!selectedVisitor) return;

    try {
      await updateVisitor({
        id: selectedVisitor._id,
        badgeNumber: modalBadge,
        status: modalStatus,
      }).unwrap();

      showSuccessMessage({
        message: 'Visitor updated successfully!',
        duration: 3000,
      });

      refetch();
      setModalVisible(false);
    } catch (error) {
      console.error('❌ Error updating visitor:', error);
      showErrorMessage({
        message: 'Failed to update visitor.',
        duration: 3000,
      });
    }
  };

  if (!branch) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        <ActivityIndicator size="large" color="#003366" />
        <Text>Loading branch...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f9fbfd' }}>
      <View style={{ flex: 1, padding: 16 }}>
        <Header title={`Visitor - ${branch}`} showBackButton />

        <VisitorFilterBar
          searchDate={searchDate}
          setSearchDate={setSearchDate}
          showDatePicker={showDatePicker}
          setShowDatePicker={setShowDatePicker}
          phone={phone}
          setPhone={setPhone}
          badge={badge}
          setBadge={setBadge}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />

        {!isLoading && (
          <Text style={{ fontSize: 14, color: '#666', marginBottom: 8 }}>
            Total Visitors: {filteredVisitors.length}
          </Text>
        )}

        {isLoading ? (
          <ActivityIndicator
            size="large"
            color="#003366"
            style={{ marginTop: 50 }}
          />
        ) : filteredVisitors.length === 0 ? (
          <Text style={{ textAlign: 'center', marginTop: 30, color: '#888' }}>
            No visitors found for selected criteria.
          </Text>
        ) : (
          <FlatList
            data={filteredVisitors}
            keyExtractor={item => item._id}
            renderItem={({ item }) => (
              <VisitorCard item={item} onView={handleView} />
            )}
            refreshing={isLoading}
            onRefresh={refetch}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        )}

        <UpdateVisitorModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onSave={handleUpdate}
          modalBadge={modalBadge}
          setModalBadge={setModalBadge}
          modalStatus={modalStatus}
          setModalStatus={setModalStatus}
          isLoading={isUpdating}
        />
      </View>
    </SafeAreaView>
  );
};

export default VisitorsScreen;

// import React, { useEffect, useState, useCallback, useMemo } from 'react';
// import {
//   View,
//   FlatList,
//   SafeAreaView,
//   ActivityIndicator,
//   Text,
// } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useFocusEffect } from '@react-navigation/native';

// import Header from '../../components/Header';
// import VisitorFilterBar from '../../components/VisitorFilterBar';
// import UpdateVisitorModal from '../../components/UpdateVisitorModal';
// import VisitorCard from '../../components/VisitorCard';
// import BranchPicker from '../../components/BranchPicker';
// import { useAuth } from '../../contexts/AuthContext';
// import {
//   useGetVisitorsByBranchQuery,
//   useUpdateVisitorMutation,
// } from '../../api';
// import { showErrorMessage, showSuccessMessage } from '../../utils/Globals';

// const VisitorsScreen = () => {
//   const { userBranch, userRole } = useAuth();

//   const isSuperadmin = userRole === 'superadmin';

//   const [selectedBranch, setSelectedBranch] = useState(userBranch);
//   const [branchModalVisible, setBranchModalVisible] = useState(false);
//   const [isBranchLoading, setIsBranchLoading] = useState(isSuperadmin);
//   const [searchDate, setSearchDate] = useState(new Date());
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [phone, setPhone] = useState('');
//   const [badge, setBadge] = useState('');
//   const [statusFilter, setStatusFilter] = useState('All');

//   const [modalVisible, setModalVisible] = useState(false);
//   const [selectedVisitor, setSelectedVisitor] = useState(null);
//   const [modalBadge, setModalBadge] = useState('');
//   const [modalStatus, setModalStatus] = useState('pending');

//   const formattedDate = searchDate.toISOString().split('T')[0];

//   const queryParams = useMemo(
//     () => ({
//       officeLocation: selectedBranch,
//       date: formattedDate,
//     }),
//     [selectedBranch, formattedDate],
//   );

//   useFocusEffect(
//     useCallback(() => {
//       const fetchStoredBranch = async () => {
//         if (!isSuperadmin) {
//           setIsBranchLoading(false);
//           return;
//         }

//         try {
//           const storedBranch = await AsyncStorage.getItem('selectedBranch');
//           if (storedBranch) {
//             setSelectedBranch(storedBranch);
//           } else {
//             setSelectedBranch(userBranch[0] || 'All');
//           }
//         } catch (err) {
//           console.error('❌ Error fetching branch from AsyncStorage:', err);
//           setSelectedBranch(userBranch[0] || 'All');
//         } finally {
//           setIsBranchLoading(false);
//         }
//       };

//       fetchStoredBranch();
//     }, [isSuperadmin, userBranch]),
//   );

//   const {
//     data: response,
//     isLoading,
//     refetch,
//   } = useGetVisitorsByBranchQuery(queryParams, {
//     skip: !selectedBranch,
//   });

//   const [updateVisitor, { isLoading: isUpdating }] = useUpdateVisitorMutation();

//   const visitorData = response?.data || [];

//   const filteredVisitors = visitorData.filter(visitor => {
//     const createdAtDate = new Date(visitor.createdAt).toDateString();
//     const selectedDateStr = new Date(searchDate).toDateString();

//     return (
//       (statusFilter === 'All' || visitor.status === statusFilter) &&
//       (visitor.phoneNumber?.toLowerCase().includes(phone.toLowerCase()) ??
//         true) &&
//       (visitor.badgeNumber?.toLowerCase().includes(badge.toLowerCase()) ??
//         true) &&
//       createdAtDate === selectedDateStr
//     );
//   });

//   const handleView = visitor => {
//     setSelectedVisitor(visitor);
//     setModalBadge(visitor.badgeNumber || '');
//     setModalStatus(visitor.status || 'pending');
//     setModalVisible(true);
//   };

//   const handleUpdate = async () => {
//     if (!selectedVisitor) return;

//     try {
//       await updateVisitor({
//         id: selectedVisitor._id,
//         badgeNumber: modalBadge,
//         status: modalStatus,
//       }).unwrap();

//       showSuccessMessage({
//         message: 'Visitor updated successfully!',
//         duration: 3000,
//       });

//       refetch();
//       setModalVisible(false);
//     } catch (error) {
//       console.error('❌ Error updating visitor:', error);
//       showErrorMessage({
//         message: 'Failed to update visitor.',
//         duration: 3000,
//       });
//     }
//   };

//   if (isBranchLoading || !selectedBranch) {
//     return (
//       <SafeAreaView
//         style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
//       >
//         <ActivityIndicator size="large" color="#003366" />
//         <Text>Loading branch...</Text>
//       </SafeAreaView>
//     );
//   }

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: '#f9fbfd' }}>
//       <View style={{ flex: 1, padding: 16 }}>
//         <Header
//           title={`Visitor - ${selectedBranch}`}
//           showBackButton
//           onBranchPress={
//             isSuperadmin ? () => setBranchModalVisible(true) : undefined
//           }
//         />

//         {isSuperadmin && (
//           <BranchPicker
//             visible={branchModalVisible}
//             onClose={() => setBranchModalVisible(false)}
//             branches={userBranch}
//             onSelect={branch => {
//               setSelectedBranch(branch);
//               AsyncStorage.setItem('selectedBranch', branch);
//             }}
//             selectedBranch={selectedBranch}
//           />
//         )}

//         <VisitorFilterBar
//           searchDate={searchDate}
//           setSearchDate={setSearchDate}
//           showDatePicker={showDatePicker}
//           setShowDatePicker={setShowDatePicker}
//           phone={phone}
//           setPhone={setPhone}
//           badge={badge}
//           setBadge={setBadge}
//           statusFilter={statusFilter}
//           setStatusFilter={setStatusFilter}
//         />

//         {!isLoading && (
//           <Text style={{ fontSize: 14, color: '#666', marginBottom: 8 }}>
//             Total Visitors: {filteredVisitors.length}
//           </Text>
//         )}

//         {isLoading ? (
//           <ActivityIndicator
//             size="large"
//             color="#003366"
//             style={{ marginTop: 50 }}
//           />
//         ) : filteredVisitors.length === 0 ? (
//           <Text style={{ textAlign: 'center', marginTop: 30, color: '#888' }}>
//             No visitors found for selected criteria.
//           </Text>
//         ) : (
//           <FlatList
//             data={filteredVisitors}
//             keyExtractor={item => item._id}
//             renderItem={({ item }) => (
//               <VisitorCard item={item} onView={handleView} />
//             )}
//             refreshing={isLoading}
//             onRefresh={refetch}
//             contentContainerStyle={{ paddingBottom: 20 }}
//           />
//         )}

//         <UpdateVisitorModal
//           visible={modalVisible}
//           onClose={() => setModalVisible(false)}
//           onSave={handleUpdate}
//           modalBadge={modalBadge}
//           setModalBadge={setModalBadge}
//           modalStatus={modalStatus}
//           setModalStatus={setModalStatus}
//           isLoading={isUpdating}
//         />
//       </View>
//     </SafeAreaView>
//   );
// };

// export default VisitorsScreen;
