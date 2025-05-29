import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TextInput, TouchableOpacity, Text, Image, ScrollView, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useStore } from '../../store/useStore';
import { getStatusColor, BookingStatus } from '../../types';

const MOCK_CHATS = {
  '1': [
    {
      id: '1',
      text: 'Здравствуйте, автомобиль еще доступен?',
      senderId: 'other',
      timestamp: new Date(Date.now() - 3600000),
    },
    {
      id: '2',
      text: 'Да, автомобиль доступен',
      senderId: 'currentUser',
      timestamp: new Date(Date.now() - 1800000),
    },
  ],
  '2': [
    {
      id: '1',
      text: 'Добрый день, когда можно посмотреть?',
      senderId: 'other',
      timestamp: new Date(Date.now() - 7200000),
    },
  ],
};

export default function ChatScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { messages, user, processBooking, updateBalance } = useStore();
  
  
  const message = messages.find(m => m.id === id);
  if (!message) return null;

  const handleStatusPress = () => {
    if (user.role === 'seller') {
      processBooking(message.id);
    } else if (message.status === 'ожидает оплаты') {
      if (user.balance >= message.priceValue) {
        updateBalance(-message.priceValue);
        processBooking(message.id);
      } else {
        Alert.alert('Ошибка', 'Недостаточно средств');
      }
    } else {
      processBooking(message.id);
    }
  };

  const sendMessage = () => {
    alert(123)
  };


  

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Чат</Text>
      </View>

      <View style={styles.carCard}>
        <Image source={{ uri: message.image }} style={styles.carImage} />
        <Text style={styles.carTitle}>{message.title}</Text>
        <Text style={styles.carDescription}>{message.description}</Text>
        <Text style={styles.carPrice}>{message.price}</Text>
        
        <TouchableOpacity 
          style={[styles.statusButton, { backgroundColor: getStatusColor(message.status as BookingStatus) }]}
          onPress={handleStatusPress}
        >
          <Text style={styles.statusButtonText}>{message.status}</Text>
        </TouchableOpacity>

        {user.role === 'buyer' && message.status === 'ожидает оплаты' && (
          <View style={styles.paymentBlock}>
            <Text style={styles.balanceText}>
              Ваш баланс: {user.balance.toLocaleString()} ₽
            </Text>
            <TouchableOpacity 
              style={styles.payButton}
              onPress={handleStatusPress}
            >
              <Text style={styles.payButtonText}>Оплатить</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <View style={[
            styles.messageBubble,
            item.senderId === 'currentUser' ? styles.sentMessage : styles.receivedMessage
          ]}>
            <Text style={styles.messageText}>{item.text}</Text>
            <Text style={styles.timestamp}>
              {item.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Text>
          </View>
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.messagesList}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Введите сообщение..."
          multiline
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          <Ionicons name="send" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>
    </ScrollView>
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
    borderBottomColor: '#eee',
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  messagesList: {
    padding: 16,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
    marginBottom: 8,
  },
  sentMessage: {
    backgroundColor: '#007AFF',
    alignSelf: 'flex-end',
  },
  receivedMessage: {
    backgroundColor: '#E5E5EA',
    alignSelf: 'flex-start',
  },
  messageText: {
    color: '#fff',
  },
  timestamp: {
    fontSize: 12,
    color: '#rgba(255, 255, 255, 0.7)',
    marginTop: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  input: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    maxHeight: 100,
  },
  sendButton: {
    padding: 8,
  },
  carCard: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 16,
    marginBottom: 16,
  },
  carImage: {
    width: '100%',
    height: 200,
    borderRadius: 16,
    marginBottom: 16,
  },
  carTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  carDescription: {
    marginBottom: 8,
  },
  carPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  statusButton: {
    padding: 12,
    borderRadius: 16,
    marginTop: 16,
  },
  statusButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  paymentBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  balanceText: {
    fontSize: 16,
    marginRight: 16,
  },
  payButton: {
    padding: 12,
    borderRadius: 16,
    backgroundColor: '#007AFF',
  },
  payButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 16,
  },
}); 