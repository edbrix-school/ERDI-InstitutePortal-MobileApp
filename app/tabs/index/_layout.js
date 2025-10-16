import { Stack } from "expo-router";

export default function HomeStackLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ title: "Home" }} />
      <Stack.Screen name="viewDrafts" options={{ title: "viewDrafts" }} />
      <Stack.Screen name="createNewPost" options={{ title: "Create New Post" }} />
    </Stack>
  );
}
