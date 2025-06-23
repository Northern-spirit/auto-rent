import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, Switch, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from './../components/Button';
import { Input } from './../components/Input';
import { useStore } from '../store/useStore';

const { width } = Dimensions.get('window');

export default function Login() {
  const router = useRouter();
  const { login } = useStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSeller, setIsSeller] = useState(false);

  const toggleSwitch = () => {
    setIsSeller(!isSeller);
  };

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Ошибка', 'Пожалуйста, заполните все поля');
      return;
    }

    // Вызываем метод login с выбранной ролью
    login(email, password, isSeller ? 'seller' : 'buyer');
    
    // После успешного входа переходим на главную
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

      <View style={styles.content}>
        <Text style={styles.title}>Вход</Text>
        
        {/* <View style={styles.roleSwitch}>
          <Text style={styles.roleText}>Я покупатель</Text>
          <Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={isSeller ? '#007AFF' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isSeller}
          />
          <Text style={styles.roleText}>Я продавец</Text>
        </View> */}

        <View style={styles.form}>
          <Input
            style={{ width: '100%' }}
            value={email}
            onChangeText={setEmail}
            placeholder="Введите ваш email"
          />
          <Input
            style={{ width: '100%' }}
            value={password}
            onChangeText={setPassword}
            placeholder="Введите пароль"
            secureTextEntry
          />
          <TouchableOpacity
            onPress={() => router.push('/forgot-password')}
            style={styles.forgotPassword}
          >
            <Text style={styles.forgotPasswordText}>Забыли пароль?</Text>
          </TouchableOpacity>
        </View>

        <Button onPress={handleLogin} title="Войти" />
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
    alignItems: 'center'
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
    width: '100%',
    paddingHorizontal: 16,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: '#007AFF',
    fontSize: 16,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  registerText: {
    fontSize: 16,
    color: '#666',
    marginRight: 8,
  },
  registerLink: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '600',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 38
  },
  roleSwitch: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    padding: 10,
    borderRadius: 8,
  },
  roleText: {
    fontSize: 16,
    color: '#333',
    marginHorizontal: 10,
  },
  content: {
    width: '100%',
    paddingHorizontal: 20,
    zIndex: 1,
  },
}); 