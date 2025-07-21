import React from 'react';
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const UpdateVisitorCard = ({
  visible,
  onClose,
  onSave,
  modalBadge,
  setModalBadge,
  modalStatus,
  setModalStatus,
}) => {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Update Visitor</Text>

          <TextInput
            placeholder="Badge Number"
            style={styles.modalInput}
            value={modalBadge}
            onChangeText={setModalBadge}
          />

          {/* Status Dropdown */}
          <TouchableOpacity
            style={styles.statusDropdown}
            onPress={() => {
              if (modalStatus === 'pending') setModalStatus('checkedIn');
              else if (modalStatus === 'checkedIn')
                setModalStatus('checkedOut');
              else setModalStatus('pending');
            }}
          >
            <Text>{modalStatus}</Text>
          </TouchableOpacity>

          {/* Save Button */}
          <TouchableOpacity style={styles.saveButton} onPress={onSave}>
            <Text style={styles.saveText}>Save</Text>
          </TouchableOpacity>

          {/* Cancel Button */}
          <TouchableOpacity onPress={onClose}>
            <Text style={{ color: 'red', marginTop: 10 }}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default UpdateVisitorCard;

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
  },
  saveText: { color: '#fff', textAlign: 'center', fontWeight: '600' },
});
