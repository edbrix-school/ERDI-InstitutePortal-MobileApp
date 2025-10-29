import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  ScrollView,
  Platform,
  Image,
  Alert,
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

  const verifyPermissions = async () => {
    if (Platform.OS === "ios") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "You need to grant camera roll permissions to upload images.",
          [{ text: "Okay" }]
        );
        return false;
      }
    } else {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "You need to grant media library permissions to upload images.",
          [{ text: "Okay" }]
        );
        return false;
      }
    }
    return true;
  };

  const pickImage = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const handleSaveAsDraft = () => {
    console.log("Saving as draft:", {
      title,
      selectedThread,
      selectedAudience,
      postContent,
      selectedImage,
    });

    Alert.alert("Draft Saved!", "Your post has been saved as a draft.");
  };

  const handlePublish = () => {
    console.log("Publishing post:", {
      title,
      selectedThread,
      selectedAudience,
      postContent,
      selectedImage,
    });

    Alert.alert(
      "Post Published!",
      "Your post has been successfully published."
    );
  };

  const handleDeleteDraft = () => {
    Alert.alert(
      "Delete Draft",
      "Are you sure you want to discard this draft?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            console.log("Draft deleted");

            setTitle("");
            setSelectedThread("");
            setSelectedAudience("");
            setPostContent("");
            setSelectedImage(null);
            Alert.alert("Deleted", "Draft discarded.");
          },
        },
      ],
      { cancelable: true }
    );
  };
  const handleGoBack = () => {
    router.back();
  };
  return (
    <View style={styles.screen}>
      <TouchableOpacity style={styles.header} onPress={() => handleGoBack()}>
        <View onPress={() => router.back()}>
          <Image
            source={IMAGES.GoBack}
            style={{ height: RFValue(20), width: RFValue(20) }}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.headerTitle}>Start New Post</Text>
        <View style={{ width: 24 }} />
      </TouchableOpacity>

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
                resizeMode="contain"
              />
              <Text style={styles.uploadText}>Upload a File</Text>
            </>
          )}
        </TouchableOpacity>

        <Text style={styles.label}>
          Title <Text style={styles.required}>*</Text>
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Write here..."
          value={title}
          onChangeText={setTitle}
        />

        <Text style={styles.label}>
          Select Thread <Text style={styles.required}>*</Text>
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Write here..."
          value={selectedThread}
          onChangeText={setSelectedThread}
        />

        <Text style={styles.label}>
          Select Audience <Text style={styles.required}>*</Text>
        </Text>
        <TouchableOpacity
          style={styles.dropdownInput}
          onPress={() => {
            /* Implement actual dropdown logic here */ console.log(
              "Open Audience Selector"
            );
          }}
        >
          <Text
            style={
              selectedAudience ? styles.dropdownText : styles.placeholderText
            }
          >
            {selectedAudience || "Write here..."}
          </Text>
          <Ionicons name="chevron-down" size={18} color="gray" />
        </TouchableOpacity>

        <Text style={styles.label}>Post Content</Text>
        <TextInput
          style={styles.textArea}
          placeholder="Write text here..."
          multiline={true}
          textAlignVertical="top"
          value={postContent}
          onChangeText={setPostContent}
        />

        <View style={styles.toolbar}>
          <Feather
            name="bold"
            size={20}
            color="gray"
            style={styles.toolbarIcon}
          />
          <Feather
            name="italic"
            size={20}
            color="gray"
            style={styles.toolbarIcon}
          />
          <Feather
            name="underline"
            size={20}
            color="gray"
            style={styles.toolbarIcon}
          />
          <Feather
            name="link"
            size={20}
            color="gray"
            style={styles.toolbarIcon}
          />
          <Feather
            name="type"
            size={20}
            color="gray"
            style={styles.toolbarIcon}
          />
          <Feather
            name="pen-tool"
            size={20}
            color="gray"
            style={styles.toolbarIcon}
          />
          <Feather
            name="smile"
            size={20}
            color="gray"
            style={styles.toolbarIcon}
          />
        </View>
        <View
          style={{
            borderBottomWidth: 1,
            marginTop: RFValue(10),
            borderColor: "#E5E7EB",
          }}
        />
        <View style={styles.bottomActions}>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={handleDeleteDraft}
          >
            <Ionicons name="trash-outline" size={24} color="#dc3545" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.saveDraftButton}
            onPress={handleSaveAsDraft}
          >
            <Text style={styles.saveDraftButtonText}>Save As Draft</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.publishButton}
            onPress={handlePublish}
          >
            <Text style={styles.publishButtonText}>Publish</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "rgb(241,242,246)",
    paddingTop:RFPercentage(7)
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
    fontWeight: "600",
    color: "black",
    marginLeft: RFPercentage(3),
  },
  scrollViewContent: {
    padding: 16,
    paddingBottom: RFValue(100),
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
    overflow: "hidden",
  },
  uploadedImage: {
    width: "100%",
    height: "100%",
    borderRadius: 9,
  },
  uploadText: {
    marginTop: 10,
    fontSize: 16,
    color: "#105D7A",
    fontWeight: "500",
  },
  label: {
    fontSize: 15,
    fontWeight: "400",
    color: "#333",
    marginBottom: 8,
    marginTop: 15,
  },
  required: {
    color: "red",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: "#333",
    backgroundColor:'#fff'
  },
  dropdownInput: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: "#fff",
  },
  dropdownText: {
    fontSize: 16,
    color: "#333",
  },
  placeholderText: {
    fontSize: 16,
    color: "gray",
  },
  textArea: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: "#333",
    minHeight: 120,
    maxHeight: 200,
    backgroundColor:'#fff'
  },
  toolbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    borderRadius: 8,
    paddingVertical: 10,
    marginTop: 15,
    borderWidth: 1,
    borderColor: "#eee",
  },
  toolbarIcon: {
    paddingHorizontal: 5,
  },
  bottomActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: RFValue(20),
  },
  deleteButton: {
    backgroundColor: "#ffe6e6",
    borderRadius: 10,
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
    width: RFValue(50),
    height: RFValue(50),
  },
  saveDraftButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: RFValue(50),
    height: RFValue(50),
    marginLeft: RFValue(10),
  },
  saveDraftButtonText: {
    color: "#313E48",
    fontSize: 16,
    fontWeight: "600",
  },
  publishButton: {
    backgroundColor: "#EBFEFF",
    borderRadius: 10,
    flex: 1,
    alignItems: "center",
    width: RFValue(50),
    height: RFValue(50),
    justifyContent: "center",
    marginLeft: RFValue(10),
  },
  publishButtonText: {
    color: "#077397",
    fontSize: 16,
    fontWeight: "600",
  },
});
