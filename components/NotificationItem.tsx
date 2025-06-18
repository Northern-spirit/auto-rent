import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface StatusUpdate {
    from: string;
    to: string;
    timestamp: string;
}

interface Review {
    userPhoto: string;
    userName: string;
    userType: string;
    rating: number;
    carRating: number;
    comment: string;
    timestamp: string;
}

interface NotificationItemProps {
    carImage: string;
    carTitle: string;
    carPrice: number;
    statusUpdates: StatusUpdate[];
    reviews: Review[];
}

export function NotificationItem({ carImage, carTitle, carPrice, statusUpdates, reviews }: NotificationItemProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [rotateAnim] = useState(new Animated.Value(0));

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
        Animated.timing(rotateAnim, {
            toValue: isExpanded ? 0 : 1,
            duration: 200,
            useNativeDriver: true,
        }).start();
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Выполняется':
                return '#BDE3FE';
            case 'На рассмотрении':
                return '#F3F3F3';
            case 'Одобрен':
                return '#BDFECB';
            case 'Завершен':
                return '#F3F3F3';
            case 'Отклонен':
                return '#FFB4B4';
            default:
                return '#666';
        }
    };

    const getStatusTextColor = (backgroundColor: string) => {
        switch (backgroundColor) {
            case '#BDE3FE':
                return '#557B96';
            case '#BDFECB':
                return '#579865';
            case '#F3F3F3':
                return '#878787';
            case '#FFB4B4':
                return '#AE6363';
            default:
                return '#878787';
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.header} onPress={toggleExpanded}>
                <Image source={{ uri: carImage }} style={styles.carImage} />
                <View style={styles.carInfo}>
                    <Text style={styles.carTitle}>{carTitle}</Text>
                    <Text style={styles.carPrice}>{carPrice} ₽/день</Text>
                </View>
                <Animated.View
                    style={[
                        styles.arrow,
                        {
                            transform: [{
                                rotate: rotateAnim.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: ['0deg', '180deg']
                                })
                            }]
                        }
                    ]}
                >
                    <Ionicons name="chevron-down" size={24} color="#666" />
                </Animated.View>
            </TouchableOpacity>

            {isExpanded && (
                <View style={styles.expandedContent}>
                    <View style={styles.statusSection}>
                        {/* <Text style={styles.sectionTitle}>Смена состояния</Text> */}
                        {statusUpdates.map((update, index) => (
                            <View key={index} style={styles.statusItem}>
                                <View style={styles.statusInfo}>
                                    <Text style={styles.statusText}>
                                        <Text style={[
                                            styles.statusBlock, 
                                            {
                                                backgroundColor: getStatusColor(update.from),
                                                color: getStatusTextColor(getStatusColor(update.from))
                                            }
                                        ]}>
                                            {update.from}
                                        </Text>
                                         → 
                                         <Text style={[
                                             styles.statusBlock, 
                                             {
                                                 backgroundColor: getStatusColor(update.to),
                                                 color: getStatusTextColor(getStatusColor(update.to))
                                             }
                                         ]}>
                                             {update.to}
                                         </Text>
                                    </Text>
                                    <Text style={styles.timestamp}>{update.timestamp}</Text>
                                </View>
                                {/* <View style={[styles.statusDot, { backgroundColor: getStatusColor(update.to) }]} /> */}
                            </View>
                        ))}
                    </View>

                    {reviews.map((review, index) => (
                        <View key={index} style={styles.reviewSection}>
                            <Text style={styles.sectionTitle}>Оставлен новый отзыв</Text>
                            <View style={styles.reviewHeader}>
                                <Image source={{ uri: review.userPhoto }} style={styles.userPhoto} />
                                <View style={styles.userInfo}>
                                    <Text style={styles.userName}>{review.userName}</Text>
                                    <Text style={styles.userType}>{review.userType}</Text>
                                    <Text style={styles.ratingContainer}>
                                        4,0
                                        {/* {renderStars(review.rating)} */}
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.carRatingContainer}>
                                <Text style={styles.carRatingLabel}>Оценка машины:</Text>
                                <Text style={styles.carRatingStars}>
                                    5,0
                                    {/* {renderStars(review.carRating)} */}
                                </Text>
                            </View>
                            <Text style={styles.reviewComment}>{review.comment}</Text>
                            <Text style={styles.reviewTimestamp}>{review.timestamp}</Text>
                        </View>
                    ))}
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderRadius: 12,
        marginBottom: 12,
        elevation: 3,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderWidth: 0,
        borderBottomWidth: 0,
        borderBottomColor: 'transparent',
        outlineColor: '#fff'
    },
    carImage: {
        width: 60,
        height: 60,
        borderRadius: 8,
        marginRight: 12,
    },
    carInfo: {
        flex: 1,
    },
    carTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
    },
    carPrice: {
        fontSize: 14,
        color: '#666',
    },
    arrow: {
        padding: 4,
    },
    expandedContent: {
        paddingHorizontal: 16,
        borderTopWidth: 1,
        gap: 16,
        backgroundColor: '#E2E2E270',
    },
    statusSection: {
        gap: 8,
        marginTop: 12
        // marginBottom: 20,
    },
    sectionTitle: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 12,
        color: '#333',
    },
    statusItem: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 8,
        // borderBottomWidth: 1,
        // borderBottomColor: '#F0F0F0',
        padding: 12,
        borderRadius: 20
    },
    statusInfo: {
        flex: 1,
        gap: 16
    },
    statusText: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: 14,
        color: '#333',
        marginBottom: 2,
    },
    statusBlock: {
        padding: 13,
        borderRadius: 20,
    },
    timestamp: {
        fontSize: 12,
        color: '#666',
        display: 'flex',
        justifyContent: 'flex-end',
    },
    statusDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    reviewSection: {
        padding: 12,
        marginBottom: 16,
        backgroundColor: '#fff',
        borderRadius: 20
    },
    reviewHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    userPhoto: {
        width: 40,
        height: 40,
        borderRadius: 15,
        marginRight: 12,
    },
    userInfo: {
        flex: 1,
    },
    userName: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 2,
    },
    userType: {
        fontSize: 12,
        color: '#666',
        marginBottom: 4,
    },
    ratingContainer: {
        flexDirection: 'row',
    },
    carRatingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    carRatingLabel: {
        fontSize: 14,
        color: '#666',
        marginRight: 8,
    },
    carRatingStars: {
        flexDirection: 'row',
    },
    reviewComment: {
        fontSize: 14,
        color: '#333',
        lineHeight: 20,
        marginBottom: 8,
    },
    reviewTimestamp: {
        fontSize: 12,
        color: '#666',
    },
}); 