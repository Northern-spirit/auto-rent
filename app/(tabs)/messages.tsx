import React from 'react';
import { View, FlatList, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// Моковые данные для сообщений
const MOCK_MESSAGES = [
  {
    id: '1',
    title: 'BMW X5',
    price: '5000 ₽/сутки',
    lastMessage: 'Здравствуйте, автомобиль еще доступен?',
    unreadCount: 2,
    image: 'https://example.com/car1.jpg',
  },
  // Добавьте больше моковых данных
];

export default function MessagesScreen() {
  const router = useRouter();

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.messageCard}
      onPress={() => router.push(`/chat/${item.id}`)}
    >
      <Image
        source={{ uri: item.image }}
        style={styles.carImage}
      />
      <View style={styles.messageContent}>
        <Text style={styles.carTitle}>{item.title}</Text>
        <Text style={styles.carPrice}>{item.price}</Text>
        <Text style={styles.lastMessage} numberOfLines={1}>
          {item.lastMessage}
        </Text>
      </View>
      {item.unreadCount > 0 && (
        <View style={styles.unreadBadge}>
          <Text style={styles.unreadCount}>{item.unreadCount}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={MOCK_MESSAGES}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  list: {
    padding: 16,
  },
  messageCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  carImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  messageContent: {
    flex: 1,
    justifyContent: 'center',
  },
  carTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  carPrice: {
    fontSize: 14,
    color: '#007AFF',
    marginBottom: 4,
  },
  lastMessage: {
    fontSize: 14,
    color: '#666',
  },
  unreadBadge: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  unreadCount: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
}); 