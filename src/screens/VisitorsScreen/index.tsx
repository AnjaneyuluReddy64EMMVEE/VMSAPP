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
