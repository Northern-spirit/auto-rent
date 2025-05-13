import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';

export default function AddListingScreen() {
  const router = useRouter();
  const [images, setImages] = useState([]);
  const [videoUrl, setVideoUrl] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const pickImage = async () => {
    if (images.length >= 30) {
      alert('Максимальное количество фотографий - 30');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImages([...images, result.assets[0].uri]);
    }
  };

  const nextStep = () => {
    if (images.length > 0 || videoUrl) {
      router.push('/add-listing/registration-data');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Добавление объявления</Text>
      
      <View style={styles.uploadContainer}>
        {images.length > 0 ? (
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: images[currentImageIndex] }}
              style={styles.image}
            />
            {images.length > 1 && (
              <View style={styles.navigationButtons}>
                <TouchableOpacity
                  onPress={() => setCurrentImageIndex(prev => (prev > 0 ? prev - 1 : prev))}
                  style={styles.navButton}
                >
                  <Ionicons name="chevron-back" size={24} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setCurrentImageIndex(prev => (prev < images.length - 1 ? prev + 1 : prev))}
                  style={styles.navButton}
                >
                  <Ionicons name="chevron-forward" size={24} color="#000" />
                </TouchableOpacity>
              </View>
            )}
          </View>
        ) : (
          <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
            <Ionicons name="add" size={48} color="#007AFF" />
            <Text style={styles.uploadText}>Загрузить фото</Text>
          </TouchableOpacity>
        )}
      </View>

      <Text style={styles.uploadHint}>Не более 30 фотографий</Text>

      <Input
        value={videoUrl}
        onChangeText={setVideoUrl}
        placeholder="Ссылка на видео"
        style={styles.videoInput}
      />

      {(images.length > 0 || videoUrl) && (
        <Button
          title="Далее"
          onPress={nextStep}
          style={styles.nextButton}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  uploadContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  uploadButton: {
    width: 200,
    height: 200,
    borderWidth: 2,
    borderColor: '#007AFF',
    borderStyle: 'dashed',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadText: {
    marginTop: 8,
    color: '#007AFF',
    fontSize: 16,
  },
  uploadHint: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 16,
  },
  videoInput: {
    marginBottom: 24,
  },
  nextButton: {
    marginTop: 16,
  },
  imageContainer: {
    width: '100%',
    height: 300,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  navigationButtons: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  navButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 20,
    padding: 8,
  },
}); 