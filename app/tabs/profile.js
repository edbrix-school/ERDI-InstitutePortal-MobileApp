import React, { useState } from "react";
import {
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Image,
  Switch,
  Dimensions,
  ImageBackground,
} from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import * as IMAGES from "../../components/Images";
import { Entypo, Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
// Get screen width for responsive design
const { width } = Dimensions.get("window");
const PROFILE_IMAGE_URL = "https://i.pravatar.cc/150?img=5";
// --- Placeholder Components ---
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
// Basic Icon Placeholder (for simplicity, as a text-based circle)
const IconPlaceholder = ({ name, size = 20, color = "#333" }) => (
  <View
    style={{
      width: size,
      height: size,
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Text style={{ color, fontSize: size * 0.9 }}>{name}</Text>
  </View>
);

// Custom styled TextInput to match the video
const StyledTextInput = ({
  label,
  placeholder,
  value,
  isDropdown = false,
  hasCheck = false,
}) => (
  <View style={{ marginBottom: 15 }}>
    <Text style={{ fontSize: 13, color: "#343a40", marginBottom: 5 }}>
      {label}
    </Text>
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#ced4da",
        paddingHorizontal: 12,
        height: 50,
      }}
    >
      <TextInput
        placeholder={placeholder}
        value={value}
        style={{ flex: 1, fontSize: 16, color: "#495057" }}
        editable={!isDropdown}
      />

      {isDropdown && (
        <MaterialIcons name="keyboard-arrow-down" size={24} color="#6c757d" />
      )}
      {hasCheck && <IconPlaceholder name="✓" size={20} color="#28a745" />}
    </View>
  </View>
);

// Custom Accordion Item (Collapsible Section)
const AccordionItem = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <View
      style={{
        backgroundColor: "white",
        borderRadius: 10,
        marginHorizontal: 10,
        marginVertical: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <TouchableOpacity
        onPress={toggleOpen}
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 15,
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "500", color: "#343a40" }}>
          {title}
        </Text>
        <MaterialIcons
          name={isOpen ? "keyboard-arrow-up" : "keyboard-arrow-down"}
          size={20}
          color="#343a40"
        />
      </TouchableOpacity>

      {/* Content */}
      {isOpen && (
        <View style={{ paddingHorizontal: 15, paddingBottom: 20 }}>
          {children}
        </View>
      )}
    </View>
  );
};

// --- Full Profile Screen Component ---

export default function Profile() {
  // Shared style for the Update Button
  const updateButtonStyle = {
    backgroundColor: "rgb(238,253,255)",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  };

  const updateButtonTextStyle = {
    color: "rgb(58,122,154)",
    fontSize: 16,
    fontWeight: "400",
  };

  const initialAccordionState = {
    general: false,
    contact: false,
    district: false,
    bio: false,
    awards: false,
    notifications: false,
  };

  // State to manage which accordion section is open
  const [openSection, setOpenSection] = useState("none");

  const toggleAccordion = (sectionName) => {
    setOpenSection(openSection === sectionName ? "none" : sectionName);
  };

  // Notification state for the switch
  const [isEmailEnabled, setIsEmailEnabled] = useState(true);
  const [isRegistered, setIsRegistered] = useState(false);

  // Function to render the content for each accordion section
  const renderAccordionContent = (section) => {
    switch (section) {
      case "general":
        return (
          <View>
            <StyledTextInput
              label="First Name"
              placeholder="Jhon"
              value="Jhon"
            />
            <StyledTextInput label="Last Name" placeholder="Doe" value="Doe" />
            <StyledTextInput label="Title" placeholder="Title" value="Title" />
            <View style={{ marginBottom: 15 }}>
              <Text style={{ fontSize: 13, color: "#343a40", marginBottom: 5 }}>
                Status
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Switch
                  trackColor={{ false: "#767577", true: "rgb(50,113,148)" }}
                  thumbColor={true ? "#f4f3f4" : "#f4f3f4"}
                  value={true} // Always active in the video
                  disabled={true} // Assuming status is not editable here
                />
                <Text
                  style={{
                    fontSize: 16,
                    color: "#000",
                    marginLeft: RFValue(10),
                  }}
                >
                  Active
                </Text>
              </View>
            </View>
            <TouchableOpacity style={updateButtonStyle}>
              <Text style={updateButtonTextStyle}>Update Informations</Text>
            </TouchableOpacity>
          </View>
        );

      case "contact":
        return (
          <View>
            <StyledTextInput
              label="Preferred Email"
              placeholder="contact.jhon@email.com"
              value="contact.jhon@email.com"
            />
            <StyledTextInput
              label="Portal Login Email"
              placeholder="contact.jhon@email.com"
              value="contact.jhon@email.com"
            />
            <StyledTextInput
              label="Phone"
              placeholder="(123) 000000-00000"
              value="(123) 000000-00000"
              hasCheck={true}
            />
            <View style={{ marginBottom: 15 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 5,
                }}
              >
                <Text style={{ fontSize: 13, color: "#343a40" }}>
                  Social Links
                </Text>
                <TouchableOpacity
                  style={[
                    updateButtonStyle,
                    {
                      paddingHorizontal: RFValue(10),
                      paddingVertical: RFValue(5),
                      flexDirection: "row",
                    },
                  ]}
                >
                  <Ionicons
                    name="add-circle-outline"
                    size={18}
                    color="rgb(71,135,164)"
                  />
                  <Text
                    style={{
                      color: "rgb(71,135,164)",
                      fontSize: 14,
                      marginLeft: 3,
                    }}
                  >
                    Add New
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View
                  style={{
                    width: RFValue(50),
                    height: 50,
                    backgroundColor: "#fff",
                    borderRadius: 8,
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row",
                    borderWidth: 0.5,
                    borderRightWidth: 0,
                    borderColor: "#ced4da",
                  }}
                >
                  <Entypo name="facebook" size={24} color="#007bff" />
                  <MaterialIcons
                    name={"keyboard-arrow-down"}
                    size={20}
                    color="#343a40"
                  />
                </View>
                <TextInput
                  placeholder="facebook.com/jhon.doe"
                  value="facebook.com/jhon.doe"
                  style={{
                    flex: 1,
                    fontSize: 16,
                    color: "#495057",
                    backgroundColor: "white",
                    borderRadius: 8,
                    borderWidth: 0.5,
                    borderColor: "#ced4da",
                    paddingHorizontal: 12,
                    height: 50,
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                    marginLeft: RFValue(-5),
                  }}
                />
              </View>
            </View>
            <TouchableOpacity style={updateButtonStyle}>
              <Text style={updateButtonTextStyle}>Update Informations</Text>
            </TouchableOpacity>
          </View>
        );

      case "district":
        return (
          <View>
            <StyledTextInput
              label="District Name"
              placeholder="District 123"
              value="District 123"
            />
            <StyledTextInput
              label="District City"
              placeholder="District City"
              value="District City"
            />
            <StyledTextInput
              label="District State"
              placeholder="District 123"
              value="District 123"
              isDropdown={true}
            />
            <StyledTextInput
              label="District Enrollment"
              placeholder="-"
              value="-"
            />
            <StyledTextInput
              label="Degree"
              placeholder="-"
              value="-"
              isDropdown={true}
            />
            <StyledTextInput label="Degree From" placeholder="-" value="-" />
            <TouchableOpacity style={updateButtonStyle}>
              <Text style={updateButtonTextStyle}>Update Informations</Text>
            </TouchableOpacity>
          </View>
        );

      case "bio":
        return (
          <View>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "500",
                color: "#343a40",
                marginBottom: 10,
              }}
            >
              Your Bio
            </Text>
            <View
              style={{
                backgroundColor: "white",
                borderRadius: 8,
                borderWidth: 1,
                borderColor: "#ced4da",
                padding: 10,
                marginBottom: 20,
              }}
            >
              <TextInput
                placeholder="Write text here ..."
                multiline={true}
                numberOfLines={5}
                style={{
                  fontSize: 16,
                  color: "#495057",
                  minHeight: 100,
                  textAlignVertical: "top",
                }}
              />
              {/* Rich Text Editor Toolbar Placeholder */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  borderTopWidth: 1,
                  borderTopColor: "#e9ecef",
                  paddingTop: 8,
                  marginTop: 8,
                }}
              >
                {["B", "i", "U", "S", "A", "P", "E"].map((icon, index) => (
                  <IconPlaceholder
                    key={index}
                    name={icon}
                    size={20}
                    color="#6c757d"
                  />
                ))}
              </View>
            </View>

            <Text
              style={{
                fontSize: 16,
                fontWeight: "500",
                color: "#343a40",
                marginBottom: 10,
              }}
            >
              Expertise
            </Text>
            <View
              style={{
                backgroundColor: "white",
                borderRadius: 8,
                borderWidth: 1,
                borderColor: "#ced4da",
                padding: 10,
              }}
            >
              <TextInput
                placeholder="Write text here ..."
                multiline={true}
                numberOfLines={5}
                style={{
                  fontSize: 16,
                  color: "#495057",
                  minHeight: 100,
                  textAlignVertical: "top",
                }}
              />
              {/* Rich Text Editor Toolbar Placeholder */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  borderTopWidth: 1,
                  borderTopColor: "#e9ecef",
                  paddingTop: 8,
                  marginTop: 8,
                }}
              >
                {["B", "i", "U", "S", "A", "P", "E"].map((icon, index) => (
                  <IconPlaceholder
                    key={index}
                    name={icon}
                    size={20}
                    color="#6c757d"
                  />
                ))}
              </View>
            </View>

            <TouchableOpacity style={updateButtonStyle}>
              <Text style={updateButtonTextStyle}>Update Informations</Text>
            </TouchableOpacity>
          </View>
        );

      case "awards":
        return (
          <View>
            <Text
              style={{
                fontSize: RFValue(11),
                fontWeight: "500",
                color: "#343a40",
                marginBottom: 15,
              }}
            >
              Awards & Recognitions
            </Text>
            {[1, 2, 3, 4].map((item) => (
              <View
                key={item}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 10,
                  marginVertical: RFValue(10),
                  padding: RFValue(5),
                  backgroundColor: "rgb(245,246,247)",
                }}
              >
                <Text style={{ fontSize: 14, color: "#495057", flex: 1 }}>
                  Florida Superintendent Of The Year (2021) - Awarded For His
                  Exceptional Leadership And The Significant Impro...
                </Text>
                <TouchableOpacity style={{ marginLeft: 10 }}>
                  <IconPlaceholder name="..." size={20} color="#6c757d" />
                </TouchableOpacity>
              </View>
            ))}
            <TouchableOpacity style={updateButtonStyle}>
              <Text style={updateButtonTextStyle}>Update Informations</Text>
            </TouchableOpacity>
          </View>
        );

      case "notifications":
        return (
          <View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 15,
              }}
            >
              <Switch
                trackColor={{ false: "#767577", true: "rgb(50,113,148)" }}
                thumbColor={isEmailEnabled ? "#f4f3f4" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={setIsEmailEnabled}
                value={isEmailEnabled}
                style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
              />
              <Text
                style={{
                  fontSize: 16,
                  color: "#343a40",
                  marginLeft: RFValue(5),
                }}
              >
                Enable Email Notification
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Checkbox
                value={isRegistered}
                onValueChange={setIsRegistered}
                color={isRegistered ? "rgb(50,113,148)" : undefined}
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: 4,
                  borderWidth: 1,
                  borderColor: "#767577",
                }}
              />
              <Text style={{ fontSize: RFValue(10), color: "#343a40", marginLeft: RFValue(5) }}>
                I agree to register on community connect
              </Text>
            </View>
          </View>
        );

      default:
        return <View />;
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#f8f9fa" }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: RFValue(20),
          backgroundColor: "#fff",
          paddingBottom: RFPercentage(2),
          alignItems: "center",
          paddingTop: RFPercentage(7),
        }}
      >
        <Image
          source={IMAGES.PortalImage}
          style={{ width: RFValue(40), height: RFValue(25), tintColor: "gray" }}
          resizeMode="contain"
        />
        <Image
          source={{ uri: PROFILE_IMAGE_URL }}
          style={{ width: RFValue(25), height: RFValue(25), borderRadius: 100 }}
          resizeMode="contain"
        />
      </View>

      <ScrollView style={{ flex: 1, marginBottom: RFPercentage(20) }}>
        <ImageBackground
          source={IMAGES.ScheduleBg}
          resizeMode="cover"
          style={{ flex: 1, paddingBottom: RFValue(20) }}
        >
          <View style={{ paddingHorizontal: 20 }}>
            <Text
              style={{
                fontSize: RFValue(18),
                fontWeight: "bold",
                color: COLORS.white,
                marginTop: 15,
                marginBottom: 10,
              }}
            >
              Profile
            </Text>
            {/* Profile Header Card */}
            <View
              style={{
                backgroundColor: "white",
                margin: 10,
                borderRadius: 10,
                flexDirection: "row",
                alignItems: "center",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.05,
                shadowRadius: 2,
                elevation: 2,
              }}
            >
              {/* Avatar Image Placeholder */}
              <Image
                source={{ uri: "https://picsum.photos/id/1011/100/100" }}
                style={{
                  width: RFValue(70),
                  height: "100%",
                  marginRight: 15,
                }}
              />
              {/* Name and Role */}
              <View style={{ flex: 1, padding: RFValue(15) }}>
                <Text
                  style={{ fontSize: 20, fontWeight: "bold", color: "#343a40" }}
                >
                  Jhon Doe
                </Text>
                <Text style={{ fontSize: 14, color: "#6c757d" }}>
                  Administrator
                </Text>
              </View>
              {/* Edit Icon */}
              <TouchableOpacity
                style={{
                  width: RFValue(30),
                  height: RFValue(30),
                  borderRadius: 20,
                  backgroundColor: "#e9ecef",
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: RFValue(15),
                }}
              >
                <Feather name="edit" size={18} color="#495057" />
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>

        {/* Accordion List */}
        <AccordionItem
          title="General Informations"
          defaultOpen={openSection === "general"}
        >
          {renderAccordionContent("general")}
        </AccordionItem>

        <AccordionItem
          title="Contact Information"
          defaultOpen={openSection === "contact"}
        >
          {renderAccordionContent("contact")}
        </AccordionItem>

        <AccordionItem
          title="District & Education Information"
          defaultOpen={openSection === "district"}
        >
          {renderAccordionContent("district")}
        </AccordionItem>

        <AccordionItem
          title="Bio & Expertise"
          defaultOpen={openSection === "bio"}
        >
          {renderAccordionContent("bio")}
        </AccordionItem>

        <AccordionItem
          title="Awards & Recognitions"
          defaultOpen={openSection === "awards"}
        >
          {renderAccordionContent("awards")}
        </AccordionItem>

        <AccordionItem
          title="Notifications"
          defaultOpen={openSection === "notifications"}
        >
          {renderAccordionContent("notifications")}
        </AccordionItem>

        {/* Padding at the bottom */}
        <View style={{ height: 50 }} />
      </ScrollView>
    </View>
  );
}
