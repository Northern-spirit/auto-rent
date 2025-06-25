import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { TabBarWrapper } from '../../components/TabBarWrapper';

export default function PriceScreen() {
  const router = useRouter();
  const [price, setPrice] = useState('');
  const [minDays, setMinDays] = useState('');
  const [maxDays, setMaxDays] = useState('');

  const handlePublish = () => {
    if (!price || !minDays || !maxDays) {
      Alert.alert('Ошибка', 'Пожалуйста, заполните все поля');
      return;
    }

    router.push('/(tabs)/map')
    // Здесь будет логика публикации объявления
    // Alert.alert(
    //   'Успех',
    //   'Объявление успешно опубликовано',
    //   [
    //     {
    //       text: 'OK',
    //       onPress: () => router.push('/(tabs)/map'),
    //     },
    //   ]
    // );
  };

  return (
    <TabBarWrapper>
      <View style={styles.container}>
        <Text style={styles.title}>Стоимость и время аренды</Text>

        <Input
          value={price}
          onChangeText={setPrice}
          placeholder="Рублей в сутки"
          keyboardType="numeric"
          style={styles.input}
        />

        <Text style={styles.subtitle}>Минимальная и максимальная границы аренды:</Text>

        <View style={styles.daysContainer}>
          <Input
            value={minDays}
            onChangeText={setMinDays}
            placeholder="От 1 дня"
            keyboardType="numeric"
            style={[styles.input, styles.daysInput]}
          />
          <Input
            value={maxDays}
            onChangeText={setMaxDays}
            placeholder="До 5 дней"
            keyboardType="numeric"
            style={[styles.input, styles.daysInput]}
          />
        </View>

        <Button
          title="Опубликовать"
          onPress={handlePublish}
          style={styles.publishButton}
        />
      </View>
    </TabBarWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    marginBottom: 16,
  },
  daysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  daysInput: {
    flex: 1,
    marginHorizontal: 8,
  },
  publishButton: {
    marginTop: 24,
  },
}); 