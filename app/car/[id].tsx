import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const MOCK_CARS = {
  '1': {
    id: '1',
    title: 'BMW X5',
    price: '5000 ₽/сутки',
    rating: 4.8,
    distance: '2.5 км',
    image: 'https://example.com/car1.jpg',
    description: 'Отличный автомобиль в идеальном состоянии',
  },
  '2': {
    id: '2',
    title: 'Mercedes-Benz C-Class',
    price: '4500 ₽/сутки',
    rating: 4.9,
    distance: '3.1 км',
    image: 'https://example.com/car2.jpg',
    description: 'Комфортный седан для поездок по городу',
  },
};

export default function CarDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const car = MOCK_CARS[id];

  if (!car) return null;

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Ionicons name="arrow-back" size={24} color="#000" />
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
}); 