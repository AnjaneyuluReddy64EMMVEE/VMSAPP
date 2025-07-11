import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import RNFS from 'react-native-fs';
import { format } from 'date-fns';

const dummyData = [
  {
    id: '1',
    name: 'Visitor9',
    phone: '8888569741',
    email: 'visitor9@gmail.com',
    location: 'Emmvee Head Office',
    badge: 'EMMVEE009',
    status: 'checkedIn',
    purpose: 'Interview',
    personToMeet: 'John',
    inTime: '2025-07-08T11:03:36',
    outTime: null,
  },
  {
    id: '2',
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

  const exportToCSV = async () => {
    const headers = 'Name,Phone,Email,Location,Badge,Status,Purpose,To Meet,In Time,Out Time\n';
    const rows = filteredData.map(item => {
      return `${item.name},${item.phone},${item.email},${item.location},${item.badge},${item.status},${item.purpose},${item.personToMeet},${item.inTime},${item.outTime ?? 'N/A'}`;
    }).join('\n');

    const csvContent = headers + rows;
    const path = `${RNFS.DownloadDirectoryPath}/VMS_Report_${Date.now()}.csv`;

    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          Alert.alert('Permission Denied', 'Storage permission is required to save CSV.');
          return;
        }
      }

      await RNFS.writeFile(path, csvContent, 'utf8');
      Alert.alert('Success', `CSV saved to ${path}`);
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Failed to export CSV.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Reports</Text>

      <View style={styles.dateRow}>
        <TouchableOpacity onPress={() => setShowStartPicker(true)} style={styles.dateButton}>
          <Text>{startDate ? format(startDate, 'dd-MM-yyyy') : 'From Date'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setShowEndPicker(true)} style={styles.dateButton}>
          <Text>{endDate ? format(endDate, 'dd-MM-yyyy') : 'To Date'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={exportToCSV} style={styles.exportButton}>
          <Text style={{ color: 'white' }}>Export CSV</Text>
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

      <FlatList
        data={filteredData}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.bold}>{item.name}</Text>
            <Text>{item.email} | {item.phone}</Text>
            <Text>{item.location} | {item.badge}</Text>
            <Text>Status: {item.status} | Purpose: {item.purpose}</Text>
            <Text>Meet: {item.personToMeet}</Text>
            <Text>In: {format(new Date(item.inTime), 'dd-MM-yyyy, HH:mm:ss')}</Text>
            <Text>Out: {item.outTime ? format(new Date(item.outTime), 'dd-MM-yyyy, HH:mm:ss') : 'N/A'}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  dateRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 10 },
  dateButton: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  exportButton: {
    backgroundColor: '#007BFF',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 6,
  },
  card: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  bold: { fontWeight: 'bold', fontSize: 16 },
});

export default ReportsScreen;
