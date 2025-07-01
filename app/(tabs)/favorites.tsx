import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useStore } from '../../store/useStore';
import { FavoritesFilterModal } from '../../components/FavoritesFilterModal';

type FilterType = 'distance' | 'rating' | 'priceDesc' | 'priceAsc';

export default function FavoritesScreen() {
  const router = useRouter();
  const { favorites, removeFromFavorites } = useStore();
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filterType, setFilterType] = useState<FilterType>('distance');

  const getRatingImage = (rating: number) => {
    if (rating >= 4 && rating <= 5) {
      return require('../../assets/images/home/greenCar.png');
    } else if (rating >= 3 && rating < 4) {
      return require('../../assets/images/home/yellowCar.png');
    } else {
      return require('../../assets/images/home/redCar.png');
    }
  };

  const filteredAndSortedFavorites = useMemo(() => {
    let result = [...favorites];

    switch (filterType) {
      case 'distance':
        result.sort((a, b) => a.distanceValue - b.distanceValue);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'priceDesc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'priceAsc':
        result.sort((a, b) => a.price - b.price);
        break;
    }

    return result;
  }, [favorites, filterType]);

  const getFilterButtonText = () => {
    switch (filterType) {
      case 'distance':
        return 'По удаленности';
      case 'rating':
        return 'По рейтингу';
      case 'priceDesc':
        return 'Сначала дороже';
      case 'priceAsc':
        return 'Сначала дешевле';
      default:
        return 'Фильтры';
    }
  };

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      onPress={() => router.push(`/car/${item.id}`)}
      style={styles.card}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: item.image }}
          style={styles.image}
        />
      </View>
      <View style={styles.infoContainer}>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>{item.priceDisplay}</Text>


        <View style={styles.footer}>
          <View style={styles.rating}>
            <Text style={styles.ratingText}>{item.rating}</Text>
            <Image
              source={getRatingImage(item.rating)}
              style={styles.ratingImage}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.distance}>{item.distance}</Text>
        </View>
        <View style={styles.buttonContainerWrapper}>
          <TouchableOpacity style={styles.buttonContainer} onPress={() => router.push(`/car/${item.id}`)}>
            <Text style={styles.buttonText}>Забронировать</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.heartButton}
            onPress={(e) => {
              e.stopPropagation();
              removeFromFavorites(item.id);
            }}
          >
            <Ionicons name="heart" size={24} color="#FF3B30" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  const handleApplyFilter = (newFilterType: FilterType) => {
    setFilterType(newFilterType);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titlePage}>Избранное</Text>
      <TouchableOpacity 
        style={styles.filterButton}
        onPress={() => setShowFilterModal(true)}
      >
        <Image source={require('../../assets/images/home/arrowSort.png')} style={styles.filterImage} />
        <Text style={styles.filterText}>{getFilterButtonText()}</Text>
      </TouchableOpacity>
      <FlatList
        data={filteredAndSortedFavorites}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />

      <FavoritesFilterModal
        visible={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        onApply={handleApplyFilter}
        currentFilterType={filterType}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  titlePage: {
    fontSize: 36,
    fontWeight: '700',
    marginHorizontal: 20,
    marginTop: 14,
  },
  emptyText: {
    marginTop: 16,
    fontSize: 16,
    color: '#8E8E93',
    textAlign: 'center',
  },
  list: {
    padding: 16,
  },
  infoContainer: {
    flex: 1,
    overflow: 'hidden',
  },
  card: {
    marginBottom: 16,
    flexDirection: 'row',
  },
  buttonContainerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

  },
  buttonContainer: {
    flexDirection: 'row',
    width: 101,
    height: 24,
    backgroundColor: '#9980FF',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 12,
  },
  buttonText: {
    fontSize: 10,
    fontWeight: '600',
    color: 'white',
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: 181,
    height: 130,
    borderRadius: 20,
  },
  heartButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: '400',
    marginTop: 11,
    marginHorizontal: 12,
    maxWidth: 181,
  },
  price: {
    fontSize: 14,
    color: 'black',
    fontWeight: '800',
    marginTop: 4,
    marginHorizontal: 12,
  },
  footer: {
    flexDirection: 'column',
    marginTop: 8,
    marginBottom: 6,
    marginHorizontal: 12,
  },
  rating: {
    gap: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    color: '#666',
  },
  distance: {
    fontSize: 14,
    color: '#666',
  },
  characteristics: {
    marginBottom: 8,
  },
  characteristicText: {
    marginLeft: 16,
    fontSize: 12,
    color: '#666',
    lineHeight: 16,
  },
  ratingImage: {
    width: 20,
    height: 20,
    marginRight: 4,
  },
  reviewsCount: {
    fontSize: 12,
    marginLeft: 4,
    color: '#999',
  },
  filterText: {
    fontSize: 10,
    fontWeight: '500',
    color: 'black',
    position: 'relative',
    top: 1,
  },
  filterButton: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginHorizontal: 16,
    marginTop: 16,
  },
  filterImage: {
    alignItems: 'center',
    width: 9,
    height: 9,
  },
  
}); 