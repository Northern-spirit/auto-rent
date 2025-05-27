import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useStore } from '../store/useStore';
import CarCard from '../components/CarCard';

export default function MyListingsScreen() {
  const router = useRouter();
  const { cars, addToFavorites, removeFromFavorites } = useStore();
  const myListings = cars.slice(0, 3); // Берем первые 3 карточки для примера

  const handleFavoritePress = (car) => {
    const isFavorite = favorites.some(fav => fav.id === car.id);
    if (isFavorite) {
      removeFromFavorites(car.id);
    } else {
      addToFavorites(car);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Мои объявления</Text>
      </View>

      <FlatList
        data={myListings}
        renderItem={({ item }) => (
          <CarCard 
            car={item}
            onFavoritePress={() => handleFavoritePress(item)}
          />
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        numColumns={2}
        columnWrapperStyle={styles.row}
      />
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
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  list: {
    padding: 8,
  },
  row: {
    justifyContent: 'space-between',
  },
}); 