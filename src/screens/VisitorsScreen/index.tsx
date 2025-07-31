// import React, { useState, useMemo, useEffect } from 'react';
// import {
//   View,
//   FlatList,
//   SafeAreaView,
//   ActivityIndicator,
//   Text,
//   StyleSheet,
// } from 'react-native';

// import Header from '../../components/Header';
// import VisitorFilterBar from '../../components/VisitorFilterBar';
// import VisitorCard from '../../components/VisitorCard';
// import { useAuth } from '../../contexts/AuthContext';
// import {
//   useGetVisitorsByBranchQuery,
//   useUpdateVisitorMutation,
// } from '../../api';
// import { showErrorMessage, showSuccessMessage } from '../../utils/Globals';

// const VisitorsScreen = () => {
//   const { userRole, selectedBranch } = useAuth();

//   const [phone, setPhone] = useState('');
//   const [badge, setBadge] = useState('');
//   const [statusFilter, setStatusFilter] = useState('All');

//   const {
//     data: response,
//     isLoading,
//     isFetching,
//     refetch,
//   } = useGetVisitorsByBranchQuery({
//     officeLocation: selectedBranch,
//     page,
//     limit: PAGE_SIZE,
//   });

//   const [updateVisitor] = useUpdateVisitorMutation();
//   const visitorData = response?.data || [];
//   const PAGE_SIZE = 100;
//   const [page, setPage] = useState(1);

//   // const filteredVisitors = visitorData.filter(visitor => {
//   //   return (
//   //     (statusFilter === 'All' || visitor.status === statusFilter) &&
//   //     (visitor.phoneNumber?.toLowerCase().includes(phone.toLowerCase()) ??
//   //       true) &&
//   //     (visitor.badgeNumber?.toLowerCase().includes(badge.toLowerCase()) ?? true)
//   //   );
//   // });
//   const filteredVisitors = useMemo(() => {
//     const filtered = visitorData.filter(visitor => {
//       return (
//         (statusFilter === 'All' || visitor.status === statusFilter) &&
//         (visitor.phoneNumber?.toLowerCase().includes(phone.toLowerCase()) ??
//           true) &&
//         (visitor.badgeNumber?.toLowerCase().includes(badge.toLowerCase()) ??
//           true)
//       );
//     });
//     return filtered;
//   }, [visitorData, phone, badge, statusFilter]);

//   const paginatedVisitors = useMemo(() => {
//     const startIndex = (page - 1) * PAGE_SIZE;
//     return filteredVisitors.slice(0, startIndex + PAGE_SIZE);
//   }, [filteredVisitors, page]);

//   const handleUpdate = async payload => {
//     try {
//       // console.log('payload', payload);
//       const response = await updateVisitor(payload).unwrap();

//       showSuccessMessage({
//         message: response?.message || 'Updated successfully',
//         duration: 3000,
//       });

//       refetch();
//     } catch (error) {
//       console.error('❌ Error updating visitor:', error);
//       showErrorMessage({
//         message: 'Failed to update visitor.',
//         duration: 3000,
//       });
//     }
//   };

//   const handleResetFilters = () => {
//     setPhone('');
//     setBadge('');
//     setStatusFilter('All');
//     setPage(1);
//     refetch();
//   };
//   useEffect(() => {
//     setPage(1);
//   }, [phone, badge, statusFilter]);
//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: '#f9fbfd' }}>
//       <View style={{ flex: 1, padding: 16 }}>
//         <Header title="Visitors" showMenuButton />

//         <VisitorFilterBar
//           phone={phone}
//           setPhone={setPhone}
//           badge={badge}
//           setBadge={setBadge}
//           statusFilter={statusFilter}
//           setStatusFilter={setStatusFilter}
//           onReset={handleResetFilters}
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
//             data={paginatedVisitors}
//             keyExtractor={item => item._id}
//             renderItem={({ item }) => (
//               <VisitorCard
//                 item={item}
//                 userRole={userRole}
//                 onUpdateVisitor={handleUpdate}
//               />
//             )}
//             refreshing={isLoading}
//             onRefresh={() => {
//               setPage(1); // Reset pagination on pull-to-refresh
//               refetch();
//             }}
//             onEndReachedThreshold={0.5}
//             onEndReached={() => {
//               if (paginatedVisitors.length < filteredVisitors.length) {
//                 setPage(prev => prev + 1);
//               }
//             }}
//             contentContainerStyle={{ paddingBottom: 20 }}
//           />
//         )}
//       </View>
//     </SafeAreaView>
//   );
// };

// export default VisitorsScreen;

// const styles = StyleSheet.create({
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0,0,0,0.5)',
//   },
//   modalContent: {
//     width: '85%',
//     backgroundColor: '#fff',
//     padding: 20,
//     borderRadius: 10,
//     elevation: 10,
//   },
//   modalTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     marginBottom: 12,
//   },
//   modalInput: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     padding: 10,
//     borderRadius: 6,
//     marginBottom: 12,
//     fontSize: 14,
//   },
//   saveButton: {
//     backgroundColor: '#28a745',
//     padding: 12,
//     borderRadius: 6,
//     width: '100%',
//     marginTop: 12,
//   },
//   saveText: {
//     color: '#fff',
//     textAlign: 'center',
//     fontWeight: '600',
//   },
// });

import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
  Text,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAuth } from '../../contexts/AuthContext';
import {
  useGetVisitorsByBranchQuery,
  useFilterVisitorsQuery,
  useUpdateVisitorMutation,
} from '../../api';

import VisitorCard from '../../components/VisitorCard';
import Header from '../../components/Header';
import VisitorFilterBar from '../../components/VisitorFilterBar';
import { showSuccessMessage, showErrorMessage } from '../../utils/Globals';

const PAGE_SIZE = 10;

const VisitorsScreen = () => {
  const { selectedBranch, userRole } = useAuth();
  const [page, setPage] = useState(1);
  const [allVisitors, setAllVisitors] = useState<any[]>([]);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [badge, setBadge] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const isFilterApplied = phoneNumber || badge || statusFilter !== 'All';

  const {
    data: branchData,
    isLoading: branchLoading,
    isFetching: branchFetching,
    refetch: refetchBranch,
  } = useGetVisitorsByBranchQuery(
    { officeLocation: selectedBranch, page, limit: PAGE_SIZE },
    { skip: isFilterApplied },
  );

  const {
    data: filteredData,
    isLoading: filterLoading,
    isFetching: filterFetching,
    refetch: refetchFilter,
  } = useFilterVisitorsQuery(
    {
      officeLocation: selectedBranch,
      phoneNumber,
      badge,
      status: statusFilter,
    },
    { skip: !isFilterApplied },
  );

  const [updateVisitor] = useUpdateVisitorMutation();

  // 🟡 Handle filter data
  useEffect(() => {
    if (isFilterApplied && filteredData?.responseData) {
      setAllVisitors(filteredData.responseData || []);
    }
  }, [filteredData, isFilterApplied]);

  // 🟢 Handle non-filter data
  useEffect(() => {
    if (!isFilterApplied) {
      if (page === 1) {
        setAllVisitors(branchData?.data || []);
        // console.log('branchData', branchData?.data);
      } else if (branchData?.data?.length > 0) {
        setAllVisitors(prev => [...prev, ...branchData.data]);
      }
    }
  }, [branchData, page, isFilterApplied]);

  // 🔁 Reset visitors on filter change
  // useEffect(() => {
  //   setPage(1);
  //   if (!isFilterApplied) {
  //     setAllVisitors([]);
  //   }
  // }, [phoneNumber, badge, statusFilter]);

  // 🔄 Refetch data when filters are cleared
  useEffect(() => {
    if (!isFilterApplied && page === 1) {
      refetchBranch();
    }
  }, [isFilterApplied, page]);

  // ⬇️ Load more pagination
  const handleLoadMore = () => {
    if (
      !isFilterApplied &&
      !branchFetching &&
      branchData?.data?.length === PAGE_SIZE
    ) {
      setPage(prev => prev + 1);
    }
  };

  // 🔁 Pull to refresh
  const handleRefresh = () => {
    setPage(1);
    if (isFilterApplied) {
      refetchFilter();
    } else {
      refetchBranch();
    }
  };

  // ♻️ Reset filter values
  const handleResetFilters = () => {
    setPhoneNumber('');
    setBadge('');
    setStatusFilter('All');
    setPage(1);
  };

  // ✅ Update visitor API call
  const handleUpdateVisitor = async payload => {
    try {
      const response = await updateVisitor(payload).unwrap();
      showSuccessMessage({
        message: response?.message || 'Updated successfully',
        duration: 3000,
      });
      handleRefresh();
    } catch (error) {
      console.error('❌ Error updating visitor:', error);
      showErrorMessage({
        message: 'Failed to update visitor.',
        duration: 3000,
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Visitor List" showMenuButton />
      <VisitorFilterBar
        phone={phoneNumber}
        setPhone={setPhoneNumber}
        badge={badge}
        setBadge={setBadge}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        onResetFilters={handleResetFilters}
      />

      {(branchLoading || filterLoading) && page === 1 ? (
        <ActivityIndicator size="large" style={styles.loading} />
      ) : (
        <FlatList
          data={allVisitors}
          keyExtractor={(item, index) => `${item._id}_${index}`}
          renderItem={({ item }) => (
            <VisitorCard
              item={item}
              userRole={userRole}
              onUpdateVisitor={handleUpdateVisitor}
            />
          )}
          contentContainerStyle={styles.listContainer}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          refreshControl={
            <RefreshControl
              refreshing={(branchFetching || filterFetching) && page === 1}
              onRefresh={handleRefresh}
            />
          }
          ListFooterComponent={
            !isFilterApplied && branchFetching && page > 1 ? (
              <ActivityIndicator style={styles.loadingMore} />
            ) : null
          }
          ListEmptyComponent={
            !(branchLoading || filterLoading) && allVisitors.length === 0 ? (
              <Text style={styles.emptyText}>No visitors found</Text>
            ) : null
          }
        />
      )}
    </SafeAreaView>
  );
};

export default VisitorsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  loading: {
    marginTop: 32,
  },
  loadingMore: {
    marginVertical: 16,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 48,
    fontSize: 16,
    color: '#888',
  },
});

// import React, { useEffect, useState, useCallback } from 'react';
// import {
//   View,
//   FlatList,
//   ActivityIndicator,
//   RefreshControl,
//   StyleSheet,
//   Text,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';

// import { useAuth } from '../../contexts/AuthContext';
// import {
//   useGetVisitorsByBranchQuery,
//   useFilterVisitorsQuery,
//   useUpdateVisitorMutation,
// } from '../../api';
// import VisitorCard from '../../components/VisitorCard';
// import Header from '../../components/Header';
// import VisitorFilterBar from '../../components/VisitorFilterBar';

// const PAGE_SIZE = 10;

// const VisitorsScreen = () => {
//   const { selectedBranch, userRole } = useAuth();
//   const [page, setPage] = useState(1);
//   const [allVisitors, setAllVisitors] = useState<any[]>([]);
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [badge, setBadge] = useState('');
//   const [statusFilter, setStatusFilter] = useState('All');

//   const isFilterApplied = phoneNumber || badge || statusFilter !== 'All';

//   const {
//     data: branchData,
//     isLoading: branchLoading,
//     isFetching: branchFetching,
//     refetch: refetchBranch,
//   } = useGetVisitorsByBranchQuery(
//     { officeLocation: selectedBranch, page, limit: PAGE_SIZE },
//     { skip: isFilterApplied }, // ⛔ skip if filter is applied
//   );
//   const {
//     data: filteredData,
//     isLoading: filterLoading,
//     isFetching: filterFetching,
//     refetch: refetchFilter,
//   } = useFilterVisitorsQuery(
//     {
//       officeLocation: selectedBranch,
//       phoneNumber: phoneNumber,
//       badge,
//       status: statusFilter,
//     },
//     { skip: !isFilterApplied }, // ⛔ skip if filter not applied
//   );

//   // console.log('allVisitors', allVisitors);

//   useEffect(() => {
//     if (isFilterApplied && filteredData?.responseData) {
//       // console.log('filteredData', filteredData);
//       setAllVisitors(filteredData.responseData || []);
//     }
//   }, [filteredData, isFilterApplied]);

//   useEffect(() => {
//     if (!isFilterApplied) {
//       if (page === 1) {
//         setAllVisitors(branchData?.data || []);
//         console.log('branchData', branchData?.data);
//       } else if (branchData?.data?.length > 0) {
//         setAllVisitors(prev => [...prev, ...branchData.data]);
//         console.log('branchData1', branchData?.data);
//       }
//     }
//   }, [branchData, page, !isFilterApplied]);

//   // useEffect(() => {
//   //   setPage(1);
//   //   if (!isFilterApplied) {
//   //     setAllVisitors([]); // only clear if not filtering
//   //   }
//   // }, [phoneNumber, badge, statusFilter]);

//   const handleLoadMore = () => {
//     if (
//       !isFilterApplied &&
//       !branchFetching &&
//       branchData?.data?.length === PAGE_SIZE
//     ) {
//       setPage(prev => prev + 1);
//     }
//   };

//   const handleRefresh = () => {
//     setPage(1);
//     if (isFilterApplied) {
//       refetchFilter();
//     } else {
//       refetchBranch();
//     }
//   };
//   const handleResetFilters = () => {
//     setPhoneNumber('');
//     setBadge('');
//     setStatusFilter('All');
//     setPage(1);
//     // ✅ Fetch initial branch data
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <Header title="Visitor List" showMenuButton />
//       <VisitorFilterBar
//         phone={phoneNumber}
//         setPhone={setPhoneNumber}
//         badge={badge}
//         setBadge={setBadge}
//         statusFilter={statusFilter}
//         setStatusFilter={setStatusFilter}
//         onResetFilters={handleResetFilters}
//       />

//       {(branchLoading || filterLoading) && page === 1 ? (
//         <ActivityIndicator size="large" style={styles.loading} />
//       ) : (
//         <FlatList
//           data={allVisitors}
//           keyExtractor={(item, index) => `${item._id}_${index}`}
//           renderItem={({ item }) => (
//             <VisitorCard
//               item={item}
//               userRole={userRole}
//               onUpdateVisitor={handleRefresh}
//             />
//           )}
//           contentContainerStyle={styles.listContainer}
//           onEndReached={handleLoadMore}
//           onEndReachedThreshold={0.5}
//           refreshControl={
//             <RefreshControl
//               refreshing={(branchFetching || filterFetching) && page === 1}
//               onRefresh={handleRefresh}
//             />
//           }
//           ListFooterComponent={
//             !isFilterApplied && branchFetching && page > 1 ? (
//               <ActivityIndicator style={styles.loadingMore} />
//             ) : null
//           }
//           ListEmptyComponent={
//             !(branchLoading || filterLoading) && allVisitors.length === 0 ? (
//               <Text style={styles.emptyText}>No visitors found</Text>
//             ) : null
//           }
//         />
//       )}
//     </SafeAreaView>
//   );
// };

// export default VisitorsScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   listContainer: {
//     paddingHorizontal: 16,
//     paddingBottom: 32,
//   },
//   loading: {
//     marginTop: 32,
//   },
//   loadingMore: {
//     marginVertical: 16,
//   },
//   emptyText: {
//     textAlign: 'center',
//     marginTop: 48,
//     fontSize: 16,
//     color: '#888',
//   },
// });
