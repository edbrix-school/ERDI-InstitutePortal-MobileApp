import { Tabs } from "expo-router";
import { View, TouchableOpacity, Image, Text } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { LinearGradient } from "expo-linear-gradient";



function CustomTabBar({ state, descriptors, navigation }) {
  const mainBarGradientColors = ["#FFFFFF", "rgba(255, 255, 255, 0.7)"];
  const scanButtonGradientColors = ["#c89367", "#b47c49"];
  const scanButtonSize = RFValue(55);
  const tabBarHeight = RFValue(60);

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
            index: require("../../assets/images/home.png"),
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
                flex: 1,
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
                    backgroundColor: "rgba(180, 124, 73, 0.1)",
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
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="schedule" options={{ title: "Schedule" }} />
      <Tabs.Screen name="scan" options={{ title: "Scan" }} />
      <Tabs.Screen name="community" options={{ title: "Community" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    </Tabs>
  );
}
