import React, { useState, useMemo } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Platform,
  Modal,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import { useGetVisitorsByLocationAndDateQuery } from '../../api';
import { useAuth } from '../../contexts/AuthContext';
import Header from '../../components/Header';
import { Picker } from '@react-native-picker/picker';

const ReportsScreen = () => {
  const { selectedBranch } = useAuth();
  const [showIOSPicker, setShowIOSPicker] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [range, setRange] = useState<'lastWeek' | 'lastMonth' | null>(null);

  const queryParams = useMemo(() => {
    return {
      officeLocation: selectedBranch,
      startDate: startDate
        ? new Date(startDate.setHours(0, 0, 0, 0)).toISOString()
        : undefined,
      endDate: endDate
        ? new Date(endDate.setHours(23, 59, 59, 999)).toISOString()
        : undefined,
      range: range || undefined,
    };
  }, [selectedBranch, startDate, endDate, range]);

  const { data, isLoading } = useGetVisitorsByLocationAndDateQuery(queryParams);

  const getLabelForValue = val => {
    switch (val) {
      case 'lastWeek':
        return 'Last Week';
      case 'lastMonth':
        return 'Last Month';
      default:
        return '';
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Report" showMenuButton />

      {/* 📆 Date Filters */}
      <View style={styles.dateRow}>
        <TouchableOpacity
          onPress={() => !range && setShowStartPicker(true)}
          style={[styles.dateButton, range && styles.disabledDateButton]}
          disabled={!!range}
        >
          <Text style={styles.dateText}>
            {startDate ? format(startDate, 'dd-MM-yyyy') : 'From Date'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => !range && setShowEndPicker(true)}
          style={[styles.dateButton, range && styles.disabledDateButton]}
          disabled={!!range}
        >
          <Text style={styles.dateText}>
            {endDate ? format(endDate, 'dd-MM-yyyy') : 'To Date'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setRange(null);
            setStartDate(null);
            setEndDate(null);
          }}
          style={styles.resetButton}
        >
          <Text style={styles.resetText}>Reset</Text>
        </TouchableOpacity>
      </View>

      {/* 🔽 Range Selector */}

      <View style={styles.dropdownContainer}>
        {Platform.OS === 'android' ? (
          <Picker
            selectedValue={range}
            onValueChange={value => {
              setRange(value);
              if (value) {
                setStartDate(null);
                setEndDate(null);
              }
            }}
            style={styles.pickerAndroid}
          >
            <Picker.Item label="Select Range" value={null} />
            <Picker.Item label="Last Week" value="lastWeek" />
            <Picker.Item label="Last Month" value="lastMonth" />
          </Picker>
        ) : (
          <>
            <TouchableOpacity
              style={styles.customIOSDropdown}
              onPress={() => setShowIOSPicker(true)}
            >
              <Text>{getLabelForValue(range) || 'Select Range'}</Text>
            </TouchableOpacity>

            {showIOSPicker && (
              <Modal transparent animationType="slide">
                <View style={styles.modalContainer}>
                  <View style={styles.modalContent}>
                    <Picker
                      selectedValue={range}
                      onValueChange={value => {
                        setRange(value);
                        setStartDate(null);
                        setEndDate(null);
                        setShowIOSPicker(false);
                      }}
                    >
                      <Picker.Item label="Select Range" value={null} />
                      <Picker.Item label="Last Week" value="lastWeek" />
                      <Picker.Item label="Last Month" value="lastMonth" />
                    </Picker>
                    <TouchableOpacity onPress={() => setShowIOSPicker(false)}>
                      <Text style={styles.closeButton}>Done</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            )}
          </>
        )}
      </View>

      {/* 📅 Date Pickers */}
      {showStartPicker && (
        <DateTimePicker
          value={startDate || new Date()}
          mode="date"
          display="default"
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
          display="default"
          onChange={(e, date) => {
            setShowEndPicker(false);
            if (date) setEndDate(date);
          }}
        />
      )}

      {/* 🧾 Visitor List */}
      {isLoading ? (
        <ActivityIndicator
          size="large"
          color="#007bff"
          style={{ marginTop: 20 }}
        />
      ) : (
        <FlatList
          data={data?.data || []}
          keyExtractor={item => item._id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.name}>
                {item.firstName} {item.lastName}
              </Text>
              <Text style={styles.detail}>
                {item.email || 'N/A'} | {item.phoneNumber}
              </Text>
              <Text style={styles.detail}>
                {item.officeLocation} | Badge: {item.badgeNumber}
              </Text>
              <Text style={styles.status}>
                Status:{' '}
                <Text
                  style={{
                    color: item.status === 'checkedIn' ? 'green' : '#FF9500',
                  }}
                >
                  {item.status}
                </Text>
              </Text>
              <Text style={styles.detail}>Purpose: {item.purposeOfVisit}</Text>
              <Text style={styles.detail}>To Meet: {item.personToMeet}</Text>
              <Text style={styles.detail}>
                In: {format(new Date(item.checkin), 'dd-MM-yyyy, HH:mm:ss')}
              </Text>
              <Text style={styles.detail}>
                Out:{' '}
                {item.checkout
                  ? format(new Date(item.checkout), 'dd-MM-yyyy, HH:mm:ss')
                  : 'N/A'}
              </Text>
            </View>
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No visitors found.</Text>
          }
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  dropdownContainer: {
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: Platform.OS === 'ios' ? 12 : 4,
    backgroundColor: '#f9f9f9',
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
    backgroundColor: '#fff',
  },
  disabledDateButton: {
    backgroundColor: '#eee',
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
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: '#f9f9f9',
    overflow: 'hidden',
  },
  pickerIOS: {
    height: 100, // required on iOS
    width: '100%',
  },
  pickerAndroid: {
    height: 50,
    width: '100%',
  },
  customIOSDropdown: {
    borderWidth: 0,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 12,
    backgroundColor: '#f9f9f9',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  closeButton: {
    marginTop: 12,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#007AFF',
  },
  pickerAndroid: {
    height: 50,
    width: '100%',
  },
});

export default ReportsScreen;
