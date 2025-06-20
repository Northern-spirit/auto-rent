import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useStore } from '../store/useStore';
import { Button } from '../components/Button';
import { DateTimePickerModal } from '../components/DateTimePickerModal';

export default function BookingConfirmationScreen() {
    const router = useRouter();
    const { carId } = useLocalSearchParams();
    const { cars, createBooking } = useStore();
    const [showDateTimePicker, setShowDateTimePicker] = useState(false);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    const car = cars.find(c => c.id === carId);

    if (!car) {
        return (
            <View style={styles.container}>
                <Text>Автомобиль не найден</Text>
            </View>
        );
    }

    const handleDateTimeSave = (start: Date, end: Date) => {
        setStartDate(start);
        setEndDate(end);
    };

    const handleConfirmBooking = () => {
        if (startDate && endDate) {
            createBooking(car.id);
            router.push('/(tabs)/messages');
        }
    };

    const formatDateTime = (date: Date) => {
        return date.toLocaleString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getRentalDuration = () => {
        if (!startDate || !endDate) return 0;
        const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
        const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
        return diffHours;
    };

    const getTotalPrice = () => {
        const duration = getRentalDuration();
        const hoursPerDay = 24;
        const days = Math.ceil(duration / hoursPerDay);
        return car.price * days;
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.title}>Подтверждение бронирования</Text>
            </View>

            <View style={styles.carInfo}>
                <Image source={{ uri: car.image }} style={styles.carImage} />
                <View style={styles.carDetails}>
                    <Text style={styles.carTitle}>{car.title}</Text>
                    <Text style={styles.carPrice}>{car.priceDisplay}</Text>
                    <Text style={styles.carCharacteristics}>
                        {car.age} лет • {car.acceleration}с до 100км/ч • {car.horsepower} л.с.
                    </Text>
                </View>
            </View>

            <View style={styles.dateTimeSection}>
                <Text style={styles.sectionTitle}>Выберите время аренды</Text>
                
                <TouchableOpacity 
                    style={styles.dateTimeButton}
                    onPress={() => setShowDateTimePicker(true)}
                >
                    <Ionicons name="calendar" size={20} color="#007AFF" />
                    <Text style={styles.dateTimeButtonText}>
                        {startDate && endDate 
                            ? `${formatDateTime(startDate)} - ${formatDateTime(endDate)}`
                            : 'Выбрать дату и время'
                        }
                    </Text>
                </TouchableOpacity>

                {startDate && endDate && (
                    <View style={styles.durationInfo}>
                        <Text style={styles.durationText}>
                            Продолжительность: {getRentalDuration()} часов
                        </Text>
                        <Text style={styles.totalPrice}>
                            Итого: {getTotalPrice().toLocaleString()} ₽
                        </Text>
                    </View>
                )}
            </View>

            <View style={styles.ownerInfo}>
                <Text style={styles.sectionTitle}>Информация о владельце</Text>
                <Text style={styles.ownerName}>{car.ownerName}</Text>
            </View>

            <View style={styles.confirmButtonContainer}>
                <Button 
                    title="Подтвердить бронирование"
                    onPress={handleConfirmBooking}
                    disabled={!startDate || !endDate}
                    style={styles.confirmButton}
                />
            </View>

            

            <DateTimePickerModal
                visible={showDateTimePicker}
                onClose={() => setShowDateTimePicker(false)}
                onSave={handleDateTimeSave}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5',
    },
    backButton: {
        marginRight: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
    },
    carInfo: {
        flexDirection: 'row',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5',
    },
    carImage: {
        width: 80,
        height: 60,
        borderRadius: 8,
        marginRight: 16,
    },
    carDetails: {
        flex: 1,
    },
    carTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 4,
    },
    carPrice: {
        fontSize: 16,
        color: '#007AFF',
        fontWeight: '600',
        marginBottom: 4,
    },
    carCharacteristics: {
        fontSize: 14,
        color: '#666',
    },
    dateTimeSection: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 16,
    },
    dateTimeButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderWidth: 1,
        borderColor: '#007AFF',
        borderRadius: 8,
        marginBottom: 16,
    },
    dateTimeButtonText: {
        marginLeft: 8,
        fontSize: 16,
        color: '#007AFF',
    },
    durationInfo: {
        backgroundColor: '#F8F9FA',
        padding: 16,
        borderRadius: 8,
    },
    durationText: {
        fontSize: 16,
        marginBottom: 8,
    },
    totalPrice: {
        fontSize: 18,
        fontWeight: '600',
        color: '#007AFF',
    },
    ownerInfo: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5',
    },
    ownerName: {
        fontSize: 16,
        color: '#333',
    },
    confirmButtonContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    confirmButton: {
        width: 263,
    },
}); 