import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

export default function InputField({ placeholder, value, onChangeText, keyboardType }) {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      placeholderTextColor="#aaa"
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 8,
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#2a2a3e',
    color: '#fff',
    fontSize: 16,
  },
});
