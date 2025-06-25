import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, Modal, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { TabBarWrapper } from '../../components/TabBarWrapper';

const { width } = Dimensions.get('window');
const THUMBNAIL_SIZE = 110;
const PADDING = 16;
const SPACING = 12;
const ITEMS_PER_ROW = Math.floor((width - PADDING * 2) / (THUMBNAIL_SIZE + SPACING));

export default function UploadPhotosScreen() {
  const router = useRouter();
  const [images, setImages] = useState<string[]>([]);
  const [videoUrl, setVideoUrl] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);

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

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
    
    // Обновляем индекс текущего изображения
    if (newImages.length === 0) {
      setCurrentImageIndex(0);
    } else if (currentImageIndex >= newImages.length) {
      setCurrentImageIndex(newImages.length - 1);
    }
  };

  const nextImage = () => {
    if (currentImageIndex < images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const prevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const handleNext = () => {
    if (images.length === 0) {
      alert('Пожалуйста, загрузите хотя бы одно изображение');
      return;
    }
    // Передаем первое изображение на следующую страницу
    router.push({
      pathname: '/add-listing/registration-data',
      params: { selectedImage: images[0] }
    });
  };

  const renderMainImage = () => {
    if (images.length === 0) return null;

    return (
      <View style={styles.mainImageContainer}>
        <TouchableOpacity
          style={[styles.navButton, currentImageIndex === 0 && styles.hiddenButton]}
          onPress={prevImage}
          disabled={currentImageIndex === 0}
        >
          <Ionicons name="chevron-back" size={24} color="#000"/>
        </TouchableOpacity>

        <TouchableOpacity style={styles.mainImageWrapper} onPress={openModal}>
          <Image
            source={{ uri: images[currentImageIndex] }}
            style={styles.mainImage}
            resizeMode="cover"
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navButton, currentImageIndex === images.length - 1 && styles.hiddenButton]}
          onPress={nextImage}
          disabled={currentImageIndex === images.length - 1}
        >
          <Ionicons name="chevron-forward" size={24} color="#000"/>
        </TouchableOpacity>
      </View>
    );
  };

  const renderAddButton = () => {
    if (images.length === 0) {
      return (
        <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
          <Image
            source={require('../../assets/images/image-add.png')}
            style={styles.thumbnail}
            resizeMode="cover"
          />
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity style={styles.addButton} onPress={pickImage}>
        <Ionicons name="add" size={28} color="#000" />
      </TouchableOpacity>
    );
  };

  return (
    <TabBarWrapper>
      <View style={styles.container}>
        <Text style={styles.title}>Внешний вид</Text>

        {images.length > 0 && (
          <Text style={styles.counter}>{images.length} из 30</Text>
        )}

        {renderMainImage()}

        {renderAddButton()}
        {images.length === 0 && (
          <>
            <Text style={styles.uploadHint}>Загрузите фото</Text>
            <Text style={styles.uploadHint2}>(Не более 30)</Text>
          </>
        )}

        <Input
          value={videoUrl}
          onChangeText={setVideoUrl}
          placeholder="Ссылка на видео"
          style={styles.videoInput}
        />

        {(images.length > 0 || videoUrl) && (
          <Button
            title="Далее"
            onPress={handleNext}
            style={styles.nextButton}
          />
        )}

        <Modal
          visible={isModalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={closeModal}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Внешний вид</Text>
              </View>
              
              <ScrollView style={styles.modalScrollView}>
                <View style={styles.modalImagesGrid}>
                  {images.map((image, index) => (
                    <View key={index} style={styles.modalImageContainer}>
                      <Image
                        source={{ uri: image }}
                        style={styles.modalImage}
                        resizeMode="cover"
                      />
                      <TouchableOpacity
                        style={styles.modalRemoveButton}
                        onPress={() => removeImage(index)}
                      >
                        <Ionicons name="close-circle" size={20} color="#FF3B30" />
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              </ScrollView>
              <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                <Ionicons name="checkmark" size={24} color="#000" />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </TabBarWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: PADDING,
    overflow: 'scroll',
  },
  title: {
    textAlign: 'center',
    fontSize: 36,
    fontWeight: '700',
    marginBottom: 41,
  },
  counter: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 16,
  },
  mainImageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 16,
  },
  mainImageWrapper: {
    flex: 1,
    alignItems: 'center',
  },
  mainImage: {
    width: 255,
    height: 191,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  navButtonIcon: {
    backgroundColor: '#FFFFFF',
  },
  navButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
  },
  hiddenButton: {
    opacity: 0,
  },
  addButton: {
    width: 32,
    height: 32,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  uploadButton: {
    width: 110,
    height: 110,
    backgroundColor: '#F2F2F2',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  thumbnail: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  uploadHint: {
    textAlign: 'center',
    fontSize: 16,
    color: '#000',
    fontWeight: '600',
  },
  uploadHint2: {
    textAlign: 'center',
    fontSize: 14,
    color: '#616161',
    fontWeight: '600',
    marginBottom: 16,
  },
  videoInput: {
    width: 249,
    height: 45,
    marginBottom: 24,
  },
  nextButton: {
    width: 180,
    height: 42,
    marginTop: 'auto',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    width: '90%',
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 16,
  },
  modalTitle: {
    fontSize: 36,
    fontWeight: '700',
    color: '#000',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 10,
    boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalScrollView: {
    maxHeight: 400,
  },
  modalImagesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    justifyContent: 'center',
  },
  modalImageContainer: {
    width: 72,
    height: 72,
    margin: 4,
    position: 'relative',
  },
  modalImage: {
    width: 72,
    height: 72,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  modalRemoveButton: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
}); 