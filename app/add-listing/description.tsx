import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '../../components/Button';
import { TabBarWrapper } from '../../components/TabBarWrapper';

export default function DescriptionScreen() {
  const router = useRouter();
  const [description, setDescription] = useState('');

  return (
    <TabBarWrapper>
      <View style={styles.container}>
        <Text style={styles.title}>Описание</Text>

        <TextInput
          style={styles.textArea}
          multiline
          numberOfLines={8}
          placeholder="Опишите ваш автомобиль..."
          value={description}
          onChangeText={setDescription}
          textAlignVertical="top"
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
            onPress={() => router.push('/add-listing/price')}
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
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 200,
    marginBottom: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    marginHorizontal: 8,
  },
}); 