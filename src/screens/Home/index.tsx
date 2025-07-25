import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  Image,
  ActivityIndicator,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { format } from 'date-fns';

import Header from '../../components/Header';
import StatCard from '../../components/SuperAdminPanel/StatCard';
import VisitorInsightsChart from '../../components/SuperAdminPanel/VisitorInsightsChart';
import VisitorPieChart from '../../components/SuperAdminPanel/VisitorPieChart';

import {
  useGetVisitorStatsQuery,
  useGetDayGraphQuery,
  useGetPurposeGraphQuery,
} from '../../api';

import { useAuth } from '../../contexts/AuthContext';
import BranchPicker from '../../components/BranchPicker';
import { BRANCHES } from '../../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AdminHome = () => {
  const { userBranch, selectedBranch, setSelectedBranch } = useAuth();
  const [userName, setUserName] = useState<string | null>(null);
  const [branch, setBranch] = useState(userBranch[0] || 'All');
  const [branchModalVisible, setBranchModalVisible] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const getViewMode = (start: Date, end: Date) => {
    const diff = (end.getTime() - start.getTime()) / (1000 * 3600 * 24); // diff in days
    if (diff < 1) return 'hourly';
    if (diff <= 31) return 'daily';
    return 'monthly';
  };

  const viewMode = getViewMode(startDate, endDate);

  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);

  const normalizedBranches = Array.isArray(userBranch)
    ? userBranch.length > 1
      ? ['All', ...userBranch]
      : userBranch
    : userBranch
    ? [userBranch]
    : [];

  const formatDate = (date: Date) => format(date, 'yyyy-MM-dd');
  const officeLocation = selectedBranch;

  const handleResetDates = () => {
    const today = new Date();
    setStartDate(today);
    setEndDate(today);
  };
  const {
    data: hourlyData,
    isLoading: loadingHourly,
    error: hourlyError,
  } = useGetDayGraphQuery(
    {
      officeLocation,
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
    },
    { skip: viewMode !== 'hourly' },
  );

  const {
    data: dailyData,
    isLoading: loadingDaily,
    error: dailyError,
  } = useGetDayGraphQuery(
    {
      officeLocation,
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
    },
    { skip: viewMode !== 'daily' },
  );

  const {
    data: monthlyData,
    isLoading: loadingMonthly,
    error: monthlyError,
  } = useGetDayGraphQuery(
    {
      officeLocation,
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
    },
    { skip: viewMode !== 'monthly' },
  );

  const {
    data: statsData,
    isLoading: loadingStats,
    error: statsError,
  } = useGetVisitorStatsQuery({
    officeLocation,
    startDate: formatDate(startDate),
    endDate: formatDate(endDate),
  });

  const {
    data: purposeData,
    isLoading: loadingPie,
    error: pieError,
  } = useGetPurposeGraphQuery({
    officeLocation,
    startDate: formatDate(startDate),
    endDate: formatDate(endDate),
  });

  const handleBranchChange = (newBranch: string) => {
    setBranch(newBranch);
    setSelectedBranch(newBranch);
  };

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const name = await AsyncStorage.getItem('userName');
        console.log('Loaded userName:', name);
        if (name) setUserName(name);
      } catch (error) {
        console.error('Failed to load userName:', error);
      }
    };

    loadUserData();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f8f9fa' }}>
      <Header title="Home" showMenuButton />

      <ScrollView style={styles.container}>
        {/* Header Section */}
        <View style={styles.header}>
          <Image
            source={{
              uri: 'https://emmvee.com/wp-content/uploads/2019/08/emvlogo.png',
            }}
            style={styles.logo}
            resizeMode="contain"
          />

          {normalizedBranches.length > 1 ? (
            <View style={styles.branchPickerContainer}>
              <Text style={styles.branchLabel}>Branch: </Text>
              <TouchableOpacity
                onPress={() => setBranchModalVisible(true)}
                style={styles.branchSelector}
              >
                <Text style={styles.branchValue}>{branch}</Text>
              </TouchableOpacity>
              <BranchPicker
                visible={branchModalVisible}
                onClose={() => setBranchModalVisible(false)}
                branches={normalizedBranches} // ✅ FIXED: use normalizedBranches
                onSelect={handleBranchChange}
                selectedBranch={branch}
              />
            </View>
          ) : normalizedBranches.length === 1 ? (
            <Text style={styles.branchLabel}>
              Branch:{' '}
              <Text style={styles.branchValue}>{normalizedBranches[0]}</Text>
            </Text>
          ) : (
            <View style={styles.branchPickerContainer}>
              <Text style={styles.branchLabel}>Branch: </Text>
              <TouchableOpacity
                onPress={() => setBranchModalVisible(true)}
                style={styles.branchSelector}
              >
                <Text style={styles.branchValue}>{branch}</Text>
              </TouchableOpacity>
              <BranchPicker
                visible={branchModalVisible}
                onClose={() => setBranchModalVisible(false)}
                branches={BRANCHES} // ✅ fallback to full list
                onSelect={handleBranchChange}
                selectedBranch={branch}
              />
            </View>
          )}
        </View>

        {/* Welcome & Date Range */}
        <Text style={styles.welcome}>Welcome, {userName || 'User'}</Text>
        <View style={styles.dateRangeContainer}>
          <TouchableOpacity
            onPress={() => setShowFromPicker(true)}
            style={styles.dateButton}
          >
            <Text style={styles.dateText}>From: {formatDate(startDate)}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setShowToPicker(true)}
            style={styles.dateButton}
          >
            <Text style={styles.dateText}>To: {formatDate(endDate)}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleResetDates}
            style={styles.resetButton}
          >
            <Text style={styles.resetText}>Reset</Text>
          </TouchableOpacity>
        </View>

        {/* Date Pickers */}
        {showFromPicker && (
          <DateTimePicker
            value={startDate}
            mode="date"
            display={Platform.OS === 'ios' ? 'inline' : 'default'}
            onChange={(event, selectedDate) => {
              setShowFromPicker(false);
              if (selectedDate) setStartDate(selectedDate);
            }}
          />
        )}
        {showToPicker && (
          <DateTimePicker
            value={endDate}
            mode="date"
            display={Platform.OS === 'ios' ? 'inline' : 'default'}
            onChange={(event, selectedDate) => {
              setShowToPicker(false);
              if (selectedDate) setEndDate(selectedDate);
            }}
          />
        )}

        {/* Stats */}
        <View style={styles.cardRow}>
          {loadingStats ? (
            <ActivityIndicator size="large" color="#00AEEF" />
          ) : statsError ? (
            <Text>Error loading stats.</Text>
          ) : (
            <>
              <StatCard
                title="Total Count"
                value={statsData?.totalCount || '0'}
              />
              <StatCard
                title="Pending"
                value={statsData?.totalPending || '0'}
              />
              <StatCard title="Total In" value={statsData?.totalIn || '0'} />
              <StatCard title="Total Out" value={statsData?.totalOut || '0'} />
            </>
          )}
        </View>

        {/* Line Chart */}
        <Text style={styles.title}>
          {viewMode.toUpperCase()} - Visitor Insights
        </Text>
        {/* <Text
          style={{ textAlign: 'center', marginBottom: 8, color: '#64748b' }}
        >
          View Mode:
        </Text> */}

        {(viewMode === 'hourly' && loadingHourly) ||
        (viewMode === 'daily' && loadingDaily) ||
        (viewMode === 'monthly' && loadingMonthly) ? (
          <ActivityIndicator size="large" color="#00AEEF" />
        ) : (
          <>
            {viewMode === 'hourly' &&
              (hourlyData?.length ? (
                <VisitorInsightsChart
                  title="Hourly Trends (9AM - 6PM)"
                  data={hourlyData.filter(item => {
                    const hour = parseInt(item.label.split(':')[0], 10);
                    return hour >= 9 && hour <= 18;
                  })}
                />
              ) : (
                <Text style={styles.noDataText}>No hourly data available.</Text>
              ))}

            {viewMode === 'daily' &&
              (dailyData?.length ? (
                <VisitorInsightsChart title="Daily Trends" data={dailyData} />
              ) : (
                <Text style={styles.noDataText}>No daily data available.</Text>
              ))}

            {viewMode === 'monthly' &&
              (monthlyData?.length ? (
                <VisitorInsightsChart
                  title="Monthly Trends"
                  data={monthlyData}
                />
              ) : (
                <Text style={styles.noDataText}>
                  No monthly data available.
                </Text>
              ))}
          </>
        )}

        {/* Pie Chart */}
        <Text style={[styles.title, { marginTop: 40 }]}>
          Visitor Type Breakdown
        </Text>
        {loadingPie ? (
          <ActivityIndicator size="large" color="#00AEEF" />
        ) : pieError ? (
          <Text>Error loading pie chart.</Text>
        ) : purposeData?.length === 0 ? (
          <Text style={styles.noDataText}>
            No data available for this range.
          </Text>
        ) : (
          <VisitorPieChart data={purposeData} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default AdminHome;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  logo: { width: 100, height: 40 },
  branchLabel: {
    fontSize: 14,
    color: '#1e293b',
    fontWeight: '600',
    marginTop: 10,
  },
  branchValue: {
    fontWeight: 'bold',
    color: '#00AEEF',
  },
  branchPickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateRangeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  dateButton: {
    flex: 1,
    backgroundColor: '#e2e8f0',
    borderRadius: 8,
    padding: 10,
    marginHorizontal: 5,
  },
  resetButton: {
    backgroundColor: '#f43f5e',
    padding: 10,
    borderRadius: 8,
    marginLeft: 5,
  },
  resetText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  dateText: {
    color: '#1e293b',
    textAlign: 'center',
    fontSize: 13,
  },
  welcome: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 20,
    textAlign: 'center',
  },
  cardRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1E293B',
    textAlign: 'center',
  },
  noDataText: {
    color: '#64748b',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 10,
  },
  branchSelector: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#e2e8f0',
    borderRadius: 8,
    marginTop: 4,
    alignSelf: 'flex-start',
  },
});
