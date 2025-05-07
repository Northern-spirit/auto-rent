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
    router.push('/home');
  };

  return (
    <View style={styles.container}>
      {/* <Image
        source={require('../../assets/register-image.jpg')}
        style={styles.image}
        resizeMode="cover"
      /> */}
      <Text style={styles.title}>Регистрация</Text>
      <View style={styles.form}>
        <Input
          label="Имя"
          value={name}
          onChangeText={setName}
          placeholder="Введите ваше имя"
        />
        <Input
          label="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="Введите ваш email"
        />
        <Input
          label="Пароль"
          value={password}
          onChangeText={setPassword}
          placeholder="Введите пароль"
          secureTextEntry
        />
        <Input
          label="Повторите пароль"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Повторите пароль"
          secureTextEntry
        />
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
    backgroundColor: '#fff',
  },
  image: {
    width: width,
    height: width / 3,
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
}); 