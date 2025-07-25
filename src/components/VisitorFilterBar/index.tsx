// // import React from 'react';
// // import {
// //   View,
// //   TextInput,
// //   Text,
// //   TouchableOpacity,
// //   StyleSheet,
// // } from 'react-native';

// // const VisitorFilterBar = ({
// //   phone,
// //   setPhone,
// //   badge,
// //   setBadge,
// //   statusFilter,
// //   setStatusFilter,
// // }) => {
// //   const handleReset = () => {
// //     setPhone('');
// //     setBadge('');
// //     setStatusFilter('All');
// //   };

// //   return (
// //     <View style={styles.filters}>
// //       <TextInput
// //         style={styles.filterInput}
// //         placeholder="Phone Number"
// //         keyboardType="phone-pad"
// //         value={phone}
// //         onChangeText={setPhone}
// //       />
// //       <TextInput
// //         style={styles.filterInput}
// //         placeholder="Badge No"
// //         value={badge}
// //         onChangeText={setBadge}
// //       />
// //       <TouchableOpacity
// //         style={styles.filterInput}
// //         onPress={() =>
// //           setStatusFilter(prev =>
// //             prev === 'All'
// //               ? 'pending'
// //               : prev === 'pending'
// //               ? 'checkedIn'
// //               : prev === 'checkedIn'
// //               ? 'checkedOut'
// //               : 'All',
// //           )
// //         }
// //       >
// //         <Text>{statusFilter}</Text>
// //       </TouchableOpacity>

// //       <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
// //         <Text style={styles.resetText}>Reset</Text>
// //       </TouchableOpacity>
// //     </View>
// //   );
// // };

// // export default VisitorFilterBar;

// // const styles = StyleSheet.create({
// //   filters: {
// //     flexDirection: 'row',
// //     flexWrap: 'wrap',
// //     gap: 10,
// //     marginBottom: 12,
// //   },
// //   filterInput: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     gap: 6,
// //     backgroundColor: '#fff',
// //     padding: 10,
// //     borderRadius: 8,
// //     flexGrow: 1,
// //     minWidth: '45%',
// //     elevation: 2,
// //   },
// //   resetButton: {
// //     backgroundColor: '#e74c3c',
// //     paddingHorizontal: 16,
// //     paddingVertical: 10,
// //     borderRadius: 8,
// //     elevation: 2,
// //   },
// //   resetText: {
// //     color: '#fff',
// //     fontWeight: 'bold',
// //   },
// // });
// import React from 'react';
// import {
//   View,
//   TextInput,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Platform,
// } from 'react-native';
// import { Picker } from '@react-native-picker/picker';

// const VisitorFilterBar = ({
//   phone,
//   setPhone,
//   badge,
//   setBadge,
//   statusFilter,
//   setStatusFilter,
// }) => {
//   const handleReset = () => {
//     setPhone('');
//     setBadge('');
//     setStatusFilter('All');
//   };

//   return (
//     <View style={styles.filters}>
//       <TextInput
//         style={styles.filterInput}
//         placeholder="Phone Number"
//         keyboardType="phone-pad"
//         value={phone}
//         onChangeText={setPhone}
//       />

//       <TextInput
//         style={styles.filterInput}
//         placeholder="Badge No"
//         value={badge}
//         onChangeText={setBadge}
//       />

//       {/* Status Dropdown and Reset side by side */}
//       <View style={styles.statusRow}>
//         <View style={[styles.filterInput, styles.pickerWrapper]}>
//           <Picker
//             selectedValue={statusFilter}
//             onValueChange={itemValue => setStatusFilter(itemValue)}
//             style={Platform.OS === 'android' ? styles.androidPicker : undefined}
//           >
//             <Picker.Item label="All" value="All" />
//             <Picker.Item label="Pending" value="pending" />
//             <Picker.Item label="Checked In" value="checkedIn" />
//             <Picker.Item label="Checked Out" value="checkedOut" />
//           </Picker>
//         </View>

//         <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
//           <Text style={styles.resetText}>Reset</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default VisitorFilterBar;

// const styles = StyleSheet.create({
//   filters: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     gap: 10,
//     marginBottom: 12,
//   },
//   filterInput: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     padding: 10,
//     borderRadius: 8,
//     flexGrow: 1,
//     minWidth: '45%',
//     elevation: 2,
//   },
//   statusRow: {
//     flexDirection: 'row',
//     width: '100%',
//     gap: 10,
//   },
//   pickerWrapper: {
//     padding: 0,
//     flex: 1,
//   },
//   androidPicker: {
//     width: '100%',
//     height: 50,
//   },
//   resetButton: {
//     backgroundColor: '#e74c3c',
//     paddingHorizontal: 16,
//     paddingVertical: 10,
//     borderRadius: 8,
//     elevation: 2,
//     alignSelf: 'center',
//   },
//   resetText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
// });
import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

type VisitorFilterBarProps = {
  phone: string;
  setPhone: (val: string) => void;
  badge: string;
  setBadge: (val: string) => void;
  statusFilter: string;
  setStatusFilter: (val: string) => void;
};

const VisitorFilterBar: React.FC<VisitorFilterBarProps> = ({
  phone,
  setPhone,
  badge,
  setBadge,
  statusFilter,
  setStatusFilter,
}) => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: 'All', value: 'All' },
    { label: 'Pending', value: 'pending' },
    { label: 'Checked In', value: 'checkedIn' },
    { label: 'Checked Out', value: 'checkedOut' },
  ]);

  const handleReset = () => {
    setPhone('');
    setBadge('');
    setStatusFilter('All');
    setOpen(false);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Badge Number"
        value={badge}
        onChangeText={setBadge}
      />
      {/* Wrap dropdown with zIndex fix */}
      <View style={{ zIndex: 1000, width: '100%' }}>
        <DropDownPicker
          open={open}
          value={statusFilter}
          items={items}
          setOpen={setOpen}
          setValue={setStatusFilter}
          setItems={setItems}
          placeholder="Select Status"
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropdownContainer}
        />
      </View>

      <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
        <Text style={styles.resetText}>Reset</Text>
      </TouchableOpacity>
    </View>
  );
};

export default VisitorFilterBar;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    gap: 10,
    zIndex: 100, // Helps with dropdown overlap
  },
  input: {
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  dropdown: {
    borderColor: '#ccc',
    height: 45,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  dropDownContainer: {
    borderColor: '#ccc',
    zIndex: 1000,
  },
  resetButton: {
    backgroundColor: '#e53935',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  resetText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
