import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from './../components/Button';
import { Input } from './../components/Input';

export default function VerifyCode() {
  const router = useRouter();
  const [code, setCode] = useState('');
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes in seconds
  const [email, setEmail] = useState('user@example.com'); // This should come from the previous screen

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleVerify = () => {
    // Здесь будет логика проверки кода
    router.push('/home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Введите код</Text>
      <Text style={styles.subtitle}>
        Мы отправили код на почту {email}
      </Text>
      <View style={styles.form}>
        <Input
          label="Код подтверждения"
          value={code}
          onChangeText={setCode}
          placeholder="Введите код из сообщения"
        />
        <Text style={styles.timerText}>
          Повторно можно запросить через {formatTime(timeLeft)}
        </Text>
        <Button style={{ width: 180 }} title="Подтвердить" onPress={handleVerify} />
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
    textAlign: 'center',
    marginTop: 32,
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
  },
  form: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
    // width: '100%',
  },
  timerText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginVertical: 16,
  },
}); 