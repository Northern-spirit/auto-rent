import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, FlatList, TextInput, TouchableOpacity, Text, Image, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
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
  const { messages, user, processBooking, updateBalance, chatMessages, sendMessage } = useStore();
  const [messageInput, setMessageInput] = useState('');
  const flatListRef = useRef<FlatList>(null);
  
  const message = messages.find(m => m.id === id);
  const currentChatMessages = chatMessages[id as string] || [];

  useEffect(() => {
    // Прокручиваем к последнему сообщению при загрузке
    if (flatListRef.current && currentChatMessages.length > 0) {
      flatListRef.current.scrollToEnd({ animated: false });
    }
  }, []);

  const handleStatusPress = () => {
    if (user.role === 'seller') {
      processBooking(message?.id);
    } else if (message?.status === 'ожидает оплаты') {
      if (user.balance >= message?.priceValue) {
        updateBalance(-message?.priceValue);
        processBooking(message.id);
      } else {
        console.log('Недостаточно средств');
        Alert.alert('Ошибка', 'Недостаточно средств'); 
      }
    } else {
      processBooking(message.id);
    }
  };

  const handleSend = () => {
    if (!messageInput.trim()) return;

    sendMessage(id as string, messageInput.trim());
    setMessageInput('');

    // Прокручиваем к новому сообщению
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const renderMessage = ({ item }: { item: ChatMessage }) => {
    const isCurrentUser = item.senderId === user.id;

    return (
      <View style={[
        styles.messageContainer,
        isCurrentUser ? styles.currentUserMessage : styles.otherUserMessage
      ]}>
        <Text style={styles.messageText}>{item.text}</Text>
        <Text style={styles.messageTime}>
          {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </View>
    );
  };

  if (!message) return null;

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
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
        ref={flatListRef}
        data={currentChatMessages}
        renderItem={renderMessage}
        keyExtractor={item => item.id}
        style={styles.messagesList}
        contentContainerStyle={styles.messagesContainer}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={messageInput}
          onChangeText={setMessageInput}
          placeholder="Введите сообщение..."
          multiline
        />
        <TouchableOpacity 
          style={[styles.sendButton, !messageInput.trim() && styles.sendButtonDisabled]}
          onPress={handleSend}
          disabled={!messageInput.trim()}
        >
          <Ionicons name="send" size={24} color={messageInput.trim() ? '#007AFF' : '#8E8E93'} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
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
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  messagesContainer: {
    padding: 16,
  },
  messageContainer: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
    marginBottom: 8,
  },
  currentUserMessage: {
    backgroundColor: '#007AFF',
    alignSelf: 'flex-end',
    borderBottomRightRadius: 4,
  },
  otherUserMessage: {
    backgroundColor: '#E5E5EA',
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
    color: '#000',
  },
  messageTime: {
    fontSize: 12,
    color: '#8E8E93',
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 8,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
    alignItems: 'flex-end',
  },
  input: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    maxHeight: 100,
    fontSize: 16,
  },
  sendButton: {
    padding: 8,
  },
  sendButtonDisabled: {
    opacity: 0.5,
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