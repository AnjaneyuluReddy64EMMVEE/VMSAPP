import React, { useState, useEffect } from 'react';
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
  onSelect: (branch: string[]) => void;
  selectedBranches: string[];
}

const BranchSelector: React.FC<BranchPickerProps> = ({
  visible,
  onClose,
  branches,
  onSelect,
  selectedBranches,
}) => {
  const [localSelection, setLocalSelection] = useState<string[]>([]);

  useEffect(() => {
    setLocalSelection(selectedBranches); // initialize selection
  }, [selectedBranches]);

  const toggleBranch = (branch: string) => {
    if (localSelection.includes(branch)) {
      setLocalSelection(prev => prev.filter(b => b !== branch));
    } else {
      setLocalSelection(prev => [...prev, branch]);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Select Branches</Text>

          <FlatList
            data={branches}
            keyExtractor={item => item}
            renderItem={({ item }) => {
              const isSelected = localSelection.includes(item);
              return (
                <TouchableOpacity
                  style={[styles.branchItem, isSelected && styles.selected]}
                  onPress={() => toggleBranch(item)}
                >
                  <Text style={styles.branchText}>{item}</Text>
                  {isSelected && <Text style={styles.checkMark}>✓</Text>}
                </TouchableOpacity>
              );
            }}
          />

          <View style={styles.actions}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => {
                onSelect(localSelection);
                onClose();
              }}
            >
              <Text style={styles.actionText}>Done</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: '#ccc' }]}
              onPress={onClose}
            >
              <Text style={styles.actionText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default BranchSelector;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#00000088',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: '85%',
    maxHeight: '70%',
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
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  checkMark: {
    fontSize: 18,
    color: '#007AFF',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  actionButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 6,
    flex: 1,
    marginHorizontal: 6,
    alignItems: 'center',
  },
  actionText: {
    color: '#fff',
    fontWeight: '600',
  },
});
