import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { useStore } from '../store/useStore';
import { Button } from './Button';

type CarType = 'Седан' | 'Купе' | 'Хатчбек' | 'Пикап' | 'Универсал' | 'Внедорожник';
const CAR_TYPES = ['Седан', 'Купе', 'Хатчбек', 'Пикап', 'Универсал', 'Внедорожник'] as const;

export function FilterModal({ visible, onClose }: { visible: boolean, onClose: () => void }) {
    const { filters, setFilters } = useStore();
    const [tempFilters, setTempFilters] = useState(filters);

    useEffect(() => {
        setTempFilters(filters);
    }, [filters]);

    const handleCarTypePress = (type: string) => {
        const newTypes = tempFilters.carTypes.includes(type as CarType)
            ? tempFilters.carTypes.filter(t => t !== type)
            : [...tempFilters.carTypes, type];

        setTempFilters(prev => ({ ...prev, carTypes: newTypes as CarType[] }));
    };

    const handlePriceChange = (values: number[]) => {
        setTempFilters(prev => ({
            ...prev,
            priceRange: {
                min: values[0],
                max: values[1]
            }
        }));
    };

    const handleDistanceChange = (value: number) => {
        setTempFilters(prev => ({ ...prev, distance: value }));
    };

    const handleApply = () => {
        setFilters(tempFilters);
        onClose();
    };

    return (
        <Modal visible={visible} animationType="slide">
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={onClose} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color="#000" />
                    </TouchableOpacity>
                    <Text style={styles.title}>Фильтры</Text>
                </View>

                <ScrollView style={styles.content}>
                    <Text style={styles.subtitle}>Тип автомобиля</Text>
                    <View style={styles.carTypesContainer}>
                        {CAR_TYPES.map((type) => (
                            <TouchableOpacity
                                key={type}
                                style={[
                                    styles.carTypeButton,
                                    tempFilters.carTypes.includes(type) && styles.carTypeButtonActive
                                ]}
                                onPress={() => handleCarTypePress(type)}
                            >
                                <Text style={[
                                    styles.carTypeText,
                                    tempFilters.carTypes.includes(type) && styles.carTypeTextActive
                                ]}>
                                    {type}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <Text style={styles.subtitle}>Цена</Text>
                    <View style={styles.priceInputsContainer}>
                        <View style={styles.priceInputWrapper}>
                            <Text style={styles.priceLabel}>От:</Text>
                            <TextInput
                                style={styles.priceInput}
                                value={`${tempFilters.priceRange.min} р`}
                                keyboardType="numeric"
                                onChangeText={(value) => {
                                    const numValue = parseInt(value.replace(/[^0-9]/g, ''));
                                    if (!isNaN(numValue)) {
                                        setTempFilters(prev => ({
                                            ...prev,
                                            priceRange: {
                                                ...prev.priceRange,
                                                min: Math.min(numValue, prev.priceRange.max)
                                            }
                                        }));
                                    }
                                }}
                            />
                        </View>
                        <View style={styles.priceInputWrapper}>
                            <Text style={styles.priceLabel}>До:</Text>
                            <TextInput
                                style={styles.priceInput}
                                value={`${tempFilters.priceRange.max} р`}
                                keyboardType="numeric"
                                onChangeText={(value) => {
                                    const numValue = parseInt(value.replace(/[^0-9]/g, ''));
                                    if (!isNaN(numValue)) {
                                        setTempFilters(prev => ({
                                            ...prev,
                                            priceRange: {
                                                ...prev.priceRange,
                                                max: Math.max(numValue, prev.priceRange.min)
                                            }
                                        }));
                                    }
                                }}
                            />
                        </View>
                    </View>

                    <View style={styles.sliderContainer}>
                        <MultiSlider
                            values={[tempFilters.priceRange.min, tempFilters.priceRange.max]}
                            sliderLength={280}
                            onValuesChange={handlePriceChange}
                            min={3000}
                            max={10000}
                            step={100}
                            allowOverlap={false}
                            snapped
                            selectedStyle={{
                                backgroundColor: '#9980FF',
                            }}
                            unselectedStyle={{
                                backgroundColor: '#E2E2E270',
                            }}
                            containerStyle={{
                                height: 40,
                            }}
                            trackStyle={{
                                height: 8,
                                backgroundColor: '#E2E2E270',
                            }}
                            markerStyle={{
                                height: 24,
                                width: 24,
                                backgroundColor: '#9980FF',
                            }}
                            pressedMarkerStyle={{
                                height: 28,
                                width: 28,
                                backgroundColor: '#9980FF',
                            }}
                        />
                    </View>

                    <Text style={styles.subtitle}>Местоположение</Text>
                    <View style={styles.locationContainer}>
                        <Text style={styles.locationText}>Искать в</Text>
                        <TextInput
                            style={styles.distanceInput}
                            value={`${tempFilters.distance}км`}
                            keyboardType="numeric"
                            onChangeText={(value) => {
                                const numValue = parseInt(value.replace(/[^0-9]/g, ''));
                                if (!isNaN(numValue)) {
                                    handleDistanceChange(numValue);
                                }
                            }}
                        />
                        <Text style={styles.locationText}>от местоположения</Text>
                    </View>
                </ScrollView>

                <View style={styles.footer}>
                    <Button title="Применить" onPress={handleApply} />
                </View>
            </View>
        </Modal>
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
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E2E2E2',
    },
    backButton: {
        marginRight: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    content: {
        flex: 1,
        padding: 16,
    },
    subtitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 16,
    },
    carTypesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginBottom: 24,
    },
    carTypeButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#9980FF',
    },
    carTypeButtonActive: {
        backgroundColor: '#9980FF',
    },
    carTypeText: {
        color: '#9980FF',
    },
    carTypeTextActive: {
        color: '#fff',
    },
    priceInputsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    priceInputWrapper: {
        flex: 1,
        marginHorizontal: 8,
    },
    priceLabel: {
        marginBottom: 4,
        color: '#666',
    },
    priceInput: {
        borderWidth: 1,
        borderColor: '#E2E2E2',
        borderRadius: 8,
        padding: 8,
    },
    sliderContainer: {
        alignItems: 'center',
        marginVertical: 16,
        paddingHorizontal: 16,
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 11,
    },
    locationText: {
        color: '#666',
    },
    distanceInput: {
        borderWidth: 1,
        borderColor: '#E2E2E2',
        borderRadius: 8,
        padding: 8,
        marginHorizontal: 8,
        width: 80,
    },
    footer: {
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#E2E2E2',
    },
}); 