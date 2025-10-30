import {
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Dimensions,
  ImageBackground,
  StyleSheet,
  FlatList,
  Modal,
  Switch,
  TouchableWithoutFeedback,
  RefreshControl,
} from "react-native";

import React, { useState } from "react";
import * as IMAGES from "../../../components/Images";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { useRouter } from "expo-router";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");
const PROFILE_IMAGE_URL = "https://i.pravatar.cc/150?img=5";

const COLORS = {
  primaryBlue: "#1565C0",
  darkTeal: "#004D40",
  lightGrey: "#F0F0F0",
  darkText: "#333333",
  lightText: "#666666",
  white: "#FFFFFF",
  cardBackground: "#FFFFFF",
  overlayRed: "#E53935",
  tanGradientEnd: "#E6C4A6",

  confirmedGreen: "#4CAF50",
  pendingOrange: "#FF9800",
  cancelledRed: "#F44336",
  mapLightGrey: "#E0E0E0",
  actionButtonBlue: "#007AFF",
  viewMoreBlue: "#ADD8E6",

  modalDarkTeal: "rgb(43,92,119)",
  modalBackground: "rgba(0,0,0,0.5)",
  separator: "#DDDDDD",
  boxGrey: "rgb(241,242,246)",
};

const CALENDAR_DATES = [
  { id: "1", day: "SAT", date: "14" },
  { id: "2", day: "SUN", date: "15" },
  { id: "3", day: "MON", date: "16" },
  { id: "4", day: "TUE", date: "17" },
  { id: "5", day: "WED", date: "18" },
  { id: "6", day: "THU", date: "19" },
  { id: "7", day: "FRI", date: "20" },
];

const SCHEDULE_DATA = [
  {
    id: "1",
    status: "CONFIRMED",
    statusColor: COLORS.confirmedGreen,
    title: "Summer Institute 2024",
    description:
      "Lorem Ipsum Dolor Sit Amet Consectetur. Sed Ullamcorper Sit Tristique Aliquam. Leo In Sed.",
    time: "09:00 CST",
    location: "Salt Lake City, Utah",
  },
  {
    id: "2",
    status: "PENDING",
    statusColor: COLORS.pendingOrange,
    title: "Summer Institute 2024",
    description:
      "Lorem Ipsum Dolor Sit Amet Consectetur. Sed Ullamcorper Sit Tristique Aliquam. Leo In Sed.",
    time: "09:00 CST",
    location: "Salt Lake City, Utah",
  },
  {
    id: "3",
    status: "CANCELLED",
    statusColor: COLORS.cancelledRed,
    title: "Summer Institute 2024",
    description:
      "Lorem Ipsum Dolor Sit Amet Consectetur. Sed Ullamcorper Sit Tristique Aliquam. Leo In Sed.",
    time: "09:00 CST",
    location: "Salt Lake City, Utah",
  },
];
const EVENTS = [
  {
    id: "1",
    title: "Summer Institute 2024",
    location: "Salt Lake City, Utah",
    time: "09:00 - 09:30",
    type: "Online",
    image: IMAGES.Event1,
  },
  {
    id: "2",
    title: "Spring Thought  2024",
    location: "Sunnydale, California",
    time: "09:00 - 09:30",
    type: "In-person",
    image: IMAGES.Event2,
  },
  {
    id: "3",
    title: "Global Health Summit",
    location: "New York City, NY",
    time: "10:00 - 11:00",
    type: "Hybrid",
    image: IMAGES.Event1, // Add image in IMAGES file
  },
  {
    id: "4",
    title: "Education Leaders Forum",
    location: "Chicago, Illinois",
    time: "14:00 - 15:30",
    type: "Online",
    image: IMAGES.Event2, // Add image in IMAGES file
  },
];

const CALENDAR_GRID = [
  { day: "S", date: 1, isSelected: false },
  { day: "M", date: 2, isSelected: false },
  { day: "T", date: 3, isSelected: true },
  { day: "W", date: 4, isSelected: false },
  { day: "T", date: 5, isSelected: false },
  { day: "F", date: 6, isSelected: false },
  { day: "S", date: 7, isSelected: false },
  { day: null, date: 8, isSelected: false },
  { day: null, date: 9, isSelected: false },
  { day: null, date: 10, isSelected: false },
  { day: null, date: 11, isSelected: false },
  { day: null, date: 12, isSelected: false },
  { day: null, date: 13, isSelected: false },
  { day: null, date: 14, isSelected: false },
  { day: null, date: 15, isSelected: false },
  { day: null, date: 16, isSelected: false },
  { day: null, date: 17, isSelected: false },
  { day: null, date: 18, isSelected: false },
  { day: null, date: 19, isSelected: false },
  { day: null, date: 20, isSelected: false },
  { day: null, date: 21, isSelected: true },
  { day: null, date: 22, isSelected: false },
  { day: null, date: 23, isSelected: false },
  { day: null, date: 24, isSelected: false },
  { day: null, date: 25, isSelected: false },
  { day: null, date: 26, isSelected: false },
  { day: null, date: 27, isSelected: false },
  { day: null, date: 28, isSelected: false },
  { day: null, date: 29, isSelected: false },
  { day: null, date: 30, isSelected: false },

  { day: null, date: null },
  { day: null, date: null },
  { day: null, date: null },
  { day: null, date: null },
];

const CalendarGrid = () => (
  <View style={{ paddingHorizontal: RFValue(15) }}>
    {/* Day Headers (S, M, T, W, T, F, S) */}
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: RFValue(10),
      }}
    >
      {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
        <Text
          key={index}
          style={{
            width: width / 9.5,
            textAlign: "center",
            fontSize: RFValue(10),
            color: COLORS.darkText,
            fontFamily: "Montserrat_500",
          }}
        >
          {day}
        </Text>
      ))}
    </View>
    {/* Dates */}
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
      }}
    >
      {CALENDAR_GRID.map((item, index) => {
        const date = item.date;
        const isEmpty = date === null || date === undefined;
        const isSelected = item.isSelected;

        return (
          <TouchableOpacity
            key={index}
            style={{
              width: width / 9.5,
              height: width / 9.5,
              justifyContent: "center",
              alignItems: "center",
              marginVertical: RFValue(2),
            }}
            onPress={() => console.log(`Toggled Date: ${date}`)}
            disabled={isEmpty}
          >
            {!isEmpty && (
              <View
                style={{
                  width: RFValue(28),
                  height: RFValue(28),
                  borderRadius: RFValue(14),
                  backgroundColor: isSelected
                    ? COLORS.modalDarkTeal
                    : COLORS.white,
                  borderWidth: isSelected ? 0 : 1,
                  borderColor: isSelected ? "transparent" : COLORS.separator,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: RFValue(10),
                    color: isSelected ? COLORS.white : COLORS.darkText,
                    fontFamily: "Montserrat_500",
                  }}
                >
                  {date}
                </Text>
              </View>
            )}
            {/* Empty placeholder to maintain grid structure */}
            {isEmpty && (
              <View style={{ width: RFValue(28), height: RFValue(28) }} />
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  </View>
);

const SetAvailabilityModal = ({ isVisible, onClose }) => {
  const [allowMultiple, setAllowMultiple] = useState(false);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
      statusBarTranslucent={true}
    >
      {/* MODIFIED: Replace the outer View with a TouchableWithoutFeedback */}
      <TouchableOpacity
        style={{
          flex: 1,
          justifyContent: "flex-end",
          backgroundColor: COLORS.modalBackground,
        }}
        activeOpacity={1}
        onPress={onClose}
      >
        {/* Wrap the modal content View in an inner TouchableOpacity to prevent taps from closing the modal */}
        <TouchableOpacity
          style={{
            backgroundColor: COLORS.white,
            borderTopLeftRadius: RFValue(25),
            borderTopRightRadius: RFValue(25),
            paddingTop: RFValue(15),
            paddingBottom: RFValue(30),
            maxHeight: "70%",
          }}
          activeOpacity={1}
          onPress={() => {
            /* This empty handler stops propagation */
          }}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Header Handle */}
            <View style={{ alignItems: "center", marginBottom: RFValue(10) }}>
              <View
                style={{
                  width: RFValue(40),
                  height: RFValue(5),
                  backgroundColor: COLORS.separator,
                  borderRadius: 5,
                }}
              />
            </View>

            {/* Title */}
            <Text
              style={{
                fontSize: RFValue(14),
                color: COLORS.darkText,
                paddingHorizontal: RFValue(20),
                marginBottom: RFValue(10),
                fontFamily: "Montserrat_600",
                marginTop: RFValue(10),
              }}
            >
              Set Availability
            </Text>

            {/* Select Convenings Dropdown */}
            <View
              style={{
                paddingHorizontal: RFValue(20),
                marginBottom: RFValue(20),
                marginTop: RFValue(10),
              }}
            >
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingVertical: RFValue(12),
                  paddingHorizontal: RFValue(15),
                  backgroundColor: COLORS.boxGrey,
                  borderRadius: RFValue(10),
                  borderWidth: 1,
                  borderColor: COLORS.separator,
                }}
              >
                <Text
                  style={{
                    fontSize: RFValue(11),
                    color: COLORS.darkText,
                    fontFamily: "Montserrat_400",
                  }}
                >
                  Select Convenings
                </Text>
                <AntDesign
                  name="down"
                  size={RFValue(14)}
                  color={COLORS.lightText}
                  style={{ top: 2 }}
                />
              </TouchableOpacity>
            </View>

            {/* Month/Year Navigation and Calendar */}
            <View style={{ marginBottom: RFValue(0) }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingHorizontal: RFValue(20),
                  marginBottom: RFValue(10),
                }}
              >
                {/* Month/Year Text */}
                <View style={{ flexDirection: "row", marginBottom: 10 }}>
                  <Text
                    style={{
                      fontSize: RFValue(12),
                      color: COLORS.darkText,
                      marginRight: RFValue(5),
                      fontFamily: "Montserrat_500",
                    }}
                  >
                    September
                  </Text>
                  <Text
                    style={{
                      fontSize: RFValue(12),
                      fontFamily: "Montserrat_500",
                      color: COLORS.darkText,
                    }}
                  >
                    2024
                  </Text>
                </View>

                {/* Arrows */}
                <View
                  style={{ flexDirection: "row", marginBottom: RFValue(10) }}
                >
                  <TouchableOpacity style={{ padding: RFValue(5) }}>
                    <AntDesign
                      name="left"
                      size={RFValue(12)}
                      color={COLORS.darkText}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{ padding: RFValue(5), marginLeft: RFValue(10) }}
                  >
                    <AntDesign
                      name="right"
                      size={RFValue(12)}
                      color={COLORS.darkText}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Calendar Grid Component */}
              <CalendarGrid />
            </View>

            {/* Section Separator */}
            <View
              style={{
                height: 1,
                backgroundColor: COLORS.separator,
                marginHorizontal: RFValue(20),
                marginBottom: RFValue(20),
              }}
            />

            {/* Appointment Duration */}
            <Text
              style={{
                fontSize: RFValue(12),
                fontWeight: "bold",
                color: COLORS.darkText,
                paddingHorizontal: RFValue(20),
                marginBottom: RFValue(10),
                fontFamily: "Montserrat_600",
              }}
            >
              Appointment Duration
            </Text>
            <View
              style={{
                paddingHorizontal: RFValue(20),
                marginBottom: RFValue(20),
              }}
            >
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingVertical: RFValue(12),
                  paddingHorizontal: RFValue(15),
                  backgroundColor: COLORS.boxGrey,
                  borderRadius: RFValue(10),
                  borderWidth: 1,
                  borderColor: COLORS.separator,
                }}
              >
                <Text
                  style={{
                    fontSize: RFValue(10),
                    color: COLORS.darkText,
                    fontFamily: "Montserrat_500",
                  }}
                >
                  30 Minutes
                </Text>
                <AntDesign
                  name="down"
                  size={RFValue(16)}
                  color={COLORS.lightText}
                />
              </TouchableOpacity>
            </View>

            {/* General Availability */}
            <Text
              style={{
                fontSize: RFValue(12),
                color: COLORS.darkText,
                paddingHorizontal: RFValue(20),
                marginBottom: RFValue(10),
                fontFamily: "Montserrat_600",
              }}
            >
              General Availability
            </Text>
            <View
              style={{
                paddingHorizontal: RFValue(20),
                marginBottom: RFValue(20),
              }}
            >
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingVertical: RFValue(10),
                  paddingHorizontal: RFValue(15),
                  backgroundColor: "rgb(238,253,255)",
                  borderRadius: RFValue(10),
                }}
              >
                <Ionicons
                  name="add-circle-outline"
                  size={RFValue(14)}
                  color={"rgb(87,148,174)"}
                />
                <Text
                  style={{
                    fontSize: RFValue(10),
                    color: "rgb(87,148,174)",
                    marginLeft: RFValue(5),
                    fontFamily: "Montserrat_600",
                  }}
                >
                  Set Time Slot
                </Text>
              </TouchableOpacity>
            </View>

            {/* Scheduling Window */}
            <Text
              style={{
                fontSize: RFValue(12),
                color: COLORS.darkText,
                paddingHorizontal: RFValue(20),
                marginBottom: RFValue(10),
                fontFamily: "Montserrat_600",
              }}
            >
              Scheduling Window
            </Text>

            <View
              style={{
                paddingHorizontal: RFValue(20),
                marginBottom: RFValue(15),
              }}
            >
              <Text
                style={{
                  fontSize: RFValue(10),
                  color: COLORS.lightText,
                  marginBottom: RFValue(15),
                  fontFamily: "Montserrat_400",
                }}
              >
                Maximum time in advance that an appointment can be booked
              </Text>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingVertical: RFValue(12),
                  paddingHorizontal: RFValue(15),
                  backgroundColor: COLORS.boxGrey,
                  borderRadius: RFValue(10),
                  borderWidth: 1,
                  borderColor: COLORS.separator,
                }}
              >
                <Text
                  style={{
                    fontSize: RFValue(12),
                    color: COLORS.darkText,
                    fontFamily: "Montserrat_400",
                  }}
                >
                  7 Days
                </Text>
                <AntDesign
                  name="down"
                  size={RFValue(12)}
                  color={COLORS.lightText}
                />
              </TouchableOpacity>
            </View>

            <View
              style={{
                paddingHorizontal: RFValue(20),
                marginBottom: RFValue(30),
              }}
            >
              <Text
                style={{
                  fontSize: RFValue(10),
                  color: COLORS.lightText,
                  marginBottom: RFValue(10),
                  fontFamily: "Montserrat_400",
                }}
              >
                Minimum time before the appointment that it can be booked
              </Text>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingVertical: RFValue(12),
                  paddingHorizontal: RFValue(15),
                  backgroundColor: COLORS.boxGrey,
                  borderRadius: RFValue(10),
                  borderWidth: 1,
                  borderColor: COLORS.separator,
                }}
              >
                <Text
                  style={{
                    fontSize: RFValue(10),
                    color: COLORS.darkText,
                    fontFamily: "Montserrat_400",
                  }}
                >
                  12 Hours
                </Text>
                <AntDesign
                  name="down"
                  size={RFValue(12)}
                  color={COLORS.lightText}
                />
              </TouchableOpacity>
            </View>

            {/* Allow Multiple Bookings Checkbox */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: RFValue(20),
                justifyContent: "space-between",
                marginBottom: RFPercentage(30),
              }}
            >
              <TouchableOpacity
                onPress={() => setAllowMultiple(!allowMultiple)}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                {allowMultiple ? (
                  <Feather
                    name={"square"}
                    size={RFValue(20)}
                    color={COLORS.mediumGrey}
                    style={{ marginRight: RFValue(10) }}
                  />
                ) : (
                  <AntDesign
                    name={"check-square"}
                    size={RFValue(20)}
                    style={{ marginRight: RFValue(10) }}
                  />
                )}

                <Text
                  style={{
                    fontSize: RFValue(12),
                    color: COLORS.darkText,
                    fontFamily: "Montserrat_400",
                  }}
                >
                  Allow multiple bookings
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

export default function Schedule() {
  const [selectedId, setSelectedId] = useState("3");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isCalendarModalVisible, setCalendarModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);

    // ✅ Add your refresh API logic here
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };
  const router = useRouter();

  const handleSelect = (id) => {
    setSelectedId(id);
  };

  const handleViewMore = () => {
    router.push("/tabs/schedule/viewBookings");
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  const toggleCalenderModal = () => {
    setCalendarModalVisible(!isCalendarModalVisible);
  };

  const CalendarDayScroller = () => (
    <View style={{ marginVertical: RFValue(15) }}>
      <FlatList
        data={CALENDAR_DATES}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: RFValue(18) }}
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

  const SelectCalendarModal = ({ isVisible, onClose }) => {
    const MODAL_COLORS = {
      modalBackground: "rgba(0, 0, 0, 0.5)",
      cardBg: COLORS.white,
      divider: "#CCCCCC",
    };

    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={isVisible}
        onRequestClose={onClose}
      >
        <TouchableWithoutFeedback onPress={onClose}>
          <View
            style={{
              flex: 1,
              justifyContent: "flex-end",
              backgroundColor: MODAL_COLORS.modalBackground,
            }}
          >
            <TouchableWithoutFeedback>
              <View
                style={{
                  backgroundColor: COLORS.white,
                  borderTopLeftRadius: RFValue(25),
                  borderTopRightRadius: RFValue(25),
                  paddingHorizontal: RFValue(10),
                  paddingTop: RFValue(10),
                  paddingBottom: RFPercentage(5),
                }}
              >
                {/* Drag Indicator */}
                <View
                  style={{
                    width: RFValue(40),
                    height: RFValue(4),
                    backgroundColor: MODAL_COLORS.divider,
                    borderRadius: 2,
                    alignSelf: "center",
                    marginBottom: RFValue(20),
                  }}
                />

                {/* Title */}
                <Text
                  style={{
                    fontSize: RFValue(14),
                    fontWeight: "bold",
                    color: COLORS.darkText,
                    marginBottom: RFValue(20),
                    fontFamily: "Montserrat_600",
                  }}
                >
                  Select A Calendar
                </Text>

                {/* Calendar Options */}
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  {/* Google Calendar Card */}
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      backgroundColor: 'rgb(245,246,247)',
                      borderRadius: RFValue(10),
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight:RFValue(10),
                      paddingVertical:RFValue(15)
                    }}
                    onPress={() => {
                      onClose();
                    }}
                  >
                    <Image
                      source={IMAGES.GoogleCalender}
                      style={{
                        width: RFValue(30),
                        height: RFValue(30),
                        marginBottom: RFValue(10),
                      }}
                      resizeMode="contain"
                    />
                    <Text
                      style={{
                        fontSize: RFValue(10),
                        fontWeight: "400",
                        color: COLORS.darkText,
                        fontFamily: "Montserrat_400",
                      }}
                    >
                      Google Calendar
                    </Text>
                  </TouchableOpacity>

                  {/* MS 365 Calendar Card */}
                  <TouchableOpacity
                     style={{
                      flex: 1,
                      backgroundColor: 'rgb(245,246,247)',
                      borderRadius: RFValue(10),
                      alignItems: "center",
                      justifyContent: "center",
                      paddingVertical:RFValue(15)
                    }}
                    onPress={() => {
                      console.log("MS 365 Calendar Selected");
                      onClose();
                    }}
                  >
                    <Image
                      source={IMAGES.Microsoft}
                      style={{
                        width: RFValue(30),
                        height: RFValue(30),
                        marginBottom: RFValue(10),
                      }}
                      resizeMode="contain"
                    />
                    <Text
                      style={{
                        fontSize: RFValue(10),
                        fontWeight: "400",
                        color: COLORS.darkText,
                        fontFamily: "Montserrat_400",
                      }}
                    >
                      MS 365 Calendar
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  };
  const ScheduleCard = ({ data }) => {
    const { status, title, description, time, location } = data;

    const getStatusBackgroundColor = (status) => {
      switch (status) {
        case "CONFIRMED":
          return "rgb(84,131,83)";
        case "PENDING":
          return "rgb(183,133,87)";
        case "CANCELLED":
          return "rgb(114,145,164)";
        default:
          return COLORS.lightGrey;
      }
    };

    return (
      <View
        style={{
          backgroundColor: COLORS.cardBackground,
          borderRadius: RFValue(12),
          marginHorizontal: RFValue(15),
          marginBottom: RFValue(20),
          elevation: 4,
          overflow: "hidden",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 3.84,
        }}
      >
        <ImageBackground source={IMAGES.Map} resizeMode="cover">
          {/* Status Tag */}
          <View
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              backgroundColor: getStatusBackgroundColor(status),
              paddingHorizontal: RFValue(12),
              paddingVertical: RFValue(6),
              borderTopRightRadius: RFValue(12),
              zIndex: 1,
            }}
          >
            <Text
              style={{
                color: COLORS.white,
                fontSize: RFValue(10),
                fontFamily: "Montserrat_600",
              }}
            >
              {status}
            </Text>
          </View>

          {/* Text Content */}
          <View style={{ padding: RFValue(15), paddingBottom: 0 }}>
            <Text
              style={{
                fontSize: RFValue(13),
                fontWeight: "bold",
                color: COLORS.darkText,
                marginBottom: RFValue(5),
                fontFamily: "Montserrat_600",
              }}
            >
              {title}
            </Text>
            <Text
              style={{
                fontSize: RFValue(10),
                color: COLORS.lightText,
                marginBottom: RFValue(10),
                fontFamily: "Montserrat_400",
              }}
              numberOfLines={2}
            >
              {description}
            </Text>

            {/* Time and Location Row */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: RFValue(15),
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons
                  name="time-outline"
                  size={RFValue(12)}
                  color={COLORS.lightText}
                />
                <Text
                  style={{
                    marginLeft: RFValue(5),
                    fontSize: RFValue(10),
                    color: COLORS.darkText,
                    fontFamily: "Montserrat_400",
                  }}
                >
                  {time}
                </Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons
                  name="location-outline"
                  size={RFValue(12)}
                  color={COLORS.lightText}
                />
                <Text
                  style={{
                    marginLeft: RFValue(5),
                    fontSize: RFValue(10),
                    color: COLORS.darkText,
                    flexShrink: 1,
                    fontFamily: "Montserrat_400",
                  }}
                >
                  {location}
                </Text>
              </View>
            </View>
          </View>

          {/* Map Section - Simplified Map Placeholder */}

          <View
            style={{
              height: RFValue(120),

              justifyContent: "center",
              alignItems: "center",
              marginBottom: RFValue(15),
              marginHorizontal: RFValue(15),
              borderRadius: RFValue(8),
              overflow: "hidden",
            }}
          >
            <TouchableOpacity
              style={{
                position: "absolute",
                right: RFValue(10),
                top: RFValue(10),
                backgroundColor: "rgba(235,228,222)",
                padding: RFValue(5),
                borderRadius: RFValue(5),
              }}
              onPress={() => router.push("/tabs/schedule/eventMaps")}
            >
              <Image
                source={IMAGES.Routing}
                style={{ height: RFValue(18), width: RFValue(18) }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>

          <View style={[styles.bottomActions, { paddingBottom: RFValue(10) }]}>
            <TouchableOpacity style={styles.editButton}>
              <Feather name="edit" size={22} color="gray" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.viewMoreButton}
              onPress={() => router.push("/tabs/schedule/eventDetails")}
            >
              <Text style={styles.publishButtonText}>View More</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.saveDraftButton}
              onPress={toggleCalenderModal}
            >
              <Text style={styles.saveDraftButtonText}>Add to Calendar</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
        paddingTop: RFPercentage(7),
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: RFValue(20),
          backgroundColor: "#fff",
          paddingBottom: RFPercentage(2),
          alignItems: "center",
        }}
      >
        <Image
          source={IMAGES.PortalImage}
          style={styles.LogoIconHeader}
          resizeMode="contain"
        />
        <Image
          source={{ uri: PROFILE_IMAGE_URL }}
          style={styles.ProfileiconHeader}
          resizeMode="contain"
        />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* --- Header/Background Section --- */}
        <ImageBackground
          source={IMAGES.ScheduleBg}
          resizeMode="cover"
          style={{}}
        >
          {/* --- Top Bar (Logo/Profile) --- */}

          <View style={{ paddingHorizontal: 20 }}>
            {/* --- Schedule Title --- */}
            <Text
              style={{
                fontSize: RFValue(18),
                fontWeight: "bold",
                color: COLORS.white,
                marginTop: 15,
                marginBottom: 10,
                fontFamily: "Montserrat_500",
              }}
            >
              Schedule
            </Text>

            {/* --- Your Events Section --- */}
            <Text
              style={{
                fontSize: RFValue(15),
                fontWeight: "400",
                color: COLORS.white,
                marginBottom: 15,
                marginTop: RFValue(10),
                fontFamily: "Montserrat_400",
              }}
            >
              Your events
            </Text>

            {/* Event Navigation Tabs */}

            {/* Event Cards Scroll View (Horizontal) */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ marginBottom: 20 }}
            >
              {EVENTS.map((event) => (
                <View
                  key={event.id}
                  style={{
                    width: width * 0.6,
                    marginRight: 15,
                    backgroundColor: COLORS.cardBackground,
                    borderRadius: 15,
                    overflow: "hidden",
                    elevation: 5,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 3.84,
                  }}
                >
                  {/* Background Image */}
                  <Image
                    source={event.image}
                    style={{ width: "100%", height: RFValue(100) }}
                  />

                  <View style={{ padding: RFValue(12) }}>
                    <Text
                      style={{
                        color: COLORS.darkText,
                        marginBottom: 5,
                        fontSize: RFValue(12),
                        fontFamily: "Montserrat_700",
                      }}
                    >
                      {event.title}
                    </Text>

                    <Text
                      style={{
                        fontSize: 14,
                        color: COLORS.lightText,
                        marginBottom: 10,
                        fontFamily: "Montserrat_400",
                      }}
                    >
                      {event.location}
                    </Text>

                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 14,
                          color: COLORS.darkText,
                          fontFamily: "Montserrat_400",
                        }}
                      >
                        {event.time}
                      </Text>

                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <View
                          style={{
                            width: 6,
                            height: 6,
                            borderRadius: 3,
                            backgroundColor: COLORS.lightText,
                            marginHorizontal: 10,
                          }}
                        />
                        <Text
                          style={{
                            fontSize: 14,
                            color: COLORS.darkText,
                            fontFamily: "Montserrat_400",
                          }}
                        >
                          {event.type}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        </ImageBackground>
        {/* --- Action Buttons --- */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingBottom: RFValue(30),
            paddingHorizontal: RFValue(20),
            backgroundColor: "rgb(241,243,246)",
            paddingTop: RFValue(20),
          }}
        >
          {/* View Bookings Button */}
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "rgb(255,255,255)",
              paddingVertical: RFValue(10),
              paddingHorizontal: RFValue(15),
              borderRadius: RFValue(10),
              borderWidth: 1,
              borderColor: COLORS.lightGrey,
              flex: 1,
              marginRight: RFValue(10),
              justifyContent: "center",
              elevation: 2,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.05,
              shadowRadius: 1.5,
            }}
            onPress={handleViewMore}
          >
            <View
              style={{
                padding: RFValue(5),
                backgroundColor: "rgb(241,242,246)",
                borderRadius: RFValue(10),
                marginRight: RFValue(5),
              }}
            >
              <Image
                source={IMAGES.Eye}
                resizeMode="contain"
                style={{ height: RFValue(16), width: RFValue(16) }}
              />
            </View>
            <Text
              style={{
                color: COLORS.darkText,
                fontWeight: "600",
                fontSize: RFValue(10),
                fontFamily: "Montserrat_400",
              }}
            >
              View Bookings
            </Text>
          </TouchableOpacity>

          {/* Set Availability Button - NOW OPENS MODAL */}
          <TouchableOpacity
            onPress={toggleModal}
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "rgb(255,255,255)",
              paddingVertical: RFValue(10),
              paddingHorizontal: RFValue(15),
              borderRadius: RFValue(10),
              borderWidth: 1,
              borderColor: COLORS.lightGrey,
              flex: 1,
              justifyContent: "center",
              elevation: 2,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.05,
              shadowRadius: 1.5,
            }}
          >
            <View
              style={{
                padding: RFValue(5),
                backgroundColor: "rgb(241,242,246)",
                borderRadius: RFValue(10),
                marginRight: RFValue(5),
              }}
            >
              <Image
                source={IMAGES.Calender}
                resizeMode="contain"
                style={{ height: RFValue(16), width: RFValue(16) }}
              />
            </View>
            <Text
              style={{
                color: COLORS.darkText,
                fontSize: RFValue(10),
                fontFamily: "Montserrat_400",
              }}
            >
              Set Availability
            </Text>
          </TouchableOpacity>
        </View>

        {/* --- My Schedule Section --- */}
        <View
          style={{
            marginBottom: RFValue(20),
            paddingTop: RFValue(10),
            backgroundColor: "rgb(241,242,246)",

            paddingBottom: RFPercentage(16),
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: RFValue(20),
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "600",
                color: COLORS.darkText,
                fontFamily: "Montserrat_400",
              }}
            >
              My Schedule
            </Text>
            {/* Filter Icon Placeholder */}
            <Image
              source={IMAGES.Filter}
              resizeMode="contain"
              style={{ height: RFValue(20), width: RFValue(20) }}
            />
          </View>

          {/* Month/Year Selectors */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: RFValue(15),
              justifyContent: "space-between",
              backgroundColor: "#fff",
              marginHorizontal: RFValue(20),
              borderRadius: 10,
            }}
          >
            {/* Month Dropdown */}
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: COLORS.white,
                paddingVertical: RFValue(8),
                paddingHorizontal: RFValue(15),
                borderRadius: RFValue(8),
                borderColor: COLORS.lightGrey,
                marginRight: RFValue(10),
              }}
            >
              <Text
                style={{ color: COLORS.darkText, fontFamily: "Montserrat_600" }}
              >
                November
              </Text>
              <AntDesign
                name="down"
                size={15}
                style={{
                  marginLeft: RFValue(5),
                  top: 1,
                  fontFamily: "Montserrat_400",
                }}
              />
            </TouchableOpacity>

            {/* Year Dropdown */}
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: COLORS.white,
                paddingVertical: 8,
                paddingHorizontal: RFValue(15),
                borderRadius: 8,
                borderColor: COLORS.lightGrey,
              }}
            >
              <Text
                style={{
                  color: COLORS.darkText,
                  fontWeight: "600",
                  fontFamily: "Montserrat_600",
                }}
              >
                2024
              </Text>
              <AntDesign
                name="down"
                size={15}
                style={{ marginLeft: RFValue(10), top: 1 }}
              />
            </TouchableOpacity>
          </View>

          {/* Calendar Week View */}
          <CalendarDayScroller />

          {/* --- New Schedule Cards (Added based on the image) --- */}
          <View>
            {SCHEDULE_DATA.map((item) => (
              <ScheduleCard key={item.id} data={item} />
            ))}
          </View>
        </View>
      </ScrollView>

      {/* <-- ADDED: The new Set Availability Modal is rendered here --> */}
      <SetAvailabilityModal isVisible={isModalVisible} onClose={toggleModal} />
      <SelectCalendarModal
        isVisible={isCalendarModalVisible}
        onClose={toggleCalenderModal}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  LogoIconHeader: {
    width: RFValue(40),
    height: RFValue(25),
    tintColor: "gray",
  },
  ProfileiconHeader: {
    width: RFValue(25),
    height: RFValue(25),
    borderRadius: 100,
  },
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
    fontFamily: "Montserrat_500",
  },
  calendarDayTextFocused: {
    color: "white",
    fontFamily: "Montserrat_600",
  },
  calendarDateText: {
    fontSize: RFValue(16),
    color: "#333",
    fontWeight: "bold",
    marginTop: RFValue(3),
    fontFamily: "Montserrat_700",
  },
  calendarDateTextFocused: {
    color: "white",
    fontFamily: "Montserrat_700",
  },
  bottomActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: RFValue(20),
    marginHorizontal: RFValue(10),
  },
  editButton: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
    width: RFValue(50),
    height: RFValue(40),
  },
  saveDraftButton: {
    backgroundColor: "rgb(50,113,143)",
    borderRadius: 10,
    flex: 1.2,
    alignItems: "center",
    justifyContent: "center",
    width: RFValue(60),
    height: RFValue(40),
    marginLeft: RFValue(10),
  },
  saveDraftButtonText: {
    color: "#ffff",
    fontSize: RFValue(10),
    fontWeight: "400",
    fontFamily: "Montserrat_500",
  },
  viewMoreButton: {
    backgroundColor: "#EBFEFF",
    borderRadius: 10,
    flex: 1,
    alignItems: "center",
    width: RFValue(50),
    height: RFValue(40),
    justifyContent: "center",
    marginLeft: RFValue(10),
  },
  publishButtonText: {
    color: "#077397",
    fontSize: RFValue(10),
    fontWeight: "400",
    fontFamily: "Montserrat_400",
  },
});
