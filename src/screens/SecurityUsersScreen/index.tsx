// import { View, Text } from 'react-native'
// import React from 'react'

// const SecurityUsersScreen = () => {
//   return (
//     <View>
//       <Text>SecurityUsersScreen</Text>
//     </View>
//   )
// }

// export default SecurityUsersScreen


import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
// import RNPickerSelect from 'react-native-picker-select';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const securityUsers = [
  { id: '1', empId: 'EMP001', name: 'security1', phone: '9875632765', location: 'Airport Office', password: '123456' },
  { id: '2', empId: 'EMP002', name: 'security2', phone: '7895432156', location: 'Dabaspet', password: 'abc123' },
  { id: '3', empId: 'EMP003', name: 'security3', phone: '7835432150', location: 'Head Office', password: 'pwd321' },
  { id: '4', empId: 'EMP004', name: 'security4', phone: '7835432151', location: 'Head Office', password: 'admin@123' },
];

const SecurityUsersScreen = () => {
  const [filterLocation, setFilterLocation] = useState('All');

  const filteredUsers =
    filterLocation === 'All'
      ? securityUsers
      : securityUsers.filter((user) => user.location === filterLocation);

  const handleDelete = (id: string) => {
    Alert.alert('Delete User', 'Are you sure you want to delete this user?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => console.log('Delete user:', id) },
    ]);
  };

  const renderItem = ({ item }: { item: typeof securityUsers[0] }) => (
    <View style={styles.card}>
      <Text style={styles.item}><Text style={styles.label}>Emp ID:</Text> {item.empId}</Text>
      <Text style={styles.item}><Text style={styles.label}>Name:</Text> {item.name}</Text>
      <Text style={styles.item}><Text style={styles.label}>Phone:</Text> {item.phone}</Text>
      <Text style={styles.item}><Text style={styles.label}>Location:</Text> {item.location || '-'}</Text>
      <Text style={styles.item}><Text style={styles.label}>Password:</Text> {item.password}</Text>

      <View style={styles.cardFooter}>
        <TouchableOpacity style={styles.viewButton}>
          <Text style={styles.viewButtonText}>View</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(item.id)}>
          <Icon name="trash-outline" size={22} color="#FF3B30" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.title}>Security Users</Text>
        <View style={styles.filterWrapper}>
          {/* <RNPickerSelect
            onValueChange={(value) => setFilterLocation(value)}
            value={filterLocation}
            items={[
              { label: 'All', value: 'All' },
              { label: 'Dabaspet', value: 'Dabaspet' },
              { label: 'Head Office', value: 'Head Office' },
            ]}
            style={pickerStyles}
            useNativeAndroidPickerStyle={false}
            Icon={() => <Icon name="chevron-down" size={20} color="#000" />}
          /> */}
        </View>
      </View>

      <FlatList
        data={filteredUsers}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity style={styles.fab} onPress={() => Alert.alert('Add User')}>
        <Icon name="add" size={28} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default SecurityUsersScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  header: {
    paddingHorizontal: wp(5),
    paddingVertical: hp(2),
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: hp(2.6),
    fontWeight: '600',
    color: '#000',
  },
  filterWrapper: {
    width: wp(40),
    backgroundColor: '#f2f2f2',
    borderRadius: wp(2),
    paddingHorizontal: wp(2),
  },
  list: {
    paddingHorizontal: wp(5),
    paddingBottom: hp(8),
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: wp(3),
    padding: wp(4),
    marginBottom: hp(2),
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 2,
  },
  label: {
    fontWeight: '600',
    color: '#444',
  },
  item: {
    fontSize: hp(2),
    marginBottom: hp(0.8),
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: hp(1.5),
  },
  viewButton: {
    backgroundColor: '#007AFF',
    paddingVertical: hp(1),
    paddingHorizontal: wp(4),
    borderRadius: wp(2),
  },
  viewButtonText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: hp(1.9),
  },
  fab: {
    position: 'absolute',
    bottom: hp(3),
    right: wp(5),
    backgroundColor: '#007AFF',
    width: wp(14),
    height: wp(14),
    borderRadius: wp(7),
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 6,
  },
});

const pickerStyles = StyleSheet.create({
  inputIOS: {
    fontSize: hp(2),
    paddingVertical: hp(1.2),
    paddingHorizontal: wp(2),
    color: '#000',
  },
  inputAndroid: {
    fontSize: hp(2),
    paddingVertical: hp(1.2),
    paddingHorizontal: wp(2),
    color: '#000',
  },
});
