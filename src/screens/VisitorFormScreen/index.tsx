// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   StyleSheet,
//   TouchableOpacity,
//   Image,
//   Alert,
//   ScrollView,
//   KeyboardAvoidingView,
//   Platform,
// } from 'react-native';
// import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
// import DocumentPicker from '@react-native-documents/picker';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import {
//   heightPercentageToDP as hp,
//   widthPercentageToDP as wp,
// } from 'react-native-responsive-screen';
// import { useNavigation } from '@react-navigation/native';


// const VisitorFormScreen = () => {
//   const [name, setName] = useState('');
//   const [mobile, setMobile] = useState('');
//   const [company, setCompany] = useState('');
//   const [purpose, setPurpose] = useState('');
//   const [email, setEmail] = useState('');
//   const [photo, setPhoto] = useState<any>(null);
//   const [govtIdFile, setGovtIdFile] = useState<any>(null);
//   const navigation = useNavigation();

//   const handleSelectImage = () => {
//     Alert.alert('Upload Photo', 'Choose an option', [
//       {
//         text: 'Take Photo',
//         onPress: () =>
//           launchCamera({ mediaType: 'photo' }, res => {
//             if (res.assets?.[0]) setPhoto(res.assets[0]);
//           }),
//       },
//       {
//         text: 'Choose from Gallery',
//         onPress: () =>
//           launchImageLibrary({ mediaType: 'photo' }, res => {
//             if (res.assets?.[0]) setPhoto(res.assets[0]);
//           }),
//       },
//       { text: 'Cancel', style: 'cancel' },
//     ]);
//   };

//   const handleGovtIdUpload = async () => {
//     Alert.alert('Upload ID Proof', 'Choose an option', [
//       {
//         text: 'Take Photo',
//         onPress: async () => {
//           const result = await launchCamera({ mediaType: 'photo' });
//           if (result.assets?.[0]) {
//             setGovtIdFile(result.assets[0]);
//           }
//         },
//       },
//       {
//         text: 'Pick File (PDF or Image)',
//         onPress: async () => {
//           try {
//             const res = await DocumentPicker.pick({
//               type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
//             });
//             setGovtIdFile(res);
//           } catch (err) {
//             if (DocumentPicker.isCancel(err)) {
//               console.log('User cancelled the picker');
//             } else {
//               console.error('DocumentPicker error:', err);
//             }
//           }
//         },
//       },
//       { text: 'Cancel', style: 'cancel' },
//     ]);
//   };

//   const handleSubmit = () => {
//     if (!name || !mobile || !company || !purpose || !email || !photo || !govtIdFile) {
//       Alert.alert('Error', 'Please fill all fields, add a photo, and upload ID proof.');
//       return;
//     }

//     // Submit logic here
//     Alert.alert('Success', 'Visitor registered successfully.');
//     console.log({
//       name,
//       mobile,
//       company,
//       purpose,
//       email,
//       photoUri: photo.uri,
//       govtIdUri: govtIdFile?.uri,
//       govtIdType: govtIdFile?.type,
//     });

//     // Reset form
//     setName('');
//     setMobile('');
//     setCompany('');
//     setPurpose('');
//     setEmail('');
//     setPhoto(null);
//     setGovtIdFile(null);
//   };

//   return (
//     <SafeAreaView style={styles.safe}>
//       <KeyboardAvoidingView
//         behavior={Platform.OS === 'ios' ? 'padding' : undefined}
//         style={{ flex: 1 }}
//       >
//         <ScrollView contentContainerStyle={styles.container}>
//           <View style={styles.topBar}>
//             <Text style={styles.welcomeText}>Welcome, {name || 'Visitor'}</Text>
//              <TouchableOpacity
//                   onPress={() =>
//                     Alert.alert('Logout', 'Do you want to logout?', [
//                       { text: 'Cancel', style: 'cancel' },
//                       {
//                         text: 'Logout',
//                         style: 'destructive',
//                         onPress: () => {
//                           // Clear session if needed
//                           // Navigate to login screen
//                           navigation.reset({
//                             index: 0,
//                             routes: [{ name: 'Login' }],
//                           });
//                         },
//                       },
//                     ])
//                   }
//                 >
//                 <Text style={styles.logoutText}>Logout</Text>
//               </TouchableOpacity>

//           </View>
//           <Text style={styles.header}>Visitor Registration</Text>

//           <TextInput
//             style={styles.input}
//             placeholder="Full Name"
//             value={name}
//             onChangeText={setName}
//             autoCapitalize="words"
//             returnKeyType="next"
//           />
//           <>
//           <TextInput
//             style={styles.input}
//             placeholder="Mobile Number"
//             value={mobile}
//             onChangeText={setMobile}
//             keyboardType="phone-pad"
//             returnKeyType="next"
//             maxLength={10}
//           />
//           <TextInput
//             style={styles.input}
//             placeholder="Company Name"
//             value={company}
//             onChangeText={setCompany}
//             autoCapitalize="words"
//             returnKeyType="next"
//           />
//           <TextInput
//             style={styles.input}
//             placeholder="Purpose of Visit"
//             value={purpose}
//             onChangeText={setPurpose}
//             autoCapitalize="sentences"
//             returnKeyType="next"
//           />
//           <TextInput
//             style={styles.input}
//             placeholder="Email ID"
//             value={email}
//             onChangeText={setEmail}
//             keyboardType="email-address"
//             autoCapitalize="none"
//             returnKeyType="done"
//           />
//           </>
//           <TouchableOpacity onPress={handleGovtIdUpload} style={styles.uploadButton}>
//             <Text style={styles.uploadText}>
//               {govtIdFile ? 'ID Uploaded ✅' : 'Upload Govt ID (Image or PDF)'}
//             </Text>
//           </TouchableOpacity>

//           {govtIdFile?.uri && govtIdFile.type?.startsWith('image') && (
//             <Image
//               source={{ uri: govtIdFile.uri }}
//               style={styles.imagePreview}
//               resizeMode="cover"
//             />
//           )}

//           <TouchableOpacity style={styles.photoButton} onPress={handleSelectImage}>
//             <Text style={styles.photoText}>
//               {photo ? 'Change Photo' : 'Take or Upload Photo'}
//             </Text>
//           </TouchableOpacity>

//           {photo && (
//             <Image
//               source={{ uri: photo.uri }}
//               style={styles.imagePreview}
//               resizeMode="cover"
//             />
//           )}

//           <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
//             <Text style={styles.submitText}>Submit</Text>
//           </TouchableOpacity>
//         </ScrollView>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// };

// export default VisitorFormScreen;

// const styles = StyleSheet.create({
//   safe: {
//     flex: 1,
//     backgroundColor: '#f0f6ff',
//   },
//   container: {
//     padding: 20,
//     paddingBottom: 40,
//   },
//   topBar: {
//       flexDirection: 'row',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       paddingHorizontal: 20,
//       paddingVertical: 12,
//       backgroundColor: '#e6f0ff',
//       borderBottomWidth: 1,
//       borderBottomColor: '#ccc',
//       marginBottom: 20,
//   },
//   welcomeText: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#003366',
//   },
//   logoutText: {
//     color: '#FF3B30',
//     fontWeight: '600',
//     fontSize: 16,
//   },

//   header: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#003366',
//     marginBottom: 25,
//     alignSelf: 'center',
//   },
//   input: {
//     height: 52,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     marginBottom: 15,
//     borderRadius: 12,
//     paddingHorizontal: 16,
//     backgroundColor: 'white',
//     fontSize: 16,
//   },
//   uploadButton: {
//     backgroundColor: '#007AFF',
//     padding: 12,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginVertical: 10,
//   },
//   uploadText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
//   photoButton: {
//     backgroundColor: '#003366',
//     padding: 14,
//     borderRadius: 12,
//     alignItems: 'center',
//     marginBottom: 15,
//   },
//   photoText: {
//     color: 'white',
//     fontWeight: '600',
//     fontSize: 16,
//   },
//   imagePreview: {
//     width: wp('90%'),
//     height: hp('20%'),
//     borderRadius: 12,
//     marginBottom: 20,
//   },
//   submitButton: {
//     backgroundColor: '#007BFF',
//     paddingVertical: 15,
//     borderRadius: 12,
//     alignItems: 'center',
//   },
//   submitText: {
//     color: 'white',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
// });

// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   StyleSheet,
//   TouchableOpacity,
//   Image,
//   Alert,
//   ScrollView,
//   KeyboardAvoidingView,
//   Platform,
// } from 'react-native';
// import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
// import {
//   pick,
//   keepLocalCopy,
//   types as DocumentTypes,
//   // isCancel,
// } from '@react-native-documents/picker';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import {
//   heightPercentageToDP as hp,
//   widthPercentageToDP as wp,
// } from 'react-native-responsive-screen';
// import { useNavigation } from '@react-navigation/native';
// import RNPickerSelect from 'react-native-picker-select';

// const VisitorFormScreen = () => {
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [mobile, setMobile] = useState('');
//   const [email, setEmail] = useState('');
//   const [officeLocation, setOfficeLocation] = useState('');
//   const [purpose, setPurpose] = useState('');
//   const [photo, setPhoto] = useState(null);
//   const [govtIdFile, setGovtIdFile] = useState(null);
//   const navigation = useNavigation();

//   const handleSelectImage = () => {
//     Alert.alert('Upload Photo', 'Choose an option', [
//       {
//         text: 'Take Photo',
//         onPress: () =>
//           launchCamera({ mediaType: 'photo' }, res => {
//             if (res.assets?.[0]) setPhoto(res.assets[0]);
//           }),
//       },
//       {
//         text: 'Choose from Gallery',
//         onPress: () =>
//           launchImageLibrary({ mediaType: 'photo' }, res => {
//             if (res.assets?.[0]) setPhoto(res.assets[0]);
//           }),
//       },
//       { text: 'Cancel', style: 'cancel' },
//     ]);
//   };

//   const handleGovtIdUpload = async () => {
//     Alert.alert('Upload ID Proof', 'Choose an option', [
//       {
//         text: 'Take Photo',
//         onPress: async () => {
//           const result = await launchCamera({ mediaType: 'photo' });
//           if (result.assets?.[0]) {
//             setGovtIdFile(result.assets[0]);
//           }
//         },
//       },
//       {
//         text: 'Pick File (PDF or Image)',
//         onPress: async () => {
//           try {
//             const [file] = await pick({
//               type: [DocumentTypes.images, DocumentTypes.pdf],
//             });

//             const [localCopy] = await keepLocalCopy({
//               files: [
//                 {
//                   uri: file.uri,
//                   fileName: file.name ?? 'govt-id',
//                 },
//               ],
//               destination: 'documentDirectory',
//             });

//             setGovtIdFile(localCopy);
//           } catch (err) {
//             console.error('DocumentPicker error:', err);
//           }
//         },
//       },
//       { text: 'Cancel', style: 'cancel' },
//     ]);
//   };

//   const handleSubmit = () => {
//     if (!firstName || !lastName || !mobile || !officeLocation || !purpose || !photo || !govtIdFile) {
//       Alert.alert('Error', 'Please fill all mandatory fields and upload required files.');
//       return;
//     }

//     Alert.alert('Success', 'Visitor registered successfully.');
//     console.log({
//       firstName,
//       lastName,
//       mobile,
//       email,
//       officeLocation,
//       purpose,
//       photoUri: photo?.uri,
//       govtIdUri: govtIdFile?.uri,
//     });

//     setFirstName('');
//     setLastName('');
//     setMobile('');
//     setEmail('');
//     setOfficeLocation('');
//     setPurpose('');
//     setPhoto(null);
//     setGovtIdFile(null);
//   };

//   return (
//     <SafeAreaView style={styles.safe}> 
//       <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
//         <ScrollView contentContainerStyle={styles.container}>
//           <Text style={styles.header}>Visitor Registration</Text>

//           <TextInput style={styles.input} placeholder="First Name" value={firstName} onChangeText={setFirstName} />
//           <TextInput style={styles.input} placeholder="Last Name" value={lastName} onChangeText={setLastName} />
//           <TextInput style={styles.input} placeholder="Mobile Number" value={mobile} onChangeText={setMobile} keyboardType="phone-pad" maxLength={10} />
//           <TextInput style={styles.input} placeholder="Email ID (optional)" value={email} onChangeText={setEmail} keyboardType="email-address" />

//           <RNPickerSelect
//             onValueChange={setOfficeLocation}
//             value={officeLocation}
//             placeholder={{ label: 'Select Office Location', value: null }}
//             items={[
//               { label: 'Dabaspet', value: 'Dabaspet' },
//               { label: 'Head Office', value: 'Head Office' },
//             ]}
//             style={{ inputIOS: styles.input, inputAndroid: styles.input }}
//           />

//           <RNPickerSelect
//             onValueChange={setPurpose}
//             value={purpose}
//             placeholder={{ label: 'Purpose of Visit', value: null }}
//             items={[
//               { label: 'Meeting', value: 'Meeting' },
//               { label: 'Delivery', value: 'Delivery' },
//               { label: 'Interview', value: 'Interview' },
//               { label: 'Other', value: 'Other' },
//             ]}
//             style={{ inputIOS: styles.input, inputAndroid: styles.input }}
//           />

//           <TouchableOpacity onPress={handleGovtIdUpload} style={styles.uploadButton}>
//             <Text style={styles.uploadText}>{govtIdFile ? 'ID Uploaded ✅' : 'Upload Govt ID (Image or PDF)'}</Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.photoButton} onPress={handleSelectImage}>
//             <Text style={styles.photoText}>{photo ? 'Change Photo' : 'Take or Upload Photo'}</Text>
//           </TouchableOpacity>

//           {photo && <Image source={{ uri: photo.uri }} style={styles.imagePreview} resizeMode="cover" />}

//           <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
//             <Text style={styles.submitText}>Submit</Text>
//           </TouchableOpacity>
//         </ScrollView>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// };

// export default VisitorFormScreen;

// const styles = StyleSheet.create({
//   safe: { flex: 1, backgroundColor: '#f0f6ff' },
//   container: { padding: 20, paddingBottom: 40 },
//   header: { fontSize: 24, fontWeight: 'bold', color: '#003366', marginBottom: 25, alignSelf: 'center' },
//   input: { height: 52, borderColor: '#ccc', borderWidth: 1, marginBottom: 15, borderRadius: 12, paddingHorizontal: 16, backgroundColor: 'white', fontSize: 16 },
//   uploadButton: { backgroundColor: '#007AFF', padding: 12, borderRadius: 8, alignItems: 'center', marginVertical: 10 },
//   uploadText: { color: '#fff', fontWeight: 'bold' },
//   photoButton: { backgroundColor: '#003366', padding: 14, borderRadius: 12, alignItems: 'center', marginBottom: 15 },
//   photoText: { color: 'white', fontWeight: '600', fontSize: 16 },
//   imagePreview: { width: wp('90%'), height: hp('20%'), borderRadius: 12, marginBottom: 20 },
//   submitButton: { backgroundColor: '#007BFF', paddingVertical: 15, borderRadius: 12, alignItems: 'center' },
//   submitText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
// });

// Full code moved here with dynamic input for 'Other' purpose.

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Modal,
  FlatList,
  PermissionsAndroid,
} from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import {
  pick,
  keepLocalCopy,
  types as DocumentTypes,
} from '@react-native-documents/picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';


const VisitorFormScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [officeLocation, setOfficeLocation] = useState('');
  const [purpose, setPurpose] = useState('');
  const [otherReason, setOtherReason] = useState('');
  const [photo, setPhoto] = useState(null);
  const [govtIdFile, setGovtIdFile] = useState(null);
  const [officeModalVisible, setOfficeModalVisible] = useState(false);
  const [purposeModalVisible, setPurposeModalVisible] = useState(false);
  const navigation = useNavigation();

  const officeOptions = ['Dabaspet', 'Head Office'];
  const purposeOptions = ['Meeting', 'Delivery', 'Interview', 'Other'];

  // const requestCameraPermission = async () => {
  //   const granted = await PermissionsAndroid.request(
  //     PermissionsAndroid.PERMISSIONS.CAMERA,
  //     {
  //       title: 'Camera Permission',
  //       message: 'App needs camera access to take photos.',
  //       buttonPositive: 'OK',
  //     }
  //   );
  //   return granted === PermissionsAndroid.RESULTS.GRANTED;
  // };
  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'App needs camera access to take photos.',
          buttonPositive: 'OK',
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } else {
      // On iOS, permissions are handled automatically via Info.plist
      return true;
    }
  };
  const handleSelectImage = async () => {
    Alert.alert('Upload Photo', 'Choose an option', [
      {
        text: 'Take Photo',
        onPress: async () => {
          const hasPermission = await requestCameraPermission();
          if (hasPermission) {
            launchCamera({ mediaType: 'photo' }, res => {
              if (res.assets?.[0]) setPhoto(res.assets[0]);
            });
          } else {
            Alert.alert('Permission Denied', 'Camera permission is required.');
          }
        },
      },
      {
        text: 'Choose from Gallery',
        onPress: () =>
          launchImageLibrary({ mediaType: 'photo' }, res => {
            if (res.assets?.[0]) setPhoto(res.assets[0]);
          }),
      },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const handleGovtIdUpload = async () => {
    Alert.alert('Upload ID Proof', 'Choose an option', [
      {
        text: 'Take Photo',
        onPress: async () => {
          const hasPermission = await requestCameraPermission();
          if (hasPermission) {
            const result = await launchCamera({ mediaType: 'photo' });
            if (result.assets?.[0]) {
              setGovtIdFile(result.assets[0]);
            }
          } else {
            Alert.alert('Permission Denied', 'Camera permission is required.');
          }
        },
      },
      {
        text: 'Pick File (PDF or Image)',
        onPress: async () => {
          try {
            const [file] = await pick({
              type: [DocumentTypes.images, DocumentTypes.pdf],
            });

            const [localCopy] = await keepLocalCopy({
              files: [
                {
                  uri: file.uri,
                  fileName: file.name ?? 'govt-id',
                },
              ],
              destination: 'documentDirectory',
            });

            setGovtIdFile(localCopy);
          } catch (err) {
            console.error('DocumentPicker error:', err);
          }
        },
      },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const isFormValid = () => {
    return (
      firstName &&
      lastName &&
      mobile &&
      officeLocation &&
      purpose &&
      photo &&
      govtIdFile &&
      (purpose !== 'Other' || otherReason)
    );
  };

  const handleSubmit = () => {
    if (!isFormValid()) {
      Alert.alert('Error', 'Please fill all mandatory fields and upload required files.');
      return;
    }

    Alert.alert('Success', 'Visitor registered successfully.');
    console.log({
      firstName,
      lastName,
      mobile,
      email,
      officeLocation,
      purpose: purpose === 'Other' ? otherReason : purpose,
      photoUri: photo?.uri,
      govtIdUri: govtIdFile?.uri,
    });

    setFirstName('');
    setLastName('');
    setMobile('');
    setEmail('');
    setOfficeLocation('');
    setPurpose('');
    setOtherReason('');
    setPhoto(null);
    setGovtIdFile(null);
  };

  const renderDropdown = (label, value, options, onSelect, modalVisible, setModalVisible) => (
    <>
      <Text style={styles.dropdownLabel}>{label}</Text>
      <TouchableOpacity style={styles.dropdownInput} onPress={() => setModalVisible(true)}>
        <Text style={{ color: value ? '#000' : '#999' }}>{value || `Select ${label}`}</Text>
      </TouchableOpacity>
      <Modal visible={modalVisible} transparent animationType="fade">
        <TouchableOpacity style={styles.modalOverlay} onPress={() => setModalVisible(false)}>
          <View style={styles.modalContent}>
            <FlatList
              data={options}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.option} onPress={() => {
                  onSelect(item);
                  setModalVisible(false);
                }}>
                  <Text style={styles.optionText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );

  return (
    <SafeAreaView style={styles.safe}> 
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.header}>Visitor Registration</Text>

          <TextInput style={styles.input} placeholder="First Name" value={firstName} onChangeText={setFirstName} />
          <TextInput style={styles.input} placeholder="Last Name" value={lastName} onChangeText={setLastName} />
          <TextInput style={styles.input} placeholder="Mobile Number" value={mobile} onChangeText={setMobile} keyboardType="phone-pad" maxLength={10} />
          <TextInput style={styles.input} placeholder="Email ID (optional)" value={email} onChangeText={setEmail} keyboardType="email-address" />

          {renderDropdown('Office Location', officeLocation, officeOptions, setOfficeLocation, officeModalVisible, setOfficeModalVisible)}
          {renderDropdown('Purpose of Visit', purpose, purposeOptions, setPurpose, purposeModalVisible, setPurposeModalVisible)}

          {purpose === 'Other' && (
            <TextInput
              style={styles.input}
              placeholder="Please specify the reason"
              value={otherReason}
              onChangeText={setOtherReason}
            />
          )}

          <TouchableOpacity onPress={handleGovtIdUpload} style={styles.uploadButton}>
            <Text style={styles.uploadText}>{govtIdFile ? 'ID Uploaded ✅' : 'Upload Govt ID (Image or PDF)'}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.photoButton} onPress={handleSelectImage}>
            <Text style={styles.photoText}>{photo ? 'Change Photo' : 'Take or Upload Photo'}</Text>
          </TouchableOpacity>

          {photo && <Image source={{ uri: photo.uri }} style={styles.imagePreview} resizeMode="cover" />}

          <TouchableOpacity
            style={[styles.submitButton, { opacity: isFormValid() ? 1 : 0.5 }]}
            onPress={handleSubmit}
            disabled={!isFormValid()}
          >
            <Text style={styles.submitText}>Submit</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default VisitorFormScreen;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f0f6ff' },
  container: { padding: 20, paddingBottom: 40 },
  header: { fontSize: 24, fontWeight: 'bold', color: '#003366', marginBottom: 25, alignSelf: 'center' },
  input: { height: 52, borderColor: '#ccc', borderWidth: 1, marginBottom: 15, borderRadius: 12, paddingHorizontal: 16, backgroundColor: 'white', fontSize: 16 },
  dropdownLabel: { marginBottom: 5, fontSize: 14, color: '#333' },
  dropdownInput: { height: 52, borderColor: '#ccc', borderWidth: 1, borderRadius: 12, paddingHorizontal: 16, justifyContent: 'center', marginBottom: 15, backgroundColor: 'white' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', padding: 20 },
  modalContent: { backgroundColor: 'white', borderRadius: 8, paddingVertical: 10 },
  option: { paddingVertical: 12, paddingHorizontal: 16, borderBottomWidth: 1, borderColor: '#eee' },
  optionText: { fontSize: 16, color: '#333' },
  uploadButton: { backgroundColor: '#007AFF', padding: 12, borderRadius: 8, alignItems: 'center', marginVertical: 10 },
  uploadText: { color: '#fff', fontWeight: 'bold' },
  photoButton: { backgroundColor: '#003366', padding: 14, borderRadius: 12, alignItems: 'center', marginBottom: 15 },
  photoText: { color: 'white', fontWeight: '600', fontSize: 16 },
  imagePreview: { width: wp('90%'), height: hp('20%'), borderRadius: 12, marginBottom: 20 },
  submitButton: { backgroundColor: '#007BFF', paddingVertical: 15, borderRadius: 12, alignItems: 'center' },
  submitText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
});




// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   StyleSheet,
//   TouchableOpacity,
//   Image,
//   Alert,
//   ScrollView,
//   KeyboardAvoidingView,
//   Platform,
//   Modal,
//   FlatList,
// } from 'react-native';
// import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
// import {
//   pick,
//   keepLocalCopy,
//   types as DocumentTypes,
// } from '@react-native-documents/picker';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import {
//   heightPercentageToDP as hp,
//   widthPercentageToDP as wp,
// } from 'react-native-responsive-screen';
// import { useNavigation } from '@react-navigation/native';

// const VisitorFormScreen = () => {
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [mobile, setMobile] = useState('');
//   const [email, setEmail] = useState('');
//   const [officeLocation, setOfficeLocation] = useState('');
//   const [purpose, setPurpose] = useState('');
//   const [otherReason, setOtherReason] = useState('');
//   const [photo, setPhoto] = useState(null);
//   const [govtIdFile, setGovtIdFile] = useState(null);
//   const [officeModalVisible, setOfficeModalVisible] = useState(false);
//   const [purposeModalVisible, setPurposeModalVisible] = useState(false);
//   const [isFormValid, setIsFormValid] = useState(false);
//   const navigation = useNavigation();

//   const officeOptions = ['Dabaspet', 'Head Office'];
//   const purposeOptions = ['Meeting', 'Delivery', 'Interview', 'Other'];

//   useEffect(() => {
//     const requiredFieldsFilled =
//       firstName.trim() &&
//       lastName.trim() &&
//       mobile.trim() &&
//       officeLocation &&
//       purpose &&
//       photo &&
//       govtIdFile &&
//       (purpose !== 'Other' || otherReason.trim());

//     setIsFormValid(!!requiredFieldsFilled);
//   }, [firstName, lastName, mobile, officeLocation, purpose, otherReason, photo, govtIdFile]);

//   const handleSelectImage = () => {
//     Alert.alert('Upload Photo', 'Choose an option', [
//       {
//         text: 'Take Photo',
//         onPress: () =>
//           launchCamera({ mediaType: 'photo' }, res => {
//             if (res.assets?.[0]) setPhoto(res.assets[0]);
//           }),
//       },
//       {
//         text: 'Choose from Gallery',
//         onPress: () =>
//           launchImageLibrary({ mediaType: 'photo' }, res => {
//             if (res.assets?.[0]) setPhoto(res.assets[0]);
//           }),
//       },
//       { text: 'Cancel', style: 'cancel' },
//     ]);
//   };

//   const handleGovtIdUpload = async () => {
//     Alert.alert('Upload ID Proof', 'Choose an option', [
//       {
//         text: 'Take Photo',
//         onPress: async () => {
//           const result = await launchCamera({ mediaType: 'photo' });
//           if (result.assets?.[0]) {
//             setGovtIdFile(result.assets[0]);
//           }
//         },
//       },
//       {
//         text: 'Pick File (PDF or Image)',
//         onPress: async () => {
//           try {
//             const [file] = await pick({
//               type: [DocumentTypes.images, DocumentTypes.pdf],
//             });

//             const [localCopy] = await keepLocalCopy({
//               files: [
//                 {
//                   uri: file.uri,
//                   fileName: file.name ?? 'govt-id',
//                 },
//               ],
//               destination: 'documentDirectory',
//             });

//             setGovtIdFile(localCopy);
//           } catch (err) {
//             console.error('DocumentPicker error:', err);
//           }
//         },
//       },
//       { text: 'Cancel', style: 'cancel' },
//     ]);
//   };

//   const handleSubmit = () => {
//     if (!isFormValid) {
//       Alert.alert('Error', 'Please fill all mandatory fields and upload required files.');
//       return;
//     }

//     Alert.alert('Success', 'Visitor registered successfully.');
//     console.log({
//       firstName,
//       lastName,
//       mobile,
//       email,
//       officeLocation,
//       purpose: purpose === 'Other' ? otherReason : purpose,
//       photoUri: photo?.uri,
//       govtIdUri: govtIdFile?.uri,
//     });

//     setFirstName('');
//     setLastName('');
//     setMobile('');
//     setEmail('');
//     setOfficeLocation('');
//     setPurpose('');
//     setOtherReason('');
//     setPhoto(null);
//     setGovtIdFile(null);
//   };

//   const renderDropdown = (label, value, options, onSelect, modalVisible, setModalVisible) => (
//     <>
//       <Text style={styles.dropdownLabel}>{label}</Text>
//       <TouchableOpacity style={styles.dropdownInput} onPress={() => setModalVisible(true)}>
//         <Text style={{ color: value ? '#000' : '#999' }}>{value || `Select ${label}`}</Text>
//       </TouchableOpacity>
//       <Modal visible={modalVisible} transparent animationType="fade">
//         <TouchableOpacity style={styles.modalOverlay} onPress={() => setModalVisible(false)}>
//           <View style={styles.modalContent}>
//             <FlatList
//               data={options}
//               keyExtractor={(item) => item}
//               renderItem={({ item }) => (
//                 <TouchableOpacity style={styles.option} onPress={() => {
//                   onSelect(item);
//                   setModalVisible(false);
//                 }}>
//                   <Text style={styles.optionText}>{item}</Text>
//                 </TouchableOpacity>
//               )}
//             />
//           </View>
//         </TouchableOpacity>
//       </Modal>
//     </>
//   );

//   return (
//     <SafeAreaView style={styles.safe}> 
//       <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
//         <ScrollView contentContainerStyle={styles.container}>
//           <Text style={styles.header}>Visitor Registration</Text>

//           <TextInput style={styles.input} placeholder="First Name" value={firstName} onChangeText={setFirstName} />
//           <TextInput style={styles.input} placeholder="Last Name" value={lastName} onChangeText={setLastName} />
//           <TextInput style={styles.input} placeholder="Mobile Number" value={mobile} onChangeText={setMobile} keyboardType="phone-pad" maxLength={10} />
//           <TextInput style={styles.input} placeholder="Email ID (optional)" value={email} onChangeText={setEmail} keyboardType="email-address" />

//           {renderDropdown('Office Location', officeLocation, officeOptions, setOfficeLocation, officeModalVisible, setOfficeModalVisible)}
//           {renderDropdown('Purpose of Visit', purpose, purposeOptions, setPurpose, purposeModalVisible, setPurposeModalVisible)}

//           {purpose === 'Other' && (
//             <TextInput
//               style={styles.input}
//               placeholder="Please specify the reason"
//               value={otherReason}
//               onChangeText={setOtherReason}
//             />
//           )}

//           <TouchableOpacity onPress={handleGovtIdUpload} style={styles.uploadButton}>
//             <Text style={styles.uploadText}>{govtIdFile ? 'ID Uploaded ✅' : 'Upload Govt ID (Image or PDF)'}</Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.photoButton} onPress={handleSelectImage}>
//             <Text style={styles.photoText}>{photo ? 'Change Photo' : 'Take or Upload Photo'}</Text>
//           </TouchableOpacity>

//           {photo && <Image source={{ uri: photo.uri }} style={styles.imagePreview} resizeMode="cover" />}

//           <TouchableOpacity
//             style={[styles.submitButton, { backgroundColor: isFormValid ? '#007BFF' : '#ccc' }]}
//             onPress={handleSubmit}
//             disabled={!isFormValid}
//           >
//             <Text style={styles.submitText}>Submit</Text>
//           </TouchableOpacity>
//         </ScrollView>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// };

// export default VisitorFormScreen;

// const styles = StyleSheet.create({
//   safe: { flex: 1, backgroundColor: '#f0f6ff' },
//   container: { padding: 20, paddingBottom: 40 },
//   header: { fontSize: 24, fontWeight: 'bold', color: '#003366', marginBottom: 25, alignSelf: 'center' },
//   input: { height: 52, borderColor: '#ccc', borderWidth: 1, marginBottom: 15, borderRadius: 12, paddingHorizontal: 16, backgroundColor: 'white', fontSize: 16 },
//   dropdownLabel: { marginBottom: 5, fontSize: 14, color: '#333' },
//   dropdownInput: { height: 52, borderColor: '#ccc', borderWidth: 1, borderRadius: 12, paddingHorizontal: 16, justifyContent: 'center', marginBottom: 15, backgroundColor: 'white' },
//   modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', padding: 20 },
//   modalContent: { backgroundColor: 'white', borderRadius: 8, paddingVertical: 10 },
//   option: { paddingVertical: 12, paddingHorizontal: 16, borderBottomWidth: 1, borderColor: '#eee' },
//   optionText: { fontSize: 16, color: '#333' },
//   uploadButton: { backgroundColor: '#007AFF', padding: 12, borderRadius: 8, alignItems: 'center', marginVertical: 10 },
//   uploadText: { color: '#fff', fontWeight: 'bold' },
//   photoButton: { backgroundColor: '#003366', padding: 14, borderRadius: 12, alignItems: 'center', marginBottom: 15 },
//   photoText: { color: 'white', fontWeight: '600', fontSize: 16 },
//   imagePreview: { width: wp('90%'), height: hp('20%'), borderRadius: 12, marginBottom: 20 },
//   submitButton: { paddingVertical: 15, borderRadius: 12, alignItems: 'center' },
//   submitText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
// });
