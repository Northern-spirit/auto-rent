import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useStore } from '../../store/useStore';
import CarCard from '../../components/CarCard';
import { FilterModal } from '../../components/FilterModal';
import { SortModal } from '../../components/SortModal';

export default function HomeScreen() {
  const router = useRouter();
  const { getSortedCars, setSortType, sortType, addToFavorites, removeFromFavorites, favorites } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showSort, setShowSort] = useState(false);

  const cars = getSortedCars();
  const filteredCars = cars.filter(car =>
    car.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#8E8E93" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Поиск машины"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity style={styles.iconButton} onPress={() => setShowFilters(true)}>
          <Image
            source={require('../../assets/images/home/filter.png')}
            style={styles.iconButton}
            resizeMode="cover"
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconButton}>
          <Image
            source={require('../../assets/images/home/mapImage.png')}
            style={styles.iconButton}
            resizeMode="cover"
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => router.push('/notifications')}
        >
          <Image
            source={require('../../assets/images/home/notification.png')}
            style={styles.iconButton}
            resizeMode="cover"
          />
        </TouchableOpacity>
      </View>

      {/* Блок 2: Заголовок и сортировка */}
      <View style={styles.titleBlock}>
        <Text style={styles.title}>Объявления</Text>
        <TouchableOpacity style={styles.sortButton} onPress={() => setShowSort(true)}>
          <Image
            source={require('../../assets/images/home/arrowSort.png')}
            style={styles.iconButton}
            resizeMode="cover"
          />
        </TouchableOpacity>
      </View>

      {/* Блок 3: Список объявлений */}
      <FlatList
        data={filteredCars}
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

      <FilterModal
        visible={showFilters}
        onClose={() => setShowFilters(false)}
      />

      <SortModal
        visible={showSort}
        onClose={() => setShowSort(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    paddingTop: 25,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginRight: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  iconButton: {
    padding: 8,
  },
  titleBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  sortButton: {
    padding: 8,
  },
  list: {
    paddingBottom: 16,
  },
  row: {
    justifyContent: 'space-between',
  },
}); 