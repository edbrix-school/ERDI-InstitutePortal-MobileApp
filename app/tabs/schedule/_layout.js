import { Stack } from "expo-router";

export default function ScheduleStackLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ title: "Schedule" }} />
      <Stack.Screen name="viewBookings" options={{ title: "View Bookings" }} />
      <Stack.Screen name="eventDetails" options={{ title: "Event Details" }} />
      <Stack.Screen name="eventMaps" options={{ title: "" }} />
    </Stack>
  );
}
