import { Stack } from 'expo-router';



export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="welcome"
    >
      <Stack.Screen name="welcome" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="register" options={{ headerShown: false }} />
      <Stack.Screen name="forgot-password" options={{ headerShown: false }} />
      <Stack.Screen name="verify-code" options={{ headerShown: false }} />
      <Stack.Screen name="home" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="add-listing-flow" options={{ headerShown: false }} />
    </Stack>
  );
}
