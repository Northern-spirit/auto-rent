import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button } from './Button';
import { Calendar, DateObject, MarkedDates } from 'react-native-calendars';

interface DateTimePickerModalProps {
    visible: boolean;
    onClose: () => void;
    onSave: (startDate: Date, endDate: Date) => void;
}

export function DateTimePickerModal({ visible, onClose, onSave }: DateTimePickerModalProps) {
    const [range, setRange] = useState<{ startDate: string | null, endDate: string | null }>({
        startDate: null,
        endDate: null,
    });
    const [selectedStartHour, setSelectedStartHour] = useState(10);
    const [selectedStartMinute, setSelectedStartMinute] = useState(0);
    const [selectedEndHour, setSelectedEndHour] = useState(18);
    const [selectedEndMinute, setSelectedEndMinute] = useState(0);

    const hours = Array.from({ length: 24 }, (_, i) => i);
    const minutes = Array.from({ length: 60 }, (_, i) => i);

    // Формируем выделение диапазона для календаря
    const getMarkedDates = (): MarkedDates => {
        const marked: MarkedDates = {};
        if (range.startDate && !range.endDate) {
            marked[range.startDate] = { startingDay: true, endingDay: true, color: '#9980FF', textColor: '#fff' };
        }
        if (range.startDate && range.endDate) {
            let start = new Date(range.startDate);
            let end = new Date(range.endDate);
            if (start > end) [start, end] = [end, start];
            let current = new Date(start);
            while (current <= end) {
                const dateStr = current.toISOString().split('T')[0];
                marked[dateStr] = {
                    color: '#9980FF',
                    textColor: '#fff',
                    startingDay: dateStr === start.toISOString().split('T')[0],
                    endingDay: dateStr === end.toISOString().split('T')[0],
                };
                current.setDate(current.getDate() + 1);
            }
        }
        return marked;
    };

    const handleDayPress = (day: DateObject) => {
        if (!range.startDate || (range.startDate && range.endDate)) {
            setRange({ startDate: day.dateString, endDate: null });
        } else if (range.startDate && !range.endDate) {
            if (day.dateString < range.startDate) {
                setRange({ startDate: day.dateString, endDate: range.startDate });
            } else {
                setRange({ startDate: range.startDate, endDate: day.dateString });
            }
        }
    };

    const handleSave = () => {
        if (!range.startDate || !range.endDate) return;
        const startDate = new Date(range.startDate);
        startDate.setHours(selectedStartHour, selectedStartMinute, 0, 0);

        const endDate = new Date(range.endDate);
        endDate.setHours(selectedEndHour, selectedEndMinute, 0, 0);

        onSave(startDate, endDate);
        onClose();
    };

    const formatDate = (dateStr: string | null) => {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        return date.toLocaleDateString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    return (
        <Modal visible={visible} animationType="slide" transparent>
            <View style={styles.overlay}>
                <View style={styles.modal}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Выберите время</Text>
                        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                            <Ionicons name="close" size={24} color="#000" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.content}>
                        <View style={styles.blocksContainer}>
                            {/* Календарь слева */}
                            <View style={styles.calendarBlock}>
                                <Calendar
                                    markingType={'period'}
                                    markedDates={getMarkedDates()}
                                    onDayPress={handleDayPress}
                                    enableSwipeMonths
                                    style={styles.calendar}
                                    theme={{
                                        selectedDayBackgroundColor: '#9980FF',
                                        todayTextColor: '#9980FF',
                                        arrowColor: '#9980FF',
                                    }}
                                />
                            </View>
                            {/* Время справа */}
                            <View style={styles.timeBlock}>
                                <View style={styles.timeSection}>
                                    <View style={styles.timeRow}>
                                        <Text style={styles.timeLabel}>Начало</Text>
                                        <View style={styles.timePickers}>
                                            <ScrollView style={styles.pickerContainer}>
                                                {hours.map((hour) => (
                                                    <TouchableOpacity
                                                        key={hour}
                                                        style={[
                                                            styles.pickerItem,
                                                            selectedStartHour === hour && styles.selectedItem
                                                        ]}
                                                        onPress={() => setSelectedStartHour(hour)}
                                                    >
                                                        <Text style={[
                                                            styles.pickerText,
                                                            selectedStartHour === hour && styles.selectedText
                                                        ]}>
                                                            {hour.toString().padStart(2, '0')}
                                                        </Text>
                                                    </TouchableOpacity>
                                                ))}
                                            </ScrollView>
                                            <Text style={styles.timeSeparator}>:</Text>
                                            <ScrollView style={styles.pickerContainer}>
                                                {minutes.map((minute) => (
                                                    <TouchableOpacity
                                                        key={minute}
                                                        style={[
                                                            styles.pickerItem,
                                                            selectedStartMinute === minute && styles.selectedItem
                                                        ]}
                                                        onPress={() => setSelectedStartMinute(minute)}
                                                    >
                                                        <Text style={[
                                                            styles.pickerText,
                                                            selectedStartMinute === minute && styles.selectedText
                                                        ]}>
                                                            {minute.toString().padStart(2, '0')}
                                                        </Text>
                                                    </TouchableOpacity>
                                                ))}
                                            </ScrollView>
                                        </View>
                                    </View>
                                    <View style={styles.timeRow}>
                                        <Text style={styles.timeLabel}>Окончание</Text>
                                        <View style={styles.timePickers}>
                                            <ScrollView style={styles.pickerContainer}>
                                                {hours.map((hour) => (
                                                    <TouchableOpacity
                                                        key={hour}
                                                        style={[
                                                            styles.pickerItem,
                                                            selectedEndHour === hour && styles.selectedItem
                                                        ]}
                                                        onPress={() => setSelectedEndHour(hour)}
                                                    >
                                                        <Text style={[
                                                            styles.pickerText,
                                                            selectedEndHour === hour && styles.selectedText
                                                        ]}>
                                                            {hour.toString().padStart(2, '0')}
                                                        </Text>
                                                    </TouchableOpacity>
                                                ))}
                                            </ScrollView>
                                            <Text style={styles.timeSeparator}>:</Text>
                                            <ScrollView style={styles.pickerContainer}>
                                                {minutes.map((minute) => (
                                                    <TouchableOpacity
                                                        key={minute}
                                                        style={[
                                                            styles.pickerItem,
                                                            selectedEndMinute === minute && styles.selectedItem
                                                        ]}
                                                        onPress={() => setSelectedEndMinute(minute)}
                                                    >
                                                        <Text style={[
                                                            styles.pickerText,
                                                            selectedEndMinute === minute && styles.selectedText
                                                        ]}>
                                                            {minute.toString().padStart(2, '0')}
                                                        </Text>
                                                    </TouchableOpacity>
                                                ))}
                                            </ScrollView>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.footer}>
                        <Button title="Сохранить" onPress={handleSave} />
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        width: '95%',
        maxHeight: '90%',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    closeButton: {
        padding: 4,
    },
    content: {
        flexDirection: 'row',
        gap: 16,
        marginBottom: 20,
    },
    blocksContainer: {
        flexDirection: 'row',
        flex: 1,
        // gap: 16,
    },
    calendarBlock: {
        flex: 1.2,
        marginRight: 8,
    },
    blockTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
    },
    calendar: {
        borderRadius: 12,
        overflow: 'hidden',
    },
    timeBlock: {
        flex: 1,
        // marginLeft: 8,
    },
    timeSection: {
        flex: 1,
        justifyContent: 'center',
    },
    timeRow: {
        // marginBottom: 18,
    },
    timeLabel: {
        fontSize: 15,
        fontWeight: '500',
        marginBottom: 8,
    },
    timePickers: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 90,
    },
    pickerContainer: {
        flex: 1,
        marginHorizontal: 2,
        backgroundColor: '#F5F5F5',
        borderRadius: 8,
        maxHeight: 90,
    },
    pickerItem: {
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
    },
    selectedItem: {
        backgroundColor: '#9980FF',
    },
    pickerText: {
        fontSize: 16,
        color: '#666',
    },
    selectedText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    timeSeparator: {
        fontSize: 18,
        color: '#9980FF',
        marginHorizontal: 4,
    },
    footer: {
        marginTop: 10,
    },
}); 