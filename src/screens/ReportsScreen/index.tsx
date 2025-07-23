import React, { useState, useCallback, useMemo } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useGetVisitorsByLocationAndDateQuery } from '../../api';
import { useAuth } from '../../contexts/AuthContext';
import Header from '../../components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ReportsScreen = () => {
  const navigation = useNavigation();
  const { userBranch } = useAuth();

  // 👉 Refetch on screen focus

  const [selectedBranch, setSelectedBranch] = useState(userBranch);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  // Properly memoized query params
  const queryParams = useMemo(() => {
    return {
      officeLocation: selectedBranch,
      startDate: startDate ? format(startDate, 'yyyy-MM-dd') : undefined,
      endDate: endDate ? format(endDate, 'yyyy-MM-dd') : undefined,
    };
  }, [selectedBranch, startDate, endDate]);

  const { data, isLoading, refetch } =
    useGetVisitorsByLocationAndDateQuery(queryParams);

  // Fetch selectedBranch from AsyncStorage on focus
  useFocusEffect(
    useCallback(() => {
      const fetchBranch = async () => {
        try {
          const storedBranch = await AsyncStorage.getItem('selectedBranch');
          if (storedBranch) {
            setSelectedBranch(storedBranch);
          }
        } catch (err) {
          console.error('❌ Error fetching branch from AsyncStorage:', err);
        }
      };
      fetchBranch();
    }, []),
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Report" showMenuButton />

      {/* Date Filters */}
      <View style={styles.dateRow}>
        <TouchableOpacity
          onPress={() => setShowStartPicker(true)}
          style={styles.dateButton}
        >
          <Text style={styles.dateText}>
            {startDate ? format(startDate, 'dd-MM-yyyy') : 'From Date'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setShowEndPicker(true)}
          style={styles.dateButton}
        >
          <Text style={styles.dateText}>
            {endDate ? format(endDate, 'dd-MM-yyyy') : 'To Date'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setStartDate(null);
            setEndDate(null);
            refetch();
          }}
          style={styles.resetButton}
        >
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

      {/* Visitor List */}
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
