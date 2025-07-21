import React from 'react';
import { TextInput, StyleSheet, Text, View, TextInputProps } from 'react-native';

interface InputFieldProps extends TextInputProps {
  label?: string;
  error?: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, error, style, ...props }) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[styles.input, style, error ? styles.inputError : null]}
        placeholderTextColor="#999"
        {...props}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

export default InputField;

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 6,
    fontSize: 14,
    fontWeight: '500',
    color: '#003366',
  },
  input: {
    height: 52,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#000',
  },
  inputError: {
    borderColor: '#FF3B30',
  },
  errorText: {
    marginTop: 4,
    fontSize: 12,
    color: '#FF3B30',
  },
});
