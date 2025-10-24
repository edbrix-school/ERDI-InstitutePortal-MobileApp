import { Stack } from "expo-router";

export default function CommunityStackLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ title: "Community" }} />
      <Stack.Screen name="CommunityviewDrafts" options={{ title: "View Drafts" }} />
      <Stack.Screen name="CommunitycreateNewPost" options={{ title: "Create NewPost" }} />
      <Stack.Screen name="CommunityPostDetails" options={{ title: "CommunityPostDetails" }} />
    </Stack>
  );
}
