import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '../components/Button';

export default function Welcome() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Добро пожаловать</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Зарегистрироваться"
          onPress={() => router.push('/register')}
          variant="primary"
        />
        <Button
          title="Войти"
          onPress={() => router.push('/login')}
          variant="secondary"
        />
      </View>
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
    marginBottom: 32,
  },
  buttonContainer: {
    width: '100%',
  },
}); 