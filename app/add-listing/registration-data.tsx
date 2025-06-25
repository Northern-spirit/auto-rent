import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { TabBarWrapper } from '../../components/TabBarWrapper';

export default function RegistrationDataScreen() {
  const router = useRouter();
  const { selectedImage } = useLocalSearchParams();
  const [vinNumber, setVinNumber] = useState('');

  const [mainPart, setMainPart] = useState('');
  const [regionPart, setRegionPart] = useState('');

  const handleMainChange = (text: string) => {
    let formatted = text.replace(/[^A-Za-zА-Яа-я0-9]/g, '').toUpperCase();
    if (formatted.length > 6) formatted = formatted.slice(0, 6);
    setMainPart(formatted);
  };

  const handleRegionChange = (text: string) => {
    let formatted = text.replace(/[^0-9]/g, '');
    if (formatted.length > 3) formatted = formatted.slice(0, 3);
    setRegionPart(formatted);
  };

  const handleNext = () => {
    router.push({
      pathname: '/add-listing/characteristics',
      params: { selectedImage: selectedImage as string }
    });
  };

  return (
    <TabBarWrapper>
      <View style={styles.container}>
        <Text style={styles.title}>Регистрационные данные</Text>

        <View style={styles.plateContainer}>
        <TextInput
          style={styles.mainInput}
          value={mainPart}
          onChangeText={handleMainChange}
          placeholder="А000АА"
          maxLength={6}
          autoCapitalize="characters"
          placeholderTextColor="#aaa"
        />
        <View style={styles.divider} />
        <TextInput
          style={styles.regionInput}
          value={regionPart}
          onChangeText={handleRegionChange}
          placeholder="96"
          maxLength={3}
          keyboardType="numeric"
          placeholderTextColor="#aaa"
        />
      </View>
        
        <Input
          value={vinNumber}
          onChangeText={setVinNumber}
          placeholder="VIN или номер кузова"
          style={styles.inputVin}
        />

        <View style={styles.buttonContainer}>
          <Button
            title="Назад"
            onPress={() => router.back()}
            style={styles.button}
          />
          <Button
            title="Далее"
            onPress={handleNext}
            style={styles.button}
          />
        </View>
      </View>
    </TabBarWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
    marginBottom: 64,
    textAlign: 'center',
  },
  plateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 167,
    height: 45,
    borderWidth: 2,
    borderColor: '#222',
    borderRadius: 8,
    backgroundColor: '#fff',
    overflow: 'hidden',
    alignSelf: 'center',
  },
  mainInput: {
    width: 105,
    height: '100%',
    paddingHorizontal: 12,
    fontSize: 20,
    color: '#222',
    backgroundColor: 'transparent',
    borderWidth: 0,
    letterSpacing: 2,
  },
  divider: {
    width: 2,
    height: '100%',
    backgroundColor: 'black',
    marginHorizontal: 2,
  },
  regionInput: {
    width: 52,
    height: '100%',
    paddingHorizontal: 8,
    fontSize: 20,
    color: '#222',
    backgroundColor: 'transparent',
    borderWidth: 0,
    textAlign: 'center',
    letterSpacing: 1,
  },
  input: {
    width: '100%',
    marginBottom: 16,
  },
  inputVin: {
    marginTop: 32,
    width: 279,
    height: 45,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  button: {
    flex: 1,
    width: 130,
    height: 42,
    marginHorizontal: 8,
  },
}); 