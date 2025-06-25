import { Stack } from 'expo-router';
import { Tabs } from 'expo-router';
import { Image } from 'react-native';

export default function AddListingLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="upload-photos" />
      <Stack.Screen name="registration-data" />
      <Stack.Screen name="characteristics" />
      <Stack.Screen name="price" />
      <Stack.Screen name="description" />
    </Stack>
  );
} 