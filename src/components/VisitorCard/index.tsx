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
import VisitorModal from '../VisitorModal';
import { heightPercentageToDP } from 'react-native-responsive-screen';

const VisitorCard = ({ item, userRole, onUpdateVisitor }) => {
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const [imageToView, setImageToView] = useState('');
  const [visitorModalVisible, setVisitorModalVisible] = useState(false);
  const [selectedVisitor, setSelectedVisitor] = useState(null);
  // console.log(item);
  const statusStyle =
    item.status === 'pending'
      ? styles.statusPending
      : item.status === 'checkedIn'
      ? styles.statusIn
      : styles.statusOut;

  const isCheckedOut = item?.status === 'checkedOut';

  const openImage = uri => {
    setImageToView(uri);
    setImageModalVisible(true);
  };

  const handleViewVisitor = visitor => {
    setSelectedVisitor(visitor);
    setVisitorModalVisible(true);
  };

  const handleVisitorSubmit = async updatedData => {
    onUpdateVisitor(updatedData);
    setVisitorModalVisible(false);
  };
  const formatDate = iso => {
    if (!iso) return 'N/A';
    const date = new Date(iso);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };
  const formatTime = iso => {
    if (!iso) return '';
    const date = new Date(iso);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {/* Visitor Card */}
      <View style={styles.card}>
        <TouchableOpacity onPress={() => openImage(item.userImage)}>
          <Image source={{ uri: item.userImageURL }} style={styles.avatar} />
        </TouchableOpacity>

        <View style={styles.details}>
          <Text style={styles.name}>
            {item.firstName} {item.lastName}
          </Text>
          <Text style={styles.text}>{item.phoneNumber}</Text>
          <Text style={styles.text}>Email:{item.email}</Text>
          <Text style={styles.text}>Badge: {item.badgeNumber || 'N/A'}</Text>
          <Text style={styles.text}>Location: {item.officeLocation}</Text>
          <Text style={styles.text}>
            Visit Date: {formatDate(item.visitDate)}
          </Text>
        </View>

        <View style={styles.rightSection}>
          <Text style={[styles.status, statusStyle]}>{item.status}</Text>
          <Text style={styles.text}>Purpose: {item.purposeOfVisit}</Text>
          <Text style={styles.text}>To Meet: {item.personToMeet}</Text>
          <Text style={styles.text}>
            {item.checkin ? formatTime(item.checkin) : 'N/A'} -{' '}
            {item.checkout ? formatTime(item.checkout) : 'N/A'}
          </Text>

          {/* ID Image Preview */}
          {item.documentImageURL ? (
            <TouchableOpacity onPress={() => openImage(item.documentImageURL)}>
              <Image
                source={{ uri: item.documentImageURL }}
                style={styles.docImage}
                resizeMode="cover"
              />
            </TouchableOpacity>
          ) : null}

          {/* View Button */}
          {true && (
            <TouchableOpacity
              style={styles.viewButton}
              onPress={() => handleViewVisitor(item)}
            >
              <Text style={styles.viewText}>View</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Fullscreen Image Modal */}
      <Modal visible={imageModalVisible} transparent animationType="fade">
        <View style={styles.modalBackdrop}>
          <TouchableOpacity
            style={styles.modalContainer}
            onPress={() => setImageModalVisible(false)}
          >
            <Image
              source={{ uri: imageToView }}
              style={styles.fullImage}
              resizeMode="contain"
            />
            <Pressable
              style={styles.closeButton}
              onPress={() => setImageModalVisible(false)}
            >
              <Text style={styles.closeText}>✕</Text>
            </Pressable>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* VisitorModal (Check-in / Check-out / Edit) */}
      <VisitorModal
        visible={visitorModalVisible}
        selectedVisitor={selectedVisitor}
        userRole={userRole}
        onClose={() => setVisitorModalVisible(false)}
        onSubmit={handleVisitorSubmit}
      />
    </>
  );
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
    marginTop: heightPercentageToDP('5%'),
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
