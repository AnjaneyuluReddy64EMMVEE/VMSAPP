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
} from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import {
  pick,
  keepLocalCopy,
  types as DocumentTypes,
  // isCancel,
} from '@react-native-documents/picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';

const VisitorFormScreen = () => {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [company, setCompany] = useState('');
  const [purpose, setPurpose] = useState('');
  const [email, setEmail] = useState('');
  const [photo, setPhoto] = useState<any>(null);
  const [govtIdFile, setGovtIdFile] = useState<any>(null);
  const navigation = useNavigation();

  const handleSelectImage = () => {
    Alert.alert('Upload Photo', 'Choose an option', [
      {
        text: 'Take Photo',
        onPress: () =>
          launchCamera({ mediaType: 'photo' }, res => {
            if (res.assets?.[0]) setPhoto(res.assets[0]);
          }),
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
          const result = await launchCamera({ mediaType: 'photo' });
          if (result.assets?.[0]) {
            setGovtIdFile(result.assets[0]);
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
            if (isCancel(err)) {
              console.log('User cancelled document picker');
            } else {
              console.error('DocumentPicker error:', err);
            }
          }
        },
      },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const handleSubmit = () => {
    if (!name || !mobile || !company || !purpose || !email || !photo || !govtIdFile) {
      Alert.alert('Error', 'Please fill all fields, add a photo, and upload ID proof.');
      return;
    }

    Alert.alert('Success', 'Visitor registered successfully.');
    console.log({
      name,
      mobile,
      company,
      purpose,
      email,
      photoUri: photo.uri,
      govtIdUri: govtIdFile?.uri,
      govtIdType: govtIdFile?.type,
    });

    setName('');
    setMobile('');
    setCompany('');
    setPurpose('');
    setEmail('');
    setPhoto(null);
    setGovtIdFile(null);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.topBar}>
            <Text style={styles.welcomeText}>Welcome, {name || 'Visitor'}</Text>
            <TouchableOpacity
              onPress={() =>
                Alert.alert('Logout', 'Do you want to logout?', [
                  { text: 'Cancel', style: 'cancel' },
                  {
                    text: 'Logout',
                    style: 'destructive',
                    onPress: () => {
                      navigation.reset({
                        index: 0,
                        routes: [{ name: 'Login' }],
                      });
                    },
                  },
                ])
              }
            >
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.header}>Visitor Registration</Text>

          <TextInput
            style={styles.input}
            placeholder="Full Name"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
            returnKeyType="next"
          />
          <TextInput
            style={styles.input}
            placeholder="Mobile Number"
            value={mobile}
            onChangeText={setMobile}
            keyboardType="phone-pad"
            returnKeyType="next"
            maxLength={10}
          />
          <TextInput
            style={styles.input}
            placeholder="Company Name"
            value={company}
            onChangeText={setCompany}
            autoCapitalize="words"
            returnKeyType="next"
          />
          <TextInput
            style={styles.input}
            placeholder="Purpose of Visit"
            value={purpose}
            onChangeText={setPurpose}
            autoCapitalize="sentences"
            returnKeyType="next"
          />
          <TextInput
            style={styles.input}
            placeholder="Email ID"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            returnKeyType="done"
          />

          <TouchableOpacity onPress={handleGovtIdUpload} style={styles.uploadButton}>
            <Text style={styles.uploadText}>
              {govtIdFile ? 'ID Uploaded ✅' : 'Upload Govt ID (Image or PDF)'}
            </Text>
          </TouchableOpacity>

          {govtIdFile?.uri && govtIdFile.type?.startsWith('image') && (
            <Image
              source={{ uri: govtIdFile.uri }}
              style={styles.imagePreview}
              resizeMode="cover"
            />
          )}

          <TouchableOpacity style={styles.photoButton} onPress={handleSelectImage}>
            <Text style={styles.photoText}>
              {photo ? 'Change Photo' : 'Take or Upload Photo'}
            </Text>
          </TouchableOpacity>

          {photo && (
            <Image
              source={{ uri: photo.uri }}
              style={styles.imagePreview}
              resizeMode="cover"
            />
          )}

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitText}>Submit</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default VisitorFormScreen;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#f0f6ff',
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#e6f0ff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#003366',
  },
  logoutText: {
    color: '#FF3B30',
    fontWeight: '600',
    fontSize: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#003366',
    marginBottom: 25,
    alignSelf: 'center',
  },
  input: {
    height: 52,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    borderRadius: 12,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    fontSize: 16,
  },
  uploadButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  uploadText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  photoButton: {
    backgroundColor: '#003366',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 15,
  },
  photoText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  imagePreview: {
    width: wp('90%'),
    height: hp('20%'),
    borderRadius: 12,
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  submitText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
