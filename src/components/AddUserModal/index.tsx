// import React from 'react';
// import {
//   View,
//   Text,
//   Modal,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Platform,
// } from 'react-native';
// import { Picker } from '@react-native-picker/picker';

// interface AddAdminModalProps {
//   visible: boolean;
//   title: string;
//   name: string;
//   email: string;
//   password: string;
//   employeeId: string;
//   phoneNumber: string;
//   branch: string;
//   branches: string[];
//   onClose: () => void;
//   onAdd: () => void;
//   setName: (text: string) => void;
//   setEmail: (text: string) => void;
//   setPassword: (text: string) => void;
//   setEmployeeId: (text: string) => void;
//   setPhoneNumber: (text: string) => void;
//   setBranch: (branch: string) => void;
// }

// const AddUserModal: React.FC<AddAdminModalProps> = ({
//   title,
//   visible,
//   name,
//   email,
//   password,
//   employeeId,
//   phoneNumber,
//   branch,
//   branches,
//   onClose,
//   onAdd,
//   setName,
//   setEmail,
//   setPassword,
//   setEmployeeId,
//   setPhoneNumber,
//   setBranch,
// }) => (
//   <Modal visible={visible} animationType="slide" transparent>
//     <View style={styles.overlay}>
//       <View style={styles.container}>
//         <Text style={styles.title}>{title}</Text>

//         <TextInput
//           placeholder="Full Name"
//           style={styles.input}
//           value={name}
//           onChangeText={setName}
//         />
//         <TextInput
//           placeholder="Email"
//           style={styles.input}
//           keyboardType="email-address"
//           value={email}
//           onChangeText={setEmail}
//         />
//         <TextInput
//           placeholder="Password"
//           style={styles.input}
//           secureTextEntry
//           value={password}
//           onChangeText={setPassword}
//         />
//         <TextInput
//           placeholder="Employee ID"
//           style={styles.input}
//           value={employeeId}
//           onChangeText={setEmployeeId}
//         />
//         <TextInput
//           placeholder="Phone Number"
//           style={styles.input}
//           keyboardType="phone-pad"
//           value={phoneNumber}
//           onChangeText={setPhoneNumber}
//         />

//         <Text style={styles.label}>Select Branch</Text>
//         <View style={styles.pickerWrapper}>
//           <Picker
//             selectedValue={branch}
//             onValueChange={value => setBranch(value)}
//             style={Platform.OS === 'android' ? styles.picker : undefined}
//             itemStyle={Platform.OS === 'ios' ? styles.pickerItemIOS : undefined}
//           >
//             {branches.map(branch => (
//               <Picker.Item key={branch} label={branch} value={branch} />
//             ))}
//           </Picker>
//         </View>

//         <TouchableOpacity onPress={onAdd} style={styles.addButton}>
//           <Text style={styles.addText}>Add</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           onPress={onClose}
//           style={[styles.addButton, { backgroundColor: '#ccc' }]}
//         >
//           <Text style={styles.addText}>Cancel</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   </Modal>
// );

// export default AddUserModal;

// const styles = StyleSheet.create({
//   overlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.3)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   container: {
//     backgroundColor: '#fff',
//     width: '85%',
//     borderRadius: 12,
//     padding: 20,
//     elevation: 5,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#003366',
//     marginBottom: 12,
//     alignSelf: 'center',
//   },
//   input: {
//     backgroundColor: '#f2f2f2',
//     padding: 10,
//     marginVertical: 6,
//     borderRadius: 6,
//     fontSize: 16,
//   },
//   label: {
//     fontSize: 14,
//     color: '#333',
//     marginTop: 10,
//     marginBottom: 4,
//   },
//   pickerWrapper: {
//     backgroundColor: '#f2f2f2',
//     borderRadius: 6,
//     marginBottom: 10,
//   },
//   picker: {
//     height: 50,
//     color: '#333',
//   },
//   pickerItemIOS: {
//     fontSize: 16,
//     height: 50,
//   },
//   addButton: {
//     backgroundColor: '#00AEEF',
//     padding: 12,
//     borderRadius: 6,
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   addText: {
//     color: 'white',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
// });

// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   Modal,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Platform,
//   ScrollView,
// } from 'react-native';

// interface AddAdminModalProps {
//   visible: boolean;
//   title: string;
//   name: string;
//   email: string;
//   password: string;
//   employeeId: string;
//   phoneNumber: string;
//   branch: string[];
//   branches: string[];
//   onClose: () => void;
//   onAdd: () => void;
//   setName: (text: string) => void;
//   setEmail: (text: string) => void;
//   setPassword: (text: string) => void;
//   setEmployeeId: (text: string) => void;
//   setPhoneNumber: (text: string) => void;
//   setBranch: (branch: string[]) => void;
// }

// const AddUserModal: React.FC<AddAdminModalProps> = ({
//   title,
//   visible,
//   name,
//   email,
//   password,
//   employeeId,
//   phoneNumber,
//   branch,
//   branches,
//   onClose,
//   onAdd,
//   setName,
//   setEmail,
//   setPassword,
//   setEmployeeId,
//   setPhoneNumber,
//   setBranch,
// }) => {
//   const toggleBranch = (selected: string) => {
//     if (branch.includes(selected)) {
//       setBranch(branch.filter(item => item !== selected));
//     } else {
//       setBranch([...branch, selected]);
//     }
//   };

//   const [showPassword, setShowPassword] = useState(false);

//   return (
//     <Modal visible={visible} animationType="slide" transparent>
//       <View style={styles.overlay}>
//         <ScrollView
//           contentContainerStyle={styles.container}
//           keyboardShouldPersistTaps="handled"
//         >
//           <Text style={styles.title}>{title}</Text>

//           <TextInput
//             placeholder="Full Name"
//             style={styles.input}
//             value={name}
//             onChangeText={setName}
//           />
//           <TextInput
//             placeholder="Email"
//             style={styles.input}
//             keyboardType="email-address"
//             value={email}
//             onChangeText={setEmail}
//           />
//           <TextInput
//             placeholder="Password"
//             style={styles.input}
//             secureTextEntry={!showPassword && Platform.OS !== 'web'}
//             value={password}
//             onChangeText={setPassword}
//           />
//           <TouchableOpacity
//             onPress={() => setShowPassword(prev => !prev)}
//             style={styles.toggleBtn}
//           >
//             <Text style={styles.toggleText}>
//               {showPassword ? 'Hide' : 'Show'} Password
//             </Text>
//           </TouchableOpacity>

//           <TextInput
//             placeholder="Employee ID"
//             style={styles.input}
//             value={employeeId}
//             onChangeText={setEmployeeId}
//           />
//           <TextInput
//             placeholder="Phone Number"
//             style={styles.input}
//             keyboardType="phone-pad"
//             value={phoneNumber}
//             onChangeText={setPhoneNumber}
//           />

//           <Text style={styles.label}>Select Office</Text>
//           <View style={styles.multiSelectBox}>
//             {branches.map(b => (
//               <TouchableOpacity
//                 key={b}
//                 onPress={() => toggleBranch(b)}
//                 style={[
//                   styles.branchItem,
//                   branch.includes(b) && styles.branchItemSelected,
//                 ]}
//               >
//                 <Text
//                   style={{
//                     color: branch.includes(b) ? '#fff' : '#333',
//                   }}
//                 >
//                   {b}
//                 </Text>
//               </TouchableOpacity>
//             ))}
//           </View>

//           <TouchableOpacity onPress={onAdd} style={styles.addButton}>
//             <Text style={styles.addText}>Add</Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             onPress={onClose}
//             style={[styles.addButton, { backgroundColor: '#b03a3a' }]}
//           >
//             <Text style={styles.addText}>Cancel</Text>
//           </TouchableOpacity>
//         </ScrollView>
//       </View>
//     </Modal>
//   );
// };

// export default AddUserModal;

// const styles = StyleSheet.create({
//   overlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.3)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   container: {
//     backgroundColor: '#fff',
//     width: '90%',
//     borderRadius: 12,
//     padding: 20,
//     paddingTop: 30,
//     marginTop: Platform.OS === 'ios' ? 60 : 30,
//     elevation: 5,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#003366',
//     marginBottom: 12,
//     alignSelf: 'center',
//   },
//   input: {
//     backgroundColor: '#f2f2f2',
//     padding: 10,
//     marginVertical: 6,
//     borderRadius: 6,
//     fontSize: 16,
//   },
//   label: {
//     fontSize: 14,
//     color: '#333',
//     marginTop: 10,
//     marginBottom: 4,
//   },
//   multiSelectBox: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     marginBottom: 10,
//   },
//   branchItem: {
//     paddingVertical: 6,
//     paddingHorizontal: 10,
//     backgroundColor: '#e0e0e0',
//     borderRadius: 6,
//     margin: 4,
//   },
//   branchItemSelected: {
//     backgroundColor: '#007AFF',
//   },
//   addButton: {
//     backgroundColor: '#00AEEF',
//     padding: 12,
//     borderRadius: 6,
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   addText: {
//     color: 'white',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
//   toggleBtn: {
//     alignSelf: 'flex-end',
//     marginBottom: 4,
//   },
//   toggleText: {
//     fontSize: 12,
//     color: '#007AFF',
//   },
// });
import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  ScrollView,
} from 'react-native';
import BranchPicker from '../BranchPicker';

interface AddAdminModalProps {
  visible: boolean;
  title: string;
  name: string;
  email: string;
  password: string;
  employeeId: string;
  phoneNumber: string;
  branch: string[];
  branches: string[];
  onClose: () => void;
  onAdd: () => void;
  setName: (text: string) => void;
  setEmail: (text: string) => void;
  setPassword: (text: string) => void;
  setEmployeeId: (text: string) => void;
  setPhoneNumber: (text: string) => void;
  setBranch: (branch: string[]) => void;
}

const AddUserModal: React.FC<AddAdminModalProps> = ({
  title,
  visible,
  name,
  email,
  password,
  employeeId,
  phoneNumber,
  branch,
  branches,
  onClose,
  onAdd,
  setName,
  setEmail,
  setPassword,
  setEmployeeId,
  setPhoneNumber,
  setBranch,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showBranchPicker, setShowBranchPicker] = useState(false);

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>{title}</Text>

          <TextInput
            placeholder="Full Name"
            style={styles.input}
            value={name}
            onChangeText={setName}
          />
          <TextInput
            placeholder="Email"
            style={styles.input}
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            placeholder="Password"
            style={styles.input}
            secureTextEntry={!showPassword && Platform.OS !== 'web'}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            onPress={() => setShowPassword(prev => !prev)}
            style={styles.toggleBtn}
          >
            <Text style={styles.toggleText}>
              {showPassword ? 'Hide' : 'Show'} Password
            </Text>
          </TouchableOpacity>

          <TextInput
            placeholder="Employee ID"
            style={styles.input}
            value={employeeId}
            onChangeText={setEmployeeId}
          />
          <TextInput
            placeholder="Phone Number"
            style={styles.input}
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />

          <Text style={styles.label}>Select Office Branch(es)</Text>
          <TouchableOpacity
            style={styles.officeSelectButton}
            onPress={() => setShowBranchPicker(true)}
          >
            <Text style={styles.officeSelectText}>
              {Array.isArray(branch) && branch.length > 0
                ? branch.join(', ')
                : 'Choose Branch(es)'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onAdd} style={styles.addButton}>
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onClose}
            style={[
              styles.addButton,
              { backgroundColor: '#b03a3a', marginTop: 8 },
            ]}
          >
            <Text style={styles.addButtonText}>Cancel</Text>
          </TouchableOpacity>
        </ScrollView>

        <BranchPicker
          visible={showBranchPicker}
          branches={branches}
          selectedBranches={branch}
          onSelect={(selected: string[]) => {
            setBranch(selected);
            setShowBranchPicker(false);
          }}
          onClose={() => setShowBranchPicker(false)}
        />
      </View>
    </Modal>
  );
};

export default AddUserModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#00000088',
    justifyContent: 'center',
  },
  container: {
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 12,
    padding: 16,
    elevation: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    backgroundColor: '#f2f2f2',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    fontSize: 16,
  },
  label: {
    marginTop: 10,
    fontWeight: '500',
    color: '#333',
    fontSize: 16,
  },
  officeSelectButton: {
    backgroundColor: '#e9e9e9',
    padding: 12,
    borderRadius: 6,
    marginBottom: 12,
  },
  officeSelectText: {
    fontSize: 16,
    color: '#333',
  },
  addButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  toggleBtn: {
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  toggleText: {
    color: '#007AFF',
    fontSize: 14,
  },
});
