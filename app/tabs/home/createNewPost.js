import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Platform,
  Image,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import * as IMAGES from "../../../components/Images";

export default function CreateNewPost() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [selectedThread, setSelectedThread] = useState("");
  const [selectedAudience, setSelectedAudience] = useState("");
  const [postContent, setPostContent] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  // ✅ Apply Montserrat globally — NO size changes
  Text.defaultProps = Text.defaultProps || {};
  Text.defaultProps.style = [{ fontFamily: "Montserrat_400" }];

  const verifyPermissions = async () => {
    const { status } =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "Please enable media permissions to upload images."
      );
      return false;
    }
    return true;
  };

  const pickImage = async () => {
    if (!(await verifyPermissions())) return;

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const handleGoBack = () => router.back();

  return (
    <View style={styles.screen}>
      {/* ✅ Header */}
      <TouchableOpacity style={styles.header} onPress={handleGoBack}>
        <Image
          source={IMAGES.GoBack}
          style={{ height: RFValue(20), width: RFValue(20) }}
          resizeMode="contain"
        />
        <Text style={styles.headerTitle}>Start New Post</Text>
        <View style={{ width: RFValue(20) }} />
      </TouchableOpacity>

      {/* ✅ Keyboard-safe scroll with space for sticky footer */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <TouchableOpacity style={styles.uploadBox} onPress={pickImage}>
            {selectedImage ? (
              <Image
                source={{ uri: selectedImage }}
                style={styles.uploadedImage}
                resizeMode="cover"
              />
            ) : (
              <>
                <Image
                  source={IMAGES.UploadImage}
                  style={{ height: RFValue(40), width: RFValue(40) }}
                />
                <Text style={styles.uploadText}>Upload a File</Text>
              </>
            )}
          </TouchableOpacity>

          {/* Title */}
          <Text style={styles.label}>
            Title <Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Write here..."
            value={title}
            onChangeText={setTitle}
          />

          {/* Thread */}
          <Text style={styles.label}>
            Select Thread <Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Write here..."
            value={selectedThread}
            onChangeText={setSelectedThread}
          />

          {/* Audience */}
          <Text style={styles.label}>
            Select Audience <Text style={styles.required}>*</Text>
          </Text>
          <TouchableOpacity style={styles.dropdownInput}>
            <Text
              style={
                selectedAudience ? styles.dropdownText : styles.placeholderText
              }
            >
              {selectedAudience || "Write here..."}
            </Text>
            <Ionicons name="chevron-down" size={18} color="gray" />
          </TouchableOpacity>

          {/* Content */}
          <Text style={styles.label}>Post Content</Text>
          <TextInput
            style={styles.textArea}
            placeholder="Write text here..."
            multiline
            textAlignVertical="top"
            value={postContent}
            onChangeText={setPostContent}
          />

          {/* Toolbar */}
          <View style={styles.toolbar}>
            {["bold", "italic", "underline", "link", "type", "pen-tool", "smile"].map((icon) => (
              <Feather key={icon} name={icon} size={20} color="gray" />
            ))}
          </View>

          {/* Spacer so scroll content doesn't overlap sticky button */}
          <View style={{ height: RFValue(120) }} />
        </ScrollView>
      </KeyboardAvoidingView>

      {/* ✅ Sticky Bottom Buttons */}
      <View style={styles.bottomActionsSticky}>
        <TouchableOpacity style={styles.deleteButton}>
          <Ionicons name="trash-outline" size={24} color="#dc3545" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.saveDraftButton}>
          <Text style={styles.saveDraftButtonText}>Save As Draft</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.publishButton}>
          <Text style={styles.publishButtonText}>Publish</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

/* ✅ styles unchanged except added new sticky bottom style & fontFamily */
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "rgb(241,242,246)",
    paddingTop: RFPercentage(7),
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#ccc",
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: "Montserrat_500",
    color: "black",
    marginLeft: RFPercentage(3),
  },
  scrollViewContent: {
    padding: 16,
  },

  uploadBox: {
    backgroundColor: "#EBFEFF",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#cce0ff",
    borderStyle: "dashed",
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },

  uploadedImage: {
    width: "100%",
    height: "100%",
    borderRadius: 9,
  },

  uploadText: {
    marginTop: 10,
    fontSize: 16,
    fontFamily: "Montserrat_500",
    color: "#105D7A",
  },

  label: {
    fontSize: 15,
    fontFamily: "Montserrat_500",
    color: "#333",
    marginBottom: 8,
    marginTop: 15,
  },

  required: { color: "red" },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    fontFamily: "Montserrat_400",
    backgroundColor: "#fff",
  },

  dropdownInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  dropdownText: {
    fontSize: 16,
    fontFamily: "Montserrat_400",
    color: "#333",
  },

  placeholderText: {
    fontSize: 16,
    fontFamily: "Montserrat_400",
    color: "gray",
  },

  textArea: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    fontFamily: "Montserrat_400",
    minHeight: 120,
    backgroundColor: "#fff",
  },

  toolbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    backgroundColor: "#f8f8f8",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#eee",
    marginTop: 15,
  },

  /* ✅ Sticky footer style */
  bottomActionsSticky: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: RFValue(14),
    backgroundColor: "rgb(241,242,246)",
    position: "absolute",
    bottom: 0,
    width: "100%",
  },

  deleteButton: {
    width: RFValue(50),
    height: RFValue(50),
    backgroundColor: "#ffe6e6",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  saveDraftButton: {
    flex: 1,
    marginLeft: RFValue(10),
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  saveDraftButtonText: {
    fontSize: 16,
    fontFamily: "Montserrat_600",
    color: "#313E48",
  },

  publishButton: {
    flex: 1,
    marginLeft: RFValue(10),
    backgroundColor: "#EBFEFF",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  publishButtonText: {
    fontSize: 16,
    fontFamily: "Montserrat_600",
    color: "#077397",
  },
});
