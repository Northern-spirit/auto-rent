import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function AddListingScreen() {
  const router = useRouter();

  const handleAddListing = () => {
    console.log('Button pressed!');
    router.push('/add-listing/upload-photos');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Добавить объявление</Text>
      
      <TouchableOpacity style={styles.button} onPress={handleAddListing}>
        <Text style={styles.buttonText}>Нажми меня!</Text>
      </TouchableOpacity>
      
      <Text style={styles.subtitle}>Если вы видите этот текст, страница работает!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#000',
  },
  button: {
    backgroundColor: '#9980FF',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
}); 