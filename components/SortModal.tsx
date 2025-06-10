import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useStore } from '../store/useStore';
import { Button } from './Button';

type SortType = 'distance' | 'priceAsc' | 'priceDesc' | 'rating';

const SORT_OPTIONS = [
    { label: 'По удаленности', value: 'distance' as SortType },
    { label: 'Подешевле', value: 'priceAsc' as SortType },
    { label: 'Подороже', value: 'priceDesc' as SortType },
    { label: 'По рейтингу', value: 'rating' as SortType },
];

export function SortModal({ visible, onClose }: { visible: boolean, onClose: () => void }) {
    const { sortType, setSortType } = useStore();
    const [tempSortType, setTempSortType] = useState<SortType | null>(sortType);
    const [slideAnim] = useState(new Animated.Value(330));

    useEffect(() => {
        setTempSortType(sortType);
    }, [sortType]);

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
        if (tempSortType) {
            setSortType(tempSortType);
        }
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
                        <Button title="Применить" onPress={handleApply} />
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
        height: 330,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    closeButton: {
        padding: 4,
    },
    content: {
        flex: 1,
    },
    radioButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    radioCircle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#9980FF',
        marginRight: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    radioInner: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#9980FF',
    },
    radioLabel: {
        fontSize: 16,
        color: '#000',
    },
    footer: {
        marginTop: 16,
    },
}); 