import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Dimensions,
  // Modal is often used for true dropdowns, but we will use conditional rendering and absolute positioning
  // to adhere to the strict inline styling request without introducing a full Modal implementation.
} from "react-native";
import React, { useState } from "react";
import { AntDesign, Ionicons, FontAwesome } from "@expo/vector-icons";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { router } from "expo-router";
// Assuming 'router' is available from 'expo-router' based on your previous code
// import { router } from "expo-router"; 

// --- Configuration ---
const { width } = Dimensions.get("window");

const COLORS = {
  white: "#FFFFFF",
  backgroundGrey: "#F8F8F8", // Light background color
  cardGrey: "#FFFFFF", // Card background
  darkText: "#333333",
  lightText: "#777777",
  primaryBlue: "#007AFF",
  confirmedGreen: "#4CAF50", // Brighter green
  pendingOrange: "#FF9800", // Orange
  cancelledRed: "#F44336", // Red
  lightGreenBackground: "#E8F5E9", // Light green for confirmed card
  lightOrangeBackground: "#FFF3E0", // Light orange for pending card
  lightGreyBackground: "#EEEEEE", // Light grey for cancelled card
  mediumGrey: "#DDDDDD",
  activeTabBlue: "rgb(43,92,119)", // Dark blue/teal for active tab
};

// --- Dummy Data ---
const CALENDAR_DATES = [
  { id: "1", day: "SAT", date: "14", isSelected: false },
  { id: "2", day: "SUN", date: "15", isSelected: false },
  { id: "3", day: "MON", date: "16", isSelected: true },
  { id: "4", day: "TUE", date: "17", isSelected: false },
  { id: "5", day: "WED", date: "18", isSelected: false },
  { id: "6", day: "THU", date: "19", isSelected: false },
  { id: "7", day: "FRI", date: "20", isSelected: false },
];

const BOOKING_DATA = [
  {
    id: "1",
    status: "CONFIRMED",
    statusColor: COLORS.confirmedGreen,
    backgroundColor: COLORS.lightGreenBackground,
    title: "Summer Institute 2024",
    meetingDetail: "Meeting with Liam Norman",
    date: "Mon, Nov - 16, 2024",
    Time: "(9:00 PM : 9:30 PM)",
  },
  {
    id: "2",
    status: "PENDING",
    statusColor: COLORS.pendingOrange,
    backgroundColor: COLORS.lightOrangeBackground,
    title: "Summer Institute 2024",
    meetingDetail: "Meeting with Ethan Carter",
    date: "Mon, Nov - 16, 2024",
    Time: "(9:00 PM : 9:30 PM)",
  },
  {
    id: "3",
    status: "CANCELLED",
    statusColor: COLORS.cancelledRed,
    backgroundColor: COLORS.lightGreyBackground,
    title: "Summer Institute 2024",
    meetingDetail: "Meeting with Olivia Johnson",
    date: "Mon, Nov - 16, 2024",
    Time: "(9:00 PM : 9:30 PM)",
  },
  {
    id: "4",
    status: "CONFIRMED",
    statusColor: COLORS.confirmedGreen,
    backgroundColor: COLORS.lightGreenBackground,
    title: "Summer Institute 2024",
    meetingDetail: "Meeting with Liam Norman",
    date: "Mon, Nov - 16, 2024",
    Time: "(9:00 PM : 9:30 PM)",
  },
];

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const CURRENT_YEAR = new Date().getFullYear();
const START_YEAR = 1925;
const YEAR_RANGE = Array.from(
  { length: CURRENT_YEAR - START_YEAR + 1 },
  (_, i) => START_YEAR + i
).reverse();

const FILTER_TABS = [
    { key: 'all', label: 'All' },
    { key: 'confirmed', label: 'Confirmed' },
    { key: 'pending', label: 'Pending' },
    { key: 'cancelled', label: 'Cancelled' },
];

// --- Custom Components ---

// New Component for Filter Tabs
const BookingFilterTabs = ({ selectedFilter, onSelectFilter }) => (
    <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ 
            paddingHorizontal: RFValue(20), 
            paddingBottom: RFValue(15), 
            marginTop: RFValue(5) 
        }}
    >
        {FILTER_TABS.map((tab) => {
            const isSelected = tab.key === selectedFilter;
            return (
                <TouchableOpacity
                    key={tab.key}
                    onPress={() => onSelectFilter(tab.key)}
                    style={{
                        paddingHorizontal: RFValue(15),
                        paddingVertical: RFValue(10),
                        borderRadius: RFValue(8),
                        marginRight: RFValue(10),
                        backgroundColor: isSelected ? COLORS.activeTabBlue : COLORS.cardGrey,
                        borderWidth: isSelected ? 0 : 1,
                        borderColor: COLORS.mediumGrey,
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 1 },
                        shadowOpacity: isSelected ? 0.2 : 0,
                        shadowRadius: isSelected ? 2 : 0,
                        elevation: isSelected ? 3 : 0,
                    }}
                >
                    <Text
                        style={{
                            fontSize: RFValue(12),
                            fontWeight: isSelected ? "bold" : "500",
                            color: isSelected ? COLORS.white : COLORS.darkText,
                        }}
                    >
                        {tab.label}
                    </Text>
                </TouchableOpacity>
            );
        })}
    </ScrollView>
);


const CalendarDayScroller = ({ selectedId, handleSelect }) => (
  <View style={{ marginVertical: RFValue(15), marginLeft: RFValue(20) }}>
    <FlatList
      data={CALENDAR_DATES}
      keyExtractor={(item) => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => {
        const isFocused = item.id === selectedId;
        return (
          <TouchableOpacity
            onPress={() => handleSelect(item.id)}
            style={{
              paddingHorizontal: RFValue(15),
              paddingVertical: RFValue(13),
              borderRadius: RFValue(10),
              marginRight: RFValue(10),
              alignItems: "center",
              backgroundColor: isFocused ? "rgb(43,92,119)" : COLORS.cardGrey,
              // Removed border to match the calendar days in the new image
            }}
          >
            <Text
              style={{
                fontSize: RFValue(10),
                color: isFocused ? COLORS.white : COLORS.lightText,
                fontWeight: "600",
              }}
            >
              {item.day}
            </Text>
            <Text
              style={{
                fontSize: RFValue(16),
                color: isFocused ? COLORS.white : COLORS.darkText, // Changed to darkText for inactive dates to match image
                fontWeight: "bold",
                marginTop: RFValue(3),
              }}
            >
              {item.date}
            </Text>
          </TouchableOpacity>
        );
      }}
    />
  </View>
);

const BookingCard = ({ data }) => {
  const {
    status,
    statusColor,
    backgroundColor,
    title,
    meetingDetail,
    date,
    Time,
  } = data;

  return (
    <View
      style={{
        backgroundColor: backgroundColor,
        borderRadius: RFValue(12),
        marginHorizontal: RFValue(20),
        marginBottom: RFValue(15),
        overflow: "hidden",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
        elevation: 1,
      }}
    >
      {/* Status Tag */}
      <View
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          backgroundColor: statusColor,
          paddingHorizontal: RFValue(10),
          paddingVertical: RFValue(5),
          borderBottomLeftRadius: RFValue(8),
          zIndex: 1,
        }}
      >
        <Text
          style={{
            color: COLORS.white,
            fontWeight: "bold",
            fontSize: RFValue(9),
            letterSpacing: 0.5,
          }}
        >
          {status}
        </Text>
      </View>

      {/* Card Content */}
      <View style={{ padding: RFValue(15) }}>
        <Text
          style={{
            fontSize: RFValue(15),
            fontWeight: "bold",
            color: COLORS.darkText,
            marginBottom: RFValue(5),
          }}
        >
          {title}
        </Text>
        
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: 'flex-start' }}>
          <View style={{flexDirection:'column', flex: 1, marginRight: RFValue(10)}}>
            <Text
              style={{
                fontSize: RFValue(13),
                color: COLORS.darkText,
                fontWeight: "600",
                marginBottom: RFValue(2),
              }}
            >
              {meetingDetail}
            </Text>
            <Text
              style={{
                fontSize: RFValue(11),
                color: COLORS.darkText,
                marginTop:RFValue(5)
              }}
            >
              {date}
            </Text>
            <Text
              style={{
                fontSize: RFValue(11),
                color: COLORS.lightText,
                marginBottom: RFValue(10),
              }}
            >
              {Time}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "center",
              paddingTop: RFValue(5),
              // Adjusted to remove unnecessary border logic inside the card
            }}
          >
            {/* View Icon (Eye) */}
            <TouchableOpacity style={{ padding: RFValue(5) }}>
              <FontAwesome
                name="eye"
                size={RFValue(18)}
                color={COLORS.lightText}
              />
            </TouchableOpacity>

            {/* Delete Icon (Trash) */}
            <TouchableOpacity
              style={{ marginLeft: RFValue(15), padding: RFValue(5) }}
            >
              <FontAwesome
                name="trash-o"
                size={RFValue(18)}
                color={COLORS.lightText}
              />
            </TouchableOpacity>
          </View>
        </View>

      </View>
    </View>
  );
};

/**
 * Custom Dropdown Component using absolute positioning and a ScrollView.
 */
const CustomDropdown = ({ data, selectedValue, onSelect, onClose }) => (
  <View
    style={{
      position: "absolute",
      top: RFValue(35), // Position below the dropdown button
      width: "100%",
      maxHeight: RFValue(200),
      backgroundColor: COLORS.white,
      borderRadius: RFValue(8),
      borderWidth: 1,
      borderColor: COLORS.mediumGrey,
      elevation: 5,
      zIndex: 10, // Ensure it floats above other content
    }}
  >
    <ScrollView showsVerticalScrollIndicator={false}>
      {data.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => {
            onSelect(item);
            onClose(); // Close after selection
          }}
          style={{
            paddingHorizontal: RFValue(15),
            paddingVertical: RFValue(10),
            backgroundColor:
              item === selectedValue ? COLORS.backgroundGrey : COLORS.white,
          }}
        >
          <Text
            style={{
              fontSize: RFValue(12),
              color:
                item === selectedValue ? COLORS.primaryBlue : COLORS.darkText,
              fontWeight: item === selectedValue ? "bold" : "normal",
            }}
          >
            {item}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  </View>
);

// --- Main Component ---
export default function ViewBookings() {
  const [selectedDayId, setSelectedDayId] = useState("3");
  const [selectedMonth, setSelectedMonth] = useState("November");
  const [selectedYear, setSelectedYear] = useState(CURRENT_YEAR.toString());
  const [isMonthDropdownOpen, setIsMonthDropdownOpen] = useState(false);
  const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all'); // New state for filter tabs

  const handleSelectDay = (id) => {
    setSelectedDayId(id);
  };

  const handleMonthSelect = (month) => {
    setSelectedMonth(month);
  };

  const handleYearSelect = (year) => {
    setSelectedYear(year);
  };
  
  const handleSelectFilter = (filter) => {
      setSelectedFilter(filter);
      // Logic to filter BOOKING_DATA would go here
  };


  const toggleMonthDropdown = () => {
    setIsMonthDropdownOpen(!isMonthDropdownOpen);
    setIsYearDropdownOpen(false); // Close other dropdown
  };

  const toggleYearDropdown = () => {
    setIsYearDropdownOpen(!isYearDropdownOpen);
    setIsMonthDropdownOpen(false); // Close other dropdown
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.backgroundGrey }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* --- Header --- */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: RFValue(20),
            backgroundColor: COLORS.white,
            borderBottomWidth: 1,
            borderBottomColor: COLORS.mediumGrey,
            paddingTop: RFPercentage(8), 
          }}
        >
          <TouchableOpacity onPress={() => router.back()}> 
            {/* Replace console.log with router.back() if using expo-router */}
            <Ionicons
              name="chevron-back"
              size={RFValue(24)}
              color={COLORS.darkText}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: RFValue(16),
              fontWeight: "600",
              color: COLORS.darkText,
              marginLeft: RFValue(15),
            }}
          >
            View Bookings
          </Text>
        </View>

        {/* --- Month & Year Dropdowns Container --- */}
        <View
          style={{
            backgroundColor: COLORS.cardGrey, // Changed background to white/cardGrey
            paddingTop: RFValue(20), // Added top padding for spacing from header
          }}
        >
            <View
            style={{
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: RFValue(20),
                // marginTop: RFValue(20), // Removed as top padding is on parent view
                zIndex: 1,
                justifyContent: "space-between",
            }}
            >
                {/* Month Dropdown Area */}
                <View
                    style={{
                    // width: '48%', // Flexible width
                    flex: 1,
                    marginRight: RFValue(10),
                    // position: "relative", // Let dropdown handle its own relative positioning inside
                    zIndex: isMonthDropdownOpen ? 2 : 1,
                    }}
                >
                    <TouchableOpacity
                    onPress={toggleMonthDropdown}
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        backgroundColor: COLORS.cardGrey,
                        paddingVertical: RFValue(8),
                        paddingHorizontal: RFValue(15),
                        borderRadius: RFValue(8),
                        borderWidth: 1,
                        borderColor: COLORS.mediumGrey,
                        justifyContent: 'space-between'
                    }}
                    >
                    <Text
                        style={{
                        color: COLORS.darkText,
                        fontWeight: "600",
                        fontSize: RFValue(12),
                        }}
                    >
                        {selectedMonth}
                    </Text>
                    <AntDesign
                        name="down"
                        size={RFValue(12)}
                        color={COLORS.darkText}
                        style={{ marginLeft: RFValue(5), top: 1 }}
                    />
                    </TouchableOpacity>

                    {isMonthDropdownOpen && (
                    <CustomDropdown
                        data={MONTHS}
                        selectedValue={selectedMonth}
                        onSelect={handleMonthSelect}
                        onClose={() => setIsMonthDropdownOpen(false)}
                    />
                    )}
                </View>

                {/* Year Dropdown Area */}
                <View
                    style={{
                    // width: '48%', // Flexible width
                    flex: 1,
                    // position: "relative", // Let dropdown handle its own relative positioning inside
                    zIndex: isYearDropdownOpen ? 2 : 1,
                    }}
                >
                    <TouchableOpacity
                    onPress={toggleYearDropdown}
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        backgroundColor: COLORS.cardGrey,
                        paddingVertical: RFValue(8),
                        paddingHorizontal: RFValue(15),
                        borderRadius: RFValue(8),
                        borderWidth: 1,
                        borderColor: COLORS.mediumGrey,
                        justifyContent: 'space-between'
                    }}
                    >
                    <Text
                        style={{
                        color: COLORS.darkText,
                        fontWeight: "600",
                        fontSize: RFValue(12),
                        }}
                    >
                        {selectedYear}
                    </Text>
                    <AntDesign
                        name="down"
                        size={RFValue(12)}
                        color={COLORS.darkText}
                        style={{ marginLeft: RFValue(5), top: 1 }}
                    />
                    </TouchableOpacity>

                    {isYearDropdownOpen && (
                    <CustomDropdown
                        data={YEAR_RANGE.map(String)} 
                        selectedValue={selectedYear}
                        onSelect={handleYearSelect}
                        onClose={() => setIsYearDropdownOpen(false)}
                    />
                    )}
                </View>
            </View>

            {/* --- Calendar Week View --- */}
            <CalendarDayScroller
                selectedId={selectedDayId}
                handleSelect={handleSelectDay}
            />

            {/* --- Filter Buttons (New Section) --- */}
            <BookingFilterTabs
                selectedFilter={selectedFilter}
                onSelectFilter={handleSelectFilter}
            />

        </View>

        {/* --- Booking Cards List --- */}
        <View style={{ marginTop: RFValue(5),marginBottom:RFPercentage(15) }}>
          {BOOKING_DATA.map((item) => (
            <BookingCard key={item.id} data={item} />
          ))}
        </View>

        {/* Add padding at the bottom for scrolling comfort */}
        <View style={{ height: RFValue(50) }} />
      </ScrollView>
    </View>
  );
}