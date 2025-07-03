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
import { SafeAreaView } from 'react-native-safe-area-context';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
const VisitorFormScreen = () => {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [company, setCompany] = useState('');
  const [purpose, setPurpose] = useState('');
  const [email, setEmail] = useState('');
  const [photo, setPhoto] = useState<any>(null);

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

  const handleSubmit = () => {
    if (!name || !mobile || !company || !purpose || !email || !photo) {
      Alert.alert('Error', 'Please fill all fields and add a photo.');
      return;
    }

    // Submit logic goes here
    Alert.alert('Success', 'Visitor registered successfully.');
    console.log({
      name,
      mobile,
      company,
      purpose,
      email,
      photoUri: photo.uri,
    });

    // Optionally reset form
    // setName('');
    // setMobile('');
    // setCompany('');
    // setPurpose('');
    // setEmail('');
    // setPhoto(null);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.container}>
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
    width: wp('90%'), // Full width minus padding
    height: hp('20%'), // 30% of screen height
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
