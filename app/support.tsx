import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function SupportScreen() {
  const router = useRouter();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: '1', text: 'Здравствуйте! Чем могу помочь?', isSupport: true },
  ]);

  const sendMessage = () => {
    if (message.trim()) {
      setMessages([...messages, { id: Date.now().toString(), text: message, isSupport: false }]);
      setMessage('');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Ionicons name="car" size={24} color="#007AFF" />
          <Text style={styles.title}>Служба поддержки</Text>
          <Text style={styles.subtitle}>Всегда поможем</Text>
        </View>
      </View>

      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <View style={[styles.messageContainer, item.isSupport ? styles.supportMessage : styles.userMessage]}>
            <Text style={styles.messageText}>{item.text}</Text>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  backButton: {
    marginBottom: 16,
  },
  headerContent: {
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  messagesList: {
    padding: 16,
  },
  messageContainer: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
    marginBottom: 8,
  },
  supportMessage: {
    backgroundColor: '#F2F2F7',
    alignSelf: 'flex-start',
  },
  userMessage: {
    backgroundColor: '#007AFF',
    alignSelf: 'flex-end',
  },
  messageText: {
    fontSize: 16,
    color: '#000',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
  },
  input: {
    flex: 1,
    backgroundColor: '#F2F2F7',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    maxHeight: 100,
  },
  sendButton: {
    padding: 8,
  },
}); 