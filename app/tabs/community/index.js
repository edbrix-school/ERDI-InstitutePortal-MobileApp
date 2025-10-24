import React from "react";
import {
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
  ImageBackground,
} from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import * as IMAGES from "../../../components/Images";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { AntDesign, Entypo, EvilIcons, Feather, MaterialIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");
const POST_CARD_WIDTH = width * 0.95;
const PROFILE_IMAGE_URL = "https://i.pravatar.cc/150?img=5";

const CARD_WIDTH = width * 0.9;
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
const Sizing = (value) => value;

const IconPlaceholder = ({ name, size = 20, color = "#333" }) => (
  <View
    style={{
      width: size,
      height: size,
      backgroundColor: color,
      borderRadius: size / 2,
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Text style={{ color: "white", fontSize: size * 0.6 }}>{name}</Text>
  </View>
);

const PostCard = ({
  title,
  publishedBy,
  audience,
  imageSource,
  tag,
  description,
}) => (
  <View
    style={{
      backgroundColor: "white",
      borderRadius: 12,
      marginVertical: 10,
      marginHorizontal: (width - POST_CARD_WIDTH) / 2,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 5,
      width: POST_CARD_WIDTH,
      overflow: "hidden",
    }}
  >
    <View style={{ position: "relative" }}>
      <Image
        source={imageSource}
        style={{
          width: "100%",
          height: 200,
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
        }}
        resizeMode="cover"
      />
      <View
        style={{
          position: "absolute",
          top: 15,
          left: 15,
          backgroundColor:
            tag === "ISO"
              ? "#007bff"
              : tag === "Professional Learning"
              ? "#ffc107"
              : tag === "Artificial Intelligence"
              ? "#28a745"
              : "rgba(0, 0, 0, 0.5)",
          paddingHorizontal: 12,
          paddingVertical: 4,
          borderRadius: 15,
        }}
      >
        <Text style={{ color: "white", fontSize: 12, fontWeight: "bold" }}>
          {tag}
        </Text>
      </View>
      <View
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
        }}
      >
        <View
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            padding: 8,
            borderRadius: 20,
          }}
        >
          <AntDesign name="pushpin" size={16} color="#495057" />
        </View>
        <View
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            padding: 8,
            borderRadius: 20,
            alignItems: "center",
          }}
        >
          <EvilIcons name="like" size={16} color="#000" />
          <Text style={{ fontSize: 12, marginLeft: 4, color: "#333" }}>
            352
          </Text>
        </View>
        <View
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            padding: 8,
            borderRadius: 20,
            alignItems: "center",
          }}
        >
          <MaterialIcons name="message" size={14} color="#495057" />
          <Text style={{ fontSize: 12, marginLeft: 4, color: "#333" }}>95</Text>
        </View>
      </View>
    </View>

    <View style={{ padding: 15 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 8,
        }}
      >
        <Text style={{ fontSize: 12, color: "#6c757d" }}>
          POSTED ON: 7/25/2025
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Feather name="eye" size={14} color="#6c757d" />
          <Text style={{ fontSize: 12, color: "#6c757d", marginLeft: 4 }}>
            821
          </Text>
        </View>
      </View>

      <Text
        style={{
          fontSize: 18,
          fontWeight: "bold",
          marginBottom: 8,
          color: "#343a40",
        }}
      >
        {title}
      </Text>
      <Text
        style={{
          fontSize: 14,
          color: "#495057",
          lineHeight: 20,
          marginBottom: 10,
        }}
      >
        {description.substring(0, 150)}...
      </Text>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 15,
        }}
      >
        <View>
          <Text style={{ fontSize: 12, color: "#6c757d" }}>Published by:</Text>
          <Text style={{ fontSize: 14, fontWeight: "500", color: "#343a40" }}>
            {publishedBy}
          </Text>
        </View>
        <View style={{alignItems:'flex-start',justifyContent:'flex-start'}}>
          <Text style={{ fontSize: 12, color: "#6c757d", textAlign: "right" }}>
            Audience:
          </Text>
          <Text style={{ fontSize: 14, fontWeight: "500", color: "#343a40" }}>
            {audience}
          </Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={{
            padding: RFValue(8),
            borderRadius: 5,
            flexDirection: "row",
            alignItems: "center",
            backgroundColor:'rgb(244,247,248)'
          }}
        >
          <Entypo name="share" size={18} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: "rgb(238,253,255)",
            paddingVertical: RFValue(10),
            paddingHorizontal: RFValue(70),
            borderRadius: RFValue(10),
          }}
          onPress={() => router.push("/tabs/community/CommunityPostDetails")}
        >
          <Text style={{ color: "rgb(74,122,144)", fontWeight: "bold", fontSize: 14 }}>
            Read Full Post
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

const PostCardHorizontal = ({
  title = "Empowering Education Leaders",
  publishedBy = "Jerome Bell",
  audience = "Education Leaders",
  imageSource = { uri: "https://picsum.photos/400/200?random=1" },
  description = "Education Leaders Play A Crucial Role In Shaping The Future Of Learning. They Inspire Teachers And Students Alike, Fostering An En...",
}) => {
  const combinedHeight = Sizing(100);

  return (
    <View
      style={{
        width: CARD_WIDTH,
        borderRadius: 16,
        overflow: "hidden",
        backgroundColor: "#fff",
        alignSelf: "center",
        marginVertical: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
        borderWidth: 1,
        borderColor: "rgba(0,0,0,0.05)",
      }}
    >
      <View
        style={{
          height: combinedHeight,
          overflow: "hidden",
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
        }}
      >
        <ImageBackground
          source={imageSource}
          resizeMode="cover"
          style={{ flex: 1, width: "100%" }}
          imageStyle={{ borderTopLeftRadius: 16, borderTopRightRadius: 16 }}
        >
          <LinearGradient
            colors={[
              "rgba(255, 255, 255, 0.0)",
              "rgba(255, 255, 255, 0.2)",
              "rgba(255, 255, 255, 0.7)",
              "#ffffff",
            ]}
            locations={[0.0, 0.5, 0.8, 1.0]}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              height: combinedHeight,
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
            }}
          />

          <View
            style={{
              position: "absolute",
              left: 0,
              paddingHorizontal: Sizing(15),
              paddingTop: Sizing(5),
              paddingBottom: Sizing(10),
              width: "60%",
              backgroundColor: "#fff",
              height: combinedHeight,
            }}
          >
            <Text
              style={{
                fontSize: 12,
                color: "#7f7f7f",
                marginBottom: 5,
                fontWeight: "600",
              }}
            >
              POSTED ON: 7/25/2025
            </Text>
            <Text
              style={{
                fontSize: Sizing(18),
                fontWeight: "bold",
                color: "#333",
                width: "100%",
              }}
            >
              {title}
            </Text>
          </View>

          <View
            style={{
              position: "absolute",
              top: Sizing(15),
              right: Sizing(15),
              backgroundColor: "#0d6efd",
              borderRadius: Sizing(20),
              width: Sizing(30),
              height: Sizing(30),
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: Sizing(16),
                lineHeight: Sizing(16) + 2,
              }}
            >
              📣
            </Text>
          </View>
        </ImageBackground>
      </View>

      <View
        style={{ paddingHorizontal: Sizing(15), paddingBottom: Sizing(15) }}
      >
        <Text
          style={{
            fontSize: 15,
            color: COLORS.lightText,
            lineHeight: 22,
            marginBottom: 10,
            marginTop: Sizing(5),
          }}
          numberOfLines={3}
        >
          {description}
        </Text>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 5,
          }}
        >
          <View>
            <Text
              style={{
                fontSize: 12,
                color: COLORS.lightText,
                fontWeight: "600",
                marginBottom: 3,
              }}
            >
              PUBLISHED BY:
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color: "#333",
              }}
            >
              {publishedBy}
            </Text>
          </View>

          <View style={{ alignItems: "flex-end" }}>
            <Text
              style={{
                fontSize: 12,
                color: COLORS.lightText,
                fontWeight: "600",
                marginBottom: 3,
              }}
            >
              AUDIENCE:
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color: "#333",
              }}
            >
              {audience}
            </Text>
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: "#eefdff",
          paddingVertical: 15,
          alignItems: "center",
          borderBottomLeftRadius: 16,
          borderBottomRightRadius: 16,
          borderTopWidth: 1,
          borderColor: "rgba(0,0,0,0.05)",
        }}
        onPress={() => router.push("/tabs/community/CommunityPostDetails")}
      >
        <Text style={{ color: "#4787a4", fontWeight: "bold", fontSize: 16 }}>
          Read Full Post
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default function Community() {
  const ImagePlaceholders = {
    cyber: { uri: "https://picsum.photos/id/1018/700/400" },
    island: { uri: "https://picsum.photos/id/10/700/400" },
    mountain: { uri: "https://picsum.photos/id/237/700/400" },
  };

  const dummyPosts = [
    {
      id: 0,
      title: "Empowering Education Leaders",
      publishedBy: "Jerome Bell",
      audience: "Education Leaders",
      imageSource: ImagePlaceholders.cyber,
      tag: "Cybersecurity in Acedemia",
      description:
        "Education Leaders Play A Crucial Role In Shaping The Future Of Learning. They Inspire Teachers And Students Alike, Fostering An Environment Where Innovation Thrives. By Implementing Effective Strategies And Embracing New Technologies, These Leaders Ensure That Educational Institutions Adapt To The Ever-Changing Demands Of The Modern World. Their Vision And Commitment Really Make A Difference In T...",
    },
    {
      id: 1,
      title: "Empowering Education Leaders",
      publishedBy: "Jerome Bell",
      audience: "Education Leaders",
      imageSource: ImagePlaceholders.cyber,
      tag: "Education",
      description:
        "Education Leaders Play A Crucial Role In Shaping The Future Of Learning. They Inspire Teachers And Students Alike, Fostering An Environment Where Innovation Thrives. By Implementing Effective Strategies And Embracing New Technologies, These Leaders Ensure That Educational Institutions Adapt To The Ever-Changing Demands Of The Modern World. Their Vision And Commitment Really Make A Difference In T...",
    },
    {
      id: 2,
      title: "Inspiring Education Leaders",
      publishedBy: "Jerome Bell",
      audience: "Education Leaders",
      imageSource: ImagePlaceholders.island,
      tag: "Professional Learning",
      description:
        "Education Leaders Are Pivotal In Shaping The Future Of Learning. They Motivate Both Teachers And Students, Cultivating An Atmosphere Where Innovation Flourishes. By Adopting Effective Strategies And Leveraging New Technologies, These Leaders Help Educational Institutions Evolve With The Dynamic Landscape. Their Vision...",
    },
    {
      id: 3,
      title: "Empowering Education Leaders",
      publishedBy: "Jerome Bell",
      audience: "Education Leaders",
      imageSource: ImagePlaceholders.mountain,
      tag: "ISO",
      description:
        "Education Leaders Are Super Important In Shaping How We Learn. They Motivate Both Teachers And Students, Creating A Space Where New Ideas Can Flourish. By Using Smart Strategies And Keeping Up With The Latest Tech, These Leaders Help Schools Adapt To Changes. Their Vision And Commitment Really Make A Difference In T...",
    },
    {
      id: 4,
      title: "Championing Educational Leadership",
      publishedBy: "Jerome Bell",
      audience: "Education Leaders",
      imageSource: ImagePlaceholders.island,
      tag: "Artificial Intelligence",
      description:
        "Educational Leaders Are Pivotal In Shaping The Future Of Learning. They Motivate Both Teachers And Students, Cultivating An Atmosphere Where Innovation Flourishes. By Adopting Effective Strategies And Leveraging New Technologies, These Leaders Help Educational Institutions Evolve With The Dynamic Landscape. Their Vision...",
    },
  ];

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#f8f9fa",
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
          style={{ width: RFValue(40), height: RFValue(25), tintColor: "gray" }}
          resizeMode="contain"
        />
        <Image
          source={{ uri: PROFILE_IMAGE_URL }}
          style={{ width: RFValue(25), height: RFValue(25), borderRadius: 100 }}
          resizeMode="contain"
        />
      </View>

      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 40,
          backgroundColor: "#f8f9fa",
        }}
      >
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
              Community Connect
            </Text>

            <Text
              style={{
                fontSize: RFValue(15),
                fontWeight: "400",
                color: COLORS.white,
                marginBottom: 15,
                marginTop: RFValue(10),
              }}
            >
              Pinned posts
            </Text>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 10, paddingRight: 15 }}
            >
              {dummyPosts.map((post) => (
                <PostCardHorizontal key={post.id} {...post} />
              ))}
            </ScrollView>
          </View>
        </ImageBackground>

        <View style={{ backgroundColor: "rgb(240,242,246)" }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 16,
            }}
          >
            {/* View Drafts Button */}
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: "#fff",
                borderRadius: 12,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                paddingVertical: 10,
                marginRight: 8,
                shadowColor: "#000",
                shadowOpacity: 0.05,
                shadowRadius: 4,
                elevation: 2,
                position: "relative",
              }}
              onPress={() => router.push("/tabs/community/CommunityviewDrafts")}
            >
              <View
                style={{
                  position: "absolute",
                  top: 4,
                  left: 30,
                  backgroundColor: "#EB5757",
                  width: RFValue(12),
                  height: RFValue(12),
                  borderRadius: 9,
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 10,
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontSize: RFValue(6),
                    fontWeight: "600",
                  }}
                >
                  5
                </Text>
              </View>

              <View
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 8,
                  backgroundColor: "#F6F6F6",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 6,
                }}
              >
                <Image
                  source={IMAGES.Drafts}
                  style={{ width: 16, height: 16, tintColor: "#777" }}
                />
              </View>

              <Text
                style={{
                  fontSize: 13,
                  color: "#000",
                  fontWeight: "500",
                  marginLeft: RFValue(10),
                }}
              >
                View Your Drafts
              </Text>
            </TouchableOpacity>

            {/* Start New Post Button */}
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: "#fff",
                borderRadius: 12,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                paddingVertical: 10,
                marginLeft: 8,
                shadowColor: "#000",
                shadowOpacity: 0.05,
                shadowRadius: 4,
                elevation: 2,
              }}
              onPress={() => router.push("/tabs/community/CommunitycreateNewPost")}
            >
              <View
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 8,
                  backgroundColor: "#F6F6F6",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 6,
                }}
              >
                <Image
                  source={IMAGES.Create}
                  style={{ width: 16, height: 16, tintColor: "#777" }}
                />
              </View>

              <Text style={{ fontSize: 13, color: "#000", fontWeight: "500" }}>
                Start New Post
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              //
              marginHorizontal: (width - POST_CARD_WIDTH) / 2,
              marginTop: RFValue(20),
            }}
          >
            {/* 1. SEARCH INPUT AREA (White background, takes up most space) */}
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "white",
                paddingHorizontal: 15,
                paddingVertical: 5,
                borderWidth: 1,
                borderColor: "#ced4da",
                height: RFValue(40),
                borderTopLeftRadius: 10,
                borderBottomLeftRadius: 10,
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
                borderRightWidth: 0,
                marginRight:RFValue(10)
              }}
            >
              {/* Placeholder for "Search by Keywords" */}
              <TextInput
                style={{
                  flex: 1,
                  height: "100%",
                  fontSize: 16,
                  paddingVertical: 0,
                }}
                placeholder="Search by Keywords"
                placeholderTextColor="#6c757d"
              />

              {/* Magnifying Glass Icon (Moved to the end of the input field for placement) */}
              <Feather
                name="search"
                size={18}
                color="#6c757d"
                style={{ marginLeft: 5 }}
              />
            </View>

            {/* 2. FILTER BUTTON (Blue background, rounded on the right) */}
            <View
              style={{
                height: 50,
                width: 50,
                backgroundColor: "#3498db",
                justifyContent: "center",
                alignItems: "center",

                borderRadius: 10,
                // borderBottomRightRadius: 25,
              }}
            >
              {/* Filter Icon */}
              <Feather name="filter" size={20} color="white" />
              {/* Replace '{' with your actual funnel/filter icon component/character */}
            </View>
          </View>
        </View>

        <View
          style={{
            flex: 1,
            alignItems: "center",
            paddingVertical: 15,
            backgroundColor: "#f8f9fa",
          }}
        >
          {dummyPosts.map((post) => (
            <PostCard key={post.id} {...post} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
