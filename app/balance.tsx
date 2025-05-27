import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useStore } from '../store/useStore';

export default function BalanceScreen() {
  const router = useRouter();
  const { user } = useStore();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Пополнение баланса</Text>
      </View>

      <View style={styles.balanceContainerWrapper}>
        <View style={styles.balanceContainer}>
          <Text style={styles.balanceLabel}>Ваш баланс</Text>
          <Text style={styles.balanceAmount}>{user?.balance.toLocaleString()} ₽</Text>
        </View>

        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="arrow-up" size={24} color="#007AFF" />
            <Text style={styles.actionText}>Перевести</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="add" size={24} color="#007AFF" />
            <Text style={styles.actionText}>Пополнить</Text>
          </TouchableOpacity>
        </View>
      </View>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  balanceContainer: {
    alignItems: 'center',
    padding: 32,
  },
  balanceLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  balanceContainerWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  balanceAmount: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 24,
  },
  actionButton: {
    alignItems: 'center',
    padding: 16,
  },
  actionText: {
    marginTop: 8,
    color: '#007AFF',
    fontSize: 16,
  },
}); 