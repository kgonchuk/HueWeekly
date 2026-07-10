
import React, { useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, Keyboard, TouchableWithoutFeedback, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Feather } from "@expo/vector-icons";
import { generateWeeklyColor, getColorArtisticName } from "../helpers/colorGenerator";
import { LinearGradient } from "expo-linear-gradient";
import DeleteBtn from "../assets/images/add.png";
import * as ImagePicker from "expo-image-picker";
import { updateAvatar } from "../redux/auth/authOperation";
import {PostItem} from '../components/PostItem';
import { selectPostsByAuthor } from "../redux/post/postSelector";

export const ProfileScreen = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth?.user);
  const [avatar, setAvatar] = useState(null);
  const userId= user?.id || user?._id || "guest";
  const weeklyColor= generateWeeklyColor(userId, new Date());
  const weeklyColorBg = weeklyColor.replace("hsl", "hsla").replace(")", ", 0.15)");
  const artisticName = getColorArtisticName(weeklyColor);

  const baseUrl = "http://192.168.0.178:5001";
  const todayHsl = user ? generateWeeklyColor(user._id || user.id, new Date()) : "hsl(25, 100%, 50%)";
  const darkerHsl = todayHsl.replace(/[\d.]%\)$/, (match) => {
    const currentLightness = parseFloat(match);
    return `${Math.max(currentLightness - 15, 30)}%)`; 
  });

  const todayGradient = [todayHsl, darkerHsl];

  const safeAvatarUrl = typeof user?.avatarUrl === 'string' ? user.avatarUrl : null;

const displayAvatar = avatar
  ? avatar
  : safeAvatarUrl
    ? safeAvatarUrl.startsWith("http")
      ? safeAvatarUrl 
      : `${baseUrl.replace(/\/$/, "")}/${safeAvatarUrl.replace(/^\//, "")}`
    : null;
    
  const uploadPhoto = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status === "granted") {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ['images'], 
          allowsEditing: true,
          aspect: [1, 1], 
          quality: 1,
        });
        if (!result.canceled) {
          const uri = result.assets[0].uri;
          setAvatar(uri);
          dispatch(updateAvatar(uri));
        }
      }
    } catch (error) {
      console.log("error", error.message);
    }
  };

  const myPosts = useSelector((state) => selectPostsByAuthor(state, user._id || user.id));

  return (

    <View style={styles.container}>
      <FlatList
       data={myPosts}
       keyExtractor={(item) => item._id || item.id}
      ListHeaderComponent={() => (
  <View style={styles.heroContainer}>
    <View style={styles.flexRow}>
      <View style={styles.avatarWrapper}>
        <LinearGradient
          colors={todayGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientBorder}
        >
          <View style={styles.innerSpacing}>
            {displayAvatar ? (
              <Image source={{ uri: displayAvatar }} style={styles.avatarImage} />
            ) : (
              <View style={[styles.avatarImage, styles.userPhotoPlaceholder]} />
            )}
          </View>
        </LinearGradient>
        <TouchableOpacity 
          style={[styles.badge, { backgroundColor: todayHsl }]} 
          onPress={uploadPhoto}
          activeOpacity={0.8}
        >
          {displayAvatar ? (
            <Image source={DeleteBtn} style={styles.deleteplus} />
          ) : (
            <Feather name="plus" size={14} color="#FFFFFF" />
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.contentWrapper}>
        <Text style={[styles.usernameText, { color: weeklyColor }]}>
          {user?.displayname || "Aurora Chen"}
        </Text>
        <Text style={[styles.emailText, { color: weeklyColor }]}>
          {user?.email || "No email provided"}
        </Text>
      </View>
    </View> 
    <View style={styles.badgeWrapper}>
      <View style={[
        styles.badgeContainer,
        { backgroundColor: weeklyColorBg, borderColor: weeklyColor, borderWidth: 1 }
      ]}>
        <View style={[styles.badgeDot, { backgroundColor: weeklyColor }]} />
        <Text style={[styles.badgeText, { color: weeklyColor }]}>
          YOUR WEEKLY COLOR · {artisticName}
        </Text>
      </View>
    </View>

  </View>
)}
        renderItem={({ item }) => (
          <View style={styles.postItem}>
            <PostItem post={item}/>
          </View>
        )}
      />
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',

  },
  heroContainer: {
    paddingHorizontal: 20, 
    paddingTop: 12,        
    paddingBottom: 20,    
    marginTop: 60, 
  },
  flexRow: {
    flexDirection: 'row',  
    alignItems: 'center',
  },
  avatarWrapper: {
    position: 'relative',
    width: 88,
    height: 88,
    flexShrink: 0,        
  },
  gradientBorder: {
    width: 88,
    height: 88,
    borderRadius: 44,    
    padding: 3,           
  },
  innerSpacing: {
    width: '100%',
    height: '100%',
    borderRadius: 41,
    backgroundColor: '#FFFFFF', 
    padding: 2.5,        
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 38,    
    backgroundColor: '#E5E7EB', 
  },
  userPhotoPlaceholder: {
    backgroundColor: '#F3F4F6', // Сірий фон якщо немає фото
  },
  badge: {
    position: 'absolute',
    bottom: 0,            
    right: 0,             
    width: 26, // Трохи збільшив, щоб зручніше було тапати пальцем
    height: 26,
    borderRadius: 13,
    borderWidth: 2.5,     
    borderColor: '#FFFFFF', 
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3, // Тінь для Android
    shadowColor: '#000', // Тінь для iOS
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  deleteplus: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  contentWrapper: {
    flex: 1,
    marginLeft: 20,  
         
  },
  usernameText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#171614',
    marginBottom: 4,
  },
  emailText: {
    fontSize: 14,
    color: '#6B7280',
  },
   badgeWrapper: {
    flexDirection: "row",
   justifyContent: "flex-start", 
  marginTop: 16,
  },
  badgeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 9999,
    backgroundColor: "#fff0e8",
  },
  badgeDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.3,
  },
});