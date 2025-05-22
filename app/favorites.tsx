// import React from 'react';
// import { View, FlatList, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';

// // Моковые данные
// const MOCK_FAVORITES = [
//   {
//     id: '1',
//     title: 'BMW X5',
//     price: '5000 ₽/сутки',
//     rating: 4.8,
//     distance: '2.5 км',
//     image: 'https://example.com/car1.jpg',
//   },
//   // Добавьте больше моковых данных
// ];

// export default function FavoritesScreen() {
//   const renderItem = ({ item }: { item: any }) => (
//     <View style={styles.card}>
//       <View style={styles.imageContainer}>
//         <Image
//           source={{ uri: item.image }}
//           style={styles.image}
//         />
//         <TouchableOpacity style={styles.heartButton}>
//           <Ionicons name="heart" size={24} color="#FF3B30" />
//         </TouchableOpacity>
//       </View>
//       <Text style={styles.title}>{item.title}</Text>
//       <Text style={styles.price}>{item.price}</Text>
//       <View style={styles.footer}>
//         <View style={styles.rating}>
//           <Ionicons name="star" size={16} color="#FFD700" />
//           <Text style={styles.ratingText}>{item.rating}</Text>
//         </View>
//         <Text style={styles.distance}>{item.distance}</Text>
//       </View>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={MOCK_FAVORITES}
//         renderItem={renderItem}
//         keyExtractor={item => item.id}
//         contentContainerStyle={styles.list}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F2F2F7',
//   },
//   list: {
//     padding: 16,
//   },
//   card: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 12,
//     marginBottom: 16,
//     padding: 12,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   imageContainer: {
//     position: 'relative',
//     marginBottom: 12,
//   },
//   image: {
//     width: '100%',
//     height: 200,
//     borderRadius: 8,
//   },
//   heartButton: {
//     position: 'absolute',
//     top: 12,
//     right: 12,
//     backgroundColor: '#FFFFFF',
//     borderRadius: 20,
//     padding: 8,
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: '600',
//     marginBottom: 4,
//   },
//   price: {
//     fontSize: 16,
//     color: '#007AFF',
//     fontWeight: '600',
//     marginBottom: 8,
//   },
//   footer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   rating: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   ratingText: {
//     marginLeft: 4,
//     fontSize: 14,
//     color: '#666',
//   },
//   distance: {
//     fontSize: 14,
//     color: '#666',
//   },
// }); 