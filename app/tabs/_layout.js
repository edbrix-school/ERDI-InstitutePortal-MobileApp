import { Tabs } from "expo-router";
import { View, TouchableOpacity, Image, Text } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { LinearGradient } from "expo-linear-gradient";

function CustomTabBar({ state, descriptors, navigation }) {
  const mainBarGradientColors = ["#FFFFFF", "rgba(255, 255, 255, 0.7)"];
  const scanButtonGradientColors = ["#c89367", "#b47c49"];
  const scanButtonSize = RFValue(55);
  const tabBarHeight = RFValue(60);

  // Check if we're on a nested route (not a main tab page)
  const currentRoute = state.routes[state.index];
  const isNestedRoute =
    currentRoute.state?.index !== undefined && currentRoute.state.index > 0;

  // Hide tab bar on nested routes
  if (isNestedRoute) {
    return null;
  }

  return (
    <View
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: RFValue(20),
        backgroundColor: "transparent",
        alignItems: "center",
      }}
    >
      {/* Shadowed gradient bar */}
      <View
        style={{
          width: "92%",
          height: tabBarHeight,
          borderRadius: RFValue(40),
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 6,
          overflow: "hidden",
        }}
      >
        <LinearGradient
          colors={mainBarGradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ flex: 1 }}
        />
      </View>

      {/* Tab icons */}
      <View
        style={{
          position: "absolute",
          bottom: 0,
          flexDirection: "row",
          width: "92%",
          height: tabBarHeight,
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label = options.tabBarLabel ?? options.title ?? route.name;
          const isFocused = state.index === index;

          const iconMap = {
            home: require("../../assets/images/home.png"),
            schedule: require("../../assets/images/Schedule.png"),
            scan: require("../../assets/images/scan.png"),
            community: require("../../assets/images/Community.png"),
            profile: require("../../assets/images/Profile.png"),
          };

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, { merge: true });
            }
          };

          if (route.name === "scan") {
            return (
              <TouchableOpacity
                key={route.key}
                onPress={onPress}
                style={{
                  position: "absolute",
                  top: -scanButtonSize / 2, // raises button up
                  alignSelf: "center",
                  width: scanButtonSize,
                  height: scanButtonSize,
                  borderRadius: scanButtonSize / 2,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <LinearGradient
                  colors={scanButtonGradientColors}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: scanButtonSize / 2,
                    alignItems: "center",
                    justifyContent: "center",
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.4,
                    shadowRadius: 6,
                    elevation: 8,
                  }}
                >
                  <Image
                    source={iconMap[route.name]}
                    style={{
                      width: RFValue(30),
                      height: RFValue(30),
                      tintColor: "white",
                    }}
                    resizeMode="contain"
                  />
                </LinearGradient>
              </TouchableOpacity>
            );
          }

          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              style={{
                alignItems: "center",
                justifyContent: "center",
                paddingVertical: RFValue(5),
              }}
            >
              {isFocused && (
                <View
                  style={{
                    position: "absolute",
                    width: RFValue(45),
                    height: RFValue(45),
                    borderRadius: RFValue(22.5),
                  }}
                />
              )}
              <Image
                source={iconMap[route.name]}
                style={{
                  width: RFValue(18),
                  height: RFValue(18),
                  tintColor: isFocused ? "#b47c49" : "#404965",
                }}
                resizeMode="contain"
              />
              <Text
                style={{
                  color: isFocused ? "#b47c49" : "#404965",
                  fontSize: RFValue(9),
                  marginTop: RFValue(3),
                }}
              >
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "transparent",
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,

          height: RFValue(100),
        },
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tabs.Screen name="home" options={{ title: "Home" }} />
      <Tabs.Screen name="schedule" options={{ title: "Schedule" }} />
      <Tabs.Screen name="scan" options={{ title: "Scan" }} />
      <Tabs.Screen name="community" options={{ title: "Community" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    </Tabs>
  );
}

// import React from "react";
// import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { createStackNavigator } from "@react-navigation/stack";
// import Ionicons from "@expo/vector-icons/Ionicons";
// import { LinearGradient } from "expo-linear-gradient";
// import { RFValue } from "react-native-responsive-fontsize";

// // Screens
// import HomeScreen from "./index/index";
// import ViewDraft from "./index/viewDrafts";
// import CreateNewPost from "./index/createNewPost";
// import Schedule from "./schedule/schedule";
// import Scan from "./scan";
// import Community from "./community";
// import Profile from "./profile";

// const Tab = createBottomTabNavigator();
// const Stack = createStackNavigator();

// const ACTIVE_COLOR = "#A08068";
// const INACTIVE_COLOR = "#757575";

// // --- Home Stack ---
// const HomeStackScreen = () => (
//   <Stack.Navigator screenOptions={{ headerShown: true }}>
//     <Stack.Screen
//       name="HomeMain"
//       component={HomeScreen}
//       options={{ title: "Feed", headerShown: false }}
//     />
//     <Stack.Screen
//       name="ViewDraft"
//       component={ViewDraft}
//       options={{ title: "View Draft", headerShown: false }}
//     />
//     <Stack.Screen
//       name="CreateNewPost"
//       component={CreateNewPost}
//       options={{ title: "Create New Post", headerShown: false }}
//     />
//   </Stack.Navigator>
// );

// // --- Custom Tab Icon ---
// const CustomTabIcon = ({ label, iconName, focused, onPress }) => {
//   const borderColor = focused ? ACTIVE_COLOR : "transparent";

//   return (
//     <TouchableOpacity
//       style={[styles.tabItem, { borderColor: "red" }]}
//       onPress={onPress}
//       activeOpacity={0.7}
//     >
//       <Ionicons
//         name={iconName}
//         size={RFValue(22)}
//         color={focused ? ACTIVE_COLOR : INACTIVE_COLOR}
//       />
//       {label && (
//         <Text
//           style={[
//             styles.tabLabel,
//             { color: focused ? ACTIVE_COLOR : INACTIVE_COLOR },
//           ]}
//         >
//           {label}
//         </Text>
//       )}
//     </TouchableOpacity>
//   );
// };

// // --- Main App ---
// const App = () => {
//   return (
//     <Tab.Navigator
//       initialRouteName="Home"
//       screenOptions={{
//         headerShown: false,
//         tabBarStyle: styles.tabBar,
//       }}
//     >
//       {/* Home Tab */}
//       <Tab.Screen
//         name="Home"
//         component={HomeStackScreen}
//         options={{
//           tabBarButton: (props) => (
//             <CustomTabIcon {...props} label="Home" iconName="home-outline" />
//           ),
//         }}
//       />

//       {/* Schedule Tab */}
//       <Tab.Screen
//         name="Schedule"
//         component={Schedule}
//         options={{
//           tabBarButton: (props) => (
//             <CustomTabIcon
//               {...props}
//               label="Schedule"
//               iconName="calendar-outline"
//             />
//           ),
//         }}
//       />

//       {/* Scan Tab */}
//       <Tab.Screen
//         name="Scan"
//         component={Scan}
//         options={{
//           tabBarButton: (props) => (
//             <TouchableOpacity
//               {...props}
//               style={styles.scanButtonWrapper}
//               activeOpacity={0.8}
//             >
//               <LinearGradient
//                 colors={["#D7A884", "#A08068"]}
//                 start={{ x: 0, y: 0 }}
//                 end={{ x: 1, y: 1 }}
//                 style={styles.scanButtonGradient}
//               >
//                 <Ionicons name="apps" size={RFValue(28)} color="white" />
//               </LinearGradient>
//               <Text style={styles.scanLabel}>Scan</Text>
//             </TouchableOpacity>
//           ),
//         }}
//       />

//       {/* Community Tab */}
//       <Tab.Screen
//         name="Community"
//         component={Community}
//         options={{
//           tabBarButton: (props) => (
//             <CustomTabIcon
//               {...props}
//               label="Community"
//               iconName="people-outline"
//             />
//           ),
//         }}
//       />

//       {/* Profile Tab */}
//       <Tab.Screen
//         name="Profile"
//         component={Profile}
//         options={{
//           tabBarButton: (props) => (
//             <CustomTabIcon
//               {...props}
//               label="Profile"
//               iconName="person-outline"
//             />
//           ),
//         }}
//       />
//     </Tab.Navigator>
//   );
// };

// // --- Styles ---
// const styles = StyleSheet.create({
//   tabBar: {
//     position: "absolute",
//     bottom: 15,
//     left: 20,
//     right: 20,
//     height: RFValue(70),
//     backgroundColor: "red",
//     borderRadius: RFValue(30),
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 10 },
//     shadowOpacity: 0.1,
//     shadowRadius: 20,
//     elevation: 10,
//     flexDirection: "row",
//     justifyContent: "space-around",
//     alignItems: "center",
//   },
//   tabItem: {
//     alignItems: "center",
//     justifyContent: "center",
//     borderWidth: 2,
//     borderRadius: RFValue(15),
//     padding: RFValue(5),
//     alignSelf:'center',
//     top:20
//   },
//   tabLabel: {
//     fontSize: RFValue(10),
//     marginTop: 2,
//     fontWeight: "600",
//   },
//   scanButtonWrapper: {
//     width: RFValue(60),
//     height: RFValue(60),
//     borderRadius: RFValue(30),
//     alignItems: "center",
//     justifyContent: "center",
//     top: -RFValue(20),
//     zIndex: 999,
//   },
//   scanButtonGradient: {
//     flex: 1,
//     borderRadius: RFValue(30),
//     alignItems: "center",
//     justifyContent: "center",
//     width: "100%",
//     height: "100%",
//   },
//   scanLabel: {
//     fontSize: RFValue(10),
//     marginTop: 4,
//     fontWeight: "600",
//     color: ACTIVE_COLOR,
//   },
// });

// export default App;
