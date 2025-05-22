import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useStore } from '../../store/useStore';

export default function HomeScreen() {
  const router = useRouter();
  const { getSortedCars, setSortType, sortType, addToFavorites, removeFromFavorites, favorites } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  
  const cars = getSortedCars();
  const filteredCars = cars.filter(car => 
    car.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSort = () => {
    const sortOptions = [
      { label: 'По удаленности', value: 'distance' },
      { label: 'По возрастанию цены', value: 'priceAsc' },
      { label: 'По убыванию цены', value: 'priceDesc' },
    ];
    
    // Alert.alert(
    //   'Сортировка',
    //   'Выберите тип сортировки',
    //   sortOptions.map(option => ({
    //     text: option.label,
    //     onPress: () => setSortType(option.value as any),
    //   }))
    // );
  };

  const renderCarItem = ({ item }) => {
    const isFavorite = favorites.some(fav => fav.id === item.id);
    
    return (
      <TouchableOpacity 
        style={styles.carCard}
        onPress={() => router.push(`/car/${item.id}`)}
      >
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: item.image }}
            style={styles.carImage}
          />
          <TouchableOpacity 
            style={styles.favoriteButton}
            onPress={(e) => {
              e.stopPropagation();
              if (isFavorite) {
                removeFromFavorites(item.id);
              } else {
                addToFavorites(item);
              }
            }}
          >
            <Ionicons 
              name={isFavorite ? "heart" : "heart-outline"} 
              size={24} 
              color={isFavorite ? "#FF3B30" : "#000"} 
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.carTitle}>{item.title}</Text>
        <Text style={styles.carPrice}>{item.priceDisplay}</Text>
        <View style={styles.carFooter}>
          <View style={styles.rating}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
          <Text style={styles.distance}>{item.distance}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Блок 1: Поиск и иконки */}
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
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="map" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="notifications" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Блок 2: Заголовок и сортировка */}
      <View style={styles.titleBlock}>
        <Text style={styles.title}>Объявления</Text>
        <TouchableOpacity style={styles.sortButton} onPress={handleSort}>
          <Ionicons name="funnel" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Блок 3: Список объявлений */}
      <FlatList
        data={filteredCars}
        renderItem={renderCarItem}
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
    padding: 16,
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
  carCard: {
    width: '48%',
    marginBottom: 16,
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 8,
  },
  carImage: {
    width: 160,
    height: 116,
    borderRadius: 15,
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    padding: 8,
  },
  carTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  carPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 4,
  },
  carFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#666',
  },
  distance: {
    fontSize: 14,
    color: '#666',
  },
}); 