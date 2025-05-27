import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function AboutScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>О приложении</Text>
      </View>

      <View style={styles.content}>
        <Image 
          // source={require('../assets/car-icon.png')} 
          style={styles.logo}
        />
        <Text style={styles.appName}>Carrentino</Text>
        <Text style={styles.version}>Версия 0.5.7 от 12.01.2024{'\n'}сборка 6c305c7c</Text>

        <TouchableOpacity style={styles.linkButton}>
          <Text style={styles.linkText}>Пользовательское соглашение</Text>
          <Ionicons name="chevron-forward" size={24} color="#007AFF" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.linkButton}>
          <Text style={styles.linkText}>Политика конфиденциальности</Text>
          <Ionicons name="chevron-forward" size={24} color="#007AFF" />
        </TouchableOpacity>

        <Text style={styles.copyright}>©️ 2024-2025 ООО «Каррентино»</Text>
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
  content: {
    flex: 1,
    alignItems: 'center',
    padding: 24,
  },
  logo: {
    width: 120,
    height: 120,
    marginTop: 48,
    marginBottom: 24,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  version: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 48,
  },
  linkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  linkText: {
    fontSize: 16,
    color: '#007AFF',
  },
  copyright: {
    position: 'absolute',
    bottom: 24,
    fontSize: 14,
    color: '#666',
  },
}); 