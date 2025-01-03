import React from 'react';
import { View, Text, Modal, Animated, StyleSheet } from 'react-native';

export default function ModalPopup({ visible, fadeAnim }) {
  return (
    <Modal transparent visible={visible}>
      <View style={styles.modalContainer}>
        <Animated.View style={[styles.modalContent, { opacity: fadeAnim }]}>
          <Text style={styles.modalText}>🎉 Bill Split Successfully! 🎉</Text>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
});
