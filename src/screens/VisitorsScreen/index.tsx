// import React, { useState, useMemo, useEffect } from 'react';
// import {
//   View,
//   FlatList,
//   SafeAreaView,
//   ActivityIndicator,
//   Text,
//   Modal,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
// } from 'react-native';

// import Header from '../../components/Header';
// import VisitorFilterBar from '../../components/VisitorFilterBar';
// import UpdateVisitorModal from '../../components/UpdateVisitorModal';
// import VisitorCard from '../../components/VisitorCard';
// import { useAuth } from '../../contexts/AuthContext';
// import {
//   useGetVisitorsByBranchQuery,
//   useUpdateVisitorMutation,
// } from '../../api';
// import { showErrorMessage, showSuccessMessage } from '../../utils/Globals';
// import UpdateVisitorCard from '../../components/UpdateVisitorCard';
// import { globalRoles, globalStatuses } from '../../utils/CommonUtils';
// import InputField from '../../components/InputField';

// const VisitorsScreen = () => {
//   const { userBranch, userRole, selectedBranch } = useAuth();

//   // const [searchDate, setSearchDate] = useState(new Date());
//   const [searchDate, setSearchDate] = useState<Date | null>(null);

//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [phone, setPhone] = useState('');
//   const [badge, setBadge] = useState('');
//   const [statusFilter, setStatusFilter] = useState('All');

//   const [modalVisible, setModalVisible] = useState(false);
//   const [selectedVisitor, setSelectedVisitor] = useState(null);
//   const [inputBadgeNumber, setInputBadgeNumber] = useState('');
//   const [inputPurposeOfVisit, setInputPurposeOfVisit] = useState('');
//   const [inputPersonToMeet, setInputPersonToMeet] = useState('');

//   const [modalStatus, setModalStatus] = useState('pending');

//   // const formattedDate = searchDate.toISOString().split('T')[0];
//   const formattedDate = searchDate
//     ? searchDate.toISOString().split('T')[0]
//     : '';

//   // const branch = selectedBranch || userBranch || 'All';
//   const branch = selectedBranch || userBranch[0];

//   // const branch = selectedBranch;

//   // console.log('🔥 Branchkvr:', branch);

//   const queryParams = useMemo(
//     () => ({
//       officeLocation: branch,
//     }),
//     [branch],
//   );

//   const {
//     data: response,
//     isLoading,
//     refetch,
//   } = useGetVisitorsByBranchQuery(queryParams);

//   const [updateVisitor, { isLoading: isUpdating }] = useUpdateVisitorMutation();

//   const visitorData = response?.data || [];
//   console.log('🔥 Response:', visitorData);

//   const filteredVisitors = visitorData.filter(visitor => {
//     return (
//       (statusFilter === 'All' || visitor.status === statusFilter) &&
//       (visitor.phoneNumber?.toLowerCase().includes(phone.toLowerCase()) ??
//         true) &&
//       (visitor.badgeNumber?.toLowerCase().includes(badge.toLowerCase()) ?? true)
//     );
//   });

//   const handleView = visitor => {
//     setSelectedVisitor(visitor);

//     setInputBadgeNumber(visitor.badgeNumber || '');
//     setInputPersonToMeet(visitor.personToMeet || '');
//     setInputPurposeOfVisit(visitor.purposeOfVisit || '');

//     setModalStatus(visitor.status || 'pending');
//     setModalVisible(true);
//   };

//   const handleUpdate = async () => {
//     if (!selectedVisitor) return;

//     console.log('selectedVisitor api ready to call --->', selectedVisitor);
//     //inputPurposeOfVisit
//     //inputPersonToMeet
//     try {
//       const response = await updateVisitor({
//         id: selectedVisitor._id,
//         badgeNumber: inputBadgeNumber,
//         status: modalStatus,
//       }).unwrap();
//       console.log('🔥 Response:', response);
//       showSuccessMessage({
//         message: response?.message || 'No response',
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
//   const handleResetFilters = () => {
//     setSearchDate(null);
//     setPhone('');
//     setBadge('');
//     setStatusFilter('All');
//     refetch();
//   };

//   if (!branch) {
//     return (
//       <SafeAreaView
//         style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
//       >
//         <ActivityIndicator size="large" color="#003366" />
//         <Text>Loading branch...</Text>
//       </SafeAreaView>
//     );
//   }

//   //
//   const isSecurity = userRole === globalRoles.SECURITY;
//   const isAdminOrSuperAdmin =
//     userRole === globalRoles.ADMIN || userRole === globalRoles.SUPERADMIN;

//   const isPending = selectedVisitor?.status === globalStatuses.PENDING;
//   const isCheckedIn = selectedVisitor?.status === globalStatuses.CHECKED_IN;
//   const isCheckedOut = selectedVisitor?.status === globalStatuses.CHECKED_OUT;

//   // useEffect(() => {
//   //   console.log('userRole--->', userRole, isSuperAdminOrAdmin);
//   // }, [userRole]);

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: '#f9fbfd' }}>
//       <View style={{ flex: 1, padding: 16 }}>
//         <Header title={`Visitor - ${branch}`} showBackButton />

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
//         {searchDate || phone || badge || statusFilter !== 'All' ? (
//           <TouchableOpacity
//             onPress={handleResetFilters}
//             style={{
//               alignSelf: 'flex-end',
//               paddingHorizontal: 14,
//               paddingVertical: 8,
//               backgroundColor: '#ccc',
//               borderRadius: 6,
//               marginBottom: 8,
//             }}
//           >
//             <Text style={{ fontWeight: '600' }}>Reset Filters</Text>
//           </TouchableOpacity>
//         ) : null}

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
//               <VisitorCard
//                 item={item}
//                 onView={handleView}
//                 isDisable={item.status === globalStatuses.CHECKED_OUT}
//               />
//             )}
//             refreshing={isLoading}
//             onRefresh={refetch}
//             contentContainerStyle={{ paddingBottom: 20 }}
//           />
//         )}

//         {/* Modal for View */}
//         {modalVisible && (
//           <Modal visible={modalVisible} transparent animationType="slide">
//             <View style={styles.modalContainer}>
//               <View style={styles.modalContent}>
//                 {/* Header */}
//                 <View
//                   style={{
//                     flexDirection: 'row',
//                     justifyContent: 'space-between',
//                   }}
//                 >
//                   <Text style={[styles.modalTitle]}>Visitor Details</Text>
//                   <TouchableOpacity onPress={() => setModalVisible(false)}>
//                     <Text style={{ padding: 3, fontSize: 15 }}>X</Text>
//                   </TouchableOpacity>
//                 </View>

//                 {/* Badge field for all roles */}
//                 <Text style={[styles.modalTitle, { fontSize: 14 }]}>
//                   Badge Number
//                 </Text>
//                 <TextInput
//                   placeholder="Badge Number"
//                   style={[
//                     styles.modalInput,
//                     {
//                       backgroundColor:
//                         isCheckedIn || isCheckedOut ? '#eee' : '#fff',
//                     },
//                   ]}
//                   value={inputBadgeNumber}
//                   onChangeText={setInputBadgeNumber}
//                   editable={!(isCheckedIn || isCheckedOut)}
//                 />

//                 {/* Admin-specific fields */}
//                 {isAdminOrSuperAdmin && (
//                   <>
//                     <Text style={[styles.modalTitle, { fontSize: 14 }]}>
//                       Purpose Of Visit
//                     </Text>
//                     <TextInput
//                       placeholder="Purpose of Visit"
//                       style={styles.modalInput}
//                       value={inputPurposeOfVisit}
//                       onChangeText={setInputPurposeOfVisit}
//                     />

//                     <Text style={[styles.modalTitle, { fontSize: 14 }]}>
//                       Person To Meet
//                     </Text>
//                     <TextInput
//                       placeholder="Person to Meet"
//                       style={styles.modalInput}
//                       value={inputPersonToMeet}
//                       onChangeText={setInputPersonToMeet}
//                     />

//                     {/* Show Time Info */}
//                     <Text style={[styles.modalTitle, { fontSize: 14 }]}>
//                       In Time: {formatTime(selectedVisitor?.checkin)}
//                     </Text>
//                     <Text style={[styles.modalTitle, { fontSize: 14 }]}>
//                       Out Time: {formatTime(selectedVisitor?.checkout)}
//                     </Text>
//                   </>
//                 )}

//                 {/* Buttons */}
//                 <View
//                   style={{
//                     flexDirection: 'row',
//                     justifyContent: 'space-between',
//                   }}
//                 >
//                   {isSecurity && isPending && (
//                     <TouchableOpacity
//                       style={styles.saveButton}
//                       onPress={handleUpdate}
//                     >
//                       <Text style={styles.saveText}>Check In</Text>
//                     </TouchableOpacity>
//                   )}

//                   {isSecurity && isCheckedIn && (
//                     <TouchableOpacity
//                       style={styles.saveButton}
//                       onPress={handleUpdate}
//                     >
//                       <Text style={styles.saveText}>Check Out</Text>
//                     </TouchableOpacity>
//                   )}

//                   {isAdminOrSuperAdmin && (
//                     <TouchableOpacity
//                       style={styles.saveButton}
//                       onPress={handleUpdate}
//                     >
//                       <Text style={styles.saveText}>Submit</Text>
//                     </TouchableOpacity>
//                   )}
//                 </View>
//               </View>
//             </View>
//           </Modal>
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
//     width: '100%',
//     marginTop: 12,
//   },
//   saveText: { color: '#fff', textAlign: 'center', fontWeight: '600' },
// });

// import React, { useState, useMemo } from 'react';
// import {
//   View,
//   FlatList,
//   SafeAreaView,
//   ActivityIndicator,
//   Text,
//   Modal,
//   TextInput,
//   TouchableOpacity,
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
// import { globalRoles, globalStatuses } from '../../utils/CommonUtils';

// const VisitorsScreen = () => {
//   const { userBranch, userRole, selectedBranch } = useAuth();

//   const [phone, setPhone] = useState('');
//   const [badge, setBadge] = useState('');
//   const [statusFilter, setStatusFilter] = useState('All');

//   const [modalVisible, setModalVisible] = useState(false);
//   const [selectedVisitor, setSelectedVisitor] = useState(null);
//   const [inputBadgeNumber, setInputBadgeNumber] = useState('');
//   const [inputPurposeOfVisit, setInputPurposeOfVisit] = useState('');
//   const [inputPersonToMeet, setInputPersonToMeet] = useState('');
//   const [modalStatus, setModalStatus] = useState('pending');

//   const resolvedBranch = selectedBranch || userBranch[0];
//   const branch = resolvedBranch === 'All' ? '' : resolvedBranch;

//   const queryParams = useMemo(
//     () => ({
//       officeLocation: branch,
//     }),
//     [branch],
//   );

//   const {
//     data: response,
//     isLoading,
//     refetch,
//   } = useGetVisitorsByBranchQuery(queryParams);

//   const [updateVisitor] = useUpdateVisitorMutation();

//   const visitorData = response?.data || [];

//   const filteredVisitors = visitorData.filter(visitor => {
//     return (
//       (statusFilter === 'All' || visitor.status === statusFilter) &&
//       (visitor.phoneNumber?.toLowerCase().includes(phone.toLowerCase()) ??
//         true) &&
//       (visitor.badgeNumber?.toLowerCase().includes(badge.toLowerCase()) ?? true)
//     );
//   });

//   const handleView = visitor => {
//     setSelectedVisitor(visitor);
//     setInputBadgeNumber(visitor.badgeNumber || '');
//     setInputPersonToMeet(visitor.personToMeet || '');
//     setInputPurposeOfVisit(visitor.purposeOfVisit || '');
//     setModalStatus(visitor.status || 'pending');
//     setModalVisible(true);
//   };

//   const handleUpdate = async () => {
//     if (!selectedVisitor) return;

//     try {
//       const response = await updateVisitor({
//         id: selectedVisitor._id,
//         badgeNumber: inputBadgeNumber,
//         status: modalStatus,
//       }).unwrap();

//       showSuccessMessage({
//         message: response?.message || 'No response',
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

//   const handleResetFilters = () => {
//     setPhone('');
//     setBadge('');
//     setStatusFilter('All');
//     refetch();
//   };

//   const isSecurity = userRole === globalRoles.SECURITY;
//   const isAdminOrSuperAdmin =
//     userRole === globalRoles.ADMIN || userRole === globalRoles.SUPERADMIN;

//   const isPending = selectedVisitor?.status === globalStatuses.PENDING;
//   const isCheckedIn = selectedVisitor?.status === globalStatuses.CHECKED_IN;
//   const isCheckedOut = selectedVisitor?.status === globalStatuses.CHECKED_OUT;

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: '#f9fbfd' }}>
//       <View style={{ flex: 1, padding: 16 }}>
//         <Header title={`Visitor - ${resolvedBranch}`} showBackButton />
//         <VisitorFilterBar
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
//               <VisitorCard
//                 item={item}
//                 onView={handleView}
//                 isDisable={item.status === globalStatuses.CHECKED_OUT}
//               />
//             )}
//             refreshing={isLoading}
//             onRefresh={refetch}
//             contentContainerStyle={{ paddingBottom: 20 }}
//           />
//         )}
//         {/* Visitor Modal */}
//         {modalVisible && (
//           <Modal visible={modalVisible} transparent animationType="slide">
//             <View style={styles.modalContainer}>
//               <View style={styles.modalContent}>
//                 <View
//                   style={{
//                     flexDirection: 'row',
//                     justifyContent: 'space-between',
//                   }}
//                 >
//                   <Text style={styles.modalTitle}>Visitor Details</Text>
//                   <TouchableOpacity onPress={() => setModalVisible(false)}>
//                     <Text style={{ padding: 3, fontSize: 15 }}>X</Text>
//                   </TouchableOpacity>
//                 </View>

//                 <Text style={[styles.modalTitle, { fontSize: 14 }]}>
//                   Badge Number
//                 </Text>
//                 <TextInput
//                   placeholder="Badge Number"
//                   style={[
//                     styles.modalInput,
//                     {
//                       backgroundColor:
//                         isCheckedIn || isCheckedOut ? '#eee' : '#fff',
//                     },
//                   ]}
//                   value={inputBadgeNumber}
//                   onChangeText={setInputBadgeNumber}
//                   editable={!(isCheckedIn || isCheckedOut)}
//                 />

//                 {isAdminOrSuperAdmin && (
//                   <>
//                     <Text style={[styles.modalTitle, { fontSize: 14 }]}>
//                       Purpose Of Visit
//                     </Text>
//                     <TextInput
//                       placeholder="Purpose of Visit"
//                       style={styles.modalInput}
//                       value={inputPurposeOfVisit}
//                       onChangeText={setInputPurposeOfVisit}
//                     />

//                     <Text style={[styles.modalTitle, { fontSize: 14 }]}>
//                       Person To Meet
//                     </Text>
//                     <TextInput
//                       placeholder="Person to Meet"
//                       style={styles.modalInput}
//                       value={inputPersonToMeet}
//                       onChangeText={setInputPersonToMeet}
//                     />
//                   </>
//                 )}

//                 <View
//                   style={{
//                     flexDirection: 'row',
//                     justifyContent: 'space-between',
//                   }}
//                 >
//                   {isSecurity && isPending && (
//                     <TouchableOpacity
//                       style={styles.saveButton}
//                       onPress={handleUpdate}
//                     >
//                       <Text style={styles.saveText}>Check In</Text>
//                     </TouchableOpacity>
//                   )}
//                   {isSecurity && isCheckedIn && (
//                     <TouchableOpacity
//                       style={styles.saveButton}
//                       onPress={handleUpdate}
//                     >
//                       <Text style={styles.saveText}>Check Out</Text>
//                     </TouchableOpacity>
//                   )}
//                   {isAdminOrSuperAdmin && (
//                     <TouchableOpacity
//                       style={styles.saveButton}
//                       onPress={handleUpdate}
//                     >
//                       <Text style={styles.saveText}>Submit</Text>
//                     </TouchableOpacity>
//                   )}
//                 </View>
//               </View>
//             </View>
//           </Modal>
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
//   saveButton: {
//     backgroundColor: '#28a745',
//     padding: 12,
//     borderRadius: 6,
//     width: '100%',
//     marginTop: 12,
//   },
//   saveText: { color: '#fff', textAlign: 'center', fontWeight: '600' },
// });
// VisitorsScreen.tsx

import React, { useState, useMemo } from 'react';
import {
  View,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import Header from '../../components/Header';
import VisitorFilterBar from '../../components/VisitorFilterBar';
import VisitorCard from '../../components/VisitorCard';
import { useAuth } from '../../contexts/AuthContext';
import {
  useGetVisitorsByBranchQuery,
  useUpdateVisitorMutation,
} from '../../api';
import { showErrorMessage, showSuccessMessage } from '../../utils/Globals';
import { globalRoles, globalStatuses } from '../../utils/CommonUtils';
import VisitorModal from '../../components/VisitorModal';

const VisitorsScreen = () => {
  const { userBranch, userRole, selectedBranch } = useAuth();

  const [phone, setPhone] = useState('');
  const [badge, setBadge] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedVisitor, setSelectedVisitor] = useState(null);
  const [inputBadgeNumber, setInputBadgeNumber] = useState('');
  const [inputPurposeOfVisit, setInputPurposeOfVisit] = useState('');
  const [inputPersonToMeet, setInputPersonToMeet] = useState('');
  const [modalStatus, setModalStatus] = useState('pending');

  const resolvedBranch = Array.isArray(userBranch) ? userBranch : [userBranch];

  const branch = resolvedBranch === 'All' ? '' : resolvedBranch;
  console.log(selectedBranch);

  const queryParams = useMemo(
    () => ({ officeLocation: selectedBranch }),
    [selectedBranch],
  );

  const {
    data: response,
    isLoading,
    refetch,
  } = useGetVisitorsByBranchQuery(queryParams);

  const [updateVisitor] = useUpdateVisitorMutation();
  const visitorData = response?.data || [];

  const filteredVisitors = visitorData.filter(visitor => {
    return (
      (statusFilter === 'All' || visitor.status === statusFilter) &&
      (visitor.phoneNumber?.toLowerCase().includes(phone.toLowerCase()) ??
        true) &&
      (visitor.badgeNumber?.toLowerCase().includes(badge.toLowerCase()) ?? true)
    );
  });

  const handleView = visitor => {
    setSelectedVisitor(visitor);
    setInputBadgeNumber(visitor.badgeNumber || '');
    setInputPersonToMeet(visitor.personToMeet || '');
    setInputPurposeOfVisit(visitor.purposeOfVisit || '');
    setModalStatus(visitor.status || 'pending');
    setModalVisible(true);
  };

  const handleUpdate = async payload => {
    try {
      const response = await updateVisitor(payload).unwrap();

      showSuccessMessage({
        message: response?.message || 'Updated successfully',
        duration: 3000,
      });

      refetch();
    } catch (error) {
      console.error('❌ Error updating visitor:', error);
      showErrorMessage({
        message: 'Failed to update visitor.',
        duration: 3000,
      });
    }
  };

  const handleResetFilters = () => {
    setPhone('');
    setBadge('');
    setStatusFilter('All');
    refetch();
  };

  const isSecurity = userRole === globalRoles.SECURITY;
  const isAdminOrSuperAdmin =
    userRole === globalRoles.ADMIN || userRole === globalRoles.SUPERADMIN;

  const isPending = selectedVisitor?.status === globalStatuses.PENDING;
  const isCheckedIn = selectedVisitor?.status === globalStatuses.CHECKED_IN;
  const isCheckedOut = selectedVisitor?.status === globalStatuses.CHECKED_OUT;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f9fbfd' }}>
      <View style={{ flex: 1, padding: 16 }}>
        <Header title="Visitors" showMenuButton />

        <VisitorFilterBar
          phone={phone}
          setPhone={setPhone}
          badge={badge}
          setBadge={setBadge}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          onReset={handleResetFilters}
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
              <VisitorCard
                item={item}
                userRole={userRole}
                onUpdateVisitor={handleUpdate}
              />
            )}
            refreshing={isLoading}
            onRefresh={refetch}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        )}

        {/* Modal */}
        <VisitorModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          selectedVisitor={selectedVisitor}
          userRole={userRole}
          onSubmit={handleUpdate}
        />
      </View>
    </SafeAreaView>
  );
};

export default VisitorsScreen;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '85%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 6,
    marginBottom: 12,
    fontSize: 14,
  },
  saveButton: {
    backgroundColor: '#28a745',
    padding: 12,
    borderRadius: 6,
    width: '100%',
    marginTop: 12,
  },
  saveText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },
});
