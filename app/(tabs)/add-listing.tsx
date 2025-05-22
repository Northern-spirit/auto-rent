import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';

const { width } = Dimensions.get('window');
const THUMBNAIL_SIZE = 110;
const PADDING = 16;
const SPACING = 12;
const ITEMS_PER_ROW = Math.floor((width - PADDING * 2) / (THUMBNAIL_SIZE + SPACING));

export default function AddListingScreen() {
  const router = useRouter();
  const [images, setImages] = useState([]);
  const [videoUrl, setVideoUrl] = useState('');

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
      backgroundColor: '#FFFFFF',
    });

    if (!result.canceled) {
      setImages([...images, result.assets[0].uri]);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const renderThumbnails = () => {
    const rows = [];
    let currentRow = [];
    
    for (let i = 0; i < images.length; i++) {
      currentRow.push(
        <View key={i} style={styles.thumbnailContainer}>
          <Image
            source={{ uri: images[i] }}
            style={styles.thumbnail}
            resizeMode="cover"
          />
          <TouchableOpacity 
            style={styles.removeButton}
            onPress={() => removeImage(i)}
          >
            <Ionicons name="close-circle" size={24} color="#FF3B30" />
          </TouchableOpacity>
        </View>
      );

      if (currentRow.length === ITEMS_PER_ROW || i === images.length - 1) {
        rows.push(
          <View key={`row-${rows.length}`} style={styles.row}>
            {currentRow}
          </View>
        );
        currentRow = [];
      }
    }

    if (currentRow.length > 0) {
      currentRow.push(
        <TouchableOpacity key="upload" style={styles.uploadButton} onPress={pickImage}>
          <Ionicons name="add" size={32} color="#007AFF" />
          <Text style={styles.uploadText}>Добавить</Text>
        </TouchableOpacity>
      );
      rows.push(
        <View key={`row-${rows.length}`} style={styles.row}>
          {currentRow}
        </View>
      );
    } else {
      rows.push(
        <View key="upload-row" style={styles.row}>
          <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
            <Ionicons name="add" size={32} color="#007AFF" />
            <Text style={styles.uploadText}>Добавить</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return rows;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Добавить объявление</Text>
      
      <View style={styles.imagesGrid}>
        {renderThumbnails()}
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
          onPress={() => router.push('/add-listing/registration-data')}
          style={styles.nextButton}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: PADDING,
    overflow: 'scroll',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  imagesGrid: {
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    marginBottom: SPACING,
    justifyContent: 'center',
  },
  thumbnailContainer: {
    width: THUMBNAIL_SIZE,
    height: THUMBNAIL_SIZE,
    marginRight: SPACING,
    position: 'relative',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  removeButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  uploadButton: {
    width: THUMBNAIL_SIZE,
    height: THUMBNAIL_SIZE,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#007AFF',
    borderStyle: 'dashed',
  },
  uploadText: {
    marginTop: 4,
    fontSize: 12,
    color: '#007AFF',
  },
  uploadHint: {
    textAlign: 'center',
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  videoInput: {
    width: '100%',
    marginBottom: 24,
  },
  nextButton: {
    marginTop: 'auto',
  },
}); 