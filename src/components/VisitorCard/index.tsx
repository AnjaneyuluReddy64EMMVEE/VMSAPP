// import React from 'react';
// import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

// const VisitorCard = ({ item, onView }) => {
//   const statusStyle =
//     item.status === 'Pending'
//       ? styles.statusPending
//       : item.status === 'Checked In'
//       ? styles.statusIn
//       : styles.statusOut;

//   return (
//     <View style={styles.card}>
//       <Image source={{ uri: item.avatar }} style={styles.avatar} />
//       <View style={styles.details}>
//         <Text style={styles.name}>{item.name}</Text>
//         <Text style={styles.text}>{item.phone}</Text>
//         <Text style={styles.text}>{item.email}</Text>
//         <Text style={styles.text}>Badge: {item.badge || 'N/A'}</Text>
//         <Text style={styles.text}>Location: {item.location}</Text>
//       </View>
//       <View style={styles.rightSection}>
//         <Text style={[styles.status, statusStyle]}>{item.status}</Text>
//         <Text style={styles.text}>Purpose: {item.purpose}</Text>
//         <Text style={styles.text}>To Meet: {item.personToMeet}</Text>
//         <Text style={styles.text}>
//           {item.inTime} - {item.outTime || 'N/A'}
//         </Text>
//         <TouchableOpacity style={styles.viewButton} onPress={() => onView(item)}>
//           <Text style={styles.viewText}>View</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default VisitorCard;

// const styles = StyleSheet.create({
//   card: {
//     backgroundColor: '#fff',
//     flexDirection: 'row',
//     borderRadius: 12,
//     padding: 12,
//     marginBottom: 10,
//     elevation: 2,
//   },
//   avatar: { width: 44, height: 44, borderRadius: 22, marginRight: 10 },
//   details: { flex: 1 },
//   rightSection: { flex: 1.2, alignItems: 'flex-end' },
//   name: { fontSize: 16, fontWeight: '600' },
//   text: { fontSize: 12, color: '#444' },
//   status: {
//     fontWeight: '600',
//     paddingVertical: 4,
//     paddingHorizontal: 10,
//     borderRadius: 12,
//     fontSize: 12,
//     marginBottom: 4,
//   },
//   statusIn: { backgroundColor: '#ccf5d3', color: '#2e7d32' },
//   statusOut: { backgroundColor: '#ffeeba', color: '#8d6e63' },
//   statusPending: { backgroundColor: '#ffe0e0', color: '#c62828' },
//   viewButton: {
//     marginTop: 6,
//     backgroundColor: '#007bff',
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     borderRadius: 8,
//   },
//   viewText: { color: 'white', fontWeight: '600', fontSize: 12 },
// });

// import React from 'react';
// import {
//   View,
//   Text,
//   Image,
//   StyleSheet,
//   TouchableOpacity,
//   Linking,
// } from 'react-native';

// const VisitorCard = ({ item, onView }) => {
//   const {
//     firstName,
//     lastName,
//     phoneNumber,
//     email,
//     officeLocation,
//     purposeOfVisit,
//     otherPurpose,
//     personToMeet,
//     status,
//     userImage,
//     documentImage,
//     checkin,
//     checkout,
//   } = item;
//   return (
//     <TouchableOpacity style={styles.card} onPress={() => onView(item)}>
//       <View style={styles.row}>
//         <Image source={{ uri: userImage }} style={styles.avatar} />

//         <View style={styles.info}>
//           <Text style={styles.name}>
//             {firstName} {lastName}
//           </Text>
//           <Text style={styles.text}>📞 {phoneNumber}</Text>
//           <Text style={styles.text}>📧 {email || 'N/A'}</Text>
//           <Text style={styles.text}>🏢 {officeLocation}</Text>
//           <Text style={styles.text}>
//             🎯 {purposeOfVisit}
//             {otherPurpose ? ` (${otherPurpose})` : ''}
//           </Text>
//           <Text style={styles.text}>🤝 {personToMeet}</Text>
//           <Text style={styles.text}>
//             🕑 Check-in:{' '}
//             {checkin ? new Date(checkin).toLocaleString() : 'Pending'}
//           </Text>
//           <Text style={styles.text}>
//             🕓 Check-out:{' '}
//             {checkout ? new Date(checkout).toLocaleString() : 'Pending'}
//           </Text>
//           <Text style={[styles.status, getStatusColor(status)]}>
//             Status: {status}
//           </Text>
//           {documentImage ? (
//             <Text
//               style={styles.link}
//               onPress={() => Linking.openURL(documentImage)}
//             >
//               📄 View ID Document
//             </Text>
//           ) : (
//             <Text style={styles.text}>📄 No ID Document</Text>
//           )}
//         </View>
//       </View>
//     </TouchableOpacity>
//   );
// };

// const getStatusColor = status => ({
//   color:
//     status === 'checked-in'
//       ? 'green'
//       : status === 'checked-out'
//       ? 'red'
//       : 'orange',
//   fontWeight: 'bold',
// });

// const styles = StyleSheet.create({
//   card: {
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     padding: 12,
//     marginBottom: 12,
//     flexDirection: 'row',
//     elevation: 2,
//   },
//   row: {
//     flexDirection: 'row',
//   },
//   avatar: {
//     width: 70,
//     height: 70,
//     borderRadius: 8,
//     marginRight: 12,
//     backgroundColor: '#eee',
//   },
//   info: {
//     flex: 0,
//     justifyContent: 'center',
//   },
//   name: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#003366',
//     marginBottom: 4,
//   },
//   text: {
//     fontSize: 13,
//     color: '#444',
//     marginBottom: 2,
//   },
//   status: {
//     fontSize: 14,
//     marginTop: 4,
//   },
//   link: {
//     marginTop: 4,
//     fontSize: 13,
//     color: '#007bff',
//     textDecorationLine: 'underline',
//   },
// });

// export default VisitorCard;

import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Pressable,
} from 'react-native';

const VisitorCard = ({ item, onView }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [imageToView, setImageToView] = useState('');

  const statusStyle =
    item.status === 'pending'
      ? styles.statusPending
      : item.status === 'checkedIn'
      ? styles.statusIn
      : styles.statusOut;

  const openImage = uri => {
    setImageToView(uri);
    setModalVisible(true);
  };

  return (
    <>
      {/* Card */}
      <View style={styles.card}>
        <TouchableOpacity onPress={() => openImage(item.userImage)}>
          <Image source={{ uri: item.userImage }} style={styles.avatar} />
        </TouchableOpacity>

        <View style={styles.details}>
          <Text style={styles.name}>{item.firstName} {item.lastName}</Text>
          <Text style={styles.text}>{item.phoneNumber}</Text>
          <Text style={styles.text}>{item.email}</Text>
          <Text style={styles.text}>Badge: {item.badgeNumber || 'N/A'}</Text>
          <Text style={styles.text}>Location: {item.officeLocation}</Text>
        </View>

        <View style={styles.rightSection}>
          <Text style={[styles.status, statusStyle]}>{item.status}</Text>
          <Text style={styles.text}>Purpose: {item.purposeOfVisit}</Text>
          <Text style={styles.text}>To Meet: {item.personToMeet}</Text>
          <Text style={styles.text}>
            {formatTime(item.checkin)} - {item.checkout ? formatTime(item.checkout) : 'N/A'}
          </Text>

          {/* Tap on ID image */}
          {item.documentImage ? (
            <TouchableOpacity onPress={() => openImage(item.documentImage)}>
              <Image
                source={{ uri: item.documentImage }}
                style={styles.docImage}
                resizeMode="cover"
              />
            </TouchableOpacity>
          ) : null}

          <TouchableOpacity style={styles.viewButton} onPress={() => onView(item)}>
            <Text style={styles.viewText}>View</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Fullscreen Image Modal */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalBackdrop}>
          <TouchableOpacity
            style={styles.modalContainer}
            onPress={() => setModalVisible(false)}
          >
            <Image source={{ uri: imageToView }} style={styles.fullImage} resizeMode="contain" />
            <Pressable style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeText}>✕</Text>
            </Pressable>
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
};

const formatTime = iso => {
  if (!iso) return '';
  const date = new Date(iso);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

export default VisitorCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    elevation: 2,
  },
  avatar: { width: 44, height: 44, borderRadius: 22, marginRight: 10 },
  docImage: {
    width: 50,
    height: 40,
    borderRadius: 4,
    marginTop: 6,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  details: { flex: 1 },
  rightSection: { flex: 1.2, alignItems: 'flex-end' },
  name: { fontSize: 16, fontWeight: '600' },
  text: { fontSize: 12, color: '#444' },
  status: {
    fontWeight: '600',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    fontSize: 12,
    marginBottom: 4,
  },
  statusIn: { backgroundColor: '#ccf5d3', color: '#2e7d32' },
  statusOut: { backgroundColor: '#ffeeba', color: '#8d6e63' },
  statusPending: { backgroundColor: '#ffe0e0', color: '#c62828' },
  viewButton: {
    marginTop: 6,
    backgroundColor: '#007bff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  viewText: { color: 'white', fontWeight: '600', fontSize: 12 },

  // Modal Styles
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.85)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullImage: {
    width: '90%',
    height: '80%',
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 6,
  },
  closeText: {
    fontSize: 22,
    color: '#333',
  },
});
