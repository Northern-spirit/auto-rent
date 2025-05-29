import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useStore } from '../../store/useStore';

export default function CarDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { getCarById, favorites, addToFavorites, removeFromFavorites, user, createBooking } = useStore();
  
  const car = getCarById(id as string);
  const isFavorite = favorites.some(fav => fav.id === id);

  if (!car) return null;

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFromFavorites(car.id);
    } else {
      addToFavorites(car);
    }
  };

  const handleBookPress = () => {
    if (user.role === 'buyer') {
      createBooking(car.id);
      router.push('/messages');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Ionicons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.favoriteButton}
        onPress={toggleFavorite}
      >
        <Ionicons 
          name={isFavorite ? "heart" : "heart-outline"} 
          size={24} 
          color={isFavorite ? "#FF3B30" : "#000"} 
        />
      </TouchableOpacity>
      
      <Image source={{ uri: car.image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{car.title}</Text>
        <Text style={styles.price}>{car.price}</Text>
        <View style={styles.footer}>
          <View style={styles.rating}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={styles.ratingText}>{car.rating}</Text>
          </View>
          <Text style={styles.distance}>{car.distance}</Text>
        </View>
        <Text style={styles.description}>{car.description}</Text>
      </View>

      {user.role === 'buyer' && (
        <TouchableOpacity 
          style={styles.bookButton}
          onPress={handleBookPress}
        >
          <Text style={styles.bookButtonText}>Забронировать</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 16,
    zIndex: 1,
    padding: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 20,
  },
  favoriteButton: {
    position: 'absolute',
    top: 40,
    right: 16,
    zIndex: 1,
    padding: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 20,
  },
  image: {
    width: '100%',
    height: 300,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 20,
    color: '#007AFF',
    marginTop: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 16,
  },
  distance: {
    color: '#666',
  },
  description: {
    marginTop: 16,
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  bookButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: '#007AFF',
    borderRadius: 0,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  bookButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
}); 