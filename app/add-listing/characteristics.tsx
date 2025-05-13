import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Ionicons } from '@expo/vector-icons';

// Моковые данные для марок автомобилей
const CAR_BRANDS = [
  'Audi', 'BMW', 'Chevrolet', 'Ford', 'Honda', 'Hyundai', 'Kia', 'Lexus',
  'Mercedes-Benz', 'Nissan', 'Toyota', 'Volkswagen', 'Volvo'
];

export default function CharacteristicsScreen() {
  const router = useRouter();
  const [brand, setBrand] = useState('');
  const [showBrandModal, setShowBrandModal] = useState(false);
  const [filteredBrands, setFilteredBrands] = useState(CAR_BRANDS);

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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Характеристики</Text>

      <TouchableOpacity 
        style={styles.brandSelector}
        onPress={() => setShowBrandModal(true)}
      >
        <Text style={styles.brandText}>{brand || 'Выберите марку автомобиля'}</Text>
        <Ionicons name="chevron-down" size={24} color="#666" />
      </TouchableOpacity>

      <Modal
        visible={showBrandModal}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
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
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.brandItem}
                  onPress={() => selectBrand(item)}
                >
                  <Text style={styles.brandItemText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>

      <View style={styles.buttonContainer}>
        <Button
          title="Назад"
          onPress={() => router.back()}
          variant="secondary"
          style={styles.button}
        />
        <Button
          title="Далее"
          onPress={() => router.push('/add-listing/description')}
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
  brandSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  brandText: {
    fontSize: 16,
    color: '#333',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  searchInput: {
    marginBottom: 16,
  },
  brandItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  brandItemText: {
    fontSize: 16,
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