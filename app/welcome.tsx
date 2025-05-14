import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '../components/Button';

export default function Welcome() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/tyres.png')}
        style={styles.tyres}
        resizeMode="cover"
      />
      <Image
        source={require('../assets/iconCar.png')}
        style={styles.iconCar}
        resizeMode="cover"
      />
      
      <Text style={styles.title}>Необходимо войти в аккаунт</Text>
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
    position: 'relative',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 32,
  },
  buttonContainer: {
    width: '100%',
  },
  tyres: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
    width: '100%',
    height: 267
    
  },
  iconCar: {
    position: 'absolute',
    top: 0,
    zIndex: 2,
    marginTop: '15%'
    
  }
}); 