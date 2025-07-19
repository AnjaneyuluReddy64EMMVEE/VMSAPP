import React, { useState, useEffect } from 'react';
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
import { useCreateVisitorMutation } from '../../api';
import Header from '../../components/Header';

const VisitorFormScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [officeLocation, setOfficeLocation] = useState('');
  const [personToMeet, setPersonToMeet] = useState('');

  const [purpose, setPurpose] = useState('');
  const [otherReason, setOtherReason] = useState('');
  const [photo, setPhoto] = useState(null);
  const [govtIdFile, setGovtIdFile] = useState(null);
  const [officeModalVisible, setOfficeModalVisible] = useState(false);
  const [purposeModalVisible, setPurposeModalVisible] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [createVisitor, { isLoading }] = useCreateVisitorMutation();

  const navigation = useNavigation();

  const officeOptions = [
    'All',
    'AirPort',
    'Dabaspet',
    'Head Office',
    'Sulabelli',
  ];
  const purposeOptions = ['Meeting', 'Delivery', 'Interview', 'Other'];

  useEffect(() => {
    const requiredFieldsFilled =
      firstName.trim() &&
      lastName.trim() &&
      mobile.trim() &&
      officeLocation &&
      purpose &&
      photo &&
      govtIdFile &&
      personToMeet.trim() &&
      (purpose !== 'Other' || otherReason.trim());

    setIsFormValid(!!requiredFieldsFilled);
  }, [
    firstName,
    lastName,
    mobile,
    officeLocation,
    purpose,
    otherReason,
    photo,
    govtIdFile,
    personToMeet,
  ]);

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
            console.error('DocumentPicker error:', err);
          }
        },
      },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  // const handleSubmit = () => {
  //   if (!isFormValid) {
  //     Alert.alert(
  //       'Error',
  //       'Please fill all mandatory fields and upload required files.',
  //     );
  //     return;
  //   }

  //   Alert.alert('Success', 'Visitor registered successfully.');
  //   console.log({
  //     firstName,
  //     lastName,
  //     mobile,
  //     email,
  //     officeLocation,
  //     purpose: purpose === 'Other' ? otherReason : purpose,
  //     photoUri: photo?.uri,
  //     govtIdUri: govtIdFile?.uri,
  //   });

  //   setFirstName('');
  //   setLastName('');
  //   setMobile('');
  //   setEmail('');
  //   setOfficeLocation('');
  //   setPurpose('');
  //   setOtherReason('');
  //   setPhoto(null);
  //   setGovtIdFile(null);
  // };
  const handleSubmit = async () => {
    if (!isFormValid) {
      Alert.alert(
        'Error',
        'Please fill all mandatory fields and upload required files.',
      );
      return;
    }

    const formData = new FormData();

    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('phoneNumber', mobile);
    formData.append('email', email);
    formData.append('officeLocation', officeLocation);
    formData.append(
      'purposeOfVisit',
      purpose === 'Other' ? otherReason : purpose,
    );
    formData.append('personToMeet', personToMeet);

    if (photo?.uri) {
      formData.append('userImage', {
        uri: photo.uri,
        name: photo.fileName || 'photo.jpg',
        type: photo.type || 'image/jpeg',
      });
    }

    if (govtIdFile?.uri) {
      formData.append('documentImage', {
        uri: govtIdFile.uri,
        name: govtIdFile.name || 'govtid.jpg',
        type: govtIdFile.type || 'image/jpeg',
      });
    }

    try {
      const res = await createVisitor(formData).unwrap();
      Alert.alert('Success', 'Visitor registered successfully.');
      // Reset form
      setFirstName('');
      setLastName('');
      setMobile('');
      setEmail('');
      setOfficeLocation('');
      setPurpose('');
      setOtherReason('');
      setPersonToMeet('');
      setPhoto(null);
      setGovtIdFile(null);
    } catch (err: any) {
      console.error('Upload Error:', err);
      Alert.alert('Error', err?.data?.message || 'Something went wrong.');
    }
  };

  const renderDropdown = (
    label,
    value,
    options,
    onSelect,
    modalVisible,
    setModalVisible,
  ) => (
    <>
      <Text style={styles.dropdownLabel}>{label}</Text>
      <TouchableOpacity
        style={styles.dropdownInput}
        onPress={() => setModalVisible(true)}
      >
        <Text style={{ color: value ? '#000' : '#999' }}>
          {value || `Select ${label}`}
        </Text>
      </TouchableOpacity>
      <Modal visible={modalVisible} transparent animationType="fade">
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <FlatList
              data={options}
              keyExtractor={item => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => {
                    onSelect(item);
                    setModalVisible(false);
                  }}
                >
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
      <Header title="Home" showMenuButton />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.header}>Visitor Registration</Text>

          <TextInput
            style={styles.input}
            placeholder="First Name"
            value={firstName}
            onChangeText={setFirstName}
          />
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            value={lastName}
            onChangeText={setLastName}
          />
          <TextInput
            style={styles.input}
            placeholder="Mobile Number"
            value={mobile}
            onChangeText={setMobile}
            keyboardType="phone-pad"
            maxLength={10}
          />
          <TextInput
            style={styles.input}
            placeholder="Email ID (optional)"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Person to Meet"
            value={personToMeet}
            onChangeText={setPersonToMeet}
          />

          {renderDropdown(
            'Office Location',
            officeLocation,
            officeOptions,
            setOfficeLocation,
            officeModalVisible,
            setOfficeModalVisible,
          )}
          {renderDropdown(
            'Purpose of Visit',
            purpose,
            purposeOptions,
            setPurpose,
            purposeModalVisible,
            setPurposeModalVisible,
          )}

          {purpose === 'Other' && (
            <TextInput
              style={styles.input}
              placeholder="Please specify the reason"
              value={otherReason}
              onChangeText={setOtherReason}
            />
          )}

          <TouchableOpacity
            onPress={handleGovtIdUpload}
            style={styles.uploadButton}
          >
            <Text style={styles.uploadText}>
              {govtIdFile ? 'ID Uploaded ✅' : 'Upload Govt ID (Image or PDF)'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.photoButton}
            onPress={handleSelectImage}
          >
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

          <TouchableOpacity
            style={[
              styles.submitButton,
              { backgroundColor: isFormValid ? '#007BFF' : '#ccc' },
            ]}
            onPress={handleSubmit}
            disabled={!isFormValid}
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
  dropdownLabel: { marginBottom: 5, fontSize: 14, color: '#333' },
  dropdownInput: {
    height: 52,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    justifyContent: 'center',
    marginBottom: 15,
    backgroundColor: 'white',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 10,
  },
  option: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  optionText: { fontSize: 16, color: '#333' },
  uploadButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  uploadText: { color: '#fff', fontWeight: 'bold' },
  photoButton: {
    backgroundColor: '#003366',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 15,
  },
  photoText: { color: 'white', fontWeight: '600', fontSize: 16 },
  imagePreview: {
    width: wp('90%'),
    height: hp('20%'),
    borderRadius: 12,
    marginBottom: 20,
  },
  submitButton: { paddingVertical: 15, borderRadius: 12, alignItems: 'center' },
  submitText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
});
