// import React, { useState } from 'react';
// import {
//   View,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   Text,
//   Image,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import Header from '../../components/Header';
// import BranchPicker from '../../components/SuperAdminPanel/BranchPicker';
// import WelcomeMessage from '../../components/SuperAdminPanel/WelcomeMessage';
// import StatCard from '../../components/SuperAdminPanel/StatCard';
// import VisitorInsightsChart from '../../components/SuperAdminPanel/VisitorInsightsChart';
// import VisitorPieChart from '../../components/SuperAdminPanel/VisitorPieChart';

// const SuperAdminPanelScreen = () => {
//   const branches = ['All', 'Airport Office', 'Dabaspet', 'Head Office'];
//   const [selectedBranch, setSelectedBranch] = useState('All');
//   const [branchModalVisible, setBranchModalVisible] = useState(false);

//   const lineData = [
//     { value: 40, label: 'Mon' },
//     { value: 65, label: 'Tue' },
//     { value: 55, label: 'Wed' },
//     { value: 80, label: 'Thu' },
//     { value: 70, label: 'Fri' },
//     { value: 90, label: 'Sat' },
//     { value: 100, label: 'Sun' },
//   ];

//   const pieData = [
//     { value: 40, color: '#FF6384', text: 'Visitors' },
//     { value: 30, color: '#36A2EB', text: 'Security' },
//     { value: 20, color: '#FFCE56', text: 'Hosts' },
//     { value: 10, color: '#4BC0C0', text: 'Others' },
//   ];

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: '#f8f9fa' }}>
//       <ScrollView style={styles.container}>
//         {/* Header */}
//         <Header title="Home" showMenuButton />
//         <View style={styles.header}>
//           <Image
//             source={{
//               uri: 'https://emmvee.com/wp-content/uploads/2019/08/emvlogo.png',
//             }}
//             style={styles.logo}
//             resizeMode="contain"
//           />
//           <TouchableOpacity
//             onPress={() => setBranchModalVisible(true)}
//             style={styles.branchDropdown}
//           >
//             <Text style={styles.branchText}>{selectedBranch}</Text>
//           </TouchableOpacity>
//         </View>

//         <BranchPicker
//           visible={branchModalVisible}
//           onClose={() => setBranchModalVisible(false)}
//           branches={branches}
//           onSelect={setSelectedBranch}
//         />

//         <WelcomeMessage />

//         {/* Stat Cards */}
//         <View style={styles.cardRow}>
//           <StatCard title="Total Count" value="12000" />
//           <StatCard title="Pending" value="50" />
//           <StatCard title="Total In" value="12" />
//           <StatCard title="Total Out" value="10" />
//         </View>

//         <Text style={styles.title}>Weekly Visitor Insights</Text>
//         <VisitorInsightsChart data={lineData} />

//         <Text style={[styles.title, { marginTop: 40 }]}>
//           Visitor Type Breakdown
//         </Text>
//         <VisitorPieChart data={pieData} />
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default SuperAdminPanelScreen;

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 16, backgroundColor: '#f8f9fa' },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   logo: { width: 100, height: 40 },
//   branchDropdown: {
//     paddingVertical: 6,
//     paddingHorizontal: 12,
//     backgroundColor: '#e2e8f0',
//     borderRadius: 8,
//   },
//   branchText: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#1e293b',
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
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { useRoute } from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// import Header from '../../components/Header';
// import BranchPicker from '../../components/SuperAdminPanel/BranchPicker';
// import WelcomeMessage from '../../components/SuperAdminPanel/WelcomeMessage';
// import StatCard from '../../components/SuperAdminPanel/StatCard';
// import VisitorInsightsChart from '../../components/SuperAdminPanel/VisitorInsightsChart';
// import VisitorPieChart from '../../components/SuperAdminPanel/VisitorPieChart';

// import {
//   useGetDayGraphQuery,
//   useGetPurposeGraphQuery,
//   useGetVisitorStatsQuery,
// } from '../../api';

// const branches = ['All', 'Airport Office', 'Dabaspet', 'Head Office'];

// const Home = () => {
//   const route = useRoute();
//   const { role = 'superadmin' } = route.params || {};

//   const [selectedBranch, setSelectedBranch] = useState('All');
//   const [branchModalVisible, setBranchModalVisible] = useState(false);
//   const [userName, setUserName] = useState('');

//   // Load user name from AsyncStorage
//   useEffect(() => {
//     const fetchUser = async () => {
//       const userStr = await AsyncStorage.getItem('user');
//       if (userStr) {
//         const user = JSON.parse(userStr);
//         setUserName(user.userName || user.name || 'User');
//       }
//     };
//     fetchUser();
//   }, []);

//   // Queries with selectedBranch
//   const {
//     data: statsData,
//     isLoading: loadingStats,
//     refetch: refetchStats,
//   } = useGetVisitorStatsQuery(selectedBranch);

//   const {
//     data: dayData,
//     isLoading: loadingLine,
//     refetch: refetchLine,
//   } = useGetDayGraphQuery(selectedBranch);

//   const {
//     data: purposeData,
//     isLoading: loadingPie,
//     refetch: refetchPie,
//   } = useGetPurposeGraphQuery(selectedBranch);

//   // Trigger refetch on branch change
//   useEffect(() => {
//     refetchStats();
//     refetchLine();
//     refetchPie();
//   }, [selectedBranch]);

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: '#f8f9fa' }}>
//       <ScrollView style={styles.container}>
//         <Header title="Home" showMenuButton />
//         <View style={styles.header}>
//           <Image
//             source={{
//               uri: 'https://emmvee.com/wp-content/uploads/2019/08/emvlogo.png',
//             }}
//             style={styles.logo}
//             resizeMode="contain"
//           />
//           <TouchableOpacity
//             onPress={() => setBranchModalVisible(true)}
//             style={styles.branchDropdown}
//           >
//             <Text style={styles.branchText}>{selectedBranch}</Text>
//           </TouchableOpacity>
//         </View>

//         {/* Branch Picker */}
//         <BranchPicker
//           visible={branchModalVisible}
//           onClose={() => setBranchModalVisible(false)}
//           branches={branches}
//           onSelect={setSelectedBranch}
//         />

//         <Text style={styles.welcome}>Welcome, {userName} 👋</Text>

//         {/* <WelcomeMessage /> */}

//         {/* Stat Cards */}
//         <View style={styles.cardRow}>
//           {loadingStats ? (
//             <ActivityIndicator size="large" color="#00AEEF" />
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

//         <Text style={styles.title}>Weekly Visitor Insights</Text>
//         {loadingLine ? (
//           <ActivityIndicator size="large" color="#00AEEF" />
//         ) : (
//           <VisitorInsightsChart data={dayData?.data || []} />
//         )}

//         <Text style={[styles.title, { marginTop: 40 }]}>
//           Visitor Type Breakdown
//         </Text>
//         {loadingPie ? (
//           <ActivityIndicator size="large" color="#00AEEF" />
//         ) : (
//           <VisitorPieChart data={purposeData?.data || []} />
//         )}
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default Home;

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 16, backgroundColor: '#f8f9fa' },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   logo: { width: 100, height: 40 },
//   branchDropdown: {
//     paddingVertical: 6,
//     paddingHorizontal: 12,
//     backgroundColor: '#e2e8f0',
//     borderRadius: 8,
//   },
//   branchText: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#1e293b',
//   },
//   welcome: {
//     fontSize: 18,
//     color: '#1e293b',
//     fontWeight: 'bold',
//     marginVertical: 10,
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
import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  Image,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Header from '../../components/Header';
import BranchPicker from '../../components/SuperAdminPanel/BranchPicker';
import StatCard from '../../components/SuperAdminPanel/StatCard';
import VisitorInsightsChart from '../../components/SuperAdminPanel/VisitorInsightsChart';
import VisitorPieChart from '../../components/SuperAdminPanel/VisitorPieChart';

import {
  useGetDayGraphQuery,
  useGetPurposeGraphQuery,
  useGetVisitorStatsQuery,
} from '../../api';

import { BRANCHES } from '../../constants';
import { useAuth } from '../../contexts/AuthContext';

const SuperAdminPanelScreen = () => {
  const route = useRoute();
  // const { role = 'superadmin' } = route.params || {};
  const { userName } = useAuth();
  // console.log('🚀 userName:', userName);

  const [selectedBranch, setSelectedBranch] = useState('All');
  const [branchModalVisible, setBranchModalVisible] = useState(false);

  // Load last selected branch from storage
  useEffect(() => {
    const loadBranch = async () => {
      const savedBranch = await AsyncStorage.getItem('selectedBranch');
      if (savedBranch) setSelectedBranch(savedBranch);
    };
    loadBranch();
  }, []);

  // Save selected branch to storage
  useEffect(() => {
    AsyncStorage.setItem('selectedBranch', selectedBranch);
  }, [selectedBranch]);

  // Graph and Stats Queries
  const {
    data: statsData,
    isLoading: loadingStats,
    refetch: refetchStats,
  } = useGetVisitorStatsQuery(selectedBranch);

  const {
    data: dayData,
    isLoading: loadingLine,
    refetch: refetchLine,
  } = useGetDayGraphQuery(selectedBranch);

  const {
    data: purposeData,
    isLoading: loadingPie,
    refetch: refetchPie,
  } = useGetPurposeGraphQuery(selectedBranch);

  useEffect(() => {
    refetchStats();
    refetchLine();
    refetchPie();
    // console.log('📌 Selected Branch:', selectedBranch);
  }, [selectedBranch]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f8f9fa' }}>
      <ScrollView style={styles.container}>
        <Header title="Home" showMenuButton />

        {/* Logo & Branch Selector */}
        <View style={styles.header}>
          <Image
            source={{
              uri: 'https://emmvee.com/wp-content/uploads/2019/08/emvlogo.png',
            }}
            style={styles.logo}
            resizeMode="contain"
          />
          <TouchableOpacity
            onPress={() => setBranchModalVisible(true)}
            style={styles.branchDropdown}
          >
            <Text style={styles.branchText}>{selectedBranch}</Text>
          </TouchableOpacity>
        </View>

        {/* Branch Modal Picker */}
        <BranchPicker
          visible={branchModalVisible}
          onClose={() => setBranchModalVisible(false)}
          branches={BRANCHES}
          onSelect={setSelectedBranch}
        />

        <Text style={styles.welcome}>Welcome, {userName || 'User'}</Text>

        {/* Stat Cards */}
        <View style={styles.cardRow}>
          {loadingStats ? (
            <ActivityIndicator size="large" color="#00AEEF" />
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

        {/* Graphs */}
        <Text style={styles.title}>Weekly Visitor Insights</Text>
        {loadingLine ? (
          <ActivityIndicator size="large" color="#00AEEF" />
        ) : (
          <VisitorInsightsChart data={dayData?.data || []} />
        )}

        <Text style={[styles.title, { marginTop: 40 }]}>
          Visitor Type Breakdown
        </Text>
        {loadingPie ? (
          <ActivityIndicator size="large" color="#00AEEF" />
        ) : (
          <VisitorPieChart data={purposeData?.data || []} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default SuperAdminPanelScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f8f9fa' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: { width: 100, height: 40 },
  branchDropdown: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#e2e8f0',
    borderRadius: 8,
  },
  branchText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
  },
  welcome: {
    fontSize: 18,
    color: '#1e293b',
    fontWeight: 'bold',
    marginVertical: 10,
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
});
