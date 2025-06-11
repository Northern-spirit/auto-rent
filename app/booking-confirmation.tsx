import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
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

    const getProgressWidth = () => {
        const duration = getRentalDuration();
        const maxDuration = 96; // 4 дня в часах
        return Math.min((duration / maxDuration) * 100, 100);
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>
            </View>

            <View style={styles.content}>
                <Text style={styles.title}>Почти готово</Text>
                <Text style={styles.subtitle}>
                    Эта машина доступна для аренды от 1 часа до 4 дней
                </Text>

                <Text style={styles.dateTitle}>Выберите дату начала и окончания аренды</Text>

                <View style={styles.dateInputsContainer}>
                    <TouchableOpacity 
                        style={styles.dateInput}
                        onPress={() => setShowDateTimePicker(true)}
                    >
                        <Text style={styles.dateInputLabel}>От</Text>
                        <Text style={styles.dateInputValue}>
                            {startDate ? formatDateTime(startDate) : 'Выберите время'}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.dateInput}
                        onPress={() => setShowDateTimePicker(true)}
                    >
                        <Text style={styles.dateInputLabel}>До</Text>
                        <Text style={styles.dateInputValue}>
                            {endDate ? formatDateTime(endDate) : 'Выберите время'}
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.progressContainer}>
                    <View style={styles.progressBar}>
                        <View 
                            style={[
                                styles.progressFill,
                                { width: `${getProgressWidth()}%` }
                            ]} 
                        />
                    </View>
                    <View style={styles.progressLabels}>
                        <Text style={styles.progressLabel}>1 ч</Text>
                        <Text style={styles.progressLabel}>4д</Text>
                    </View>
                </View>
            </View>

            <View style={styles.footer}>
                <Button 
                    title="Подтвердить бронирование" 
                    onPress={handleConfirmBooking}
                    disabled={!startDate || !endDate}
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
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E2E2E2',
    },
    backButton: {
        padding: 4,
    },
    content: {
        padding: 16,
        flex: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 32,
    },
    dateTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 16,
    },
    dateInputsContainer: {
        marginBottom: 32,
    },
    dateInput: {
        borderWidth: 1,
        borderColor: '#E2E2E2',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
    },
    dateInputLabel: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
    },
    dateInputValue: {
        fontSize: 16,
        color: '#000',
    },
    progressContainer: {
        marginBottom: 32,
    },
    progressBar: {
        height: 24,
        backgroundColor: '#E2E2E2',
        borderRadius: 12,
        marginBottom: 8,
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#9980FF',
        borderRadius: 12,
    },
    progressLabels: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    progressLabel: {
        fontSize: 14,
        color: '#666',
    },
    footer: {
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#E2E2E2',
    },
}); 