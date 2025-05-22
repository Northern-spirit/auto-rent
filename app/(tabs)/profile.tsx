import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useStore } from '../../store/useStore';
import { SvgUri } from 'react-native-svg';

export default function ProfileScreen() {
  const router = useRouter();
  const { user, updateUserName, updateBalance, logout } = useStore();
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(user?.name || '');

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>Загрузка...</Text>
      </View>
    );
  }

  const handleNameEdit = () => {
    if (isEditing) {
      if (newName.trim().length < 2) {
        Alert.alert('Ошибка', 'Имя должно содержать минимум 2 символа');
        return;
      }
      updateUserName(newName);
    }
    setIsEditing(!isEditing);
  };

  const handleReplenish = () => {
    Alert.prompt(
      'Пополнение баланса',
      'Введите сумму пополнения',
      [
        {
          text: 'Отмена',
          style: 'cancel',
        },
        {
          text: 'Пополнить',
          onPress: (value) => {
            const amount = Number(value);
            if (isNaN(amount) || amount <= 0) {
              Alert.alert('Ошибка', 'Введите корректную сумму');
              return;
            }
            updateBalance(amount);
          },
        },
      ],
      'plain-text',
      '',
      'numeric'
    );
  };

  const handleLogout = () => {
    Alert.alert(
      'Выход из аккаунта',
      'Вы уверены, что хотите выйти?',
      [
        {
          text: 'Отмена',
          style: 'cancel',
        },
        {
          text: 'Выйти',
          style: 'destructive',
          onPress: () => {
            logout();
          },
        },
      ],
    );
  };

  const menuItems = [
    { icon: 'car', title: 'Управление объявлениями', onPress: () => {} },
    { icon: 'stats-chart', title: 'Статистика', onPress: () => {} },
    { icon: 'time', title: 'История', onPress: () => {} },
    { icon: 'help-circle', title: 'Служба поддержки', onPress: () => {} },
    { icon: 'information-circle', title: 'О приложении', onPress: () => {} },
    { icon: 'log-out', title: 'Выйти', onPress: handleLogout, color: '#FF6969' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.userInfoBlock}>
        <View style={styles.avatarContainer}>
          <Image 
            source={user.avatar}
            style={styles.avatar}
            resizeMode="contain"
          />
        </View>
        <View style={styles.userDetails}>
          <Text style={styles.userType}>
            {user.type === 'individual' ? 'Физическое лицо' : 'Компания'}
          </Text>
          <Text style={styles.userCity}>{user.city}</Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={styles.rating}>{user.rating}</Text>
            <Text style={styles.reviewsCount}>({user.reviewsCount} отзывов)</Text>
          </View>
        </View>
      </View>

      <View style={styles.nameBlock}>
        {isEditing ? (
          <TextInput
            style={styles.nameInput}
            value={newName}
            onChangeText={setNewName}
            autoFocus
          />
        ) : (
          <Text style={styles.userName}>{user.name}</Text>
        )}
        <TouchableOpacity onPress={handleNameEdit} style={styles.editButton}>
          <Ionicons 
            name={isEditing ? "checkmark" : "pencil"} 
            size={24} 
            color="#007AFF" 
          />
        </TouchableOpacity>
      </View>

      <View style={styles.balanceBlock}>
        <View>
          <Text style={styles.balanceLabel}>Баланс</Text>
          <Text style={styles.balanceAmount}>{user.balance.toLocaleString()} ₽</Text>
        </View>
        <TouchableOpacity style={styles.replenishButton} onPress={handleReplenish}>
          <Text style={styles.replenishButtonText}>Пополнить</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.menuBlock}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={item.onPress}
          >
            <Ionicons 
              name={item.icon} 
              size={24} 
              color={item.color || '#000'} 
            />
            <Text style={[styles.menuItemText, item.color && { color: item.color }]}>
              {item.title}
            </Text>
            <Ionicons name="chevron-forward" size={24} color="#C7C7CC" />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  userInfoBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
    backgroundColor: '#F2F2F7',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  userDetails: {
    flex: 1,
  },
  userType: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  userCity: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    marginLeft: 4,
    fontWeight: 'bold',
  },
  reviewsCount: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  nameBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    flex: 1,
  },
  nameInput: {
    fontSize: 24,
    fontWeight: 'bold',
    flex: 1,
    padding: 0,
  },
  editButton: {
    padding: 8,
  },
  balanceBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  balanceLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  balanceAmount: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  replenishButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  replenishButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  menuBlock: {
    flex: 1,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  menuItemText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 12,
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
}); 