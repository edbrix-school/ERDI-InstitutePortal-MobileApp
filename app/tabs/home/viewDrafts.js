import React from "react";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";

import { Ionicons, Feather } from "@expo/vector-icons";
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
      "Education leaders play a crucial role in shaping the future of learning. They inspir...",
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
];

const DraftItem = ({ title, description }) => (
  <View
    style={{
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: RFValue(10),
      paddingHorizontal: RFValue(10),
      backgroundColor: "#FFFFFF",
      borderRadius: RFValue(10),
      marginBottom: RFValue(18),
      shadowColor: "#000",
      shadowOpacity: 0.05,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: 2 },
      elevation: 3,
    }}
  >
    <View style={{ flex: 1, borderWidth: 0 }}>
      <Text
        style={{
          fontSize: RFValue(12),
          fontFamily: "Montserrat_700",
          color: "#2D3748",
          marginBottom: RFValue(5),
        }}
      >
        {title}
      </Text>

      <Text
        style={{
          fontSize: RFValue(10),
          fontFamily: "Montserrat_400",
          color: "#596273",
        }}
        numberOfLines={4}
      >
        {description}
      </Text>
    </View>

    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: RFValue(2),
      }}
    >
      <TouchableOpacity style={{ padding: RFValue(4) }}>
        <Image
          source={IMAGES.Edit}
          style={{ height: RFValue(17), width: RFValue(17) }}
          resizeMode="contain"
        />
      </TouchableOpacity>

      <TouchableOpacity style={{ padding: RFValue(4), paddingRight: 0 }}>
        <Image
          source={IMAGES.Trash}
          style={{ height: RFValue(17), width: RFValue(17) }}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  </View>
);

export default function ViewDrafts() {
  Text.defaultProps = Text.defaultProps || {};
  Text.defaultProps.style = [{ fontFamily: "Montserrat_400" }];

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#EEF1F5",
        paddingTop: RFPercentage(7),
      }}
    >
      {/* Header */}
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: RFValue(18),
          paddingBottom: RFValue(10),
          borderBottomWidth: 1,
          borderBottomColor: "rgba(188,167,148,0.25)",
        }}
        onPress={() => router.back()}
      >
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Image
            source={IMAGES.GoBack}
            style={{ width: RFValue(17), height: RFValue(17) }}
          />
        </View>

        <Text
          style={{
            fontSize: RFValue(14),
            fontFamily: "Montserrat_700",
            color: "#2D3748",
            marginLeft: RFValue(12),
          }}
        >
          Your Drafts
        </Text>

        <View style={{ width: RFValue(22) }} />
      </TouchableOpacity>

      <FlatList
        data={DRAFT_DATA}
        renderItem={({ item }) => (
          <DraftItem title={item.title} description={item.description} />
        )}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: RFValue(16),
          paddingTop: RFValue(18),
          paddingBottom: RFPercentage(10),
        }}
      />
    </View>
  );
}
