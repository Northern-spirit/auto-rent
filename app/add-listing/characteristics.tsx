import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Ionicons } from '@expo/vector-icons';
import { useStore } from '../../store/useStore';

// Моковые данные для марок автомобилей
const CAR_BRANDS = [
  'Audi', 'BMW', 'Chevrolet', 'Ford', 'Honda', 'Hyundai', 'Kia', 'Lexus',
  'Mercedes-Benz', 'Nissan', 'Toyota', 'Volkswagen', 'Volvo'
];

export default function CharacteristicsScreen() {
  const router = useRouter();
  const { selectedImage } = useLocalSearchParams();
  const { addCar } = useStore();
  const [brand, setBrand] = useState('');
  const [showBrandModal, setShowBrandModal] = useState(false);
  const [filteredBrands, setFilteredBrands] = useState(CAR_BRANDS);
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [mileage, setMileage] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  const handleBrandSearch = (text: string) => {
    setBrand(text);
    const filtered = CAR_BRANDS.filter(b => 
      b.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredBrands(filtered);
  };

  const selectBrand = (selectedBrand: string) => {
    setBrand(selectedBrand);
    setShowBrandModal(false);
  };

  const handleSubmit = () => {
    if (!brand || !model || !year || !mileage || !price || !description) {
      Alert.alert('Ошибка', 'Пожалуйста, заполните все поля');
      return;
    }

    const carData = {
      title: `${brand} ${model}`,
      price: parseInt(price),
      description: description,
      year: parseInt(year),
      mileage: parseInt(mileage),
      age: new Date().getFullYear() - parseInt(year),
      acceleration: getAccelerationByBrand(brand),
      horsepower: getHorsepowerByBrand(brand),
      image: selectedImage as string, // Используем переданное изображение
    };

    addCar(carData);
    router.push('/(tabs)/map');
  };

  // Функции для получения характеристик по марке
  const getAccelerationByBrand = (brand: string) => {
    const accelerations: { [key: string]: number } = {
      'BMW': 6.5,
      'Mercedes-Benz': 7.0,
      'Audi': 6.8,
      'Volkswagen': 8.5,
      'Toyota': 9.0,
      'Honda': 8.8,
      'Ford': 8.2,
      'Chevrolet': 8.0,
      'Nissan': 8.5,
      'Hyundai': 9.2,
      'Kia': 9.0,
      'Lexus': 7.5,
      'Volvo': 7.8,
    };
    return accelerations[brand] || 8.0;
  };

  const getHorsepowerByBrand = (brand: string) => {
    const horsepowers: { [key: string]: number } = {
      'BMW': 250,
      'Mercedes-Benz': 220,
      'Audi': 240,
      'Volkswagen': 140,
      'Toyota': 150,
      'Honda': 160,
      'Ford': 180,
      'Chevrolet': 170,
      'Nissan': 160,
      'Hyundai': 140,
      'Kia': 150,
      'Lexus': 200,
      'Volvo': 190,
    };
    return horsepowers[brand] || 150;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Характеристики</Text>
      </View>

      <View style={styles.content}>
        {/* Марка автомобиля */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Марка автомобиля</Text>
          <TouchableOpacity 
            style={styles.brandInput}
            onPress={() => setShowBrandModal(true)}
          >
            <Text style={[styles.brandText, !brand && styles.placeholder]}>
              {brand || 'Выберите марку'}
            </Text>
            <Ionicons name="chevron-down" size={20} color="#666" />
          </TouchableOpacity>
        </View>

        {/* Модель */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Модель</Text>
          <Input
            value={model}
            onChangeText={setModel}
            placeholder="Введите модель"
          />
        </View>

        {/* Год выпуска */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Год выпуска</Text>
          <Input
            value={year}
            onChangeText={setYear}
            placeholder="Например: 2020"
            keyboardType="numeric"
          />
        </View>

        {/* Пробег */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Пробег (км)</Text>
          <Input
            value={mileage}
            onChangeText={setMileage}
            placeholder="Например: 50000"
            keyboardType="numeric"
          />
        </View>

        {/* Цена */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Цена за день (₽)</Text>
          <Input
            value={price}
            onChangeText={setPrice}
            placeholder="Например: 3000"
            keyboardType="numeric"
          />
        </View>

        {/* Описание */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Описание</Text>
          <Input
            value={description}
            onChangeText={setDescription}
            placeholder="Опишите ваш автомобиль"
            multiline
            numberOfLines={4}
          />
        </View>

        <Button 
          title="Добавить объявление"
          onPress={handleSubmit}
          style={styles.submitButton}
        />
      </View>

      {/* Модальное окно выбора марки */}
      <Modal
        visible={showBrandModal}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Выберите марку</Text>
              <TouchableOpacity onPress={() => setShowBrandModal(false)}>
                <Ionicons name="close" size={24} color="#000" />
              </TouchableOpacity>
            </View>
            
            <Input
              value={brand}
              onChangeText={handleBrandSearch}
              placeholder="Поиск марки"
              style={styles.searchInput}
            />
            
            <FlatList
              data={filteredBrands}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  style={styles.brandItem}
                  onPress={() => selectBrand(item)}
                >
                  <Text style={styles.brandItemText}>{item}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={item => item}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  backButton: {
    marginRight: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
  content: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    color: '#333',
  },
  brandInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  brandText: {
    fontSize: 16,
    color: '#333',
  },
  placeholder: {
    color: '#999',
  },
  submitButton: {
    marginTop: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '70%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  searchInput: {
    margin: 20,
    marginTop: 0,
  },
  brandItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  brandItemText: {
    fontSize: 16,
    color: '#333',
  },
}); 