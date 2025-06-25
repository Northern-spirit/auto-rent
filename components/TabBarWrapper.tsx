import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter, usePathname } from 'expo-router';

interface TabBarWrapperProps {
  children: React.ReactNode;
}

export function TabBarWrapper({ children }: TabBarWrapperProps) {
  const router = useRouter();
  const pathname = usePathname();

  const tabs = [
    {
      name: 'map',
      icon: require('../assets/images/tabBar/car.png'),
      path: '/map',
    },
    {
      name: 'favorites',
      icon: require('../assets/images/tabBar/heart.png'),
      path: '/favorites',
    },
    {
      name: 'add-listing',
      icon: require('../assets/images/tabBar/plus.png'),
      path: '/add-listing',
    },
    {
      name: 'messages',
      icon: require('../assets/images/tabBar/message.png'),
      path: '/messages',
    },
    {
      name: 'profile',
      icon: require('../assets/images/tabBar/user-profile.png'),
      path: '/profile',
    },
  ];

  const handleTabPress = (path: string) => {
    if (!pathname.startsWith(path)) {
      router.push(path);
    }
  };

  const isActiveTab = (tabPath: string) => {
    if (tabPath === '/add-listing') {
      return pathname.startsWith('/add-listing');
    }
    return pathname === tabPath;
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {children}
      </View>
      <View style={styles.tabBar}>
        {tabs.map((tab) => {
          const isActive = isActiveTab(tab.path);
          return (
            <TouchableOpacity
              key={tab.name}
              style={styles.tab}
              onPress={() => handleTabPress(tab.path)}
            >
              <Image
                source={tab.icon}
                style={[styles.tabIcon, { opacity: isActive ? 1 : 0.5 }]}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    height: 60,
    paddingBottom: 8,
    paddingTop: 8,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabIcon: {
    width: 24,
    height: 24,
  },
}); 