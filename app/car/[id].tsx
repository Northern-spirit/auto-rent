import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useStore } from '../../store/useStore';

export default function CarDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { cars, user, addToFavorites, removeFromFavorites, favorites } = useStore();
  
  const car = cars.find(c => c.id === id);
  const isFavorite = favorites.some(fav => fav.id === car?.id);

  const getRatingImage = (rating: number) => {
    if (rating >= 4 && rating <= 5) {
      return require('../../assets/images/home/greenCar.png');
    } else if (rating >= 3 && rating < 4) {
      return require('../../assets/images/home/yellowCar.png');
    } else {
      return require('../../assets/images/home/redCar.png');
    }
  };

  const toggleFavorite = () => {
    if (car) {
      if (isFavorite) {
        removeFromFavorites(car.id);
      } else {
        addToFavorites(car);
      }
    }
  };

  const handleBookPress = () => {
    if (car) {
      // Перенаправляем на страницу подтверждения бронирования
      router.push(`/booking-confirmation?carId=${car.id}`);
    }
  };

  if (!car) {
    return (
      <View style={styles.container}>
        <Text>Автомобиль не найден</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerButtons}>
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
      </View>
      
      <Image source={{ uri: car.image }} style={styles.image} />
      
      <View style={styles.content}>
        <Text style={styles.title}>{car.title}</Text>
        
        <View style={styles.characteristicsBlock}>
          <Text style={styles.characteristicsText}>
            {car.age} лет • {car.acceleration}с до 100км/ч • {car.horsepower} л.с.
          </Text>
        </View>
        
        <Text style={styles.price}>{car.priceDisplay}</Text>
        
        <Text style={styles.description}>{car.description}</Text>
        
        <View style={styles.ownerBlock}>
          <Text style={styles.ownerLabel}>Владелец:</Text>
          <Text style={styles.ownerName}>{car.ownerName}</Text>
        </View>
        
        <View style={styles.ratingBlock}>
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>{car.rating.toFixed(1)}</Text>
            <Image 
              source={getRatingImage(car.rating)} 
              style={styles.ratingImage}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.reviewsCount}>{car.reviewsCount} отзывов</Text>
        </View>
        
        {/* Блок 9: Дополнительные характеристики */}
        <View style={styles.detailsBlock}>
          <Text style={styles.detailsTitle}>Характеристики</Text>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Год выпуска:</Text>
            <Text style={styles.detailValue}>{car.year}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Пробег:</Text>
            <Text style={styles.detailValue}>{car.mileage.toLocaleString()} км</Text>
          </View>
        </View>

        {/* Блок 10: Кнопка бронирования */}
        {user.role === 'buyer' && (
          <TouchableOpacity 
            style={styles.bookButton}
            onPress={handleBookPress}
          >
            <Text style={styles.bookButtonText}>Забронировать</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerButtons: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 1,
  },
  backButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    padding: 8,
  },
  favoriteButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    padding: 8,
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  characteristicsBlock: {
    marginBottom: 16,
  },
  characteristicsText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 22,
  },
  price: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    marginBottom: 20,
  },
  ownerBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  ownerLabel: {
    fontSize: 16,
    color: '#666',
    marginRight: 8,
  },
  ownerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  ratingBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
    gap: 4,
  },
  ratingImage: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  ratingText: {
    fontSize: 20,
    fontWeight: '400',
    color: '#666',
  },
  reviewsCount: {
    fontSize: 16,
    color: 'black',
  },
  detailsBlock: {
    marginBottom: 30,
  },
  detailsTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    color: '#333',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 8,
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 16,
    color: '#666',
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  bookButton: {
    backgroundColor: '#9980FF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
}); 