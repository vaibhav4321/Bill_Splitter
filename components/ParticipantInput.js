import React from 'react';
import { View } from 'react-native';
import InputField from './InputField';

export default function ParticipantInput({ index, details, onChange }) {
  return (
    <View style={{ marginBottom: 10 }}>
      <InputField
        placeholder={`Name of Person ${index + 1}`}
        value={details?.name || ''}
        onChangeText={(value) => onChange(index, 'name', value)}
      />
      <InputField
        placeholder={`Amount paid by Person ${index + 1}`}
        value={details?.paid || ''}
        onChangeText={(value) => onChange(index, 'paid', value)}
        keyboardType="numeric"
      />
    </View>
  );
}
