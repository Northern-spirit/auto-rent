import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { NotificationItem } from '../components/NotificationItem';

const mockNotifications = [
    {
        carImage: 'https://avatars.mds.yandex.net/get-verba/787013/2a00000163d68e1bc2da6042f7438f626da8/cattouchret',
        carTitle: 'BMW X5 2023',
        carPrice: 5000,
        statusUpdates: [
            {
                from: 'Выполняется',
                to: 'Завершен',
                timestamp: '12:31 20.11.2024'
            },
            {
                from: 'Одобрен',
                to: 'Выполняется',
                timestamp: '14:15 20.11.2024'
            },
            {
                from: 'На рассмотрении',
                to: 'Одобрен',
                timestamp: '14:15 20.11.2024'
            },
            {
                from: 'На рассмотрении',
                to: 'Отклонен',
                timestamp: '14:15 20.11.2024'
            }
        ],
        reviews: [
            {
                userPhoto: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSXhSzkvMUoGwMYqTFzxIDrFeYzKWt-a8-zwuQbOLNqD09pm8lSZzuwgArk4U4OTPlaXpPXcLno82nowcd0ZRJYuw',
                userName: 'Александр Петров',
                userType: 'Юр лицо',
                rating: 5,
                carRating: 5,
                comment: 'Тачка просто улет! Обязательно возьму еще раз покататься!',
                timestamp: '16:45 20.11.2024'
            }
        ]
    },
    {
        carImage: 'https://avatars.mds.yandex.net/get-verba/787013/2a00000190ba929fe36ec6c6fb366b130924/cattouchret',
        carTitle: 'Mercedes-Benz C-Class',
        carPrice: 3500,
        statusUpdates: [
            {
                from: 'Выполняется',
                to: 'Завершен',
                timestamp: '10:20 19.11.2024'
            }
        ],
        reviews: []
    }
];

export default function NotificationsScreen() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.title}>Уведомления</Text>
            </View>

            {/* Notifications List */}
            <ScrollView style={styles.content}>
                {mockNotifications.map((notification, index) => (
                    <NotificationItem
                        key={index}
                        carImage={notification.carImage}
                        carTitle={notification.carTitle}
                        carPrice={notification.carPrice}
                        statusUpdates={notification.statusUpdates}
                        reviews={notification.reviews}
                    />
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#E2E2E2',
    },
    backButton: {
        marginRight: 16,
        padding: 4,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    content: {
        flex: 1,
        padding: 16,
    },
}); 