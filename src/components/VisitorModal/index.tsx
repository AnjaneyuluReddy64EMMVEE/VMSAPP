// import React, { useState, useEffect } from 'react';
// import {
//   Modal,
//   View,
//   Text,
//   TouchableOpacity,
//   TextInput,
//   StyleSheet,
// } from 'react-native';
// import { globalRoles, globalStatuses } from '../../utils/CommonUtils';
// import InputField from '../InputField';
// import Button from '../Button';

// const VisitorModal = ({
//   visible,
//   onClose,
//   selectedVisitor,
//   userRole,
//   onSubmit,
// }) => {
//   const [badgeNumber, setBadgeNumber] = useState('');
//   const [purpose, setPurpose] = useState('');
//   const [personToMeet, setPersonToMeet] = useState('');
//   console.log(selectedVisitor);
//   useEffect(() => {
//     if (selectedVisitor) {
//       setBadgeNumber(selectedVisitor.badgeNumber || '');
//       setPurpose(selectedVisitor.purposeOfVisit || '');
//       setPersonToMeet(selectedVisitor.personToMeet || '');
//     }
//   }, [selectedVisitor]);

//   const status = selectedVisitor?.status;

//   const isSecurity = userRole === globalRoles.SECURITY;
//   const isAdmin = userRole === globalRoles.ADMIN;
//   const isSuperadmin = userRole === globalRoles.SUPERADMIN;

//   const handleSubmit = () => {
//     if (!selectedVisitor) return;

//     const payload = {
//       id: selectedVisitor._id,
//       badgeNumber,
//       purposeOfVisit: purpose,
//       personToMeet,
//       status:
//         status === globalStatuses.PENDING
//           ? globalStatuses.CHECKED_IN
//           : globalStatuses.CHECKED_OUT,
//     };

//     onSubmit(payload);
//   };

//   const renderSecurityView = () => {
//     if (status === globalStatuses.PENDING) {
//       return (
//         <>
//           <InputField
//             label="Enter Badge Number"
//             value={badgeNumber}
//             onChangeText={setBadgeNumber}
//           />
//           <Button title="Check In" onPress={handleSubmit} />
//         </>
//       );
//     }

//     if (status === globalStatuses.CHECKED_IN) {
//       return (
//         <>
//           <InputField
//             label="Badge Number"
//             value={badgeNumber}
//             editable={false}
//           />
//           <Button title="Check Out" onPress={handleSubmit} />
//         </>
//       );
//     }

//     if (status === globalStatuses.CHECKED_OUT) {
//       return (
//         <>
//           <InputField
//             label="Badge Number"
//             value={badgeNumber}
//             editable={false}
//           />
//           <Text style={styles.infoText}>Visitor already checked out.</Text>
//         </>
//       );
//     }
//   };

//   const renderAdminView = () => {
//     return (
//       <>
//         {/* <InputField
//           label="Badge Number"
//           value={badgeNumber}
//           onChangeText={setBadgeNumber}
//         /> */}
//         <InputField
//           label="Purpose of Visit"
//           value={purpose}
//           onChangeText={setPurpose}
//         />
//         <InputField
//           label="Person to Meet"
//           value={personToMeet}
//           onChangeText={setPersonToMeet}
//         />
//         <Text style={styles.timeText}>
//           Check-in: {formatTime(selectedVisitor?.checkin)}
//         </Text>
//         <Text style={styles.timeText}>
//           Check-out: {formatTime(selectedVisitor?.checkout)}
//         </Text>
//         <Button title="Update Visitor" onPress={handleSubmit} />
//       </>
//     );
//   };

//   return (
//     <Modal visible={visible} transparent animationType="slide">
//       <View style={styles.backdrop}>
//         <View style={styles.modalContainer}>
//           <Text style={styles.title}>Visitor Details</Text>

//           {isSecurity && renderSecurityView()}
//           {(isAdmin || isSuperadmin) && renderAdminView()}

//           <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
//             <Text style={styles.closeText}>Close</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </Modal>
//   );
// };

// const formatTime = iso => {
//   if (!iso) return 'N/A';
//   const date = new Date(iso);
//   return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
// };

// export default VisitorModal;

// const styles = StyleSheet.create({
//   backdrop: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.6)',
//     justifyContent: 'center',
//     padding: 20,
//   },
//   modalContainer: {
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     padding: 20,
//   },
//   title: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 16,
//   },
//   closeBtn: {
//     marginTop: 16,
//     alignSelf: 'flex-end',
//   },
//   closeText: {
//     color: '#007bff',
//     fontWeight: 'bold',
//   },
//   timeText: {
//     fontSize: 12,
//     marginTop: 4,
//     color: '#555',
//   },
//   infoText: {
//     marginTop: 10,
//     fontSize: 14,
//     color: '#999',
//   },
// });

// import React, { useState, useEffect } from 'react';
// import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import { globalRoles, globalStatuses } from '../../utils/CommonUtils';
// import InputField from '../InputField';
// import Button from '../Button';

// const VisitorModal = ({
//   visible,
//   onClose,
//   selectedVisitor,
//   userRole,
//   onSubmit,
// }) => {
//   const [badgeNumber, setBadgeNumber] = useState('');
//   const [purpose, setPurpose] = useState('');
//   const [personToMeet, setPersonToMeet] = useState('');

//   useEffect(() => {
//     if (selectedVisitor) {
//       setBadgeNumber(selectedVisitor.badgeNumber || '');
//       setPurpose(selectedVisitor.purposeOfVisit || '');
//       setPersonToMeet(selectedVisitor.personToMeet || '');
//     }
//   }, [selectedVisitor]);

//   const status = selectedVisitor?.status;

//   const isSecurity = userRole === globalRoles.SECURITY;
//   const isAdmin = userRole === globalRoles.ADMIN;
//   const isSuperadmin = userRole === globalRoles.SUPERADMIN;

//   const handleSubmit = () => {
//     if (!selectedVisitor) return;

//     const payload = {
//       id: selectedVisitor._id,
//       badgeNumber,
//       purposeOfVisit: purpose,
//       personToMeet,
//       status:
//         status === globalStatuses.PENDING
//           ? globalStatuses.CHECKED_IN
//           : globalStatuses.CHECKED_OUT,
//     };

//     onSubmit(payload);
//   };

//   const renderCheckTimes = () => (
//     <>
//       <InputField
//         label="Check-in Time"
//         value={formatTime(selectedVisitor?.checkin)}
//         editable={false}
//       />
//       <InputField
//         label="Check-out Time"
//         value={formatTime(selectedVisitor?.checkout)}
//         editable={false}
//       />
//     </>
//   );

//   const renderSecurityView = () => {
//     if (status === globalStatuses.PENDING) {
//       return (
//         <>
//           <InputField
//             label="Enter Badge Number"
//             value={badgeNumber}
//             onChangeText={setBadgeNumber}
//           />
//           {renderCheckTimes()}
//           <Button title="Check In" onPress={handleSubmit} />
//         </>
//       );
//     }

//     if (status === globalStatuses.CHECKED_IN) {
//       return (
//         <>
//           <InputField
//             label="Badge Number"
//             value={badgeNumber}
//             editable={false}
//           />
//           {renderCheckTimes()}
//           <Button title="Check Out" onPress={handleSubmit} />
//         </>
//       );
//     }

//     if (status === globalStatuses.CHECKED_OUT) {
//       return (
//         <>
//           <InputField
//             label="Badge Number"
//             value={badgeNumber}
//             editable={false}
//           />
//           {renderCheckTimes()}
//           <Text style={styles.infoText}>Visitor already checked out.</Text>
//         </>
//       );
//     }
//   };

//   const renderAdminView = () => {
//     return (
//       <>
//         <InputField
//           label="Purpose of Visit"
//           value={purpose}
//           onChangeText={setPurpose}
//         />
//         <InputField
//           label="Person to Meet"
//           value={personToMeet}
//           onChangeText={setPersonToMeet}
//         />
//         {renderCheckTimes()}
//         <Button title="Update Visitor" onPress={handleSubmit} />
//       </>
//     );
//   };

//   return (
//     <Modal visible={visible} transparent animationType="slide">
//       <View style={styles.backdrop}>
//         <View style={styles.modalContainer}>
//           <Text style={styles.title}>Visitor Details</Text>

//           {isSecurity && renderSecurityView()}
//           {(isAdmin || isSuperadmin) &&
//             status !== globalStatuses.PENDING &&
//             renderAdminView()}

//           <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
//             <Text style={styles.closeText}>Close</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </Modal>
//   );
// };

// const formatTime = iso => {
//   if (!iso) return 'N/A';
//   const date = new Date(iso);
//   return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
// };

// export default VisitorModal;

// const styles = StyleSheet.create({
//   backdrop: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.6)',
//     justifyContent: 'center',
//     padding: 20,
//   },
//   modalContainer: {
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     padding: 20,
//   },
//   title: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 16,
//   },
//   closeBtn: {
//     marginTop: 16,
//     alignSelf: 'flex-end',
//   },
//   closeText: {
//     color: '#007bff',
//     fontWeight: 'bold',
//   },
//   infoText: {
//     marginTop: 10,
//     fontSize: 14,
//     color: '#999',
//   },
// });

import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import InputField from '../InputField';
import Button from '../Button';
import { globalRoles, globalStatuses } from '../../utils/CommonUtils';

const VisitorModal = ({
  visible,
  onClose,
  selectedVisitor,
  userRole,
  onSubmit,
}) => {
  const [badgeNumber, setBadgeNumber] = useState('');
  const [purposeOfVisit, setPurposeOfVisit] = useState('');
  const [personToMeet, setPersonToMeet] = useState('');

  const [showTimeInPicker, setShowTimeInPicker] = useState(false);
  const [showTimeOutPicker, setShowTimeOutPicker] = useState(false);

  const [timeIn, setTimeIn] = useState(new Date());
  const [timeOut, setTimeOut] = useState(new Date());

  useEffect(() => {
    if (selectedVisitor) {
      setBadgeNumber(selectedVisitor?.badgeNumber || '');
      setPurposeOfVisit(selectedVisitor?.purposeOfVisit || '');
      setPersonToMeet(selectedVisitor?.personToMeet || '');
      setTimeIn(
        selectedVisitor?.timeIn ? new Date(selectedVisitor.timeIn) : new Date(),
      );
      setTimeOut(
        selectedVisitor?.timeOut
          ? new Date(selectedVisitor.timeOut)
          : new Date(),
      );
    }
  }, [selectedVisitor]);

  const formatTime = (iso: string) => {
    const date = new Date(iso);
    return date.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleSubmit = () => {
    const payload = {
      id: selectedVisitor?._id,
      badgeNumber,
      purposeOfVisit,
      personToMeet,
      timeIn: timeIn.toISOString(),
      timeOut: timeOut.toISOString(),
    };
    // return false;
    onSubmit(payload);
    onClose();
  };

  const renderAdminView = () => (
    <View>
      <InputField
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
        onPress={() => setShowTimeInPicker(true)}
        style={styles.timeInput}
      >
        <Text>{formatTime(timeIn.toISOString())}</Text>
      </TouchableOpacity>
      {showTimeInPicker && (
        <DateTimePicker
          value={timeIn}
          mode="time"
          is24Hour
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(e, selected) => {
            setShowTimeInPicker(false);
            if (selected) setTimeIn(selected);
          }}
        />
      )}

      <Text style={styles.label}>Check-out Time</Text>
      <TouchableOpacity
        onPress={() => setShowTimeOutPicker(true)}
        style={styles.timeInput}
      >
        <Text>{formatTime(timeOut.toISOString())}</Text>
      </TouchableOpacity>
      {showTimeOutPicker && (
        <DateTimePicker
          value={timeOut}
          mode="time"
          is24Hour
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(e, selected) => {
            setShowTimeOutPicker(false);
            if (selected) setTimeOut(selected);
          }}
        />
      )}

      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
  const isSecurityCheckOut =
    selectedVisitor?.status === globalStatuses?.CHECKED_OUT;
  const renderSecurityView = () => (
    <View>
      <InputField
        label="Badge Number"
        value={badgeNumber}
        onChangeText={setBadgeNumber}
        placeholder="Enter Badge Number"
        editable={selectedVisitor?.status === 'pending'}
      />
      <>
        {!isSecurityCheckOut && (
          <Button
            title={
              selectedVisitor?.status === 'pending'
                ? 'Check In'
                : selectedVisitor?.status === 'checkedIn'
                ? 'Check Out'
                : 'Checked Out'
            }
            onPress={() => {
              const payload = {
                id: selectedVisitor?._id,
                badgeNumber,
                status:
                  selectedVisitor?.status === 'pending'
                    ? 'checkedIn'
                    : selectedVisitor?.status === 'checkedIn'
                    ? 'checkedOut'
                    : 'checkedOut',
              };
              onSubmit(payload);
              onClose();
            }}
          />
        )}
      </>
    </View>
  );

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

          {userRole === globalRoles.ADMIN || userRole === globalRoles.SUPERADMIN
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
