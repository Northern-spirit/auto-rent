import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, FlatList } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useStore } from '../../../store/useStore';
import ReviewSortModal from '../../../components/ReviewSortModal';

export default function ReviewsScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const { getReviewsByCarId, getAverageRatingByCarId } = useStore();
    const [showSortModal, setShowSortModal] = useState(false);
    const [sortType, setSortType] = useState<'positive' | 'negative' | 'newest' | 'oldest'>('positive');

    const reviews = getReviewsByCarId(id as string);
    const averageRating = getAverageRatingByCarId(id as string);

    const getRatingImage = (rating: number) => {
        if (rating >= 4 && rating <= 5) {
            return require('../../../assets/images/home/greenCar.png');
        } else if (rating >= 3 && rating < 4) {
            return require('../../../assets/images/home/yellowCar.png');
        } else {
            return require('../../../assets/images/home/redCar.png');
        }
    };

    const getSortedReviews = () => {
        let filteredReviews = [...reviews];

        switch (sortType) {
            case 'positive':
                return filteredReviews.filter(review => review.carRating >= 4).sort((a, b) => b.carRating - a.carRating);
            case 'negative':
                return filteredReviews.filter(review => review.carRating < 4).sort((a, b) => a.carRating - b.carRating);
            case 'newest':
                return filteredReviews.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
            case 'oldest':
                return filteredReviews.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
            default:
                return filteredReviews;
        }
    };

    const getSortButtonText = () => {
        switch (sortType) {
            case 'positive':
                return 'Сначала положительные';
            case 'negative':
                return 'Сначала отрицательные';
            case 'newest':
                return 'Сначала новые';
            case 'oldest':
                return 'Сначала старые';
            default:
                return 'Сортировка';
        }
    };

    const renderReview = ({ item }) => (
        <View style={styles.reviewCard}>
            <View style={styles.reviewHeader}>
                <Image source={{ uri: item.userPhoto }} style={styles.userPhoto} />
                <View style={styles.ratingContainer}>
                    <Text style={styles.ratingText}>{item.carRating},0</Text>
                    <Image
                        source={getRatingImage(item.carRating)}
                        style={styles.ratingImage}
                        resizeMode="contain"
                    />
                </View>
            </View>

            <Text style={styles.reviewComment}>{item.comment}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.title}>Отзывы</Text>
            </View>

            <View style={styles.ratingBlock}>
                <Text style={styles.averageRating}>{averageRating}</Text>
                <View style={styles.ratingImageContainer}>
                    <Image
                        source={getRatingImage(parseFloat(averageRating))}
                        style={styles.carRatingImage}
                        resizeMode="contain"
                    />
                </View>
            </View>

            <View style={styles.filterBlock}>
                <TouchableOpacity
                    style={styles.sortButton}
                    onPress={() => setShowSortModal(true)}
                >
                    <Text style={styles.sortButtonText}>{getSortButtonText()}</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={getSortedReviews()}
                renderItem={renderReview}
                keyExtractor={item => item.id}
                style={styles.reviewsList}
                showsVerticalScrollIndicator={false}
            />

            <ReviewSortModal
                visible={showSortModal}
                onClose={() => setShowSortModal(false)}
                onApply={setSortType}
                currentSortType={sortType}
            />
        </View>
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
    },
    backButton: {
        marginRight: 16,
    },
    title: {
        fontSize: 36,
        fontWeight: '700',
    },
    ratingBlock: {
        flexDirection: 'row',
        gap: 6,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 23,
    },
    ratingInfo: {
        flex: 1,
    },
    averageRating: {
        fontSize: 64,
        fontWeight: '300',
        color: '#333',
    },
    ratingImageContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    ratingLabel: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
    carRatingImage: {
        width: 30,
        height: 30,
        marginTop: 20,
    },
    filterBlock: {
        padding: 20,
    },
    sortButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
    },
    sortButtonText: {
        fontSize: 16,
        color: '#333',
    },
    reviewsList: {
        flex: 1,
        paddingHorizontal: 20,
    },
    reviewCard: {
        backgroundColor: '#F8F9FA',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
    },
    reviewHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    userPhoto: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 12,
    },
    userInfo: {
        flex: 1,
    },
    userName: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 2,
    },
    userType: {
        fontSize: 12,
        color: '#666',
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingText: {
        fontSize: 16,
        fontWeight: '600',
        marginRight: 8,
    },
    ratingImage: {
        width: 24,
        height: 24,
    },
    reviewComment: {
        fontSize: 14,
        color: '#333',
        lineHeight: 20,
        marginBottom: 8,
    },
    reviewTimestamp: {
        fontSize: 12,
        color: '#999',
    },
}); 