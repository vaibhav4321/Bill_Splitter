import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function PaymentHistory({ balances, onResolve, onDelete }) {
  return (
    <View style={styles.historyContainer}>
      <Text style={styles.historyTitle}>Payment History</Text>
      {balances.length > 0 ? (
        balances.map((item, index) => (
          <View key={index} style={styles.historyItemContainer}>
            <Text
              style={[
                styles.historyItem,
                item.resolved && styles.resolvedHistoryItem,
              ]}
            >
              {item.from} have to pay {item.to}: ₹{item.amount}
            </Text>
            <View style={styles.historyButtonsContainer}>
              <TouchableOpacity
                style={[
                  styles.historyButton,
                  item.resolved && styles.resolvedButton,
                ]}
                onPress={() => onResolve(index)}
                disabled={item.resolved}
              >
                <Text
                  style={[
                    styles.historyButtonText,
                    item.resolved && styles.resolvedButtonText,
                  ]}
                >
                  {item.resolved ? 'Resolved' : 'Mark as Resolved'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.historyButton}
                onPress={() => onDelete(index)}
              >
                <Text style={styles.historyButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))
      ) : (
        <Text style={styles.noHistory}>No payment history to show.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  historyContainer: {
    marginTop: 30,
  },
  historyTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#f5a623',
  },
  historyItemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
  },
  historyItem: {
    fontSize: 16,
    color: '#ccc',
  },
  resolvedHistoryItem: {
    color: '#58d68d',
    textDecorationLine: 'line-through',
  },
  historyButtonsContainer: {
    flexDirection: 'row',
    marginTop: 5,
    justifyContent: 'space-between',
  },
  historyButton: {
    backgroundColor: '#f5a623',
    padding: 5,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  resolvedButton: {
    backgroundColor: '#58d68d',
  },
  historyButtonText: {
    color: '#1e1e2f',
    fontSize: 12,
    fontWeight: 'bold',
  },
  resolvedButtonText: {
    color: '#fff',
  },
  noHistory: {
    textAlign: 'center',
    color: '#ccc',
    fontSize: 16,
    marginTop: 10,
  },
});
