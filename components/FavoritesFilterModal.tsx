import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button } from './Button';

type FilterType = 'distance' | 'rating' | 'priceDesc' | 'priceAsc';

const FILTER_OPTIONS = [
    { label: 'По удаленности', value: 'distance' as FilterType },
    { label: 'По рейтингу (сначала высокий)', value: 'rating' as FilterType },
    { label: 'Сначала дороже', value: 'priceDesc' as FilterType },
    { label: 'Сначала дешевле', value: 'priceAsc' as FilterType },
];

interface FavoritesFilterModalProps {
    visible: boolean;
    onClose: () => void;
    onApply: (filterType: FilterType) => void;
    currentFilterType: FilterType;
}

export function FavoritesFilterModal({ 
    visible, 
    onClose, 
    onApply, 
    currentFilterType 
}: FavoritesFilterModalProps) {
    const [tempFilterType, setTempFilterType] = useState<FilterType>(currentFilterType);
    const [slideAnim] = useState(new Animated.Value(330));

    useEffect(() => {
        setTempFilterType(currentFilterType);
    }, [currentFilterType]);

    useEffect(() => {
        if (visible) {
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(slideAnim, {
                toValue: 330,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    }, [visible]);

    const handleFilterOptionPress = (value: FilterType) => {
        setTempFilterType(value);
    };

    const handleApply = () => {
        onApply(tempFilterType);
        onClose();
    };

    return (
        <Modal visible={visible} transparent>
            <View style={styles.overlay}>
                <Animated.View 
                    style={[
                        styles.modal,
                        {
                            transform: [{ translateY: slideAnim }]
                        }
                    ]}
                >
                    <View style={styles.header}>
                        <Text style={styles.title}>Фильтры</Text>
                        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                            <Ionicons name="close" size={24} color="#000" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.content}>
                        {FILTER_OPTIONS.map((option) => (
                            <TouchableOpacity
                                key={option.value}
                                style={styles.radioButton}
                                onPress={() => handleFilterOptionPress(option.value)}
                            >
                                <View style={[
                                    styles.radioCircle,
                                    {
                                        borderColor: tempFilterType === option.value ? '#9980FF' : '#E5E5E5'
                                    }
                                ]}>
                                    {tempFilterType === option.value && (
                                        <View style={styles.radioInner} />
                                    )}
                                </View>
                                <Text style={styles.radioLabel}>{option.label}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <View style={styles.footer}>
                        <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                            <Text style={styles.cancelButtonText}>Закрыть</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
                            <Text style={styles.applyButtonText}>Применить</Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    modal: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingBottom: 34,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5',
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
    },
    closeButton: {
        padding: 4,
    },
    content: {
        padding: 20,
    },
    radioButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    radioCircle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#E5E5E5',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
        backgroundColor: '#fff',
    },
    radioInner: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#9980FF',
    },
    radioLabel: {
        fontSize: 16,
        color: '#333',
    },
    footer: {
        flexDirection: 'row',
        padding: 20,
        paddingTop: 0,
        gap: 12,
    },
    cancelButton: {
        flex: 1,
        paddingVertical: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E5E5E5',
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    cancelButtonText: {
        color: '#666',
        fontSize: 16,
        fontWeight: '600',
    },
    applyButton: {
        flex: 1,
        backgroundColor: '#9980FF',
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    applyButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
}); 