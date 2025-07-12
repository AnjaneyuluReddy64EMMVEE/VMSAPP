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

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Modal,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import { Header } from '../../components/Header';
import { showErrorMessage } from '../../utils/Globals';

const VisitorsScreen = () => {
  const [searchDate, setSearchDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [phone, setPhone] = useState('');
  const [badge, setBadge] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedVisitor, setSelectedVisitor] = useState(null);
  const [modalBadge, setModalBadge] = useState('');
  const [modalStatus, setModalStatus] = useState('Pending');

  const [visitorData, setVisitorData] = useState([
    {
      id: '1',
      name: 'Jane Doe',
      phone: '9876543210',
      email: 'jane@example.com',
      badge: '',
      location: 'Airport Office',
      status: 'Pending',
      purpose: 'Meeting',
      personToMeet: 'John Smith',
      inTime: '',
      outTime: '',
      avatar: 'https://cdn-icons-png.flaticon.com/512/194/194938.png',
      govtIdUrl: 'https://cdn-icons-png.flaticon.com/512/847/847969.png',
    },
    {
      id: '2',
      name: 'Ravi Kumar',
      phone: '9988776655',
      email: 'ravi@example.com',
      badge: '',
      location: 'Headquarters',
      status: 'Pending',
      purpose: 'Site Visit',
      personToMeet: 'Anita Sharma',
      inTime: '',
      outTime: '',
      avatar: 'https://cdn-icons-png.flaticon.com/512/194/194938.png',
      govtIdUrl: 'https://cdn-icons-png.flaticon.com/512/2910/2910768.png',
    },
    {
      id: '3',
      name: 'Priya Sen',
      phone: '9123456780',
      email: 'priya@example.com',
      badge: '',
      location: 'Solar Plant',
      status: 'Pending',
      purpose: 'Interview',
      personToMeet: 'Manish Patel',
      inTime: '',
      outTime: '',
      avatar: 'https://cdn-icons-png.flaticon.com/512/194/194937.png',
      govtIdUrl: 'https://cdn-icons-png.flaticon.com/512/848/848043.png',
    },
    {
      id: '4',
      name: 'Sunil Mehra',
      phone: '9090909090',
      email: 'sunil@example.com',
      badge: '',
      location: 'Factory Gate 1',
      status: 'Pending',
      purpose: 'Delivery',
      personToMeet: 'Logistics Team',
      inTime: '',
      outTime: '',
      avatar: 'https://cdn-icons-png.flaticon.com/512/194/194938.png',
      govtIdUrl: 'https://cdn-icons-png.flaticon.com/512/4341/4341094.png',
    },
    {
      id: '5',
      name: 'Meena Reddy',
      phone: '9871234567',
      email: 'meena@example.com',
      badge: '',
      location: 'Admin Block',
      status: 'Pending',
      purpose: 'Maintenance',
      personToMeet: 'Rajesh Iyer',
      inTime: '',
      outTime: '',
      avatar: 'https://cdn-icons-png.flaticon.com/512/194/194937.png',
      govtIdUrl: 'https://cdn-icons-png.flaticon.com/512/2907/2907511.png',
    },
    {
      id: '6',
      name: 'Amit Sinha',
      phone: '9812345678',
      email: 'amit@example.com',
      badge: '',
      location: 'Warehouse',
      status: 'Pending',
      purpose: 'Audit',
      personToMeet: 'Nisha Jain',
      inTime: '',
      outTime: '',
      avatar: 'https://cdn-icons-png.flaticon.com/512/194/194938.png',
      govtIdUrl: 'https://cdn-icons-png.flaticon.com/512/2910/2910768.png',
    },
    {
      id: '7',
      name: 'Sneha Kapoor',
      phone: '9765432109',
      email: 'sneha@example.com',
      badge: '',
      location: 'Airport Office',
      status: 'Pending',
      purpose: 'Client Visit',
      personToMeet: 'Arun Khanna',
      inTime: '',
      outTime: '',
      avatar: 'https://cdn-icons-png.flaticon.com/512/194/194937.png',
      govtIdUrl: 'https://cdn-icons-png.flaticon.com/512/2910/2910768.png',
    },
    {
      id: '8',
      name: 'Kunal Das',
      phone: '9654321098',
      email: 'kunal@example.com',
      badge: '',
      location: 'Control Room',
      status: 'Pending',
      purpose: 'IT Support',
      personToMeet: 'IT Admin',
      inTime: '',
      outTime: '',
      avatar: 'https://cdn-icons-png.flaticon.com/512/194/194938.png',
      govtIdUrl: 'https://cdn-icons-png.flaticon.com/512/847/847969.png',
    },
    {
      id: '9',
      name: 'Lavanya Mishra',
      phone: '9543210987',
      email: 'lavanya@example.com',
      badge: '',
      location: 'Main Office',
      status: 'Pending',
      purpose: 'Demo Presentation',
      personToMeet: 'Product Team',
      inTime: '',
      outTime: '',
      avatar: 'https://cdn-icons-png.flaticon.com/512/194/194937.png',
      govtIdUrl: 'https://cdn-icons-png.flaticon.com/512/848/848043.png',
    },
    {
      id: '10',
      name: 'Gaurav Jain',
      phone: '9432109876',
      email: 'gaurav@example.com',
      badge: '',
      location: 'Corporate Lobby',
      status: 'Pending',
      purpose: 'Board Meeting',
      personToMeet: 'CEO Office',
      inTime: '',
      outTime: '',
      avatar: 'https://cdn-icons-png.flaticon.com/512/194/194938.png',
      govtIdUrl: 'https://cdn-icons-png.flaticon.com/512/2910/2910768.png',
    },
  ]);

  const filteredVisitors = visitorData.filter(visitor => {
    return (
      (statusFilter === 'All' || visitor.status === statusFilter) &&
      visitor.phone.includes(phone) &&
      visitor.badge.includes(badge)
    );
  });

  const handleView = visitor => {
    setSelectedVisitor(visitor);
    setModalBadge(visitor.badge);
    setModalStatus(visitor.status);
    setModalVisible(true);
  };

  const handleUpdate = () => {
    const updated = visitorData.map(v => {
      if (v.id === selectedVisitor.id) {
        let updatedVisitor = { ...v, badge: modalBadge, status: modalStatus };

        if (modalStatus === 'Checked In' && v.status === 'Pending') {
          updatedVisitor.inTime = format(new Date(), 'hh:mm a');
        }

        if (modalStatus === 'Checked Out' && v.status === 'Checked In') {
          updatedVisitor.outTime = format(new Date(), 'hh:mm a');
        }

        return updatedVisitor;
      }
      return v;
    });
    setVisitorData(updated);
    setModalVisible(false);
  };

  const renderVisitor = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.details}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.text}>{item.phone}</Text>
        <Text style={styles.text}>{item.email}</Text>
        <Text style={styles.text}>Badge: {item.badge || 'N/A'}</Text>
        <Text style={styles.text}>Location: {item.location}</Text>
      </View>
      <View style={styles.rightSection}>
        <Text
          style={[
            styles.status,
            item.status === 'Pending'
              ? styles.statusPending
              : item.status === 'Checked In'
              ? styles.statusIn
              : styles.statusOut,
          ]}
        >
          {item.status}
        </Text>
        <Text style={styles.text}>Purpose: {item.purpose}</Text>
        <Text style={styles.text}>To Meet: {item.personToMeet}</Text>
        <Text style={styles.text}>
          {item.inTime} - {item.outTime || 'N/A'}
        </Text>
        <TouchableOpacity
          style={styles.viewButton}
          onPress={() => handleView(item)}
        >
          <Text style={styles.viewText}>View</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // useEffect(() => {
  //   console.log('Visitor Data Updated:', visitorData);

  //   showErrorMessage({
  //     message: 'fetched visitor data successfully',
  //     duration: 3000,
  //   });
  // }, []);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Header screenName="Visitor List" showGoBack />

        {/* Filters */}
        <View style={styles.filters}>
          <TouchableOpacity
            onPress={() => setShowDatePicker(true)}
            style={styles.filterInput}
          >
            <Text>{searchDate.toLocaleDateString()}</Text>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={searchDate}
              mode="date"
              display="default"
              onChange={(e, selectedDate) => {
                setShowDatePicker(false);
                if (selectedDate) setSearchDate(selectedDate);
              }}
            />
          )}

          <TextInput
            style={styles.filterInput}
            placeholder="Phone Number"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />
          <TextInput
            style={styles.filterInput}
            placeholder="Badge No"
            value={badge}
            onChangeText={setBadge}
          />
          <TouchableOpacity
            style={styles.filterInput}
            onPress={() =>
              setStatusFilter(prev =>
                prev === 'All'
                  ? 'Pending'
                  : prev === 'Pending'
                  ? 'Checked In'
                  : prev === 'Checked In'
                  ? 'Checked Out'
                  : 'All',
              )
            }
          >
            <Text>{statusFilter}</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={filteredVisitors}
          renderItem={renderVisitor}
          keyExtractor={item => item.id}
          contentContainerStyle={{ paddingBottom: 100 }}
        />

        {/* Modal */}
        <Modal visible={modalVisible} transparent animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Update Visitor</Text>
              <TextInput
                placeholder="Badge Number"
                style={styles.modalInput}
                value={modalBadge}
                onChangeText={setModalBadge}
              />
              <TouchableOpacity
                style={styles.statusDropdown}
                onPress={() => {
                  if (modalStatus === 'Pending') setModalStatus('Checked In');
                  else if (modalStatus === 'Checked In')
                    setModalStatus('Checked Out');
                }}
              >
                <Text>{modalStatus}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleUpdate}
              >
                <Text style={styles.saveText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={{ color: 'red', marginTop: 10 }}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default VisitorsScreen;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f9fbfd' },
  container: { flex: 1, padding: 16 },
  heading: { fontSize: 22, fontWeight: '700', marginBottom: 12 },
  filters: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 12,
  },
  filterInput: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    flexGrow: 1,
    minWidth: '45%',
    elevation: 2,
  },
  card: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    elevation: 2,
  },
  avatar: { width: 44, height: 44, borderRadius: 22, marginRight: 10 },
  details: { flex: 1 },
  rightSection: { flex: 1.2, alignItems: 'flex-end' },
  name: { fontSize: 16, fontWeight: '600' },
  text: { fontSize: 12, color: '#444' },
  status: {
    fontWeight: '600',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    fontSize: 12,
    marginBottom: 4,
  },
  statusIn: { backgroundColor: '#ccf5d3', color: '#2e7d32' },
  statusOut: { backgroundColor: '#ffeeba', color: '#8d6e63' },
  statusPending: { backgroundColor: '#ffe0e0', color: '#c62828' },
  viewButton: {
    marginTop: 6,
    backgroundColor: '#007bff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  viewText: { color: 'white', fontWeight: '600', fontSize: 12 },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 10,
  },
  modalTitle: { fontSize: 18, fontWeight: '600', marginBottom: 12 },
  modalInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 6,
    marginBottom: 12,
  },
  statusDropdown: {
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderRadius: 6,
    marginBottom: 12,
  },
  saveButton: {
    backgroundColor: '#28a745',
    padding: 12,
    borderRadius: 6,
  },
  saveText: { color: '#fff', textAlign: 'center', fontWeight: '600' },
});
