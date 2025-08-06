import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
} from 'react-native';

interface BranchPickerProps {
  visible: boolean;
  onClose: () => void;
  branches: string[];
  onSelect: (branch: string) => void;
  selectedBranch: string;
}

const BranchPicker: React.FC<BranchPickerProps> = ({
  visible,
  onClose,
  branches,
  onSelect,
  selectedBranch,
}) => {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Select Branch</Text>
          <FlatList
            data={branches}
            keyExtractor={item => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.branchItem,
                  item === selectedBranch && styles.selected,
                ]}
                onPress={() => {
                  onSelect(item);
                  onClose();
                }}
              >
                <Text style={styles.branchText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default BranchPicker;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#00000088',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
  },
  branchItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  selected: {
    backgroundColor: '#e0f7ff',
  },
  branchText: {
    fontSize: 16,
    color: '#1e293b',
  },
  closeButton: {
    marginTop: 16,
    alignSelf: 'center',
  },
  closeText: {
    color: '#00AEEF',
    fontSize: 16,
  },
});
