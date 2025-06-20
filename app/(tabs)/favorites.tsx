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
      style={styles.card}
      onPress={() => router.push(`/car/${item.id}`)}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: item.image }}
          style={styles.image}
        />
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
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.price}>{item.priceDisplay}</Text>
      
      <View style={styles.characteristics}>
        <Text style={styles.characteristicText}>
          {item.age} лет • {item.acceleration}с до 100км/ч • {item.horsepower} л.с.
        </Text>
      </View>
      
      <View style={styles.footer}>
        <View style={styles.rating}>
          <Image 
            source={getRatingImage(item.rating)} 
            style={styles.ratingImage}
            resizeMode="contain"
          />
          <Text style={styles.ratingText}>{item.rating}</Text>
          <Text style={styles.reviewsCount}>({item.reviewsCount})</Text>
        </View>
        <Text style={styles.distance}>{item.distance}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
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
  emptyText: {
    marginTop: 16,
    fontSize: 16,
    color: '#8E8E93',
    textAlign: 'center',
  },
  list: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  heartButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    padding: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 12,
    marginHorizontal: 16,
  },
  price: {
    fontSize: 16,
    color: '#007AFF',
    marginTop: 4,
    marginHorizontal: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,
    marginHorizontal: 16,
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