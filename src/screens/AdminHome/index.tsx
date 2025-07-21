import React, { useState } from 'react';
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

const AdminHome = () => {
  const { userName, userBranch, selectedBranch, setSelectedBranch } = useAuth();
  const [branch, setBranch] = useState(userBranch[0] || 'All');
  const [branchModalVisible, setBranchModalVisible] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);

  const normalizedBranches = Array.isArray(userBranch)
    ? userBranch
    : userBranch
    ? [userBranch]
    : [];

  const formatDate = (date: Date) => format(date, 'yyyy-MM-dd');
  const officeLocation = selectedBranch;
  console.log(`nani`, formatDate);

  const handleResetDates = () => {
    const today = new Date();
    setStartDate(today);
    setEndDate(today);
  };

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
    data: dayData,
    isLoading: loadingLine,
    error: lineError,
  } = useGetDayGraphQuery({
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
                value={statsData?.pendingCount || '0'}
              />
              <StatCard title="Total In" value={statsData?.totalIn || '0'} />
              <StatCard title="Total Out" value={statsData?.totalOut || '0'} />
            </>
          )}
        </View>

        {/* Line Chart */}
        <Text style={styles.title}>Visitor Insights</Text>
        {loadingLine ? (
          <ActivityIndicator size="large" color="#00AEEF" />
        ) : lineError ? (
          <Text>Error loading line chart.</Text>
        ) : dayData?.length === 0 ? (
          <Text style={styles.noDataText}>
            No data available for this range.
          </Text>
        ) : (
          <VisitorInsightsChart data={dayData} />
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

// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   Text,
//   Image,
//   ActivityIndicator,
// } from 'react-native';
// import { Picker } from '@react-native-picker/picker';
// import { SafeAreaView } from 'react-native-safe-area-context';

// import Header from '../../components/Header';
// import StatCard from '../../components/SuperAdminPanel/StatCard';
// import VisitorInsightsChart from '../../components/SuperAdminPanel/VisitorInsightsChart';
// import VisitorPieChart from '../../components/SuperAdminPanel/VisitorPieChart';

// import {
//   useGetVisitorStatsQuery,
//   useGetDayGraphQuery,
//   useGetPurposeGraphQuery,
// } from '../../api';

// import { useAuth } from '../../contexts/AuthContext';

// const REPORT_FILTERS = [
//   'Today',
//   'Yesterday',
//   'Last 7 Days',
//   'Last 30 Days',
//   'This Month',
//   'Last Month',
// ];

// const AdminHome = () => {
//   const { userName, userBranch } = useAuth();

//   const [selectedRange, setSelectedRange] = useState('Today');

//   // 🔄 Fetch data using user's branch directly
//   const {
//     data: statsData,
//     isLoading: loadingStats,
//     error: statsError,
//   } = useGetVisitorStatsQuery({
//     branch: userBranch || 'All',
//     range: selectedRange,
//   });

//   const {
//     data: dayData,
//     isLoading: loadingLine,
//     error: lineError,
//   } = useGetDayGraphQuery({
//     branch: userBranch || 'All',
//     range: selectedRange,
//   });

//   const {
//     data: purposeData,
//     isLoading: loadingPie,
//     error: pieError,
//   } = useGetPurposeGraphQuery({
//     branch: userBranch || 'All',
//     range: selectedRange,
//   });

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: '#f8f9fa' }}>
//       <Header title="Home" showMenuButton />

//       <ScrollView style={styles.container}>
//         {/* Logo and Branch Display */}
//         <View style={styles.header}>
//           <Image
//             source={{
//               uri: 'https://emmvee.com/wp-content/uploads/2019/08/emvlogo.png',
//             }}
//             style={styles.logo}
//             resizeMode="contain"
//           />
//           <Text style={styles.branchLabel}>
//             Branch:{' '}
//             <Text style={styles.branchValue}>{userBranch || 'All'}</Text>
//           </Text>
//         </View>

//         {/* Range Dropdown */}
//         <View style={styles.pickerContainer}>
//           <Text style={styles.pickerLabel}>Select Range:</Text>
//           <Picker
//             selectedValue={selectedRange}
//             onValueChange={value => setSelectedRange(value)}
//             style={styles.picker}
//           >
//             {REPORT_FILTERS.map(filter => (
//               <Picker.Item key={filter} label={filter} value={filter} />
//             ))}
//           </Picker>
//         </View>

//         <Text style={styles.welcome}>Welcome, {userName || 'User'}</Text>

//         {/* Stat Cards */}
//         <View style={styles.cardRow}>
//           {loadingStats ? (
//             <ActivityIndicator size="large" color="#00AEEF" />
//           ) : statsError ? (
//             <Text>Error loading stats.</Text>
//           ) : (
//             <>
//               <StatCard
//                 title="Total Count"
//                 value={statsData?.totalCount || '0'}
//               />
//               <StatCard
//                 title="Pending"
//                 value={statsData?.pendingCount || '0'}
//               />
//               <StatCard title="Total In" value={statsData?.totalIn || '0'} />
//               <StatCard title="Total Out" value={statsData?.totalOut || '0'} />
//             </>
//           )}
//         </View>

//         {/* Line Chart */}
//         <Text style={styles.title}>Weekly Visitor Insights</Text>
//         {loadingLine ? (
//           <ActivityIndicator size="large" color="#00AEEF" />
//         ) : lineError ? (
//           <Text>Error loading line chart.</Text>
//         ) : (
//           <VisitorInsightsChart data={dayData} />
//         )}

//         {/* Pie Chart */}
//         <Text style={[styles.title, { marginTop: 40 }]}>
//           Visitor Type Breakdown
//         </Text>
//         {loadingPie ? (
//           <ActivityIndicator size="large" color="#00AEEF" />
//         ) : pieError ? (
//           <Text>Error loading pie chart.</Text>
//         ) : (
//           <VisitorPieChart data={purposeData} />
//         )}
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default AdminHome;

// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   Text,
//   Image,
//   ActivityIndicator,
//   Platform,
// } from 'react-native';
// import { Picker } from '@react-native-picker/picker';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { format } from 'date-fns';

// import Header from '../../components/Header';
// import StatCard from '../../components/SuperAdminPanel/StatCard';
// import VisitorInsightsChart from '../../components/SuperAdminPanel/VisitorInsightsChart';
// import VisitorPieChart from '../../components/SuperAdminPanel/VisitorPieChart';

// import {
//   useGetVisitorStatsQuery,
//   useGetDayGraphQuery,
//   useGetPurposeGraphQuery,
// } from '../../api';

// import { useAuth } from '../../contexts/AuthContext';

// const AdminHome = () => {
//   const { userName, userLocation = [], userBranch } = useAuth();
//   console.log('userBranch', userBranch);
//   const [branch, setBranch] = useState(userBranch);
//   const [fromDate, setFromDate] = useState(new Date());
//   const [toDate, setToDate] = useState(new Date());

//   const [showFromPicker, setShowFromPicker] = useState(false);
//   const [showToPicker, setShowToPicker] = useState(false);

//   const formatDate = date => format(date, 'yyyy-MM-dd');

//   const {
//     data: statsData,
//     isLoading: loadingStats,
//     error: statsError,
//   } = useGetVisitorStatsQuery({
//     branch,
//     from: formatDate(fromDate),
//     to: formatDate(toDate),
//   });

//   const {
//     data: dayData,
//     isLoading: loadingLine,
//     error: lineError,
//   } = useGetDayGraphQuery({
//     branch,
//     from: formatDate(fromDate),
//     to: formatDate(toDate),
//   });

//   const {
//     data: purposeData,
//     isLoading: loadingPie,
//     error: pieError,
//   } = useGetPurposeGraphQuery({
//     branch,
//     from: formatDate(fromDate),
//     to: formatDate(toDate),
//   });

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: '#f8f9fa' }}>
//       <Header title="Home" showMenuButton />

//       <ScrollView style={styles.container}>
//         {/* Logo and Branch Selector */}
//         <View style={styles.header}>
//           <Image
//             source={{
//               uri: 'https://emmvee.com/wp-content/uploads/2019/08/emvlogo.png',
//             }}
//             style={styles.logo}
//             resizeMode="contain"
//           />

//           {userLocation.length > 1 ? (
//             <View style={styles.branchPickerContainer}>
//               <Text style={styles.branchLabel}>Branch:</Text>
//               <Picker
//                 selectedValue={branch}
//                 onValueChange={value => setBranch(value)}
//                 style={styles.branchPicker}
//               >
//                 {userLocation.map(loc => (
//                   <Picker.Item key={loc} label={loc} value={loc} />
//                 ))}
//               </Picker>
//             </View>
//           ) : (
//             <Text style={styles.branchLabel}>
//               Branch: <Text style={styles.branchValue}>{branch}</Text>
//             </Text>
//           )}
//         </View>

//         {/* Date Range Picker */}
//         <View style={styles.dateRangeContainer}>
//           <TouchableOpacity
//             onPress={() => setShowFromPicker(true)}
//             style={styles.dateButton}
//           >
//             <Text style={styles.dateText}>From: {formatDate(fromDate)}</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             onPress={() => setShowToPicker(true)}
//             style={styles.dateButton}
//           >
//             <Text style={styles.dateText}>To: {formatDate(toDate)}</Text>
//           </TouchableOpacity>
//         </View>

//         {showFromPicker && (
//           <DateTimePicker
//             value={fromDate}
//             mode="date"
//             display={Platform.OS === 'ios' ? 'inline' : 'default'}
//             onChange={(e, selectedDate) => {
//               setShowFromPicker(false);
//               if (selectedDate) setFromDate(selectedDate);
//             }}
//           />
//         )}

//         {showToPicker && (
//           <DateTimePicker
//             value={toDate}
//             mode="date"
//             display={Platform.OS === 'ios' ? 'inline' : 'default'}
//             onChange={(e, selectedDate) => {
//               setShowToPicker(false);
//               if (selectedDate) setToDate(selectedDate);
//             }}
//           />
//         )}

//         <Text style={styles.welcome}>Welcome, {userName || 'User'}</Text>

//         {/* Stat Cards */}
//         <View style={styles.cardRow}>
//           {loadingStats ? (
//             <ActivityIndicator size="large" color="#00AEEF" />
//           ) : statsError ? (
//             <Text>Error loading stats.</Text>
//           ) : (
//             <>
//               <StatCard
//                 title="Total Count"
//                 value={statsData?.totalCount || '0'}
//               />
//               <StatCard
//                 title="Pending"
//                 value={statsData?.pendingCount || '0'}
//               />
//               <StatCard title="Total In" value={statsData?.totalIn || '0'} />
//               <StatCard title="Total Out" value={statsData?.totalOut || '0'} />
//             </>
//           )}
//         </View>

//         {/* Line Chart */}
//         <Text style={styles.title}>Visitor Insights</Text>
//         {loadingLine ? (
//           <ActivityIndicator size="large" color="#00AEEF" />
//         ) : lineError ? (
//           <Text>Error loading line chart.</Text>
//         ) : (
//           <VisitorInsightsChart data={dayData} />
//         )}

//         {/* Pie Chart */}
//         <Text style={[styles.title, { marginTop: 40 }]}>
//           Visitor Type Breakdown
//         </Text>
//         {loadingPie ? (
//           <ActivityIndicator size="large" color="#00AEEF" />
//         ) : pieError ? (
//           <Text>Error loading pie chart.</Text>
//         ) : (
//           <VisitorPieChart data={purposeData} />
//         )}
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default AdminHome;

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 16 },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   logo: { width: 100, height: 40 },
//   branchLabel: {
//     fontSize: 14,
//     color: '#1e293b',
//     fontWeight: '600',
//   },
//   branchValue: {
//     fontWeight: 'bold',
//     color: '#00AEEF',
//   },
//   pickerContainer: {
//     marginTop: 10,
//     marginBottom: 20,
//     backgroundColor: '#e2e8f0',
//     borderRadius: 8,
//     padding: 8,
//   },
//   pickerLabel: {
//     fontSize: 14,
//     marginBottom: 4,
//     color: '#1e293b',
//   },
//   picker: {
//     height: 40,
//     color: '#1e293b',
//   },
//   welcome: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#1e293b',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   cardRow: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//     marginBottom: 20,
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     color: '#1E293B',
//     textAlign: 'center',
//   },
// });

// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   Text,
//   Image,
//   ActivityIndicator,
//   Platform,
// } from 'react-native';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { format } from 'date-fns';

// import Header from '../../components/Header';
// import StatCard from '../../components/SuperAdminPanel/StatCard';
// import VisitorInsightsChart from '../../components/SuperAdminPanel/VisitorInsightsChart';
// import VisitorPieChart from '../../components/SuperAdminPanel/VisitorPieChart';

// import {
//   useGetVisitorStatsQuery,
//   useGetDayGraphQuery,
//   useGetPurposeGraphQuery,
// } from '../../api';

// import { useAuth } from '../../contexts/AuthContext';
// import BranchPicker from '../../components/BranchPicker';

// const AdminHome = () => {
//   const { userName, userBranch, selectedBranch, setSelectedBranch } = useAuth(); // userBranch is string[]
//   const [branch, setBranch] = useState(userBranch[0] || 'All');
//   const [branchModalVisible, setBranchModalVisible] = useState(false);
//   const [fromDate, setFromDate] = useState(new Date());
//   const [toDate, setToDate] = useState(new Date());

//   const [showFromPicker, setShowFromPicker] = useState(false);
//   const [showToPicker, setShowToPicker] = useState(false);

//   const formatDate = date => format(date, 'yyyy-MM-dd');

//   const {
//     data: statsData,
//     isLoading: loadingStats,
//     error: statsError,
//   } = useGetVisitorStatsQuery({
//     branch,
//     from: formatDate(fromDate),
//     to: formatDate(toDate),
//   });

//   const {
//     data: dayData,
//     isLoading: loadingLine,
//     error: lineError,
//   } = useGetDayGraphQuery({
//     branch,
//     from: formatDate(fromDate),
//     to: formatDate(toDate),
//   });

//   const {
//     data: purposeData,
//     isLoading: loadingPie,
//     error: pieError,
//   } = useGetPurposeGraphQuery({
//     branch,
//     from: formatDate(fromDate),
//     to: formatDate(toDate),
//   });
//   const handleBranchChange = (newBranch: string) => {
//     setBranch(newBranch); // local
//     setSelectedBranch(newBranch); // global context
//   };
//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: '#f8f9fa' }}>
//       <Header title="Home" showMenuButton />

//       <ScrollView style={styles.container}>
//         {/* Logo and Branch Selector */}
//         {/* <View style={styles.header}>
//           <Image
//             source={{
//               uri: 'https://emmvee.com/wp-content/uploads/2019/08/emvlogo.png',
//             }}
//             style={styles.logo}
//             resizeMode="contain"
//           />

//           {userBranch.length > 1 ? (
//             <View style={styles.branchPickerContainer}>
//               <Text style={styles.branchLabel}>Branch:</Text>
//               <Picker
//                 selectedValue={branch}
//                 onValueChange={value => setBranch(value)}
//                 style={styles.branchPicker}
//               >
//                 {userBranch.map(loc => (
//                   <Picker.Item key={loc} label={loc} value={loc} />
//                 ))}
//               </Picker>
//             </View>
//           ) : (
//             <Text style={styles.branchLabel}>
//               Branch: <Text style={styles.branchValue}>{branch}</Text>
//             </Text>
//           )}
//         </View> */}
//         <View style={styles.header}>
//           <Image
//             source={{
//               uri: 'https://emmvee.com/wp-content/uploads/2019/08/emvlogo.png',
//             }}
//             style={styles.logo}
//             resizeMode="contain"
//           />

//           {userBranch.length > 1 ? (
//             <View style={styles.branchPickerContainer}>
//               <Text style={styles.branchLabel}>Branch:</Text>

//               <TouchableOpacity
//                 onPress={() => setBranchModalVisible(true)}
//                 style={styles.branchSelector}
//               >
//                 <Text style={styles.branchValue}>{branch}</Text>
//               </TouchableOpacity>

//               <BranchPicker
//                 visible={branchModalVisible}
//                 onClose={() => setBranchModalVisible(false)}
//                 branches={userBranch}
//                 onSelect={handleBranchChange}
//                 selectedBranch={branch}
//               />
//             </View>
//           ) : (
//             <Text style={styles.branchLabel}>
//               Branch: <Text style={styles.branchValue}>{branch}</Text>
//             </Text>
//           )}
//         </View>

//         {/* Date Range Picker */}
//         <View style={styles.dateRangeContainer}>
//           <TouchableOpacity
//             onPress={() => setShowFromPicker(true)}
//             style={styles.dateButton}
//           >
//             <Text style={styles.dateText}>From: {formatDate(fromDate)}</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             onPress={() => setShowToPicker(true)}
//             style={styles.dateButton}
//           >
//             <Text style={styles.dateText}>To: {formatDate(toDate)}</Text>
//           </TouchableOpacity>
//         </View>

//         {showFromPicker && (
//           <DateTimePicker
//             value={fromDate}
//             mode="date"
//             display={Platform.OS === 'ios' ? 'inline' : 'default'}
//             onChange={(event, selectedDate) => {
//               setShowFromPicker(false);
//               if (selectedDate) setFromDate(selectedDate);
//             }}
//           />
//         )}

//         {showToPicker && (
//           <DateTimePicker
//             value={toDate}
//             mode="date"
//             display={Platform.OS === 'ios' ? 'inline' : 'default'}
//             onChange={(event, selectedDate) => {
//               setShowToPicker(false);
//               if (selectedDate) setToDate(selectedDate);
//             }}
//           />
//         )}

//         <Text style={styles.welcome}>Welcome, {userName || 'User'}</Text>

//         {/* Stat Cards */}
//         <View style={styles.cardRow}>
//           {loadingStats ? (
//             <ActivityIndicator size="large" color="#00AEEF" />
//           ) : statsError ? (
//             <Text>Error loading stats.</Text>
//           ) : (
//             <>
//               <StatCard
//                 title="Total Count"
//                 value={statsData?.totalCount || '0'}
//               />
//               <StatCard
//                 title="Pending"
//                 value={statsData?.pendingCount || '0'}
//               />
//               <StatCard title="Total In" value={statsData?.totalIn || '0'} />
//               <StatCard title="Total Out" value={statsData?.totalOut || '0'} />
//             </>
//           )}
//         </View>

//         {/* Line Chart */}
//         <Text style={styles.title}>Visitor Insights</Text>
//         {loadingLine ? (
//           <ActivityIndicator size="large" color="#00AEEF" />
//         ) : lineError ? (
//           <Text>Error loading line chart.</Text>
//         ) : (
//           <VisitorInsightsChart data={dayData} />
//         )}

//         {/* Pie Chart */}
//         <Text style={[styles.title, { marginTop: 40 }]}>
//           Visitor Type Breakdown
//         </Text>
//         {loadingPie ? (
//           <ActivityIndicator size="large" color="#00AEEF" />
//         ) : pieError ? (
//           <Text>Error loading pie chart.</Text>
//         ) : (
//           <VisitorPieChart data={purposeData} />
//         )}
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default AdminHome;

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 16 },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   logo: { width: 100, height: 40 },
//   branchLabel: {
//     fontSize: 14,
//     color: '#1e293b',
//     fontWeight: '600',
//   },
//   branchValue: {
//     fontWeight: 'bold',
//     color: '#00AEEF',
//   },
//   branchPickerContainer: {
//     marginLeft: 10,
//     flex: 1,
//     flexDirection: 'row',
//   },
//   branchPicker: {
//     height: 40,
//     color: '#1e293b',
//     width: 160,
//   },
//   dateRangeContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginVertical: 10,
//   },
//   dateButton: {
//     flex: 1,
//     backgroundColor: '#e2e8f0',
//     borderRadius: 8,
//     padding: 10,
//     marginHorizontal: 5,
//   },
//   dateText: {
//     color: '#1e293b',
//     textAlign: 'center',
//   },
//   welcome: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#1e293b',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   cardRow: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//     marginBottom: 20,
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     color: '#1E293B',
//     textAlign: 'center',
//   },
//   branchSelector: {
//     paddingVertical: 8,
//     paddingHorizontal: 12,
//     backgroundColor: '#e2e8f0',
//     borderRadius: 8,
//     marginTop: 4,
//     alignSelf: 'flex-start',
//   },
// });

// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   Text,
//   Image,
//   ActivityIndicator,
//   Platform,
// } from 'react-native';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { format } from 'date-fns';

// import Header from '../../components/Header';
// import StatCard from '../../components/SuperAdminPanel/StatCard';
// import VisitorInsightsChart from '../../components/SuperAdminPanel/VisitorInsightsChart';
// import VisitorPieChart from '../../components/SuperAdminPanel/VisitorPieChart';

// import {
//   useGetVisitorStatsQuery,
//   useGetDayGraphQuery,
//   useGetPurposeGraphQuery,
// } from '../../api';

// import { useAuth } from '../../contexts/AuthContext';
// import BranchPicker from '../../components/BranchPicker';

// const AdminHome = () => {
//   const { userName, userBranch, selectedBranch, setSelectedBranch } = useAuth();
//   const [branch, setBranch] = useState(userBranch[0] || 'All');
//   const [branchModalVisible, setBranchModalVisible] = useState(false);
//   const [startDate, setStartDate] = useState(new Date());
//   const [endDate, setendDate] = useState(new Date());

//   const [showFromPicker, setShowFromPicker] = useState(false);
//   const [showToPicker, setShowToPicker] = useState(false);

//   const formatDate = date => format(date, 'yyyy-MM-dd');
// const officeLocation=selectedBranch
//   const {
//     data: statsData,
//     isLoading: loadingStats,
//     error: statsError,
//   } = useGetVisitorStatsQuery({
//     officeLocation,
//     startDate: formatDate(startDate),
//     endDate: formatDate(endDate),
//   });

//   const {
//     data: dayData,
//     isLoading: loadingLine,
//     error: lineError,
//   } = useGetDayGraphQuery({
//     officeLocation,
//     startDate: formatDate(startDate),
//     endDate: formatDate(endDate),
//   });

//   const {
//     data: purposeData,
//     isLoading: loadingPie,
//     error: pieError,
//   } = useGetPurposeGraphQuery({
//     officeLocation,
//     startDate: formatDate(startDate),
//     endDate: formatDate(endDate),
//   });
//   console.log(purposeData);

//   const handleBranchChange = (newBranch: string) => {
//     setBranch(newBranch);
//     setSelectedBranch(newBranch);
//   };

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: '#f8f9fa' }}>
//       <Header title="Home" showMenuButton />

//       <ScrollView style={styles.container}>
//         <View style={styles.header}>
//           <Image
//             source={{
//               uri: 'https://emmvee.com/wp-content/uploads/2019/08/emvlogo.png',
//             }}
//             style={styles.logo}
//             resizeMode="contain"
//           />

//           {userBranch.length > 1 ? (
//             <View style={styles.branchPickerContainer}>
//               <Text style={styles.branchLabel}>Branch: </Text>
//               <TouchableOpacity
//                 onPress={() => setBranchModalVisible(true)}
//                 style={styles.branchSelector}
//               >
//                 <Text style={styles.branchValue}>{branch}</Text>
//               </TouchableOpacity>
//               <BranchPicker
//                 visible={branchModalVisible}
//                 onClose={() => setBranchModalVisible(false)}
//                 branches={userBranch}
//                 onSelect={handleBranchChange}
//                 selectedBranch={branch}
//               />
//             </View>
//           ) : (
//             <Text style={styles.branchLabel}>
//               Branch: <Text style={styles.branchValue}>{branch}</Text>
//             </Text>
//           )}
//         </View>
//         <Text style={styles.welcome}>Welcome, {userName || 'User'}</Text>
//         {/* Date Range Picker */}
//         <View style={styles.dateRangeContainer}>
//           <TouchableOpacity
//             onPress={() => setShowFromPicker(true)}
//             style={styles.dateButton}
//           >
//             <Text style={styles.dateText}>From: {formatDate(startDate)}</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             onPress={() => setShowToPicker(true)}
//             style={styles.dateButton}
//           >
//             <Text style={styles.dateText}>To: {formatDate(endDate)}</Text>
//           </TouchableOpacity>
//         </View>

//         {showFromPicker && (
//           <DateTimePicker
//             value={startDate}
//             mode="date"
//             display={Platform.OS === 'ios' ? 'inline' : 'default'}
//             onChange={(event, selectedDate) => {
//               setShowFromPicker(false);
//               if (selectedDate) setStartDate(selectedDate);
//             }}
//           />
//         )}

//         {showToPicker && (
//           <DateTimePicker
//             value={endDate}
//             mode="date"
//             display={Platform.OS === 'ios' ? 'inline' : 'default'}
//             onChange={(event, selectedDate) => {
//               setShowToPicker(false);
//               if (selectedDate) setendDate(selectedDate);
//             }}
//           />
//         )}

//         {/* Stat Cards */}
//         <View style={styles.cardRow}>
//           {loadingStats ? (
//             <ActivityIndicator size="large" color="#00AEEF" />
//           ) : statsError ? (
//             <Text>Error loading stats.</Text>
//           ) : (
//             <>
//               <StatCard
//                 title="Total Count"
//                 value={statsData?.totalCount || '0'}
//               />
//               <StatCard
//                 title="Pending"
//                 value={statsData?.pendingCount || '0'}
//               />
//               <StatCard title="Total In" value={statsData?.totalIn || '0'} />
//               <StatCard title="Total Out" value={statsData?.totalOut || '0'} />
//             </>
//           )}
//         </View>

//         {/* Line Chart */}
//         <Text style={styles.title}>Visitor Insights</Text>
//         {loadingLine ? (
//           <ActivityIndicator size="large" color="#00AEEF" />
//         ) : lineError ? (
//           <Text>Error loading line chart.</Text>
//         ) : (
//           <VisitorInsightsChart data={dayData} />
//         )}

//         {/* Pie Chart */}
//         <Text style={[styles.title, { marginTop: 40 }]}>
//           Visitor Type Breakdown
//         </Text>
//         {loadingPie ? (
//           <ActivityIndicator size="large" color="#00AEEF" />
//         ) : pieError ? (
//           <Text>Error loading pie chart.</Text>
//         ) : (
//           <VisitorPieChart data={purposeData} />
//         )}
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default AdminHome;

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 16 },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginBottom: 12,
//   },

//   logo: { width: 100, height: 40 },
//   branchLabel: {
//     fontSize: 14,
//     color: '#1e293b',
//     fontWeight: '600',
//     marginTop: 10,
//   },
//   branchValue: {
//     fontWeight: 'bold',
//     color: '#00AEEF',
//   },
//   branchPickerContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   dateRangeContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginVertical: 10,
//   },
//   dateButton: {
//     flex: 1,
//     backgroundColor: '#e2e8f0',
//     borderRadius: 8,
//     padding: 10,
//     marginHorizontal: 5,
//   },
//   dateText: {
//     color: '#1e293b',
//     textAlign: 'center',
//   },
//   welcome: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#1e293b',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   cardRow: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//     marginBottom: 20,
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     color: '#1E293B',
//     textAlign: 'center',
//   },
//   branchSelector: {
//     paddingVertical: 8,
//     paddingHorizontal: 12,
//     backgroundColor: '#e2e8f0',
//     borderRadius: 8,
//     marginTop: 4,
//     alignSelf: 'flex-start',
//   },
// });

// import React, { useState } from 'react';
// import {
//   View,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   Text,
//   Image,
//   ActivityIndicator,
//   Platform,
// } from 'react-native';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { format } from 'date-fns';

// import Header from '../../components/Header';
// import StatCard from '../../components/SuperAdminPanel/StatCard';
// import VisitorInsightsChart from '../../components/SuperAdminPanel/VisitorInsightsChart';
// import VisitorPieChart from '../../components/SuperAdminPanel/VisitorPieChart';

// import {
//   useGetVisitorStatsQuery,
//   useGetDayGraphQuery,
//   useGetPurposeGraphQuery,
// } from '../../api';

// import { useAuth } from '../../contexts/AuthContext';
// import BranchPicker from '../../components/BranchPicker';

// const AdminHome = () => {
//   const { userName, userBranch, selectedBranch, setSelectedBranch } = useAuth();

//   const [branch, setBranch] = useState(userBranch[0] || 'All');
//   const [branchModalVisible, setBranchModalVisible] = useState(false);

//   const [startDate, setStartDate] = useState(new Date());
//   const [endDate, setendDate] = useState(new Date());

//   const [showFromPicker, setShowFromPicker] = useState(false);
//   const [showToPicker, setShowToPicker] = useState(false);

//   const formatDate = (date: Date) => format(date, 'yyyy-MM-dd');

//   const officeLocation = selectedBranch;

//   const {
//     data: statsData,
//     isLoading: loadingStats,
//     error: statsError,
//   } = useGetVisitorStatsQuery({
//     officeLocation,
//     startDate: formatDate(startDate),
//     endDate: formatDate(endDate),
//   });

//   const {
//     data: dayData,
//     isLoading: loadingLine,
//     error: lineError,
//   } = useGetDayGraphQuery({
//     officeLocation,
//     startDate: formatDate(startDate),
//     endDate: formatDate(endDate),
//   });

//   const {
//     data: purposeData,
//     isLoading: loadingPie,
//     error: pieError,
//   } = useGetPurposeGraphQuery({
//     officeLocation,
//     startDate: formatDate(startDate),
//     endDate: formatDate(endDate),
//   });

//   const handleBranchChange = (newBranch: string) => {
//     setBranch(newBranch);
//     setSelectedBranch(newBranch);
//   };

//   const handleResetDates = () => {
//     const today = new Date();
//     setStartDate(today);
//     setendDate(today);
//   };

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: '#f8f9fa' }}>
//       <Header title="Home" showMenuButton />

//       <ScrollView style={styles.container}>
//         <View style={styles.header}>
//           <Image
//             source={{
//               uri: 'https://emmvee.com/wp-content/uploads/2019/08/emvlogo.png',
//             }}
//             style={styles.logo}
//             resizeMode="contain"
//           />

//           {userBranch.length > 1 ? (
//             <View style={styles.branchPickerContainer}>
//               <Text style={styles.branchLabel}>Branch: </Text>
//               <TouchableOpacity
//                 onPress={() => setBranchModalVisible(true)}
//                 style={styles.branchSelector}
//               >
//                 <Text style={styles.branchValue}>{branch}</Text>
//               </TouchableOpacity>
//               <BranchPicker
//                 visible={branchModalVisible}
//                 onClose={() => setBranchModalVisible(false)}
//                 branches={userBranch}
//                 onSelect={handleBranchChange}
//                 selectedBranch={branch}
//               />
//             </View>
//           ) : (
//             <Text style={styles.branchLabel}>
//               Branch: <Text style={styles.branchValue}>{branch}</Text>
//             </Text>
//           )}
//         </View>

//         <Text style={styles.welcome}>Welcome, {userName || 'User'}</Text>

//         {/* Date Range Picker */}
//         <View style={styles.dateRangeContainer}>
//           <TouchableOpacity
//             onPress={() => setShowFromPicker(true)}
//             style={styles.dateButton}
//           >
//             <Text style={styles.dateText}>From: {formatDate(startDate)}</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             onPress={() => setShowToPicker(true)}
//             style={styles.dateButton}
//           >
//             <Text style={styles.dateText}>To: {formatDate(endDate)}</Text>
//           </TouchableOpacity>
//         </View>

//         <TouchableOpacity onPress={handleResetDates} style={styles.resetButton}>
//           <Text style={styles.resetButtonText}>Reset Date</Text>
//         </TouchableOpacity>

//         {showFromPicker && (
//           <DateTimePicker
//             value={startDate}
//             mode="date"
//             display={Platform.OS === 'ios' ? 'inline' : 'default'}
//             onChange={(event, selectedDate) => {
//               setShowFromPicker(false);
//               if (selectedDate) setStartDate(selectedDate);
//             }}
//           />
//         )}

//         {showToPicker && (
//           <DateTimePicker
//             value={endDate}
//             mode="date"
//             display={Platform.OS === 'ios' ? 'inline' : 'default'}
//             onChange={(event, selectedDate) => {
//               setShowToPicker(false);
//               if (selectedDate) setendDate(selectedDate);
//             }}
//           />
//         )}

//         {/* Stat Cards */}
//         <View style={styles.cardRow}>
//           {loadingStats ? (
//             <ActivityIndicator size="large" color="#00AEEF" />
//           ) : statsError ? (
//             <Text>Error loading stats.</Text>
//           ) : (
//             <>
//               <StatCard
//                 title="Total Count"
//                 value={statsData?.totalCount || '0'}
//               />
//               <StatCard
//                 title="Pending"
//                 value={statsData?.pendingCount || '0'}
//               />
//               <StatCard title="Total In" value={statsData?.totalIn || '0'} />
//               <StatCard title="Total Out" value={statsData?.totalOut || '0'} />
//             </>
//           )}
//         </View>

//         {/* Line Chart */}
//         <Text style={styles.title}>Visitor Insights</Text>
//         {loadingLine ? (
//           <ActivityIndicator size="large" color="#00AEEF" />
//         ) : lineError ? (
//           <Text>Error loading line chart.</Text>
//         ) : (
//           <VisitorInsightsChart data={dayData} />
//         )}

//         {/* Pie Chart */}
//         <Text style={[styles.title, { marginTop: 40 }]}>
//           Visitor Type Breakdown
//         </Text>
//         {loadingPie ? (
//           <ActivityIndicator size="large" color="#00AEEF" />
//         ) : pieError ? (
//           <Text>Error loading pie chart.</Text>
//         ) : (
//           <VisitorPieChart data={purposeData} />
//         )}
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default AdminHome;

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 16 },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginBottom: 12,
//   },
//   logo: { width: 100, height: 40 },
//   branchLabel: {
//     fontSize: 14,
//     color: '#1e293b',
//     fontWeight: '600',
//     marginTop: 10,
//   },
//   branchValue: {
//     fontWeight: 'bold',
//     color: '#00AEEF',
//   },
//   branchPickerContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   dateRangeContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginVertical: 10,
//   },
//   dateButton: {
//     flex: 1,
//     backgroundColor: '#e2e8f0',
//     borderRadius: 8,
//     padding: 10,
//     marginHorizontal: 5,
//   },
//   dateText: {
//     color: '#1e293b',
//     textAlign: 'center',
//   },
//   resetButton: {
//     alignSelf: 'center',
//     backgroundColor: '#00AEEF',
//     paddingVertical: 8,
//     paddingHorizontal: 20,
//     borderRadius: 8,
//     marginBottom: 20,
//   },
//   resetButtonText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
//   welcome: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#1e293b',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   cardRow: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//     marginBottom: 20,
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     color: '#1E293B',
//     textAlign: 'center',
//   },
//   branchSelector: {
//     paddingVertical: 8,
//     paddingHorizontal: 12,
//     backgroundColor: '#e2e8f0',
//     borderRadius: 8,
//     marginTop: 4,
//     alignSelf: 'flex-start',
//   },
// });
