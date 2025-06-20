import { Tabs } from 'expo-router';
import { Image } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#8E8E93',
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        headerShown: false,
      }}>
      <Tabs.Screen
        name="map"
        options={{
          title: 'Главная',
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('../../assets/images/tabBar/car.png')}
              style={{ width: 24, height: 24, opacity: focused ? 1 : 0.5 }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Избранное',
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('../../assets/images/tabBar/heart.png')}
              style={{ width: 24, height: 24, opacity: focused ? 1 : 0.5 }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="add-listing"
        options={{
          title: 'Добавить',
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('../../assets/images/tabBar/plus.png')}
              style={{ width: 24, height: 24, opacity: focused ? 1 : 0.5 }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          title: 'Сообщения',
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('../../assets/images/tabBar/message.png')}
              style={{ width: 24, height: 24, opacity: focused ? 1 : 0.5 }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Профиль',
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('../../assets/images/tabBar/user-profile.png')}
              style={{ width: 24, height: 24, opacity: focused ? 1 : 0.5 }}
            />
          ),
        }}
      />
    </Tabs>
  );
} 