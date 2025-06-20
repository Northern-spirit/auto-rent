import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';

export default function RegistrationDataScreen() {
  const router = useRouter();
  const { selectedImage } = useLocalSearchParams();
  const [licensePlate, setLicensePlate] = useState('');
  const [vinNumber, setVinNumber] = useState('');

  const handleNext = () => {
    router.push({
      pathname: '/add-listing/characteristics',
      params: { selectedImage: selectedImage as string }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Регистрационные данные</Text>
      
      <Input
        value={licensePlate}
        onChangeText={setLicensePlate}
        placeholder="Государственный номер"
        style={styles.input}
      />
      
      <Input
        value={vinNumber}
        onChangeText={setVinNumber}
        placeholder="VIN или номер кузова"
        style={styles.input}
      />

      <View style={styles.buttonContainer}>
        <Button
          title="Назад"
          onPress={() => router.back()}
          variant="secondary"
          style={styles.button}
        />
        <Button
          title="Далее"
          onPress={handleNext}
          style={styles.button}
        />
      </View>
    </View>
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
  input: {
    width: '100%',
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  button: {
    flex: 1,
    marginHorizontal: 8,
  },
}); 