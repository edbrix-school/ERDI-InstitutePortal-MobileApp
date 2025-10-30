import React, { useState } from "react";
import {
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
  ImageBackground,
  RefreshControl,
} from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import * as IMAGES from "../../../components/Images";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import {
  AntDesign,
  Entypo,
  EvilIcons,
  Feather,
  MaterialIcons,
} from "@expo/vector-icons";

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
    <Text
      style={{
        color: "white",
        fontSize: size * 0.6,
        fontFamily: "Montserrat_400",
      }}
    >
      {name}
    </Text>
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
      paddingHorizontal: RFValue(10),
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
          backgroundColor: "rgba(199,162,121)",
          paddingHorizontal: 12,
          paddingVertical: 4,
          borderRadius: 15,
        }}
      >
        <Text
          style={{ color: "white", fontSize: 12, fontFamily: "Montserrat_600" }}
        >
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
            backgroundColor: "rgba(157,163,174)",
            borderRadius: 20,
          }}
        >
          <Image
            source={IMAGES.PinWhite}
            style={{ height: RFValue(26), width: RFValue(26) }}
            resizeMode="contain"
          />
        </View>
        <View
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            borderRadius: 20,
            alignItems: "center",
            height: RFPercentage(5),
            width: RFPercentage(5),
            justifyContent: "center",
          }}
        >
          <EvilIcons name="like" size={16} color="#000" />
          <Text
            style={{
              fontSize: 12,
              marginLeft: 4,
              color: "#333",
              fontFamily: "Montserrat_400",
            }}
          >
            352
          </Text>
        </View>
        <View
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            borderRadius: 20,
            alignItems: "center",
            height: RFPercentage(5),
            width: RFPercentage(5),
            justifyContent: "center",
          }}
        >
          <MaterialIcons name="message" size={14} color="#495057" />
          <Text
            style={{
              fontSize: 12,
              marginLeft: 4,
              color: "#333",
              fontFamily: "Montserrat_400",
            }}
          >
            95
          </Text>
        </View>
      </View>
    </View>

    <View style={{ padding: RFValue(10) }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 8,
        }}
      >
        <Text
          style={{
            fontSize: RFValue(10),
            color: "#6c757d",
            fontFamily: "Montserrat_400",
          }}
        >
          POSTED ON: 7/25/2025
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Feather name="eye" size={20} color="#6c757d" />
          <Text
            style={{
              fontSize: RFValue(10),
              color: "#6c757d",
              marginLeft: 4,
              fontFamily: "Montserrat_400",
            }}
          >
            821
          </Text>
        </View>
      </View>

      <Text
        style={{
          fontSize: RFValue(14),
          fontFamily: "Montserrat_600",
          marginBottom: 8,
          color: "#343a40",
        }}
      >
        {title}
      </Text>
      <Text
        style={{
          fontSize: RFValue(10),
          color: "#495057",
          marginBottom: 10,
          fontFamily: "Montserrat_400",
        }}
      >
        {description.substring(0, 300)}...
      </Text>

      <View style={{borderBottomColor:"rgb(239,240,242)",borderBottomWidth:0.5,marginVertical:RFValue(5)}} />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: RFValue(15),
          marginTop:RFValue(5)
        }}
      >
        <View>
          <Text
            style={{
              fontSize: 12,
              color: "#6c757d",
              fontFamily: "Montserrat_400",
            }}
          >
            Published by:
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontFamily: "Montserrat_600",
              color: "#343a40",
            }}
          >
            {publishedBy}
          </Text>
        </View>
        <View
          style={{ alignItems: "flex-start", justifyContent: "flex-start" }}
        >
          <Text
            style={{
              fontSize: 12,
              color: "#6c757d",
              textAlign: "right",
              fontFamily: "Montserrat_400",
            }}
          >
            Audience:
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "500",
              color: "#343a40",
              fontFamily: "Montserrat_500",
            }}
          >
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
            padding: RFValue(12),
            borderRadius: 5,
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "rgb(244,247,248)",
            marginRight:RFValue(10)
          }}
        >
          <Entypo name="share" size={18} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: "rgb(238,253,255)",
            paddingVertical: RFValue(12),
            paddingHorizontal: RFValue(70),
            borderRadius: RFValue(5),
          }}
          onPress={() => router.push("/tabs/community/CommunityPostDetails")}
        >
          <Text
            style={{
              color: "rgb(74,122,144)",
              fontFamily: "Montserrat_600",
              fontSize: 14,
            }}
          >
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
  description = "Education Leaders Play A Crucial Role In Shaping The Future Of Learning. They Inspire Teachers And Students Alike, Fostering An En...",
}) => {
  return (
    <View
      style={{
        width: RFPercentage(35), // dynamic width (~40% of screen height, scales well horizontally)
        borderRadius: RFValue(13),
        backgroundColor: "#fff",
        overflow: "hidden",
        marginRight: RFValue(8),
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: RFValue(6),
        elevation: 2,
        borderWidth: 1,
        borderColor: "rgba(0,0,0,0.04)",
      }}
    >
      {/* --- Image Section --- */}
      <View style={{ height: RFPercentage(24) }}>
        <ImageBackground
          source={IMAGES.CommunityPostHeader}
          resizeMode="cover"
          style={{ flex: 1, height: RFPercentage(11) }}
          imageStyle={{ alignSelf: "flex-end" }}
        >
          {/* Gradient left → right */}
          <LinearGradient
            colors={[
              "rgba(255,255,255,1)",
              "rgba(255,255,255,1)",
              "rgba(255,255,255,1)",
              "rgba(255,255,255,0.9)",
              "rgba(255,255,255,0.6)",
              "rgba(255,255,255,0.0)",
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              right: 0,
              borderTopLeftRadius: RFValue(16),
              borderTopRightRadius: RFValue(16),
            }}
          />

          {/* Left overlay text */}
          <View
            style={{
              left: 0,
              top: 10,
              bottom: 0,
              width: "80%",
              justifyContent: "center",
              paddingHorizontal: RFValue(12),
            }}
          >
            <Text
              style={{
                fontSize: RFValue(8),
                color: "rgb(187,189,196)",
                marginBottom: RFValue(4),
                fontFamily: "Montserrat_500",
              }}
            >
              POSTED ON: 7/25/2025
            </Text>
            <Text
              style={{
                fontSize: RFValue(12),
                fontFamily: "Montserrat_700",
                color: "#1A1A1A",
              }}
            >
              {title}
            </Text>
          </View>

          {/* Badge */}
          <View
            style={{
              backgroundColor: "#fff",
              width: RFValue(18),
              height: RFValue(18),
              position: "absolute",
              top: RFValue(14),
              right: RFValue(15),
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={IMAGES.Pin}
              style={{
                width: RFValue(28),
                height: RFValue(28),
              }}
            />
          </View>
          {/* --- Description --- */}
          <View
            style={{
              paddingHorizontal: RFValue(12),
              paddingVertical: RFValue(10),
              marginTop: RFValue(10),
            }}
          >
            <Text
              style={{
                fontSize: RFValue(10),
                color: "#555",
                fontFamily: "Montserrat_400",
                marginBottom: RFValue(8),
              }}
              numberOfLines={3}
            >
              {description}
            </Text>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: RFValue(4),
              }}
            >
              <View>
                <Text
                  style={{
                    fontSize: RFValue(9),
                    color: "#8A8A8A",
                    fontFamily: "Montserrat_500",
                    marginBottom: RFValue(2),
                  }}
                >
                  PUBLISHED BY:
                </Text>
                <Text
                  style={{
                    fontSize: RFValue(10),
                    color: "#1A1A1A",
                    fontFamily: "Montserrat_700",
                  }}
                >
                  {publishedBy}
                </Text>
              </View>

              <View style={{ alignItems: "flex-start" }}>
                <Text
                  style={{
                    fontSize: RFValue(9),
                    color: "#8A8A8A",
                    fontFamily: "Montserrat_500",
                    marginBottom: RFValue(2),
                  }}
                >
                  AUDIENCE:
                </Text>
                <Text
                  style={{
                    fontSize: RFValue(10),
                    color: "#1A1A1A",
                    fontFamily: "Montserrat_700",
                  }}
                >
                  {audience}
                </Text>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>

      {/* --- CTA --- */}
      <TouchableOpacity
        style={{
          backgroundColor: "rgb(238,253,255)",
          paddingVertical: RFValue(6),
          alignItems: "center",
          borderTopWidth: 1,
          borderColor: "rgba(0,0,0,0.05)",
          borderRadius: RFValue(5),
          marginBottom: RFValue(10),
          marginHorizontal: RFValue(10),
        }}
        onPress={() => router.push("/tabs/community/CommunityPostDetails")}
      >
        <Text
          style={{
            color: "rgb(50,113,148)",
            fontFamily: "Montserrat_600",
            fontSize: RFValue(10),
          }}
        >
          Read Full Post
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default function Community() {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);

    // ✅ Add your refresh API logic here
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

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
        backgroundColor: "#ffff",
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
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <ImageBackground
          source={IMAGES.ScheduleBg}
          resizeMode="cover"
          style={{ flex: 1, paddingBottom: RFValue(20) }}
        >
          <View style={{ paddingHorizontal: 20 }}>
            <Text
              style={{
                fontSize: RFValue(14),
                fontFamily: "Montserrat_700",
                color: COLORS.white,
                marginTop: 15,
                marginBottom: 10,
              }}
            >
              Community Connect
            </Text>

            <Text
              style={{
                fontSize: RFValue(12),
                fontFamily: "Montserrat_400",
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
              paddingHorizontal: RFValue(16),
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
                    fontFamily: "Montserrat_600",
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
                  style={{
                    width: RFValue(16),
                    height: RFValue(16),
                    tintColor: "#777",
                  }}
                />
              </View>

              <Text
                style={{
                  fontSize: 13,
                  color: "#000",
                  fontFamily: "Montserrat_400",
                  marginLeft: RFValue(5),
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
              onPress={() =>
                router.push("/tabs/community/CommunitycreateNewPost")
              }
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
                  style={{
                    width: RFValue(16),
                    height: RFValue(16),
                    tintColor: "#777",
                  }}
                />
              </View>

              <Text
                style={{
                  fontSize: 13,
                  color: "#000",
                  fontFamily: "Montserrat_400",
                }}
              >
                Start New Post
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              //
              paddingHorizontal: RFValue(16),
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
                marginRight: RFValue(10),
              }}
            >
              {/* Placeholder for "Search by Keywords" */}
              <TextInput
                style={{
                  flex: 1,
                  height: "100%",
                  fontSize: 16,
                  paddingVertical: 0,
                  fontFamily: "Montserrat_400",
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
            paddingBottom:RFPercentage(20)
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
