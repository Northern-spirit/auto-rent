import React from 'react';
import { View, FlatList, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useStore } from '../../store/useStore';

export default function FavoritesScreen() {
  const router = useRouter();
  const { favorites, removeFromFavorites } = useStore();

  if (!favorites || favorites.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.emptyContainer}>
          <Ionicons name="heart-outline" size={64} color="#8E8E93" />
          <Text style={styles.emptyText}>В избранном пока ничего нет</Text>
        </View>
      </View>
    );
  }

  const getRatingImage = (rating: number) => {
    if (rating >= 4 && rating <= 5) {
      return require('../../assets/images/home/greenCar.png');
    } else if (rating >= 3 && rating < 4) {
      return require('../../assets/images/home/yellowCar.png');
    } else {
      return require('../../assets/images/home/redCar.png');
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

        {/* <View style={styles.characteristics}>
          <Text style={styles.characteristicText}>
            {item.age} лет • {item.acceleration}с до 100км/ч • {item.horsepower} л.с.
          </Text>
        </View> */}

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
            <Text style={styles.buttonText}>Забронироватьы</Text>
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

  return (
    <View style={styles.container}>
      <Text style={styles.titlePage}>Избранное</Text>
      <View>Фильтры</View>
      <FlatList
        data={favorites}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
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
}); 