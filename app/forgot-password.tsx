import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from './../components/Button';
import { Input } from './../components/Input';

export default function ForgotPassword() {
  const router = useRouter();
  const [email, setEmail] = useState('');

  const handleResetPassword = () => {
    // Здесь будет логика отправки кода
    router.push('/verify-code');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Восстановление пароля</Text>
      <View style={styles.form}>
        <Input
          value={email}
          onChangeText={setEmail}
          placeholder="Введите ваш email"
        />
        <Button style={{ width: 180 }} title="Сбросить пароль" onPress={handleResetPassword} />
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
    padding: 16,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 32,
    marginBottom: 32,
  },
  form: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
}); 