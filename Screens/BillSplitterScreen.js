import React, { useState } from 'react';
import { ScrollView, Text, View, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import InputField from '../Components/InputField';
import ParticipantInput from '../Components/ParticipantInput';
import PaymentHistory from '../Components/PaymentHistory';
import ModalPopup from '../Components/ModalPopup';

export default function BillSplitterScreen() {
  const [billAmount, setBillAmount] = useState('');
  const [participants, setParticipants] = useState('');
  const [participantDetails, setParticipantDetails] = useState([]);
  const [result, setResult] = useState(null);
  const [balances, setBalances] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0)); // Animation state

  const calculateSplit = () => {
    const amount = parseFloat(billAmount);
    const people = parseInt(participants);

    if (isNaN(amount) || isNaN(people) || people <= 0 || participantDetails.length !== people) {
      setResult('Please enter valid inputs and details for all participants.');
      return;
    }

    const perPerson = (amount / people).toFixed(2);
    const balances = participantDetails.map((participant) => ({
      ...participant,
      owes: perPerson,
      balance: participant.paid - perPerson,
    }));

    const paymentDetails = [];
    for (let i = 0; i < balances.length; i++) {
      for (let j = 0; j < balances.length; j++) {
        if (balances[i].balance < 0 && balances[j].balance > 0) {
          const transferAmount = Math.min(
            Math.abs(balances[i].balance),
            balances[j].balance
          );
          paymentDetails.push({
            from: balances[i].name,
            to: balances[j].name,
            amount: transferAmount.toFixed(2),
            resolved: false,
          });
          balances[i].balance += transferAmount;
          balances[j].balance -= transferAmount;
        }
      }
    }

    // Prepend the new payment details to the top of the history
    setBalances((prevBalances) => [...paymentDetails, ...prevBalances]);

    setResult(`Each person owes: ₹${perPerson}`);
    triggerPopUp();
    setBillAmount('');
    setParticipants('');
    setParticipantDetails([]);
  };

  const triggerPopUp = () => {
    setModalVisible(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start(() => setModalVisible(false));
      }, 1500);
    });
  };

  const handleParticipantChange = (index, key, value) => {
    const updatedDetails = [...participantDetails];
    if (!updatedDetails[index]) updatedDetails[index] = { name: '', paid: '' };
    updatedDetails[index][key] = value;
    setParticipantDetails(updatedDetails);
  };

  const resolveTransaction = (index) => {
    const updatedBalances = [...balances];
    updatedBalances[index].resolved = true;
    setBalances(updatedBalances);
  };

  const deleteTransaction = (index) => {
    const updatedBalances = balances.filter((_, i) => i !== index);
    setBalances(updatedBalances);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>💰 Bill Splitter 💰</Text>

      {/* Input Section */}
      <InputField
        placeholder="Enter total bill amount"
        value={billAmount}
        onChangeText={setBillAmount}
        keyboardType="numeric"
      />
      <InputField
        placeholder="Enter number of participants"
        value={participants}
        onChangeText={setParticipants}
        keyboardType="numeric"
      />

      {/* Input Fields for Each Participant */}
      {participants &&
        Array.from({ length: parseInt(participants) || 0 }, (_, i) => (
          <ParticipantInput
            key={i}
            index={i}
            details={participantDetails[i]}
            onChange={handleParticipantChange}
          />
        ))}

      <TouchableOpacity style={styles.calculateButton} onPress={calculateSplit}>
        <Text style={styles.calculateButtonText}>Calculate</Text>
      </TouchableOpacity>

      {/* Result Section */}
      {result && <Text style={styles.result}>{result}</Text>}

      {/* Payment Table */}
      <PaymentHistory
        balances={balances}
        onResolve={resolveTransaction}
        onDelete={deleteTransaction}
      />

      {/* Modal Pop-Up */}
      <ModalPopup visible={modalVisible} fadeAnim={fadeAnim} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1e1e2f',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#f5a623',
  },
  calculateButton: {
    backgroundColor: '#f5a623',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  calculateButtonText: {
    color: '#1e1e2f',
    fontSize: 18,
    fontWeight: 'bold',
  },
  result: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#58d68d',
    textAlign: 'center',
  },
});
