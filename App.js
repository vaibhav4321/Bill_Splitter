import React from 'react';
import { SafeAreaView } from 'react-native';
import BillSplitterScreen from './screens/BillSplitterScreen';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <BillSplitterScreen />
    </SafeAreaView>
  );
}
