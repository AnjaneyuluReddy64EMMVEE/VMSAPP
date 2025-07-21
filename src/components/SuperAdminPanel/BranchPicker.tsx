import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';

interface BranchPickerProps {
  visible: boolean;
  onClose: () => void;
  branches: string[];
  onSelect: (branch: string) => void;
}

const BranchPicker = ({
  visible,
  onClose,
  branches,
  onSelect,
}: BranchPickerProps) => (
  <Modal visible={visible} transparent animationType="fade">
    <TouchableOpacity style={styles.overlay} onPress={onClose}>
      <View style={styles.modal}>
        <FlatList
          data={branches}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.item}
              onPress={() => {
                onSelect(item);
                onClose();
              }}
            >
              <Text style={styles.text}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </TouchableOpacity>
  </Modal>
);

export default BranchPicker;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    elevation: 5,
  },
  item: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  text: {
    fontSize: 16,
    color: '#1e293b',
  },
});
