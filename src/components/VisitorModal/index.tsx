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
import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { globalRoles, globalStatuses } from '../../utils/CommonUtils';
import InputField from '../InputField';
import Button from '../Button';

const VisitorModal = ({
  visible,
  onClose,
  selectedVisitor,
  userRole,
  onSubmit,
}) => {
  const [badgeNumber, setBadgeNumber] = useState('');
  const [purpose, setPurpose] = useState('');
  const [personToMeet, setPersonToMeet] = useState('');

  useEffect(() => {
    if (selectedVisitor) {
      setBadgeNumber(selectedVisitor.badgeNumber || '');
      setPurpose(selectedVisitor.purposeOfVisit || '');
      setPersonToMeet(selectedVisitor.personToMeet || '');
    }
  }, [selectedVisitor]);

  const status = selectedVisitor?.status;

  const isSecurity = userRole === globalRoles.SECURITY;
  const isAdmin = userRole === globalRoles.ADMIN;
  const isSuperadmin = userRole === globalRoles.SUPERADMIN;

  const handleSubmit = () => {
    if (!selectedVisitor) return;

    const payload = {
      id: selectedVisitor._id,
      badgeNumber,
      purposeOfVisit: purpose,
      personToMeet,
      status:
        status === globalStatuses.PENDING
          ? globalStatuses.CHECKED_IN
          : globalStatuses.CHECKED_OUT,
    };

    onSubmit(payload);
  };

  const renderCheckTimes = () => (
    <>
      <InputField
        label="Check-in Time"
        value={formatTime(selectedVisitor?.checkin)}
        editable={false}
      />
      <InputField
        label="Check-out Time"
        value={formatTime(selectedVisitor?.checkout)}
        editable={false}
      />
    </>
  );

  const renderSecurityView = () => {
    if (status === globalStatuses.PENDING) {
      return (
        <>
          <InputField
            label="Enter Badge Number"
            value={badgeNumber}
            onChangeText={setBadgeNumber}
          />
          {renderCheckTimes()}
          <Button title="Check In" onPress={handleSubmit} />
        </>
      );
    }

    if (status === globalStatuses.CHECKED_IN) {
      return (
        <>
          <InputField
            label="Badge Number"
            value={badgeNumber}
            editable={false}
          />
          {renderCheckTimes()}
          <Button title="Check Out" onPress={handleSubmit} />
        </>
      );
    }

    if (status === globalStatuses.CHECKED_OUT) {
      return (
        <>
          <InputField
            label="Badge Number"
            value={badgeNumber}
            editable={false}
          />
          {renderCheckTimes()}
          <Text style={styles.infoText}>Visitor already checked out.</Text>
        </>
      );
    }
  };

  const renderAdminView = () => {
    return (
      <>
        <InputField
          label="Purpose of Visit"
          value={purpose}
          onChangeText={setPurpose}
        />
        <InputField
          label="Person to Meet"
          value={personToMeet}
          onChangeText={setPersonToMeet}
        />
        {renderCheckTimes()}
        <Button title="Update Visitor" onPress={handleSubmit} />
      </>
    );
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.backdrop}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Visitor Details</Text>

          {isSecurity && renderSecurityView()}
          {true && renderAdminView()}

          <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const formatTime = iso => {
  if (!iso) return 'N/A';
  const date = new Date(iso);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

export default VisitorModal;

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  closeBtn: {
    marginTop: 16,
    alignSelf: 'flex-end',
  },
  closeText: {
    color: '#007bff',
    fontWeight: 'bold',
  },
  infoText: {
    marginTop: 10,
    fontSize: 14,
    color: '#999',
  },
});
