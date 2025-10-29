// app/index.tsx
import React, { useState } from "react";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
} from "react-native";
import { VideoView, useVideoPlayer } from "expo-video";

import { LinearGradient } from "expo-linear-gradient";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import * as IMAGES from "../../../components/Images";

// Import Reanimated components and hooks
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";
import { useRouter } from "expo-router";

// --- DUMMY DATA ---
const APPOINTMENTS = [
  {
    id: "1",
    name: "Liam Johnson",
    team: "Emeritus Team",
    date: "09/15",
    time: "2:30 p.m",
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: "2",
    name: "Noah Smith",
    team: "Emeritus Team",
    date: "09/15",
    time: "2:30 p.m",
    avatar: "https://i.pravatar.cc/150?img=2",
  },
  {
    id: "3",
    name: "Ethan Carter",
    team: "Emeritus Team",
    date: "09/15",
    time: "2:30 p.m",
    avatar: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: "4",
    name: "Oliver Brown",
    team: "Emeritus Team",
    date: "09/15",
    time: "2:30 p.m",
    avatar: "https://i.pravatar.cc/150?img=4",
  },
];

const CALENDAR_DATES = [
  { id: "1", day: "SAT", date: "14" },
  { id: "2", day: "SUN", date: "15" },
  { id: "3", day: "MON", date: "16" },
  { id: "4", day: "TUE", date: "17" },
  { id: "5", day: "WED", date: "18" },
  { id: "6", day: "THU", date: "19" },
  { id: "7", day: "FRI", date: "20" },
];

const CALENDAR_EVENTS = [
  {
    id: "e1",
    title: "Summer Institute 2024",
    location: "Salt Lake City, Utah",
    time: "09:00 - 09:30",
    type: "Online",
    image: "https://picsum.photos/400/200?random=1",
  },
  {
    id: "e2",
    title: "Tech Innovators Conference 2024",
    location: "San Francisco, CA",
    time: "10:00 - 11:30",
    type: "In-Person",
    image: "https://picsum.photos/400/200?random=2",
  },
  {
    id: "e3",
    title: "Global Health Summit 2024",
    location: "Washington, D.C.",
    time: "14:00 - 15:30",
    type: "Hybrid",
    image: "https://picsum.photos/400/200?random=3",
  },
  {
    id: "e4",
    title: "Nciil Spring 2024",
    location: "Chicago, IL",
    time: "17:00 - 18:30",
    type: "Online",
    image: "https://picsum.photos/400/200?random=4",
  },
];

const ANNOUNCEMENTS = [
  {
    id: "a1",
    date: "September, 26",
    title:
      "Board Names New Principals At Adams and Holly Ridge Elementary Schools",
    author: "JENNIFER FERRARI",
    time: "Tuesday March 12 at Noon ET",
    image: "https://picsum.photos/400/300?random=5",
  },
  {
    id: "a2",
    date: "September, 26",
    title:
      "Board Names New Principals At Adams and Holly Ridge Elementary Schools",
    author: "DR. KIMBERLEE ARMSTRONG",
    image: "https://picsum.photos/400/300?random=6",
  },
  {
    id: "a3",
    date: "September, 26",
    title:
      "Board Names New Principals At Adams and Holly Ridge Elementary Schools",
    author: "DR. KIMBERLEE ARMSTRONG",
    image: "https://picsum.photos/400/300?random=7",
  },
];

// --- CONSTANTS ---
const HEADER_MAX_HEIGHT = Dimensions.get("window").height * 0.3;
const HEADER_MIN_HEIGHT = RFValue(60); // Height of the minimized bar
const SCROLL_RANGE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
const PROFILE_IMAGE_URL = "https://i.pravatar.cc/150?img=5";

// --- RENDER FUNCTIONS ---

// Renders a single appointment card
const renderAppointmentItem = ({ item }) => (
  <View style={[styles.appointmentCard, { width: "100%" }]}>
    <View style={{ width: "50%" }}>
      <Text style={styles.appointmentName}>{item.name}</Text>
      <Text style={styles.appointmentTeam}>{item.team}</Text>
    </View>
    <View style={{ alignItems: "flex-start", width: "30%" }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: RFValue(3),
        }}
      >
        <Image source={IMAGES.Schedule} style={styles.iconTiny} />
        <Text style={styles.appointmentDate}>{item.date}</Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image source={IMAGES.Community} style={styles.iconTiny} />
        <Text style={styles.appointmentTime}>{item.time}</Text>
      </View>
    </View>
    <View style={{ width: "20%" }}>
      <Image source={{ uri: item.avatar }} style={styles.avatarSmall} />
    </View>
  </View>
);

// Renders the Community Posts navigation icons
const renderCommunityPosts = () => (
  <View style={styles.communityPostsContainer}>
    <Text style={styles.sectionTitle}>Community Posts</Text>
    <Image source={IMAGES.Export} style={styles.iconSmall} />
  </View>
);

// Renders a single event card (MODIFIED AGAIN TO MATCH SCREENSHOT)
const renderCalendarEventItem = ({ item }) => (
  <View style={styles.eventCardModified}>
    {/* Left Side: Text and Details Container (Light Gray Background)
      ---
      INLINE STYLES APPLIED:
      1. Increased width to 85% (from 68%) to allow the text content to push into the image area.
      2. Removed the visible border.
      3. Set flex: 0 to ensure the width is fixed and doesn't shrink.
    */}
    <View
      style={[
        styles.eventTextContainerModified,
        { width: "75%", borderWidth: 0, flex: 0 },
      ]}
    >
      {/* INLINE STYLE APPLIED:
        1. Set numberOfLines={1} and ellipsizeMode="tail" to force the title to stay on a single line 
           and truncate with '...' if it's too long, but still allowing it to overflow the image area's 
           fade/gradient.
      */}
      <Text
        style={styles.eventTitleModified}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {item.title}
      </Text>

      <Text style={styles.eventLocationModified}>{item.location}</Text>

      {/* Row containing Time and Type details */}
      <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
        {/* Time Detail Row (Clock Icon + Time Text) */}
        <View style={[styles.detailRowModified, { marginRight: RFValue(15) }]}>
          <Image source={IMAGES.Schedule} style={styles.iconClock} />
          <Text style={styles.eventDetailTimeModified}>{item.time}</Text>
        </View>

        {/* Type Detail Row (Dot Icon + Type Text) */}
        <View style={styles.detailRowModified}>
          {/* Adjusted dot styling: Removed the conflicting marginLeft to ensure proper alignment 
            with the text and clock elements.
          */}
          <View style={[styles.dotIconStyle, { marginLeft: RFValue(0) }]} />
          <Text style={styles.eventDetailTypeModified}>{item.type}</Text>
        </View>
      </View>
    </View>

    {/* Right Side: Image and Gradient Container
      ---
      INLINE STYLES APPLIED:
      1. Set width to 15% (from 32%) to account for the wider text container. 
         (Note: The image background will cover the full width, but the container ensures proper sizing)
    */}
    <View
      style={[
        styles.eventImageContainerModified,
        { width: "25%", alignItems: "center", justifyContent: "center" },
      ]}
    >
      <Image source={{ uri: item.image }} style={styles.eventImageModified} />

      {/* Gradient Overlay for the left edge of the image to blend it with the light background */}
      <LinearGradient
        colors={["#E5EAEB", "rgba(229, 234, 235, 0.5)", "transparent"]}
        locations={[0, 0.4, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradientOverlayModified}
      />
    </View>
  </View>
);

// Renders a single announcement card
const renderAnnouncementItem = ({ item }) => (
  <View
    style={[
      styles.announcementCard,
      { marginHorizontal: RFValue(18), alignItems: "center" },
    ]}
  >
    <View style={styles.announcementHeader}></View>
    <Image source={{ uri: item.image }} style={styles.announcementImage} />
    <View style={styles.announcementBody}>
      <Text style={styles.announcementTitle}>{item.title}</Text>
    </View>
    <TouchableOpacity
      style={[
        styles.seeArticleButton,
        {
          alignItems: "center",
          justifyContent: "center",
          height: RFValue(40),
          backgroundColor: "#F5EDE0",
          marginHorizontal: RFPercentage(2),
          borderRadius: RFValue(10),
          marginBottom: RFValue(10),
          width: "90%",
        },
      ]}
    >
      <Text style={styles.seeArticleText}>See Article</Text>
    </TouchableOpacity>
  </View>
);

// --- MAIN COMPONENT ---
export default function Index() {
  const [selectedId, setSelectedId] = useState("3");
  const router = useRouter();
  const handleSelect = (id) => {
    setSelectedId(id);
  };

  const CalendarDayScroller = () => (
    <View style={{ marginVertical: RFValue(15) }}>
      <FlatList
        data={CALENDAR_DATES}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: RFValue(18) }} // Add padding to the horizontal list
        renderItem={({ item }) => {
          const isFocused = item.id === selectedId;
          return (
            <TouchableOpacity
              onPress={() => handleSelect(item.id)}
              style={[
                styles.calendarDay,
                isFocused && styles.calendarDayFocused,
              ]}
            >
              <Text
                style={[
                  styles.calendarDayText,
                  isFocused && styles.calendarDayTextFocused,
                ]}
              >
                {item.day}
              </Text>
              <Text
                style={[
                  styles.calendarDateText,
                  isFocused && styles.calendarDateTextFocused,
                ]}
              >
                {item.date}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );

  // Shared value for tracking scroll position
  const scrollY = useSharedValue(0);

  // Animated Scroll Handler to update the shared value
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  // Animated style for the Header container (Height, Z-Index)
  const headerAnimatedStyle = useAnimatedStyle(() => {
    const height = interpolate(
      scrollY.value,
      [0, SCROLL_RANGE],
      [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      Extrapolate.CLAMP
    );

    return {
      height: height,
      zIndex: 10,
    };
  });

  // Animated style for the Header Text (Opacity, Scale)
  const headerTextAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [0, SCROLL_RANGE * 0.7], // Fade out before full collapse
      [1, 0],
      Extrapolate.CLAMP
    );
    const scale = interpolate(
      scrollY.value,
      [0, SCROLL_RANGE * 0.7],
      [1, 0.8],
      Extrapolate.CLAMP
    );

    return {
      opacity: opacity,
      transform: [{ scale: scale }],
    };
  });

  const player = useVideoPlayer(IMAGES.HomeImage, (player) => {
    player.loop = true;
    player.muted = true;
    player.play();
  });
  // Animated style for fixedTopBar (show only after video hides)
  const fixedTopBarAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [SCROLL_RANGE - 50, SCROLL_RANGE], // appear smoothly near collapse
      [0, 1],
      Extrapolate.CLAMP
    );
    const translateY = interpolate(
      scrollY.value,
      [SCROLL_RANGE - 50, SCROLL_RANGE],
      [-20, 0],
      Extrapolate.CLAMP
    );

    return {
      opacity,
      transform: [{ translateY }],
    };
  });

  // --- RENDER ---
  return (
    <View style={styles.container}>
      <Animated.View style={[styles.fixedTopBar, fixedTopBarAnimatedStyle]}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: RFValue(20),
          }}
        >
          <Image
            source={IMAGES.PortalImage}
            style={styles.LogoIconHeader}
            resizeMode="contain"
          />
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Image
              source={{ uri: PROFILE_IMAGE_URL }}
              style={styles.ProfileiconHeader}
              resizeMode="contain"
            />
          </View>
        </View>
      </Animated.View>

      {/* 1. Collapsible Header Container */}
      <Animated.View
        style={[styles.headerContainer, headerAnimatedStyle, { zIndex: 0 }]} // ensure video is below
      >
        <ImageBackground
          source={IMAGES.Homebackground}
          style={[
            StyleSheet.absoluteFill,
            {
              alignItems: "center",
              justifyContent: "center",
              paddingTop: RFPercentage(10),
            },
          ]}
        >
          <Image
            source={IMAGES.HomeLogo}
            style={{ height: RFValue(70), width: RFValue(130) }}
            resizeMode="contain"
          />

          <View style={styles.headerContent}>
            <Animated.View
              style={[styles.headerTitleContainer, headerTextAnimatedStyle]}
            ></Animated.View>
          </View>
        </ImageBackground>
      </Animated.View>

      <ImageBackground
        source={IMAGES.HomeBg}
        style={[
          StyleSheet.absoluteFill,
          {
            alignItems: "center",
            justifyContent: "center",
            paddingTop: RFPercentage(10),
          },
        ]}
        resizeMode="contain"
      ></ImageBackground>
      {/* 2. Scrollable Content */}
      <Animated.ScrollView
        style={[styles.scrollView, { zIndex: 10 }]} // <-- bring above video
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Upcoming Appointments ABOVE video */}
        <View
          style={[
            styles.contentCard,
            {
              marginTop: -RFValue(30), // creates overlap with header video
              zIndex: 10,
              marginHorizontal: RFPercentage(3),
            },
          ]}
        >
          {/* Upcoming Appointments */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>My <Text style={{fontWeight:'400'}}>Schedule</Text></Text>
            <Image source={IMAGES.Export} style={styles.iconSmall} />
          </View>
          <FlatList
            data={APPOINTMENTS}
            keyExtractor={(item) => item.id}
            renderItem={renderAppointmentItem}
            scrollEnabled={false}
          />
        </View>
        {/* Community Posts */}
        {renderCommunityPosts()}
        <View style={styles.communityGrid}>
          <TouchableOpacity
            style={styles.communityItem}
            onPress={() => router.push("/tabs/home/viewDrafts")}
          >
            <View style={styles.communityIconView}>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>5</Text>
              </View>
              <Image
                source={IMAGES.Drafts}
                style={styles.communityIcon}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.communityText}>View Drafts</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.communityItem}
            onPress={() => router.push("/tabs/home/createNewPost")}
          >
            <View style={styles.communityIconView}>
              <Image
                source={IMAGES.Create}
                style={styles.communityIcon}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.communityText}>Create New</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.communityItem}>
            <Image
              source={IMAGES.AiIcon}
              style={[
                styles.communityIcon,
                { height: RFValue(32), width: RFValue(32) },
              ]}
              resizeMode="contain"
            />
            <Text style={[styles.communityText, { marginTop: RFValue(8) }]}>
              Create with AI
            </Text>
          </TouchableOpacity>
        </View>

        {/* Calendar of Convenings */}
        <View style={[styles.sectionHeader, { marginHorizontal: RFValue(18) }]}>
          <Text style={styles.sectionTitle}>Calendar Of Convenings</Text>
          <Image source={IMAGES.Export} style={styles.iconSmall} />
        </View>
        <CalendarDayScroller />
        <FlatList
          data={CALENDAR_EVENTS}
          keyExtractor={(item) => item.id}
          renderItem={renderCalendarEventItem}
          scrollEnabled={false}
          contentContainerStyle={styles.eventListContainer} // Added container style for margin
        />

        {/* Announcements */}
        <View
          style={[
            styles.sectionHeader,
            { marginTop: RFValue(20), marginHorizontal: RFValue(18) },
          ]}
        >
          <Text style={[styles.sectionTitle, {}]}>Announcements</Text>
          <Image source={IMAGES.Export} style={styles.iconSmall} />
        </View>
        <FlatList
          data={ANNOUNCEMENTS}
          keyExtractor={(item) => item.id}
          renderItem={renderAnnouncementItem}
          scrollEnabled={false}
        />

        <View style={{ height: 100 }} />
      </Animated.ScrollView>
    </View>
  );
}

// --- STYLES ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e7eaf0", // Background color from screenshot
  },
  fixedTopBar: {
    position: "absolute",
    top: RFValue(0),
    paddingTop: RFValue(40),
    left: 0,
    right: 0,
    backgroundColor: "white",
    justifyContent: "center",
    zIndex: 99,
  },
  // --- HEADER STYLES ---
  headerContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "black", // Fallback
    paddingTop: RFValue(40),
    overflow: "hidden",
    bottom: 100,
  },
  liningImage: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.3,
    // Note: The actual lining image would need to be tiled. This is a placeholder.
  },
  headerContent: {
    flex: 1,
    paddingHorizontal: RFValue(20),
    justifyContent: "space-between",
    paddingBottom: RFValue(15),
  },
  headerTopBar: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  profileImage: {
    width: RFValue(35),
    height: RFValue(35),
    borderRadius: RFValue(17.5),
    borderWidth: 2,
    borderColor: "white",
    position: "absolute",
    left: 0,
    top: 0,
  },
  settingsButton: {
    padding: RFValue(5),
  },
  settingsIcon: {
    width: RFValue(20),
    height: RFValue(20),
    tintColor: "white",
  },
  LogoIcon: {
    width: RFValue(80),
    height: RFValue(50),
    tintColor: "white",
  },
  LogoIconHeader: {
    width: RFValue(40),
    height: RFValue(40),
    tintColor: "gray",
  },
  ProfileiconHeader: {
    width: RFValue(25),
    height: RFValue(25),
    borderRadius: 100,
  },
  headerTitleContainer: {
    alignItems: "center",
  },
  historyText: {
    fontSize: RFValue(40),
    color: "white",
    fontWeight: "400",
    fontFamily: "Italianno-Regular",
    alignSelf: "center",
    paddingRight: RFValue(5),
  },
  minimizedTitle: {
    fontSize: RFValue(20),
    color: "white",
    fontWeight: "bold",
    position: "absolute",
    bottom: RFValue(10),
    left: RFValue(20),
    zIndex: 20,
  },
  // --- SCROLL CONTENT STYLES ---
  scrollView: {
    flex: 1,
    zIndex: 1,
  },
  scrollContent: {
    paddingTop: HEADER_MAX_HEIGHT, // Start content below the max header height
  },
  contentCard: {
    backgroundColor: "#fff",
    borderRadius: RFValue(15),
    paddingHorizontal: RFValue(20),
    paddingVertical: RFValue(20),
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: RFValue(20),
  },
  sectionTitle: {
    fontSize: RFValue(16),
    fontWeight: "bold",
    color: "#333",
  },
  iconSmall: {
    width: RFValue(18),
    height: RFValue(18),
    tintColor: "#5a5a5a",
  },
  // --- APPOINTMENT STYLES (Margin removed to use contentCard padding) ---
  appointmentCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#E0E9ED",
    borderRadius: RFValue(10),
    padding: RFValue(12),
    marginBottom: RFValue(10),
    borderLeftWidth: RFValue(5),
    borderLeftColor: "#E0E9ED", // Dummy focus color
  },
  appointmentName: {
    fontSize: RFValue(12),
    fontWeight: "bold",
    color: "#333",
  },
  appointmentTeam: {
    fontSize: RFValue(10),
    color: "#777",
  },
  appointmentDate: {
    fontSize: RFValue(10),
    color: "#333",
    marginLeft: RFValue(4),
  },
  appointmentTime: {
    fontSize: RFValue(10),
    color: "#333",
    marginLeft: RFValue(4),
  },
  iconTiny: {
    width: RFValue(10),
    height: RFValue(10),
    tintColor: "#5a5a5a",
  },
  avatarSmall: {
    width: RFValue(30),
    height: RFValue(30),
    borderRadius: RFValue(15),
    marginLeft: RFValue(10),
  },
  // --- COMMUNITY POST STYLES ---
  communityPostsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: RFValue(20),
    marginBottom: RFValue(10),
    marginHorizontal: RFValue(20),
  },
  communityGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: RFValue(20),
    marginHorizontal: RFValue(20),
  },
  communityItem: {
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 20,
    justifyContent: "center",
    width: RFValue(80),
    height: RFValue(80),
    margin: RFValue(5),
  },
  communityIcon: {
    width: RFValue(18),
    height: RFValue(18),
    justifyContent: "center",
    alignItems: "center",
  },
  communityIconView: {
    borderRadius: 10,
    height: RFValue(35),
    width: RFValue(35),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F3F7F8",
  },

  communityText: {
    fontSize: RFValue(10),
    color: "#555",
    textAlign: "center",
    marginTop: RFValue(5),
  },
  badge: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "red",
    borderRadius: 8,
    width: 16,
    height: 16,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  badgeText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
  // --- CALENDAR STYLES ---
  calendarDay: {
    paddingHorizontal: RFValue(15),
    paddingVertical: RFValue(13),
    borderRadius: RFValue(10),
    marginRight: RFValue(10),
    alignItems: "center",
  },
  calendarDayFocused: {
    backgroundColor: "#105D7A",
  },
  calendarDayText: {
    fontSize: RFValue(10),
    color: "#777",
    fontWeight: "600",
  },
  calendarDayTextFocused: {
    color: "white",
  },
  calendarDateText: {
    fontSize: RFValue(16),
    color: "#333",
    fontWeight: "bold",
    marginTop: RFValue(3),
  },
  calendarDateTextFocused: {
    color: "white",
  },
  // Container style to apply horizontal margin to all list items
  eventListContainer: {
    paddingHorizontal: RFValue(20),
  },

  // --- MODIFIED EVENT CARD STYLES ---
  eventCardModified: {
    flexDirection: "row",
    backgroundColor: "#E5EAEB", // Light background color from the screenshot
    borderRadius: RFValue(7),
    marginBottom: RFValue(15),
    overflow: "hidden",
    height: RFValue(70), // Fixed height as seen in the screenshot
    flex: 1,
    width: "100%",
  },

  eventTextContainerModified: {
    width: "80%",
    justifyContent: "center", // Center content vertically
    paddingVertical: RFValue(10),
    paddingHorizontal: RFValue(10),
    borderWidth: 1,
    zIndex: 1,
  },

  eventImageContainerModified: {
    width: "50%",
    position: "relative",
    zIndex: 0, // Needed for absolute positioning of the gradient
  },

  eventImageModified: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    opacity: 0.7, // Make the image slightly transparent as in the screenshot
  },

  gradientOverlayModified: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    width: "100%", // Cover the entire image width for a full fade
  },

  eventTitleModified: {
    fontSize: RFValue(10), // Larger font for the title
    fontWeight: "bold",
    color: "#333",
    marginBottom: RFValue(2),
  },
  eventLocationModified: {
    fontSize: RFValue(10),
    color: "#555",
    fontWeight: "400",
  },

  detailRowModified: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: RFValue(5), // Spacing between rows
  },

  eventDetailTimeModified: {
    fontSize: RFValue(10),
    fontWeight: "normal", // Time should be normal weight
    color: "#555",
    marginLeft: RFValue(6),
  },
  eventDetailTypeModified: {
    fontSize: RFValue(11),
    fontWeight: "normal", // Type should be normal weight
    color: "#555",
    marginLeft: RFValue(8), // Space after the dot
  },

  iconClock: {
    width: RFValue(16),
    height: RFValue(16),
    tintColor: "#777", // Gray tint for the clock icon
    marginRight: RFValue(4),
  },

  dotIconStyle: {
    width: RFValue(6),
    height: RFValue(6),
    borderRadius: RFValue(3),
    backgroundColor: "#777",
    marginRight: RFValue(8),
    marginLeft: RFValue(4), // Aligns the dot under the clock icon
    marginTop: RFValue(5), // Additional spacing to align dot with time icon
    marginBottom: RFValue(5), // Additional spacing to align dot with time icon
  },

  // --- ANNOUNCEMENT STYLES ---
  announcementCard: {
    backgroundColor: "#fff",
    borderRadius: RFValue(10),
    marginBottom: RFValue(15),
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#eee",
    marginHorizontal: RFValue(20), // Added horizontal margin for consistency
  },
  announcementHeader: {
    paddingHorizontal: RFValue(15),
    paddingTop: RFValue(10),
    alignItems: "flex-end",
  },
  announcementDate: {
    fontSize: RFValue(10),
    color: "#b47c49",
    fontWeight: "600",
  },
  announcementImage: {
    width: "90%",
    height: RFValue(150),
    borderRadius: 10,
  },
  announcementBody: {
    padding: RFValue(15),
  },
  announcementTitle: {
    fontSize: RFValue(14),
    fontWeight: "bold",
    color: "#333",
    marginBottom: RFValue(5),
  },
  announcementTime: {
    fontSize: RFValue(10),
    color: "#b47c49",
    marginBottom: RFValue(5),
  },
  announcementAuthor: {
    fontSize: RFValue(10),
    color: "#777",
  },
  seeArticleButton: {
    alignItems: "flex-start",
    paddingHorizontal: RFValue(15),
    // paddingBottom: RFValue(15),
  },
  seeArticleText: {
    fontSize: RFValue(12),
    color: "#b47c49",
    fontWeight: "600",
  },
  // --- Removed old event styles for cleanliness ---
  eventCard: { display: "none" },
  eventImage: { display: "none" },
  eventTextContainer: { display: "none" },
  eventTitle: { display: "none" },
  eventLocation: { display: "none" },
  eventDetail: { display: "none" },
  dotSeparator: { display: "none" },
});
