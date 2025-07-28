import React, { useState, useMemo } from 'react';
import {
  View,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
  Text,
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

const VisitorsScreen = () => {
  const { userRole, selectedBranch } = useAuth();

  const [phone, setPhone] = useState('');
  const [badge, setBadge] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

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

  const handleUpdate = async payload => {
    try {
      // console.log('payload', payload);
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
