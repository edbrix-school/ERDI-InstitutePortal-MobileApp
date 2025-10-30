import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import * as IMAGES from "../../../components/Images"; // Assuming your images path is correct
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { useState } from "react";
import { useRouter } from "expo-router";
import { Feather, Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

const COLORS = {
  darkText: "#333333",
  lightText: "#666666",
  white: "#FFFFFF",
  separator: "#EEEEEE",

  agendaBlue: "#105D7A",
  agendaInactive: "#D0D0D0",
  speakerCard: "#F8F8F8",

  tagBlue: "#E0F7FA",
  tagDarkBlue: "#00BCD4",
  tagGreen: "#E8F5E9",
  tagDarkGreen: "#4CAF50",
  tagYellow: "#FFFDE7",
  tagDarkYellow: "#FFC107",
  tagBrown: "#FBEFE6",
  tagDarkBrown: "#8D6E63",
  background: "#e4e4e4ff",
  mediumGrey: "#DDDDDD",
};

const SPEAKERS_DATA = [
  {
    id: "1",
    name: "Oliver Thompson",
    img: "https://i.pravatar.cc/150?img=5",
    title: "Superintendent",
  },
  {
    id: "2",
    name: "Mia Johnson",
    img: "https://i.pravatar.cc/150?img=2",
    title: "Director",
  },
  {
    id: "3",
    name: "Noah Wilson",
    img: "https://i.pravatar.cc/150?img=3",
    title: "Chief Technology Officer",
  },
  {
    id: "4",
    name: "Sophia Brown",
    img: "https://i.pravatar.cc/150?img=4",
    title: "Educational Consultant",
  },
  {
    id: "5",
    name: "Liam Anderson",
    img: "https://i.pravatar.cc/150?img=6",
    title: "Director of Programs",
  },
  {
    id: "6",
    name: "Ava Martinez",
    img: "https://i.pravatar.cc/150?img=7",
    title: "Chief Technology Officer",
  },
];

//
const AGENDA_DAYS = [
  { id: "1", day: "Day", number: "1" },
  { id: "2", day: "Day", number: "2" },
  { id: "3", day: "Day", number: "3" },
  { id: "4", day: "Day", number: "4" },
];

const AGENDA_SESSIONS = [
  {
    id: "a1",
    title: "What Happens to a Dream Deferred?",
    description:
      "In 1951 the famed author and poet Langston Hughes penned the poem 'Harlem What Happens to a Dream Deferred.' The short poem poses questions ab. In 1951 the famed author and poet Langston Hughes penned the short poem poses questions ab.",
    speaker: "Baron Davis",
    speakerTitle: "Superintendent, School District Two. Columbia, SC",
    date: "09.15.24 - Tue",
    time: "9:00 AM - 9:30 AM CT",
    location: "Online",
    tags: [
      {
        text: "EQUITY",
        bg: COLORS.tagGreen,
        color: COLORS.tagDarkGreen,
        number: "1",
      },
      { text: "ACCESS", bg: COLORS.tagBlue, color: COLORS.tagDarkBlue },
      { text: "RACIAL JUSTICE", bg: COLORS.tagBlue, color: COLORS.tagDarkBlue },
      { text: "REFORM", bg: COLORS.tagBrown, color: COLORS.tagDarkBrown },
    ],
  },
  {
    id: "a2",
    title:
      "Community Engagement of a Vital Role in Fostering Inclusive Environments.",
    description:
      "The power of community plays a vital role in fostering inclusive environments. This session explores strategies for effective collaboration in educational settings.",
    speaker: "Angela Smith",
    speakerTitle: "Director of Community Programs, New York, NY",
    date: "09.20.24 - Fri",
    time: "11:00 AM - 11:30 AM CT",
    location: "Online",
    tags: [
      { text: "COMMUNITY", bg: COLORS.tagGreen, color: COLORS.tagDarkGreen },
      {
        text: "PARTICIPATION",
        bg: COLORS.tagYellow,
        color: COLORS.tagDarkYellow,
      },
      { text: "EMPOWERMENT", bg: COLORS.tagGreen, color: COLORS.tagDarkGreen },
    ],
  },
  {
    id: "a3",
    title: "Innovations in Learning Technology",
    description:
      "As technology continues to evolve, so do the methods of learning. This discussion highlights innovative tools that enhance student engagement and learning outcomes.",
    speaker: "Michael Chen",
    speakerTitle: "Chief Technology Officer, Future Learning Inc.",
    date: "09.22.24 - Sun",
    time: "1:00 PM - 1:30 PM CT",
    location: "Online",
    tags: [
      { text: "TECHNOLOGY", bg: COLORS.tagBlue, color: COLORS.tagDarkBlue },
      { text: "INNOVATION", bg: COLORS.tagYellow, color: COLORS.tagDarkYellow },
      { text: "TOOLS", bg: COLORS.tagBlue, color: COLORS.tagDarkBlue },
    ],
  },
  {
    id: "a4",
    title: "Sustaining Change in Education",
    description:
      "Sustaining change in education requires a long-term commitment for all stakeholders. This session discusses models for sustainable educational reform.",
    speaker: "Rachel Green",
    speakerTitle: "Educational Consultant, Reform Strategies Austin, T",
    date: "09.28.24 - Sat",
    time: "3:00 PM - 3:30 PM CT",
    location: "Online",
    tags: [
      {
        text: "SUSTAINABILITY",
        bg: COLORS.tagGreen,
        color: COLORS.tagDarkGreen,
      },
      { text: "CHANGE", bg: COLORS.tagYellow, color: COLORS.tagDarkYellow },
      { text: "COMMITMENT", bg: COLORS.tagBlue, color: COLORS.tagDarkBlue },
    ],
  },
];

const SpeakerCard = ({ speaker }) => (
  <View
    style={{
      width: RFPercentage(19.5),
      marginBottom: RFValue(15),
      flexDirection: "row",
      backgroundColor: COLORS.white,
      borderRadius: RFValue(10),
      alignItems: "center",
      paddingVertical: RFValue(4),
      justifyContent: "center",
      // paddingLeft: RFValue(10),
    }}
  >
    <Image
      source={{ uri: speaker.img }}
      style={{
        width: RFValue(20),
        height: RFValue(20),
        borderRadius: RFValue(20),
        marginRight: RFValue(5),
      }}
      resizeMode="contain"
    />
    <Text
      style={{
        fontSize: RFValue(9),
        color: COLORS.darkText,
        fontFamily: "Montserrat_400",
      }}
      numberOfLines={1}
    >
      {speaker.name}
    </Text>
  </View>
);

const SessionTag = ({ tag }) => (
  <View
    style={{
      paddingHorizontal: RFValue(7),
      borderRadius: RFValue(15),
      marginRight: RFValue(5),
      backgroundColor: "rgb(244,247,248)",
      height: RFValue(15),
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <Text
      style={{
        fontSize: RFValue(7),
        fontFamily: "Montserrat_400",
        color: "rgb(87,130,151)",
      }}
    >
      {tag.text}
    </Text>
  </View>
);

const AgendaSessionCard = ({ session }) => (
  <View
    style={{
      backgroundColor: COLORS.white,
      paddingVertical: RFValue(15),
      borderRadius: RFValue(10),
      marginBottom: RFValue(12),
      elevation: 2,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
    }}
  >
    <Text
      style={{
        fontSize: RFValue(12),
        fontFamily: "Montserrat_700",
        color: COLORS.darkText,
        marginBottom: RFValue(5),
        paddingHorizontal: RFValue(20),
      }}
    >
      {session.title}
    </Text>
    <Text
      style={{
        fontSize: RFValue(10),
        color: COLORS.lightText,
        marginBottom: RFValue(10),
        paddingHorizontal: RFValue(20),
        fontFamily: "Montserrat_400",
      }}
      numberOfLines={3}
    >
      {session.description}
    </Text>

    <View
      style={{
        borderWidth: 0.5,
        borderColor: "rgb(242,243,245)",
        marginHorizontal: RFValue(20),
        marginVertical: RFValue(2),
      }}
    />
    {/* Speaker/Presenter Details */}
    <View
      style={{
        marginTop: RFValue(5),
        marginBottom: RFValue(10),
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: RFValue(15),
      }}
    >
      <Image
        source={{ uri: "https://i.pravatar.cc/150?img=8" }}
        style={{ height: RFValue(33), width: RFValue(33), borderRadius: 50 }}
        resizeMode="contain"
      />

      <View style={{ marginLeft: RFValue(10) }}>
        <Text
          style={{
            fontSize: RFValue(10),
            fontFamily: "Montserrat_700",
            color: COLORS.darkText,
          }}
        >
          {session.speaker}
        </Text>
        <Text
          style={{
            fontSize: RFValue(8),
            color: COLORS.lightText,
            width: "98%",
            fontFamily: "Montserrat_400",
            marginTop: RFValue(2),
          }}
        >
          {session.speakerTitle}
        </Text>
      </View>
    </View>

    {/* Tags */}
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        marginBottom: RFValue(15),
        paddingHorizontal: RFValue(20),
      }}
    >
      {session.tags.map((tag, index) => (
        <SessionTag key={index} tag={tag} />
      ))}
    </View>

    {/* Time/Location */}
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "rgb(245,246,247)",
        marginHorizontal: RFValue(10),
        paddingHorizontal: RFValue(10),
        paddingVertical: RFValue(3),
        borderRadius: RFValue(20),
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginRight: RFValue(10),
        }}
      >
        <Text
          style={{
            marginLeft: RFValue(5),
            fontSize: RFValue(9),
            color: COLORS.darkText,
            fontFamily: "Montserrat_400",
          }}
        >
          {session.date}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginRight: RFValue(10),
        }}
      >
        <View
          style={{
            borderWidth: 0.5,
            height: RFValue(7),
            borderColor: "rgb(231,233,236)",
            marginRight: RFValue(5),
          }}
        />
        <Text
          style={{
            marginLeft: RFValue(5),
            fontSize: RFValue(9),
            color: COLORS.darkText,
            fontFamily: "Montserrat_400",
          }}
        >
          {session.time}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginRight: RFValue(10),
        }}
      >
        <View
          style={{
            borderWidth: 0.5,
            height: RFValue(7),
            borderColor: "rgb(231,233,236)",
            marginRight: RFValue(5),
          }}
        />
        <Text
          style={{
            marginLeft: RFValue(5),
            fontSize: RFValue(9),
            color: COLORS.darkText,
            fontFamily: "Montserrat_400",
          }}
        >
          {session.location}
        </Text>
      </View>
    </View>
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
export default function EventDetails() {
  const [selectedDayId, setSelectedDayId] = useState("1");
  const [isCalendarModalVisible, setCalendarModalVisible] = useState(false);

  const toggleCalenderModal = () => {
    setCalendarModalVisible(!isCalendarModalVisible);
  };
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: "rgb(240,242,246)" }}>
      {/* Header Bar */}
      <TouchableOpacity
        onPress={() => router.back()}
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: RFValue(20),
          backgroundColor: COLORS.white,
          borderBottomColor: COLORS.mediumGrey,
          paddingTop: RFPercentage(8),
        }}
      >
        <View onPress={() => router.back()}>
          <Ionicons
            name="chevron-back"
            size={RFValue(20)}
            color={COLORS.darkText}
          />
        </View>
        <Text
          style={{
            fontSize: RFValue(16),
            fontFamily: "Montserrat_500",
            color: COLORS.darkText,
            marginLeft: RFValue(15),
          }}
        >
          Event Details
        </Text>
      </TouchableOpacity>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: COLORS.background }}
      >
        {/* Header Image */}
        <Image
          source={IMAGES.Event1}
          resizeMode="cover"
          style={{
            width: "100%",
            height: width * 0.5,
            paddingHorizontal: RFValue(20),
            paddingVertical: RFValue(10),
            borderTopLeftRadius: RFValue(10),
            borderTopRightRadius: RFValue(10),
          }}
        />

        <View
          style={{
            paddingHorizontal: RFValue(20),
            paddingTop: RFValue(5),
            backgroundColor: COLORS.background,
          }}
        >
          {/* --- Event Title and Info --- */}
          <Text
            style={{
              fontSize: RFValue(14),
              fontFamily: "Montserrat_600",
              color: COLORS.darkText,
              marginBottom: RFValue(5),
            }}
          >
            Summer Institute 2024
          </Text>
          <Text
            style={{
              fontSize: RFValue(10),
              color: COLORS.lightText,
              marginBottom: RFValue(10),
              fontFamily: "Montserrat_400",
            }}
          >
            Lorem ipsum dolor sit amet consectetur. Sed ullamcorper sit
            tristique aliquam. Leo in sed.
          </Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: RFValue(15),
              borderBottomWidth: 1,
              borderBottomColor: COLORS.separator,
              paddingBottom: RFValue(15),
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginRight: RFValue(20),
              }}
            >
              <Ionicons
                name="time-outline"
                size={RFValue(10)}
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
                09:00 CST
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginRight: RFValue(20),
              }}
            >
              <Ionicons
                name="location-outline"
                size={RFValue(10)}
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
                Salt Lake City, Utah
              </Text>
            </View>
          </View>

          {/* --- Speakers Section --- */}
          <View>
            <Text
              style={{
                fontSize: RFValue(13),
                fontFamily: "Montserrat_600",
                color: COLORS.darkText,
                marginBottom: RFValue(10),
              }}
            >
              Speakers
            </Text>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-between",
                paddingHorizontal: RFValue(0),
                borderBottomWidth: 1,
                borderColor: COLORS.mediumGrey,
              }}
            >
              {SPEAKERS_DATA.map((speaker) => (
                <SpeakerCard key={speaker.id} speaker={speaker} />
              ))}
            </View>
          </View>

          {/* --- Agenda Section --- */}
          <View
            style={{
              marginBottom: RFValue(15),
            }}
          >
            <Text
              style={{
                fontSize: RFValue(13),
                fontFamily: "Montserrat_600",
                color: COLORS.darkText,
                marginBottom: RFValue(15),
                marginTop: RFValue(5),
              }}
            >
              Agenda
            </Text>

            {/* Agenda Day Tabs */}
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: COLORS.separator,
                paddingBottom: RFValue(10),
              }}
            >
              <FlatList
                data={AGENDA_DAYS}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => {
                  const isFocused = item.id === selectedDayId;
                  return (
                    <TouchableOpacity
                      onPress={() => setSelectedDayId(item.id)}
                      style={{
                        paddingVertical: RFValue(8),
                        paddingHorizontal: RFValue(18),
                        borderRadius: RFValue(10),
                        marginRight: RFValue(10),
                        backgroundColor: isFocused
                          ? COLORS.agendaBlue
                          : COLORS.white,
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: RFValue(10),
                          fontFamily: "Montserrat_400",
                          color: isFocused ? COLORS.white : COLORS.darkText,
                        }}
                      >
                        {item.day}
                      </Text>
                      <Text
                        style={{
                          fontSize: RFValue(14),
                          fontFamily: "Montserrat_600",
                          color: isFocused ? COLORS.white : COLORS.darkText,
                        }}
                      >
                        {item.number}
                      </Text>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>

            {/* Agenda Sessions List */}
            <View
              style={{
                marginTop: RFValue(10),
                paddingHorizontal: RFValue(0),
                marginBottom: RFPercentage(15),
              }}
            >
              {AGENDA_SESSIONS.map((session) => (
                <AgendaSessionCard key={session.id} session={session} />
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          position: "absolute",
          bottom: 0,
          width: "100%",
          paddingHorizontal: RFValue(20),
          paddingVertical: RFValue(12),
          backgroundColor: "rgb(242,243,247)",
          borderTopWidth: 1,
          borderColor: COLORS.mediumGrey,
          paddingBottom:RFValue(20)
        }}
      >
        {/* 1. Icon Button */}
        <TouchableOpacity
          style={{
            width: RFValue(50),
            height: RFValue(40),
            borderRadius: RFValue(10),
            backgroundColor: "rgb(232,227,223)",
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => router.push("/tabs/schedule/eventMaps")}
        >
          <Image
            source={IMAGES.Routing}
            resizeMode="contain"
            style={{ height: RFValue(17), width: RFValue(17) }}
          />
        </TouchableOpacity>

        {/* 2. Edit Button */}
        <TouchableOpacity
          style={{
            flex: 1,
            height: RFValue(40),
            borderRadius: RFValue(10),
            backgroundColor: "rgb(229,233,235)",
            alignItems: "center",
            justifyContent: "center",
            marginHorizontal: RFValue(10),
          }}
        >
          <Text
            style={{
              fontSize: RFValue(12),
              fontFamily: "Montserrat_400",
              color: COLORS.darkText,
            }}
          >
            Edit
          </Text>
        </TouchableOpacity>

        {/* 3. Add To Calendar Button */}
        <TouchableOpacity
          style={{
            flex: 1.5, // Make this button slightly wider
            height: RFValue(40),
            borderRadius: RFValue(10),
            backgroundColor: "rgb(50,113,148)",
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={toggleCalenderModal}
        >
          <Text
            style={{
              fontSize: RFValue(12),
              fontFamily: "Montserrat_400",
              color: COLORS.white,
            }}
          >
            Add To Calendar
          </Text>
        </TouchableOpacity>
      </View>

      <SelectCalendarModal
        isVisible={isCalendarModalVisible}
        onClose={toggleCalenderModal}
      />
    </View>
  );
}
