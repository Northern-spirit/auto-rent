import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from './../components/Button';
import { Input } from './../components/Input';

const { width } = Dimensions.get('window');

export default function Register() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = () => {
    // Здесь будет логика регистрации
    router.replace('/(tabs)/map');
  };

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

      <View>
        <Text style={styles.title}>Регистрация</Text>
        <View style={styles.form}>
          <Input
            value={name}
            onChangeText={setName}
            placeholder="Введите ваше имя"
          />
          <Input
            value={email}
            onChangeText={setEmail}
            placeholder="Введите ваш email"
          />
          <Input
            value={password}
            onChangeText={setPassword}
            placeholder="Введите пароль"
            secureTextEntry
          />
          <Input
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Повторите пароль"
            secureTextEntry
          />
        </View>
      </View>

      <View style={styles.bottomContainer}>
        <Button title="Зарегистрироваться" onPress={handleRegister} />
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>У вас уже есть аккаунт?</Text>
          <TouchableOpacity onPress={() => router.push('/login')}>
            <Text style={styles.loginLink}>Войти</Text>
          </TouchableOpacity>
        </View>
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
  },
  image: {
    width: width,
    height: width / 3,
  },
  tyres: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 0,
    width: '100%',
  },
  iconCar: {
    position: 'absolute',
    top: 0,
    zIndex: 1,
    marginTop: '15%'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 32,
    marginBottom: 32,
  },
  form: {
    paddingHorizontal: 16,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  loginText: {
    fontSize: 16,
    color: '#666',
    marginRight: 8,
  },
  loginLink: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '600',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 38
  }
}); 