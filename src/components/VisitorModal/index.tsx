// import React, { useState, useEffect } from 'react';
// import {
//   Modal,
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Platform,
// } from 'react-native';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import InputField from '../InputField';
// import Button from '../Button';
// import { globalRoles, globalStatuses } from '../../utils/CommonUtils';
// import { heightPercentageToDP } from 'react-native-responsive-screen';

// const VisitorModal = ({
//   visible,
//   onClose,
//   selectedVisitor,
//   userRole,
//   onSubmit,
// }) => {
//   const [badgeNumber, setBadgeNumber] = useState('');
//   const [purposeOfVisit, setPurposeOfVisit] = useState('');
//   const [personToMeet, setPersonToMeet] = useState('');

//   const [showTimeInPicker, setShowTimeInPicker] = useState(false);
//   const [showTimeOutPicker, setShowTimeOutPicker] = useState(false);

//   const [timeIn, setTimeIn] = useState(new Date());
//   const [timeOut, setTimeOut] = useState(new Date());

//   useEffect(() => {
//     if (selectedVisitor) {
//       setBadgeNumber(selectedVisitor?.badgeNumber || '');
//       setPurposeOfVisit(selectedVisitor?.purposeOfVisit || '');
//       setPersonToMeet(selectedVisitor?.personToMeet || '');
//       setTimeIn(
//         selectedVisitor?.timeIn ? new Date(selectedVisitor.timeIn) : new Date(),
//       );
//       setTimeOut(
//         selectedVisitor?.timeOut
//           ? new Date(selectedVisitor.timeOut)
//           : new Date(),
//       );
//     }
//   }, [selectedVisitor]);

//   const formatTime = (iso: string) => {
//     const date = new Date(iso);
//     return date.toLocaleTimeString('en-IN', {
//       hour: '2-digit',
//       minute: '2-digit',
//     });
//   };

//   const handleSubmit = () => {
//     const payload = {
//       id: selectedVisitor?._id,
//       badgeNumber,
//       purposeOfVisit,
//       personToMeet,
//       timeIn: timeIn.toISOString(),
//       timeOut: timeOut.toISOString(),
//     };
//     // return false;
//     onSubmit(payload);
//     onClose();
//   };
//   const isSecurityCheckOut =
//     selectedVisitor?.status === globalStatuses?.CHECKED_OUT;

//   const renderAdminView = () => (
//     <View>
//       <InputField
//         label="Badge Number"
//         value={badgeNumber}
//         onChangeText={setBadgeNumber}
//         placeholder="Enter Badge Number"
//       />
//       <InputField
//         label="Person to Meet"
//         value={personToMeet}
//         onChangeText={setPersonToMeet}
//         placeholder="Enter Person Name"
//       />
//       <InputField
//         label="Purpose of Visit"
//         value={purposeOfVisit}
//         onChangeText={setPurposeOfVisit}
//         placeholder="Enter Purpose"
//       />

//       <Text style={styles.label}>Check-in Time</Text>
//       <TouchableOpacity
//         onPress={() => setShowTimeInPicker(true)}
//         style={styles.timeInput}
//       >
//         <Text>{formatTime(timeIn.toISOString())}</Text>
//       </TouchableOpacity>
//       {showTimeInPicker && (
//         <DateTimePicker
//           value={timeIn}
//           mode="time"
//           is24Hour
//           display={Platform.OS === 'ios' ? 'spinner' : 'default'}
//           onChange={(e, selected) => {
//             setShowTimeInPicker(false);
//             if (selected) setTimeIn(selected);
//           }}
//         />
//       )}

//       <Text style={styles.label}>Check-out Time</Text>
//       <TouchableOpacity
//         onPress={() => setShowTimeOutPicker(true)}
//         style={styles.timeInput}
//       >
//         <Text>{formatTime(timeOut.toISOString())}</Text>
//       </TouchableOpacity>
//       {showTimeOutPicker && (
//         <DateTimePicker
//           value={timeOut}
//           mode="time"
//           is24Hour
//           display={Platform.OS === 'ios' ? 'spinner' : 'default'}
//           onChange={(e, selected) => {
//             setShowTimeOutPicker(false);
//             if (selected) setTimeOut(selected);
//           }}
//         />
//       )}

//       <Button title="Submit" onPress={handleSubmit} />
//     </View>
//   );

//   const renderSecurityView = () => (
//     <View>
//       <InputField
//         label="Badge Number"
//         value={badgeNumber}
//         onChangeText={setBadgeNumber}
//         placeholder="Enter Badge Number"
//         editable={selectedVisitor?.status === 'pending'}
//       />
//       {!isSecurityCheckOut && (
//         <Button
//           title={
//             selectedVisitor?.status === 'pending'
//               ? 'Check In'
//               : selectedVisitor?.status === 'checkedIn'
//               ? 'Check Out'
//               : 'Checked Out'
//           }
//           onPress={() => {
//             const payload = {
//               id: selectedVisitor?._id,
//               badgeNumber,
//               status:
//                 selectedVisitor?.status === 'pending'
//                   ? 'checkedIn'
//                   : selectedVisitor?.status === 'checkedIn'
//                   ? 'checkedOut'
//                   : 'checkedOut',
//             };
//             onSubmit(payload);
//             onClose();
//           }}
//           // ✅ Correct position for disabling
//           disabled={
//             selectedVisitor?.status === 'pending' &&
//             badgeNumber.trim() === '' &&
//             selectedVisitor?.status === 'pending'
//           }
//         />
//       )}
//       {selectedVisitor?.status === 'pending' && badgeNumber.trim() === '' && (
//         <Text style={{ color: 'red', marginTop: 8 }}>
//           Badge number is required to check in
//         </Text>
//       )}
//     </View>
//   );

//   return (
//     <Modal visible={visible} transparent animationType="slide">
//       <View style={styles.overlay}>
//         <View style={styles.modalContainer}>
//           <View
//             style={{ flexDirection: 'row', justifyContent: 'space-between' }}
//           >
//             <Text style={styles.modalTitle}>Visitor Details</Text>
//             <TouchableOpacity onPress={onClose}>
//               <Text style={{ fontSize: 20 }}>X</Text>
//             </TouchableOpacity>
//           </View>

//           {userRole === globalRoles.ADMIN || userRole === globalRoles.SUPERADMIN
//             ? renderAdminView()
//             : renderSecurityView()}
//         </View>
//       </View>
//     </Modal>
//   );
// };

// export default VisitorModal;

// const styles = StyleSheet.create({
//   overlay: {
//     flex: 1,
//     backgroundColor: '#00000066',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: heightPercentageToDP('5%'),
//   },
//   modalContainer: {
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     padding: 20,
//     width: '90%',
//   },
//   modalTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 15,
//   },
//   timeInput: {
//     paddingVertical: 10,
//     paddingHorizontal: 12,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     marginBottom: 15,
//   },
//   label: {
//     fontWeight: '600',
//     marginBottom: 5,
//   },
// });

// import React, { useState, useEffect } from 'react';
// import {
//   Modal,
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Platform,
// } from 'react-native';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import InputField from '../InputField';
// import Button from '../Button';
// import { globalRoles, globalStatuses } from '../../utils/CommonUtils';
// import { heightPercentageToDP } from 'react-native-responsive-screen';
// import { format } from 'date-fns'; // ✅ Import date-fns

// const VisitorModal = ({
//   visible,
//   onClose,
//   selectedVisitor,
//   userRole,
//   onSubmit,
// }) => {
//   const [badgeNumber, setBadgeNumber] = useState('');
//   const [purposeOfVisit, setPurposeOfVisit] = useState('');
//   const [personToMeet, setPersonToMeet] = useState('');

//   const [showTimeInPicker, setShowTimeInPicker] = useState(false);
//   const [showTimeOutPicker, setShowTimeOutPicker] = useState(false);

//   const [timeIn, setTimeIn] = useState(new Date());
//   const [timeOut, setTimeOut] = useState(new Date());
//   console.log('selectedVisitor', selectedVisitor);
//   useEffect(() => {
//     if (selectedVisitor) {
//       setBadgeNumber(selectedVisitor?.badgeNumber || '');
//       setPurposeOfVisit(selectedVisitor?.purposeOfVisit || '');
//       setPersonToMeet(selectedVisitor?.personToMeet || '');
//       setTimeIn(
//         selectedVisitor?.timeIn ? new Date(selectedVisitor.timeIn) : new Date(),
//       );
//       setTimeOut(
//         selectedVisitor?.timeOut
//           ? new Date(selectedVisitor.timeOut)
//           : new Date(),
//       );
//     }
//   }, [selectedVisitor]);

//   const formatTime = (date: Date) => format(date, 'hh:mm a'); // ✅ Local display only

//   const handleSubmit = () => {
//     const payload = {
//       id: selectedVisitor?._id,
//       badgeNumber,
//       purposeOfVisit,
//       personToMeet,
//       timeIn: format(timeIn, "yyyy-MM-dd'T'HH:mm:ss"), // ✅ Local time, no UTC
//       timeOut: format(timeOut, "yyyy-MM-dd'T'HH:mm:ss"), // ✅ Local time, no UTC
//     };
//     onSubmit(payload);
//     onClose();
//   };

//   const isSecurityCheckOut =
//     selectedVisitor?.status === globalStatuses?.CHECKED_OUT;

//   const renderAdminView = () => (
//     <View>
//       <InputField
//         label="Badge Number"
//         value={badgeNumber}
//         onChangeText={setBadgeNumber}
//         placeholder="Enter Badge Number"
//       />
//       <InputField
//         label="Person to Meet"
//         value={personToMeet}
//         onChangeText={setPersonToMeet}
//         placeholder="Enter Person Name"
//       />
//       <InputField
//         label="Purpose of Visit"
//         value={purposeOfVisit}
//         onChangeText={setPurposeOfVisit}
//         placeholder="Enter Purpose"
//       />

//       <Text style={styles.label}>Check-in Time</Text>
//       <TouchableOpacity
//         onPress={() => setShowTimeInPicker(true)}
//         style={styles.timeInput}
//       >
//         <Text>{formatTime(timeIn)}</Text>
//       </TouchableOpacity>
//       {showTimeInPicker && (
//         <DateTimePicker
//           value={timeIn}
//           mode="time"
//           is24Hour
//           display={Platform.OS === 'ios' ? 'spinner' : 'default'}
//           onChange={(e, selected) => {
//             setShowTimeInPicker(false);
//             if (selected) setTimeIn(selected);
//           }}
//         />
//       )}

//       <Text style={styles.label}>Check-out Time</Text>
//       <TouchableOpacity
//         onPress={() => setShowTimeOutPicker(true)}
//         style={styles.timeInput}
//       >
//         <Text>{formatTime(timeOut)}</Text>
//       </TouchableOpacity>
//       {showTimeOutPicker && (
//         <DateTimePicker
//           value={timeOut}
//           mode="time"
//           is24Hour
//           display={Platform.OS === 'ios' ? 'spinner' : 'default'}
//           onChange={(e, selected) => {
//             setShowTimeOutPicker(false);
//             if (selected) setTimeOut(selected);
//           }}
//         />
//       )}

//       <Button title="Submit" onPress={handleSubmit} />
//     </View>
//   );

//   const renderSecurityView = () => (
//     <View>
//       <InputField
//         label="Badge Number"
//         value={badgeNumber}
//         onChangeText={setBadgeNumber}
//         placeholder="Enter Badge Number"
//         editable={selectedVisitor?.status === 'pending'}
//       />
//       {!isSecurityCheckOut && (
//         <Button
//           title={
//             selectedVisitor?.status === 'pending'
//               ? 'Check In'
//               : selectedVisitor?.status === 'checkedIn'
//               ? 'Check Out'
//               : 'Checked Out'
//           }
//           onPress={() => {
//             const payload = {
//               id: selectedVisitor?._id,
//               badgeNumber,
//               status:
//                 selectedVisitor?.status === 'pending'
//                   ? 'checkedIn'
//                   : selectedVisitor?.status === 'checkedIn'
//                   ? 'checkedOut'
//                   : 'checkedOut',
//             };
//             onSubmit(payload);
//             onClose();
//           }}
//           disabled={
//             selectedVisitor?.status === 'pending' && badgeNumber.trim() === ''
//           }
//         />
//       )}
//       {selectedVisitor?.status === 'pending' && badgeNumber.trim() === '' && (
//         <Text style={{ color: 'red', marginTop: 8 }}>
//           Badge number is required to check in
//         </Text>
//       )}
//     </View>
//   );

//   return (
//     <Modal visible={visible} transparent animationType="slide">
//       <View style={styles.overlay}>
//         <View style={styles.modalContainer}>
//           <View
//             style={{ flexDirection: 'row', justifyContent: 'space-between' }}
//           >
//             <Text style={styles.modalTitle}>Visitor Details</Text>
//             <TouchableOpacity onPress={onClose}>
//               <Text style={{ fontSize: 20 }}>X</Text>
//             </TouchableOpacity>
//           </View>

//           {userRole === globalRoles.ADMIN || userRole === globalRoles.SUPERADMIN
//             ? renderAdminView()
//             : renderSecurityView()}
//         </View>
//       </View>
//     </Modal>
//   );
// };

// export default VisitorModal;

// const styles = StyleSheet.create({
//   overlay: {
//     flex: 1,
//     backgroundColor: '#00000066',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: heightPercentageToDP('5%'),
//   },
//   modalContainer: {
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     padding: 20,
//     width: '90%',
//   },
//   modalTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 15,
//   },
//   timeInput: {
//     paddingVertical: 10,
//     paddingHorizontal: 12,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     marginBottom: 15,
//   },
//   label: {
//     fontWeight: '600',
//     marginBottom: 5,
//   },
// });

import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import InputField from '../InputField';
import Button from '../Button';
import { globalRoles, globalStatuses } from '../../utils/CommonUtils';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { format } from 'date-fns';
import AsyncStorage from '@react-native-async-storage/async-storage';

const VisitorModal = ({
  visible,
  onClose,
  selectedVisitor,

  onSubmit,
}) => {
  const [userRole, setUserRole] = useState('');

  const [badgeNumber, setBadgeNumber] = useState('');
  const [purposeOfVisit, setPurposeOfVisit] = useState('');
  const [personToMeet, setPersonToMeet] = useState('');
  const [checkIn, setCheckIn] = useState(new Date());
  const [checkOut, setCheckOut] = useState(new Date());
  // console.log('checkIn', checkIn);
  const [showCheckInPicker, setShowCheckInPicker] = useState(false);
  const [showCheckOutPicker, setShowCheckOutPicker] = useState(false);

  const isSecurityCheckOut =
    selectedVisitor?.status === globalStatuses?.CHECKED_OUT;

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const role = await AsyncStorage.getItem('userRole');
        if (role) {
          setUserRole(role);
          // console.log('selectedrole', role);
        }
      } catch (error) {
        console.error('Failed to load user role:', error);
      }
    };

    fetchUserRole();
  }, []);

  useEffect(() => {
    if (selectedVisitor) {
      setBadgeNumber(selectedVisitor?.badgeNumber || '');
      setPurposeOfVisit(selectedVisitor?.purposeOfVisit || '');
      setPersonToMeet(selectedVisitor?.personToMeet || '');
      setCheckIn(
        selectedVisitor?.checkin
          ? new Date(selectedVisitor.checkin)
          : new Date(),
      );
      setCheckOut(
        selectedVisitor?.checkout
          ? new Date(selectedVisitor.checkout)
          : new Date(),
      );
    }
  }, [selectedVisitor]);

  const formatTime = (date: Date) => format(date, 'hh:mm a');

  const handleSubmit = () => {
    const payload = {
      id: selectedVisitor?._id,
      badgeNumber,
      purposeOfVisit,
      personToMeet,
      checkin: checkIn.toISOString(), // <-- ISO with 'Z'
      checkout: checkOut.toISOString(), // <-- ISO with 'Z'
    };
    onSubmit(payload);
    onClose();
  };

  const renderAdminView = () => (
    <View>
      <InputField
        disabled
        label="Badge Number"
        value={badgeNumber}
        onChangeText={setBadgeNumber}
        placeholder="Enter Badge Number"
      />
      <InputField
        label="Person to Meet"
        value={personToMeet}
        onChangeText={setPersonToMeet}
        placeholder="Enter Person Name"
      />
      <InputField
        label="Purpose of Visit"
        value={purposeOfVisit}
        onChangeText={setPurposeOfVisit}
        placeholder="Enter Purpose"
      />

      <Text style={styles.label}>Check-in Time</Text>
      <TouchableOpacity
        onPress={() => setShowCheckInPicker(true)}
        style={styles.timeInput}
      >
        <Text>{formatTime(checkIn)}</Text>
      </TouchableOpacity>
      {showCheckInPicker && (
        <DateTimePicker
          value={checkIn}
          mode="time"
          is24Hour
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(e, selected) => {
            setShowCheckInPicker(false);
            if (selected) setCheckIn(selected);
          }}
        />
      )}

      <Text style={styles.label}>Check-out Time</Text>
      <TouchableOpacity
        onPress={() => setShowCheckOutPicker(true)}
        style={styles.timeInput}
      >
        <Text>{formatTime(checkOut)}</Text>
      </TouchableOpacity>
      {showCheckOutPicker && (
        <DateTimePicker
          value={checkOut}
          mode="time"
          is24Hour
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(e, selected) => {
            setShowCheckOutPicker(false);
            if (selected) setCheckOut(selected);
          }}
        />
      )}

      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );

  // const renderSecurityView = () => {
  //   const isPending = selectedVisitor?.status === 'pending';
  //   const isCheckedOut = selectedVisitor?.status === 'checkedOut';
  //   const isEditable = isPending;
  //   console.log('isEditable', isEditable);
  //   return (
  //     <View>
  //       <InputField
  //         label="Badge Number"
  //         value={badgeNumber}
  //         onChangeText={setBadgeNumber}
  //         placeholder="Enter Badge Number"
  //         editable={isEditable}
  //         style={{
  //           backgroundColor: isCheckedOut ? '#f0f0f0' : 'white',
  //           color: isCheckedOut ? 'gray' : 'black',
  //         }}
  //         inputStyle={{
  //           color: !isCheckedOut ? 'gray' : 'black',

  //         }}
  //       />
  //       {!isSecurityCheckOut && (
  //         <Button
  //           title={
  //             selectedVisitor?.status === 'pending'
  //               ? 'Check In'
  //               : selectedVisitor?.status === 'checkedIn'
  //               ? 'Check Out'
  //               : 'Checked Out'
  //           }
  //           onPress={() => {
  //             const payload = {
  //               id: selectedVisitor?._id,
  //               badgeNumber,
  //               status:
  //                 selectedVisitor?.status === 'pending'
  //                   ? 'checkedIn'
  //                   : selectedVisitor?.status === 'checkedIn'
  //                   ? 'checkedOut'
  //                   : 'checkedOut',
  //             };
  //             onSubmit(payload);
  //             onClose();
  //           }}
  //           disabled={
  //             selectedVisitor?.status === 'pending' && badgeNumber.trim() === ''
  //           }
  //         />
  //       )}
  //       {selectedVisitor?.status === 'pending' && badgeNumber.trim() === '' && (
  //         <Text style={{ color: 'red', marginTop: 8 }}>
  //           Badge number is required to check in
  //         </Text>
  //       )}
  //     </View>
  //   );
  // };
  const renderSecurityView = () => {
    const isPending = selectedVisitor?.status === 'pending';
    const isCheckedIn = selectedVisitor?.status === 'checkedIn';
    const isCheckedOut = selectedVisitor?.status === 'checkedOut';

    const isEditable = isPending;
    const showButton = !isCheckedOut;

    const getNextStatus = () => {
      if (isPending) return 'checkedIn';
      if (isCheckedIn) return 'checkedOut';
      return 'checkedOut';
    };

    const getButtonTitle = () => {
      if (isPending) return 'Check In';
      if (isCheckedIn) return 'Check Out';
      return 'Checked Out';
    };

    const showError = isPending && badgeNumber.trim() === '';

    return (
      <View>
        <InputField
          label="Badge Number"
          value={badgeNumber}
          onChangeText={setBadgeNumber}
          placeholder="Enter Badge Number"
          editable={isEditable}
          disabled={!isEditable}
          error={showError ? 'Badge number is required to check in' : ''}
        />

        {showButton && (
          <Button
            title={getButtonTitle()}
            onPress={() => {
              const payload = {
                id: selectedVisitor?._id,
                badgeNumber,
                status: getNextStatus(),
              };
              onSubmit(payload);
              onClose();
            }}
            disabled={showError}
          />
        )}
      </View>
    );
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text style={styles.modalTitle}>Visitor Details</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={{ fontSize: 20 }}>X</Text>
            </TouchableOpacity>
          </View>

          {userRole === '2' || userRole === '1'
            ? renderAdminView()
            : renderSecurityView()}
        </View>
      </View>
    </Modal>
  );
};

export default VisitorModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#00000066',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: heightPercentageToDP('5%'),
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    width: '90%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  timeInput: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 15,
  },
  label: {
    fontWeight: '600',
    marginBottom: 5,
  },
});
