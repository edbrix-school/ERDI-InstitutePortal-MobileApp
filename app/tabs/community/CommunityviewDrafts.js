import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

import { Ionicons, Feather } from "@expo/vector-icons";
import { Image } from "expo-image";
import * as IMAGES from "../../../components/Images";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { router } from "expo-router";

const DRAFT_DATA = [
  {
    id: "1",
    title: "Empowering Education Leaders",
    description:
      "Education leaders play a crucial role in shaping the future of learning! They inspire teachers and students alike, fostering an environment where innovation thrives. By...",
  },
  {
    id: "2",
    title: "Inspiring Educational Innovators",
    description:
      "Education leaders play a crucial role in shaping the future of learning! They inspire teachers and students alike, fostering an environment where innovation thrives. By...",
  },
  {
    id: "3",
    title: "Leading the Future of Learning",
    description:
      "Education leaders play a crucial role in shaping the future of learning! They inspire teachers and students alike, fostering an environment where innovation thrives. By...",
  },
  {
    id: "4",
    title: "Transforming Education Through Leadership",
    description:
      "Education leaders play a crucial role in shaping the future of learning! They inspir...",
  },
  {
    id: "5",
    title: "Championing Change in Education",
    description:
      "Education leaders play a crucial role in shaping the future of learning! They inspire teachers and students alike, fostering an environment where innovation thrives. By...",
  },
  {
    id: "6",
    title: "Guiding Educational Excellence",
    description:
      "Education leaders play a crucial role in shaping the future of learning! They inspire teachers and students alike, fostering an environment where innovation thrives. By...",
  },

  {
    id: "7",
    title: "Innovating for Future Learning",
    description:
      "Embracing new technologies and pedagogies is key to preparing students for tomorrow. By...",
  },
  {
    id: "8",
    title: "Building Inclusive Classrooms",
    description:
      "Creating equitable and accessible learning environments for all students is our priority. By...",
  },
];

const DraftItem = ({ title, description }) => (
  <View style={styles.itemContainer}>
    <View style={styles.textContainer}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description} numberOfLines={3}>
        {description}
      </Text>
    </View>
    <View style={styles.iconContainer}>
      <TouchableOpacity
        // onPress={() => console.log(`Edit ${title}`)}
        style={styles.iconButton}
      >
        <Feather name="edit" size={20} color="gray" />
      </TouchableOpacity>

      <TouchableOpacity
        // onPress={() => console.log(`Delete ${title}`)}
        style={styles.iconButton}
      >
        <Ionicons name="trash-outline" size={22} color="#dc3545" />
      </TouchableOpacity>
    </View>
  </View>
);

export default function ViewDrafts() {
  const handleGoBack = () => {
    router.back(); 
  };

  return (
    <SafeAreaView style={styles.screen}>
      <TouchableOpacity style={styles.header} onPress={() => handleGoBack()}>
        <View >
          <Image
            source={IMAGES.GoBack}
            style={{ height: RFValue(20), width: RFValue(20) }}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.headerTitle}>Your Drafts</Text>

        <View style={{ width: 24 }} />
      </TouchableOpacity>

      <View style={{ paddingBottom: RFPercentage(15) }}>
        <FlatList
          data={DRAFT_DATA}
          renderItem={({ item }) => (
            <DraftItem title={item.title} description={item.description} />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "rgb(240,242,246)",
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

  listContent: {
    paddingTop: 0,
    paddingBottom: 20,
  },

  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: 16,
    paddingVertical: 18,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#fff",
    marginHorizontal: RFPercentage(1),
    marginVertical: RFValue(5),
    borderRadius: RFValue(7),

    // ✅ Shadow (iOS)
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,

    // ✅ Shadow (Android)
    elevation: 4,
    backgroundColor: "#fff", // required for shadow to show on Android
  },

  textContainer: {
    flex: 1,
    marginRight: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
    color: "#333",
  },
  description: {
    fontSize: 14,
    color: "gray",
    lineHeight: 20,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 4,
  },
  iconButton: {
    padding: 6,
    marginLeft: 10,
  },
});
