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

  const getRatingImage = (rating: number) => {
    if (rating >= 4 && rating <= 5) {
      return require('../../assets/images/home/greenCar.png');
    } else if (rating >= 3 && rating < 4) {
      return require('../../assets/images/home/yellowCar.png');
    } else {
      return require('../../assets/images/home/redCar.png');
    }
  };

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
    { 
      icon: require('../../assets/images/lk/home.png'),
      title: 'Управление объявлениями', 
      onPress: () => router.push('/my-listings') 
    },
    { 
      icon: require('../../assets/images/lk/line-chart-up.png'),
      title: 'Статистика', 
      onPress: () => {
        Alert.alert('В разработке', 'Функция находится в разработке');
      }
    },
    { 
      icon: require('../../assets/images/lk/history.png'),
      title: 'История', 
      onPress: () => router.push('/history') 
    },
    { 
      icon: require('../../assets/images/lk/helperChat.png'),
      title: 'Служба поддержки', 
      onPress: () => router.push('/support') 
    },
    { 
      icon: require('../../assets/images/lk/info.png'),
      title: 'О приложении', 
      onPress: () => router.push('/about') 
    },
    { 
      icon: require('../../assets/images/lk/logout.png'),
      title: 'Выйти', 
      onPress: handleLogout, 
      color: '#FF6969' 
    },
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
          <Text style={styles.userCity}>г. {user.city}</Text>
          <View style={styles.ratingContainer}>
            <Image source={getRatingImage(user.rating)} style={styles.ratingImage} />
            <Text style={styles.rating}>{user.rating}</Text>
          </View>
          <View style={styles.ratingContainer}>
            <Text style={styles.reviewsCount}>{user.reviewsCount} отзывов</Text>
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
          {/* <Ionicons 
            name={isEditing ? "checkmark" : "pencil"} 
            size={24} 
            color="#007AFF" 
          /> */}
          <Image 
              source={require('../../assets/images/lk/edit.png')} 
            />
        </TouchableOpacity>
      </View>

      <View style={styles.balanceBlock}>
        <View>
          <Text style={styles.balanceAmount}>{user.balance.toLocaleString()} ₽</Text>
        </View>
        <TouchableOpacity 
          style={styles.replenishButton} 
          onPress={() => router.push('/balance')}
        >
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
            <Image 
              source={item.icon} 
              style={styles.menuIcon}
            />
            <Text style={[styles.menuItemText, item.color && { color: item.color }]}>
              {item.title}
            </Text>
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
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 20,
    marginRight: 16,
    backgroundColor: '#F2F2F7',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  userDetails: {
  },
  userType: {
    fontSize: 14,
    fontWeight: '400',
    marginBottom: 4,
  },
  ratingImage: {
    width: 20,
    height: 20,
    marginRight: 4,
  },
  userCity: {
    fontSize: 14,
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
    color: '#9980FF',
  },
  nameBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
    position: 'relative',
  },
  userName: {
    fontSize: 36,
    fontWeight: '700',
    textAlign: 'center',
    flex: 1,
  },
  nameInput: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    flex: 1,
    padding: 0,
  },
  editButton: {
    padding: 8,
    position: 'absolute',
    right: -8,
  },
  balanceBlock: {
    borderWidth: 1,
    borderColor: '#E2E2E2A3',
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 44,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  balanceLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  balanceAmount: {
    fontSize: 30,
    fontWeight: '700',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  replenishButton: {
    backgroundColor: '#9980FF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
  },
  replenishButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  menuBlock: {
    flex: 1,
    marginTop: 6,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    gap: 16,
  },
  menuItemText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 18,
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  menuIcon: {
    width: 20,
    height: 20,
    marginRight: 12,
  },
}); 