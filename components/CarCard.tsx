import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useStore } from '../store/useStore';

interface Car {
  id: string;
  title: string;
  price: string;
  priceDisplay: string;
  rating: number;
  distance: string;
  image: string;
}

interface CarCardProps {
  car: Car;
  showFavoriteButton?: boolean;
  onFavoritePress?: () => void;
}

export default function CarCard({ car, showFavoriteButton = true, onFavoritePress }: CarCardProps) {
  const router = useRouter();
  const { favorites } = useStore();
  const isFavorite = favorites.some(fav => fav.id === car.id);

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
      <View style={styles.carFooter}>
        <View style={styles.rating}>
          <Ionicons name="star" size={16} color="#FFD700" />
          <Text style={styles.ratingText}>{car.rating}</Text>
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