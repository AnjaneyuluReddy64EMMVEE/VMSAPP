// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   FlatList,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Platform,
//   PermissionsAndroid,
//   Alert,
// } from 'react-native';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import RNFS from 'react-native-fs';
// import { format } from 'date-fns';

// const dummyData = [
//   {
//     id: '1',
//     name: 'Visitor9',
//     phone: '8888569741',
//     email: 'visitor9@gmail.com',
//     location: 'Emmvee Head Office',
//     badge: 'EMMVEE009',
//     status: 'checkedIn',
//     purpose: 'Interview',
//     personToMeet: 'John',
//     inTime: '2025-07-08T11:03:36',
//     outTime: null,
//   },
//   {
//     id: '2',
//     name: 'Visitor7',
//     phone: '8861544130',
//     email: 'visitor7@gmail.com',
//     location: 'Dabaspet',
//     badge: 'EMMVEE009',
//     status: 'checkedOut',
//     purpose: 'Visit',
//     personToMeet: 'Jadeja',
//     inTime: '2025-07-07T17:48:44',
//     outTime: '2025-07-07T17:58:36',
//   },
// ];

// const ReportsScreen = () => {
//   const [startDate, setStartDate] = useState<Date | null>(null);
//   const [endDate, setEndDate] = useState<Date | null>(null);
//   const [filteredData, setFilteredData] = useState(dummyData);
//   const [showStartPicker, setShowStartPicker] = useState(false);
//   const [showEndPicker, setShowEndPicker] = useState(false);

//   useEffect(() => {
//     if (startDate && endDate) {
//       const result = dummyData.filter(item => {
//         const inTime = new Date(item.inTime);
//         return inTime >= startDate && inTime <= endDate;
//       });
//       setFilteredData(result);
//     } else {
//       setFilteredData(dummyData);
//     }
//   }, [startDate, endDate]);

//   const exportToCSV = async () => {
//     const headers = 'Name,Phone,Email,Location,Badge,Status,Purpose,To Meet,In Time,Out Time\n';
//     const rows = filteredData.map(item => {
//       return `${item.name},${item.phone},${item.email},${item.location},${item.badge},${item.status},${item.purpose},${item.personToMeet},${item.inTime},${item.outTime ?? 'N/A'}`;
//     }).join('\n');

//     const csvContent = headers + rows;
//     const path = `${RNFS.DownloadDirectoryPath}/VMS_Report_${Date.now()}.csv`;

//     try {
//       if (Platform.OS === 'android') {
//         const granted = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
//         );
//         if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
//           Alert.alert('Permission Denied', 'Storage permission is required to save CSV.');
//           return;
//         }
//       }

//       await RNFS.writeFile(path, csvContent, 'utf8');
//       Alert.alert('Success', `CSV saved to ${path}`);
//     } catch (err) {
//       console.error(err);
//       Alert.alert('Error', 'Failed to export CSV.');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Reports</Text>

//       <View style={styles.dateRow}>
//         <TouchableOpacity onPress={() => setShowStartPicker(true)} style={styles.dateButton}>
//           <Text>{startDate ? format(startDate, 'dd-MM-yyyy') : 'From Date'}</Text>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => setShowEndPicker(true)} style={styles.dateButton}>
//           <Text>{endDate ? format(endDate, 'dd-MM-yyyy') : 'To Date'}</Text>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={exportToCSV} style={styles.exportButton}>
//           <Text style={{ color: 'white' }}>Export CSV</Text>
//         </TouchableOpacity>
//       </View>

//       {showStartPicker && (
//         <DateTimePicker
//           value={startDate || new Date()}
//           mode="date"
//           onChange={(e, date) => {
//             setShowStartPicker(false);
//             if (date) setStartDate(date);
//           }}
//         />
//       )}
//       {showEndPicker && (
//         <DateTimePicker
//           value={endDate || new Date()}
//           mode="date"
//           onChange={(e, date) => {
//             setShowEndPicker(false);
//             if (date) setEndDate(date);
//           }}
//         />
//       )}

//       <FlatList
//         data={filteredData}
//         keyExtractor={item => item.id}
//         renderItem={({ item }) => (
//           <View style={styles.card}>
//             <Text style={styles.bold}>{item.name}</Text>
//             <Text>{item.email} | {item.phone}</Text>
//             <Text>{item.location} | {item.badge}</Text>
//             <Text>Status: {item.status} | Purpose: {item.purpose}</Text>
//             <Text>Meet: {item.personToMeet}</Text>
//             <Text>In: {format(new Date(item.inTime), 'dd-MM-yyyy, HH:mm:ss')}</Text>
//             <Text>Out: {item.outTime ? format(new Date(item.outTime), 'dd-MM-yyyy, HH:mm:ss') : 'N/A'}</Text>
//           </View>
//         )}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 16, backgroundColor: '#fff' },
//   header: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
//   dateRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 10 },
//   dateButton: {
//     borderColor: '#ccc',
//     borderWidth: 1,
//     borderRadius: 6,
//     paddingVertical: 8,
//     paddingHorizontal: 12,
//   },
//   exportButton: {
//     backgroundColor: '#007BFF',
//     paddingHorizontal: 12,
//     paddingVertical: 10,
//     borderRadius: 6,
//   },
//   card: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     padding: 12,
//     marginBottom: 10,
//   },
//   bold: { fontWeight: 'bold', fontSize: 16 },
// });

// export default ReportsScreen;
import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const dummyData = [
  {
    id: '1',
    name: 'Visitor9',
    phone: '8888569741',
    email: 'visitor9@gmail.com',
    location: 'Emmvee Head Office',
    badge: 'EMMVEE009',
    status: 'checkedOut',
    purpose: 'Interview',
    personToMeet: 'John',
    inTime: '2025-07-15T05:30:00',
    outTime: '2025-07-22T05:29:59',
  },
  {
    id: '2',
    name: 'Visitor9',
    phone: '8962314574',
    email: 'visitor9@gmail.com',
    location: 'Emmvee Head Office',
    badge: 'EMMVEE011',
    status: 'checkedIn',
    purpose: 'Interview',
    personToMeet: 'John',
    inTime: '2025-07-08T12:34:42',
    outTime: null,
  },
  {
    id: '3',
    name: 'John',
    phone: '8965471256',
    email: 'johncena12@gmail.com',
    location: 'Emmvee Dabaspet',
    badge: 'E',
    status: 'checkedIn',
    purpose: 'Meeting',
    personToMeet: 'Rock',
    inTime: '2025-07-11T12:05:40',
    outTime: null,
  },
  {
    id: '4',
    name: 'Visitor7',
    phone: '8861544130',
    email: 'visitor7@gmail.com',
    location: 'Dabaspet',
    badge: 'EMMVEE009',
    status: 'checkedOut',
    purpose: 'Visit',
    personToMeet: 'Jadeja',
    inTime: '2025-07-07T17:48:44',
    outTime: '2025-07-07T17:58:36',
  },
];

const ReportsScreen = () => {
  const navigation = useNavigation();
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [filteredData, setFilteredData] = useState(dummyData);
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  useEffect(() => {
    if (startDate && endDate) {
      const result = dummyData.filter(item => {
        const inTime = new Date(item.inTime);
        return inTime >= startDate && inTime <= endDate;
      });
      setFilteredData(result);
    } else {
      setFilteredData(dummyData);
    }
  }, [startDate, endDate]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#003366" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Reports</Text>
        <View style={{ width: 24 }} /> {/* placeholder to center */}
      </View>

      {/* Date Filters */}
      <View style={styles.dateRow}>
        <TouchableOpacity onPress={() => setShowStartPicker(true)} style={styles.dateButton}>
          <Text style={styles.dateText}>
            {startDate ? format(startDate, 'dd-MM-yyyy') : 'From Date'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setShowEndPicker(true)} style={styles.dateButton}>
          <Text style={styles.dateText}>
            {endDate ? format(endDate, 'dd-MM-yyyy') : 'To Date'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { setStartDate(null); setEndDate(null); }} style={styles.resetButton}>
          <Text style={styles.resetText}>Reset</Text>
        </TouchableOpacity>
      </View>

      {showStartPicker && (
        <DateTimePicker
          value={startDate || new Date()}
          mode="date"
          onChange={(e, date) => {
            setShowStartPicker(false);
            if (date) setStartDate(date);
          }}
        />
      )}
      {showEndPicker && (
        <DateTimePicker
          value={endDate || new Date()}
          mode="date"
          onChange={(e, date) => {
            setShowEndPicker(false);
            if (date) setEndDate(date);
          }}
        />
      )}

      {/* Visitor Report List */}
      <FlatList
        data={filteredData}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.detail}>{item.email} | {item.phone}</Text>
            <Text style={styles.detail}>{item.location} | Badge: {item.badge}</Text>
            <Text style={styles.status}>
              Status:{' '}
              <Text style={{ color: item.status === 'checkedIn' ? 'green' : '#FF9500' }}>
                {item.status}
              </Text>
            </Text>
            <Text style={styles.detail}>Purpose: {item.purpose}</Text>
            <Text style={styles.detail}>To Meet: {item.personToMeet}</Text>
            <Text style={styles.detail}>In: {format(new Date(item.inTime), 'dd-MM-yyyy, HH:mm:ss')}</Text>
            <Text style={styles.detail}>Out: {item.outTime ? format(new Date(item.outTime), 'dd-MM-yyyy, HH:mm:ss') : 'N/A'}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No data available</Text>}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#003366',
    textAlign: 'center',
    flex: 1,
  },
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    gap: 10,
  },
  dateButton: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 6,
    paddingVertical: 10,
    alignItems: 'center',
  },
  dateText: { color: '#333', fontWeight: '500' },
  resetButton: {
    backgroundColor: '#d9534f',
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  resetText: { color: 'white', fontWeight: '600' },
  card: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
  },
  name: { fontSize: 16, fontWeight: '700', color: '#000' },
  detail: { fontSize: 13, color: '#333', marginTop: 2 },
  status: { fontSize: 13, marginTop: 4 },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 50,
    fontSize: 16,
  },
});

export default ReportsScreen;
