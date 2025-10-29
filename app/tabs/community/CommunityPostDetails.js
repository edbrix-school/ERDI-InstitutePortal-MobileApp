import { View, Text, Image, ScrollView, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import React from 'react';
import { Ionicons, Feather } from '@expo/vector-icons'; 
import { router } from 'expo-router';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

const { width } = Dimensions.get('window');
const DUMMY_IMAGE_URL = 'https://picsum.photos/800/400?random=1';

export default function CommunityPostDetails() {
  const postData = {
    title: 'Empowering Education Leaders',
    publishedBy: 'Jerome Bell',
    audience: 'Education Leaders',
    postedDate: '7/25/2025',
    content: [
      {
        type: 'paragraph',
        text: 'Education Leaders Play A Crucial Role In Shaping The Future Of Learning. They Inspire Teachers And Students Alike, Fostering An Environment Where Innovation Thrives. By Implementing Effective Strategies And Embracing New Technologies, These Leaders Ensure That Educational Institutions Adapt To The Ever-Changing Landscape. Their Vision And Dedication Are Key To Creating A Positive Impact On The Community And Enhancing Student Success.',
      },
      {
        type: 'paragraph',
        text: 'Moreover, They Actively Engage With Parents And Local Organizations To Build Partnerships That Support Educational Initiatives. By Prioritizing Professional Development For Educators, They Cultivate A Culture Of Continuous Improvement. Ultimately, Their Commitment To Excellence Not Only Transforms Schools But Also Empowers Students To Reach Their Full Potential.',
      },
    ],
    likes: 352,
    comments: 34,
    views: 352,
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff',paddingTop:RFPercentage(7) }}>
      {/* Header */}
      <TouchableOpacity 
        style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#eee' }}
        onPress={() => router.back()}
      >
        <View style={{ paddingRight: 10 }}>
          <Ionicons name="chevron-back" size={24} color="#000" />
        </View>
        <Text style={{ fontSize: 18, fontWeight: '600', color: '#000' }}>{postData.title}</Text>
      </TouchableOpacity>

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        {/* Post Image */}
        <Image 
          source={{ uri: DUMMY_IMAGE_URL }} 
          style={{ width: width, height: width * 0.5, resizeMode: 'cover' }} 
        />

        {/* Metadata */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15, marginTop: 15, alignItems: 'flex-start' }}>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 14, color: '#555', marginRight: 8 }}>Published by:</Text>
            <TouchableOpacity style={{marginTop:RFValue(10), paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, backgroundColor: '#e6f0ff' }}>
              <Text style={{ fontSize: 14, fontWeight: '500', color: '#000' }}>{postData.publishedBy}</Text>
            </TouchableOpacity>
          </View>

          <View style={{ alignItems: 'center', justifyContent: 'flex-end', flex: 1 }}>
            <Text style={{ fontSize: 14, color: '#555', marginRight: 8 }}>Audience:</Text>
            <TouchableOpacity style={{ marginTop:RFValue(10),paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, backgroundColor: '#e6f0ff' }}>
              <Text style={{ fontSize: 14, fontWeight: '500', color: '#000' }}>{postData.audience}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={{marginTop:RFValue(20), fontSize: 12, color: '#888', paddingHorizontal: 15,  marginBottom: 10, fontWeight: '500' }}>
          POSTED ON: {postData.postedDate}
        </Text>

        {/* Content */}
        <View style={{ paddingHorizontal: 15 }}>
          <Text style={{ fontSize: 18, fontWeight: '700', marginBottom: 10, color: '#000' }}>{postData.title}</Text>
          {postData.content.map((block, index) => (
            <Text key={index} style={{ fontSize: 16, lineHeight: 24, marginBottom: 15, color: '#333' }}>
              {block.text}
            </Text>
          ))}
          <Text style={{ fontSize: 14, color: '#aaa', marginTop: 10, textAlign: 'left' }}>{postData.views}</Text>
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingVertical: 10, borderTopWidth: 1, borderTopColor: '#eee', backgroundColor: '#fff' }}>
        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, paddingVertical: 5 }}>
          <Feather name="share-2" size={20} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, paddingVertical: 5 }}>
          <Feather name="message-square" size={20} color="#000" />
          <Text style={{ marginLeft: 8, fontSize: 16, fontWeight: '600', color: '#000' }}>{postData.comments}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, paddingVertical: 5 }}>
          <Feather name="thumbs-up" size={20} color="#000" />
          <Text style={{ marginLeft: 8, fontSize: 16, fontWeight: '600', color: '#000' }}>{postData.likes}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
