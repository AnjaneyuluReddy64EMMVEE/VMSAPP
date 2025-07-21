import React, { useState, useMemo, useEffect } from 'react';
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
import UpdateVisitorModal from '../../components/UpdateVisitorModal';
import VisitorCard from '../../components/VisitorCard';
import { useAuth } from '../../contexts/AuthContext';
import {
  useGetVisitorsByBranchQuery,
  useUpdateVisitorMutation,
} from '../../api';
import { showErrorMessage, showSuccessMessage } from '../../utils/Globals';
import UpdateVisitorCard from '../../components/UpdateVisitorCard';
import { globalRoles, globalStatuses } from '../../utils/CommonUtils';
import InputField from '../../components/InputField';

const VisitorsScreen = () => {
  const { userBranch, userRole, selectedBranch } = useAuth();

  const [searchDate, setSearchDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [phone, setPhone] = useState('');
  const [badge, setBadge] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedVisitor, setSelectedVisitor] = useState(null);
  const [inputBadgeNumber, setInputBadgeNumber] = useState('');
  const [inputPurposeOfVisit, setInputPurposeOfVisit] = useState('');
  const [inputPersonToMeet, setInputPersonToMeet] = useState('');

  const [modalStatus, setModalStatus] = useState('pending');

  const formattedDate = searchDate.toISOString().split('T')[0];
  // const branch = selectedBranch || userBranch || 'All';
  const branch = selectedBranch || userBranch[0];

  // const branch = selectedBranch;

  console.log('🔥 Branchkvr:', branch);

  const queryParams = useMemo(
    () => ({
      officeLocation: branch,
      date: formattedDate,
    }),
    [branch, formattedDate],
  );

  const {
    data: response,
    isLoading,
    refetch,
  } = useGetVisitorsByBranchQuery(queryParams, {
    skip: !branch,
  });

  const [updateVisitor, { isLoading: isUpdating }] = useUpdateVisitorMutation();

  const visitorData = response?.data || [];
  // console.log('🔥 Response:', visitorData);

  const filteredVisitors = visitorData.filter(visitor => {
    const createdAtDate = new Date(visitor.createdAt).toDateString();
    const selectedDateStr = new Date(searchDate).toDateString();

    return (
      (statusFilter === 'All' || visitor.status === statusFilter) &&
      (visitor.phoneNumber?.toLowerCase().includes(phone.toLowerCase()) ??
        true) &&
      (visitor.badgeNumber?.toLowerCase().includes(badge.toLowerCase()) ??
        true) &&
      createdAtDate === selectedDateStr
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

  const handleUpdate = async () => {
    if (!selectedVisitor) return;

    console.log('selectedVisitor api ready to call --->', selectedVisitor);
    //inputPurposeOfVisit
    //inputPersonToMeet
    try {
      await updateVisitor({
        id: selectedVisitor._id,
        badgeNumber: inputBadgeNumber,
        status: modalStatus,
      }).unwrap();

      showSuccessMessage({
        message: 'Visitor updated successfully!',
        duration: 3000,
      });

      refetch();
      setModalVisible(false);
    } catch (error) {
      console.error('❌ Error updating visitor:', error);
      showErrorMessage({
        message: 'Failed to update visitor.',
        duration: 3000,
      });
    }
  };

  if (!branch) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        <ActivityIndicator size="large" color="#003366" />
        <Text>Loading branch...</Text>
      </SafeAreaView>
    );
  }

  const isPending = selectedVisitor?.status === globalStatuses.PENDING;
  const isCheckoutedIn = selectedVisitor?.status === globalStatuses.CHECKED_IN;
  const isCheckoutedOut =
    selectedVisitor?.status === globalStatuses.CHECKED_OUT;

  const isStatusHide = !isPending && isCheckoutedOut;

  const isSuperAdminOrAdmin =
    userRole === (globalRoles.SUPERADMIN || globalRoles?.ADMIN);

  // useEffect(() => {
  //   console.log('userRole--->', userRole, isSuperAdminOrAdmin);
  // }, [userRole]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f9fbfd' }}>
      <View style={{ flex: 1, padding: 16 }}>
        <Header title={`Visitor - ${branch}`} showBackButton />

        <VisitorFilterBar
          searchDate={searchDate}
          setSearchDate={setSearchDate}
          showDatePicker={showDatePicker}
          setShowDatePicker={setShowDatePicker}
          phone={phone}
          setPhone={setPhone}
          badge={badge}
          setBadge={setBadge}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
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
                onView={handleView}
                isDisable={isCheckoutedOut}
              />
            )}
            refreshing={isLoading}
            onRefresh={refetch}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        )}

        {/* Modal for View */}
        <>
          {modalVisible && (
            <Modal visible={modalVisible} transparent animationType="slide">
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Text style={[styles.modalTitle]}>Update Visitor</Text>

                    <TouchableOpacity
                      onPress={() => {
                        setModalVisible(false);
                      }}
                    >
                      <Text style={{ padding: 3, fontSize: 15 }}>X</Text>
                    </TouchableOpacity>
                  </View>

                  <>
                    <Text style={[styles.modalTitle, { fontSize: 14 }]}>
                      Badge Number
                    </Text>
                    <TextInput
                      placeholder="Badge Number"
                      style={styles.modalInput}
                      value={inputBadgeNumber}
                      onChangeText={setInputBadgeNumber}
                    />
                  </>

                  <>
                    {isSuperAdminOrAdmin && (
                      <>
                        <Text style={[styles.modalTitle, { fontSize: 14 }]}>
                          Purpose Of Visit
                        </Text>
                        <TextInput
                          placeholder="Badge Number"
                          style={styles.modalInput}
                          value={inputPurposeOfVisit}
                          onChangeText={setInputPurposeOfVisit}
                        />

                        <Text style={[styles.modalTitle, { fontSize: 14 }]}>
                          Person To Meet
                        </Text>
                        <TextInput
                          placeholder="Badge Number"
                          style={styles.modalInput}
                          value={inputPersonToMeet}
                          onChangeText={setInputPersonToMeet}
                        />
                      </>
                    )}
                  </>

                  {/* Status Dropdown */}

                  <>
                    {isStatusHide && (
                      <TouchableOpacity
                        style={styles.statusDropdown}
                        onPress={() => {
                          if (modalStatus === 'pending')
                            setModalStatus('checkedIn');
                          else if (modalStatus === 'checkedIn')
                            setModalStatus('checkedOut');
                          else setModalStatus('pending');
                        }}
                      >
                        <Text>{modalStatus}</Text>
                      </TouchableOpacity>
                    )}
                  </>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}
                  >
                    <>
                      {/* Checked in */}
                      <>
                        {isPending && (
                          <TouchableOpacity
                            style={styles.saveButton}
                            onPress={handleUpdate}
                          >
                            <Text style={styles.saveText}>Checked in</Text>
                          </TouchableOpacity>
                        )}
                      </>

                      {/* Checked Out */}
                      <>
                        {isCheckoutedIn && (
                          <TouchableOpacity
                            style={styles.saveButton}
                            onPress={handleUpdate}
                          >
                            <Text style={styles.saveText}>Checked Out</Text>
                          </TouchableOpacity>
                        )}
                      </>

                      {/* Save Button */}
                      <>
                        {false && (
                          <TouchableOpacity
                            style={styles.saveButton}
                            onPress={handleUpdate}
                          >
                            <Text style={styles.saveText}>Save</Text>
                          </TouchableOpacity>
                        )}
                      </>
                    </>
                  </View>
                </View>
              </View>
            </Modal>
          )}
        </>
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
    width: '100%',
    marginTop: 12,
  },
  saveText: { color: '#fff', textAlign: 'center', fontWeight: '600' },
});
