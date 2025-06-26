import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type SortType = 'positive' | 'negative' | 'newest' | 'oldest';

const SORT_OPTIONS = [
    { label: 'Сначала положительные', value: 'positive' as SortType },
    { label: 'Сначала отрицательные', value: 'negative' as SortType },
    { label: 'Сначала новые', value: 'newest' as SortType },
    { label: 'Сначала старые', value: 'oldest' as SortType },
];

interface ReviewSortModalProps {
    visible: boolean;
    onClose: () => void;
    onApply: (sortType: SortType) => void;
    currentSortType: SortType;
}

export default function ReviewSortModal({ visible, onClose, onApply, currentSortType }: ReviewSortModalProps) {
    const [tempSortType, setTempSortType] = useState<SortType>(currentSortType);
    const [slideAnim] = useState(new Animated.Value(330));

    useEffect(() => {
        setTempSortType(currentSortType);
    }, [currentSortType]);

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

    const handleSortOptionPress = (value: SortType) => {
        setTempSortType(value);
    };

    const handleApply = () => {
        onApply(tempSortType);
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
                        <Text style={styles.title}>Тип сортировки</Text>
                        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                            <Ionicons name="close" size={24} color="#000" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.content}>
                        {SORT_OPTIONS.map((option) => (
                            <TouchableOpacity
                                key={option.value}
                                style={styles.radioButton}
                                onPress={() => handleSortOptionPress(option.value)}
                            >
                                <View style={styles.radioCircle}>
                                    {tempSortType === option.value && (
                                        <View style={styles.radioInner} />
                                    )}
                                </View>
                                <Text style={styles.radioLabel}>{option.label}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <View style={styles.footer}>
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
        borderColor: '#007AFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    radioInner: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#007AFF',
    },
    radioLabel: {
        fontSize: 16,
        color: '#333',
    },
    footer: {
        padding: 20,
        paddingTop: 0,
    },
    applyButton: {
        backgroundColor: '#007AFF',
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