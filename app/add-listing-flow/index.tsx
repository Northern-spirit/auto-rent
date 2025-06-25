import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { TabBarWrapper } from '../../components/TabBarWrapper';

export default function AddListingScreen() {
  const router = useRouter();

  const handleAddListing = () => {
    console.log('Button pressed!');
    router.push('/add-listing/upload-photos');
  };

  return (
    <TabBarWrapper>
      <View style={styles.container}>
        <Image source={require('../../assets/iconCar.png')} style={styles.iconCar} />
        
        <TouchableOpacity style={styles.button} onPress={handleAddListing}>
          <Text style={styles.buttonText}>Добавить авто</Text>
        </TouchableOpacity>
      </View>
    </TabBarWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: '500',
    marginBottom: 36,
    color: '#000',
  },
  iconCar: {
    marginBottom: 36,
  },
  button: {
    backgroundColor: '#9980FF',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
}); 