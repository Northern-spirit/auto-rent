import React from 'react';
import { View, FlatList, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useStore } from '../../store/useStore';
import { Ionicons } from '@expo/vector-icons';
import { getStatusColor, BookingStatus } from '../../types';

export default function MessagesScreen() {
  const router = useRouter();
  const { getMessagesByRole, user } = useStore();
  const messages = getMessagesByRole();

  if (!messages || messages.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.emptyContainer}>
          <Ionicons name="chatbubble-outline" size={64} color="#8E8E93" />
          <Text style={styles.emptyText}>У вас пока нет сообщений</Text>
        </View>
      </View>
    );
  }

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
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status as BookingStatus) }]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
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
        data={messages}
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
    backgroundColor: '#fff',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    marginTop: 16,
    fontSize: 16,
    color: '#8E8E93',
    textAlign: 'center',
  },
  list: {
    padding: 16,
  },
  messageCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  carImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  messageContent: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  carTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  carPrice: {
    fontSize: 14,
    color: '#007AFF',
    marginTop: 4,
  },
  statusBadge: {
    padding: 4,
    borderRadius: 4,
    marginTop: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  unreadBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#FF3B30',
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  unreadCount: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
}); 