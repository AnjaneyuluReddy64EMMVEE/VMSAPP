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
  ActivityIndicator,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { useCreateVisitorMutation } from '../../api';
import Header from '../../components/Header';
import { useAuth } from '../../contexts/AuthContext';
import Icon from 'react-native-vector-icons/MaterialIcons';
const VisitorFormScreen = () => {
  const { userRole, userBranch } = useAuth();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobile, setMobile] = useState('');
  const [badgeNumber, setBadgeNumber] = useState('');

  const [email, setEmail] = useState('');
  const [officeLocation, setOfficeLocation] = useState('');
  const [personToMeet, setPersonToMeet] = useState('');
  const [purpose, setPurpose] = useState('');
  const [otherReason, setOtherReason] = useState('');
  const [photo, setPhoto] = useState(null);
  const [govtIdFile, setGovtIdFile] = useState(null);
  const [visitDate, setVisitDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [officeModalVisible, setOfficeModalVisible] = useState(false);
  const [purposeModalVisible, setPurposeModalVisible] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [createVisitor, { isLoading }] = useCreateVisitorMutation();

  const navigation = useNavigation();

  const officeOptions = Array.isArray(userBranch) ? userBranch : [userBranch];

  const purposeOptions = ['Meeting', 'Delivery', 'Interview', 'Other'];

  useEffect(() => {
    if (userRole === 'security') {
      setOfficeLocation(userBranch || '');
    }
  }, [userRole, userBranch]);

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

  const handleGovtIdUpload = () => {
    Alert.alert('Upload Government ID', 'Choose an option', [
      {
        text: 'Take Photo',
        onPress: () =>
          launchCamera({ mediaType: 'photo' }, res => {
            if (res.assets?.[0]) setGovtIdFile(res.assets[0]);
          }),
      },
      {
        text: 'Choose from Gallery',
        onPress: () =>
          launchImageLibrary({ mediaType: 'photo' }, res => {
            if (res.assets?.[0]) setGovtIdFile(res.assets[0]);
          }),
      },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

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
    formData.append('badgeNumber', badgeNumber);
    formData.append('email', email);
    formData.append('officeLocation', officeLocation);
    formData.append('status', 'checkedIn');
    formData.append('checkin', new Date().toISOString());
    formData.append(
      'purposeOfVisit',
      purpose === 'Other' ? otherReason : purpose,
    );
    formData.append('personToMeet', personToMeet);
    formData.append('visitDate', visitDate.toISOString()); // <-- Set visit date

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
      setVisitDate(new Date());
    } catch (err: any) {
      console.error('Upload Error:', err);
      Alert.alert('Error', err?.data?.message || 'Something went wrong.');
    }
  };

  const renderDropdown = (
    icon: string,
    label: string,
    value: string,
    options: string[],
    onSelect: (value: string) => void,
    modalVisible: boolean,
    setModalVisible: (visible: boolean) => void,
  ) => (
    <>
      <Text style={styles.dropdownLabel}>{label}</Text>

      <TouchableOpacity
        style={styles.dropdownInput}
        onPress={() => setModalVisible(true)}
        activeOpacity={0.8}
      >
        <View style={styles.dropdownContent}>
          <Icon name={icon} size={22} color="#666" style={styles.icon} />
          <Text style={{ color: value ? '#000' : '#999', fontSize: 16 }}>
            {value || `Select ${label}`}
          </Text>
          <Text style={styles.dropdownIcon}>▼</Text>
        </View>
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

  const InputWithIcon = ({
    icon,
    placeholder,
    value,
    onChangeText,
    keyboardType = 'default',
    secureTextEntry = false,
    maxLength,
  }: {
    icon: string;
    placeholder: string;
    value: string;
    onChangeText: (text: string) => void;
    keyboardType?: any;
    secureTextEntry?: boolean;
    maxLength?: number;
  }) => (
    <View style={styles.inputWrapper}>
      <Icon name={icon} size={22} color="#666" style={styles.icon} />
      <TextInput
        style={styles.inputWithIcon}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        maxLength={maxLength}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <Header title="Visitor Registration" showMenuButton />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.inputWrapper}>
            <Icon name="person" size={22} color="#666" style={styles.icon} />
            <TextInput
              style={styles.inputWithIcon}
              placeholder="First Name"
              value={firstName}
              onChangeText={setFirstName}
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputWrapper}>
            <Icon name="person" size={22} color="#666" style={styles.icon} />
            <TextInput
              style={styles.inputWithIcon}
              placeholder="Last Name"
              value={lastName}
              onChangeText={setLastName}
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputWrapper}>
            <Icon name="phone" size={22} color="#666" style={styles.icon} />
            <TextInput
              style={styles.inputWithIcon}
              placeholder="Mobile Number"
              value={mobile}
              keyboardType="phone-pad"
              onChangeText={setMobile}
              maxLength={10}
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputWrapper}>
            <Icon
              name="confirmation-number"
              size={22}
              color="#666"
              style={styles.icon}
            />
            <TextInput
              style={styles.inputWithIcon}
              placeholder="Badge Number"
              value={badgeNumber}
              onChangeText={setBadgeNumber}
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputWrapper}>
            <Icon name="email" size={22} color="#666" style={styles.icon} />
            <TextInput
              style={styles.inputWithIcon}
              placeholder="Email ID (optional)"
              value={email}
              onChangeText={setEmail}
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputWrapper}>
            <Icon
              name="person-pin"
              size={22}
              color="#666"
              style={styles.icon}
            />
            <TextInput
              style={styles.inputWithIcon}
              placeholder="Person to Meet"
              value={personToMeet}
              onChangeText={setPersonToMeet}
              placeholderTextColor="#999"
            />
          </View>
          {/* Visit Date Picker */}

          <TouchableOpacity
            onPress={() => setShowDatePicker(true)}
            style={styles.inputWrapper}
          >
            <Icon
              name="calendar-today"
              size={22}
              color="#666"
              style={styles.icon}
            />
            <Text style={{ fontSize: 16, color: visitDate ? '#000' : '#999' }}>
              {visitDate ? visitDate.toDateString() : 'Select Visit Date'}
            </Text>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={visitDate}
              mode="date"
              minimumDate={new Date()}
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={(event, selectedDate) => {
                setShowDatePicker(false);
                if (selectedDate) setVisitDate(selectedDate);
              }}
            />
          )}

          {renderDropdown(
            'location-on',
            'Office Location',
            officeLocation,
            officeOptions,
            setOfficeLocation,
            officeModalVisible,
            setOfficeModalVisible,
          )}
          {renderDropdown(
            'assignment',
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
              {govtIdFile ? 'ID Uploaded ✅' : 'Upload Govt ID (Image)'}
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
              {
                backgroundColor: isFormValid && !isLoading ? '#007BFF' : '#ccc',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              },
            ]}
            onPress={handleSubmit}
            disabled={!isFormValid || isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Text style={styles.submitText}>Submit</Text>
            )}
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
  dropdownContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownIcon: {
    fontSize: 16,
    color: '#666',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 15,
    backgroundColor: 'white',
    height: 52,
  },
  icon: {
    marginRight: 8,
  },
  inputWithIcon: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
});
