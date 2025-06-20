import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useStore } from '../store/useStore';

interface CarCardProps {
  car: {
    id: string;
    title: string;
    priceDisplay: string;
    rating: number;
    distance: string;
    image: string;
    age: number;
    acceleration: number;
    horsepower: number;
    reviewsCount: number;
  };
  showFavoriteButton?: boolean;
  onFavoritePress?: () => void;
}

export default function CarCard({ car, showFavoriteButton = true, onFavoritePress }: CarCardProps) {
  const router = useRouter();
  const { favorites } = useStore();
  const isFavorite = favorites.some(fav => fav.id === car.id);

  // Добавляем функцию для определения картинки рейтинга
  const getRatingImage = (rating: number) => {
    if (rating >= 4 && rating <= 5) {
      return require('../assets/images/home/greenCar.png');
    } else if (rating >= 3 && rating < 4) {
      return require('../assets/images/home/yellowCar.png');
    } else {
      return require('../assets/images/home/redCar.png');
    }
  };

  return (
    <TouchableOpacity 
      style={styles.carCard}
      onPress={() => router.push(`/car/${car.id}`)}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: car.image }}
          style={styles.carImage}
        />
        {showFavoriteButton && (
          <TouchableOpacity 
            style={styles.favoriteButton}
            onPress={(e) => {
              e.stopPropagation();
              onFavoritePress?.();
            }}
          >
            <Ionicons 
              name={isFavorite ? "heart" : "heart-outline"} 
              size={24} 
              color={isFavorite ? "#FF3B30" : "#000"} 
            />
          </TouchableOpacity>
        )}
      </View>
      <Text style={styles.carTitle}>{car.title}</Text>
      <Text style={styles.carPrice}>{car.priceDisplay}</Text>
      
      {/* Новый блок с характеристиками */}
      <View style={styles.characteristics}>
        <Text style={styles.characteristicText}>
          {car.age} лет • {car.acceleration}с до 100км/ч • {car.horsepower} л.с.
        </Text>
      </View>
      
      <View style={styles.carFooter}>
        <View style={styles.rating}>
          <Image 
            source={getRatingImage(car.rating)} 
            style={styles.ratingImage}
            resizeMode="contain"
          />
          <Text style={styles.ratingText}>{car.rating}</Text>
          <Text style={styles.reviewsCount}>({car.reviewsCount})</Text>
        </View>
        <Text style={styles.distance}>{car.distance}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
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
  characteristics: {
    marginBottom: 8,
  },
  characteristicText: {
    fontSize: 12,
    color: '#666',
    lineHeight: 16,
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
  ratingImage: {
    width: 20,
    height: 20,
    marginRight: 4,
  },
  ratingText: {
    fontSize: 14,
    color: '#666',
    marginRight: 4,
  },
  reviewsCount: {
    fontSize: 12,
    color: '#999',
  },
  distance: {
    fontSize: 14,
    color: '#666',
  },
}); 