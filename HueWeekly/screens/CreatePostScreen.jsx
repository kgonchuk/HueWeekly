import React, { useState, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Animated,
  Pressable,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import * as Location from "expo-location";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../redux/post/postOperation";

const COLOR_OF_THE_DAY = {
  hex: "#C8541A",
  name: "Burnt Sienna",
  label: "Today's Color",
};

function CustomToggle({ checked, onChange }) {
  const animatedValue = useRef(new Animated.Value(checked ? 1 : 0)).current;

  React.useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: checked ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [checked]);

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [3, 21],
  });

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onChange}
      style={[
        styles.toggleTrack,
        { backgroundColor: checked ? COLOR_OF_THE_DAY.hex : "#cbcac6" },
      ]}
    >
      <Animated.View style={[styles.toggleThumb, { transform: [{ translateX }] }]} />
    </TouchableOpacity>
  );
}

export default function CreateScreen() {
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [isPublic, setIsPublic] = useState(true);
   const [place, setPlace] = useState("");
const [coords, setCoords] = useState({ latitude: 0, longitude: 0 });
const token = useSelector((state) => state.auth.accessToken);



  async function pickImage() {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  }

const getLocation = async (placeName) => {
    try {
      if (placeName && placeName.trim() !== "") {
        const geoResult = await Location.geocodeAsync(placeName);
        if (geoResult.length > 0) {
          const newCoords = {
            latitude: geoResult[0].latitude,
            longitude: geoResult[0].longitude,
          };
          setCoords(newCoords);
          alert(`Знайдено координати для: ${placeName}`);
          return;
        }
      }
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Доступ до геолокації відхилено!");
        return;
      }
      const locationResult = await Location.getCurrentPositionAsync({});
      const currentCoords = {
        latitude: locationResult.coords.latitude,
        longitude: locationResult.coords.longitude,
      };
      setCoords(currentCoords);
      const addr = await Location.reverseGeocodeAsync(currentCoords);
      if (addr.length > 0) {
        const newPlaceName = `${addr[0].city || addr[0].region || ""}, ${addr[0].country || ""}`;
        setPlace(newPlaceName);
      }
    } catch (error) {
      console.log(error);
      alert("Не вдалося визначити локацію");
    }
  };

  const handlePublish = async () => {
    if(!image){
      Alert.alert("Будь ласка, додайте фото перед публікацією.");
      return;
    }
    const postData = {
      photo: image,
      title: title,
      place: place,
      latitude: coords.latitude,
      longitude: coords.longitude,
      token: token,
    };
    dispatch(createPost(postData)); 
    Alert.alert("Пост успішно створено!");
    setImage(null);
    setTitle("");
    setPlace("");
    setCoords({ latitude: 0, longitude: 0 });
    router.push("/posts");
  };

  return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
    
        <View style={styles.badgeWrapper}>
          <View style={styles.badgeContainer}>
            <View style={[styles.badgeDot, { backgroundColor: COLOR_OF_THE_DAY.hex }]} />
            <Text style={[styles.badgeText, { color: COLOR_OF_THE_DAY.hex }]}>
              {COLOR_OF_THE_DAY.label} · {COLOR_OF_THE_DAY.name}
            </Text>
            <Text style={styles.colorHex}>{COLOR_OF_THE_DAY.hex.toUpperCase()}</Text>
          </View>
        </View>

        {/* Media Container */}
        <View style={styles.mediaContainer}>
          {image ? (
            <View style={styles.imagePreviewWrapper}>
              <Image source={{ uri: image }} style={styles.previewImage} />
              <TouchableOpacity style={styles.removeButton} onPress={() => setImage(null)}>
                <Ionicons name="close" size={16} color="white" />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity style={styles.uploadPlaceholder} onPress={pickImage} activeOpacity={0.7}>
              <View style={styles.uploadIconCircle}>
                <Feather name="image" size={24} color="#8a8680" />
              </View>
              <View style={styles.uploadTextContainer}>
                <Text style={styles.uploadMainText}>Select from Gallery</Text>
                <Text style={styles.uploadSubText}>Tap to browse your photos</Text>
              </View>
            </TouchableOpacity>
          )}

        </View>
  {image && (
          <TouchableOpacity onPress={() => {
    setImage(null);

  }}>
            <Text style={{ color: "red", marginTop: 8 }}>Видалити фото</Text>
          </TouchableOpacity>
        )}

        {/* Caption Input */}
        <View style={styles.inputSection}>
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="Write a title for your color day..."
            placeholderTextColor="#8a8680"
            multiline
            maxLength={280}
            style={styles.captionInput}
          />
          <View style={styles.charCounterContainer}>
            <Text style={styles.charCounterText}>{title.length} / 280</Text>
          </View>
        </View>

         <View style={styles.locationWrap}>
            <Pressable onPress={() => getLocation(place)}>
              <Feather name="map-pin" size={20} color="#BDBDBD" />
            </Pressable>
            <TextInput
              placeholder="Місцевість..."
              value={place}
              onChangeText={setPlace}
              style={styles.inputPlace}
            />
          </View>

  <TouchableOpacity
          onPress={handlePublish}
          activeOpacity={0.8}
          style={[styles.publishButton, { backgroundColor: COLOR_OF_THE_DAY.hex }]}
        >
          <Text style={styles.publishText}>Publish</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  topNav: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(23,22,20,0.05)",
  },
  navButton: {
    paddingVertical: 4,
  },
  cancelText: {
    fontSize: 15,
    color: "#8a8680",
    fontWeight: "500",
  },
  screenTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: "#171614",
    textAlign: "center",
    flex: 1,
  },
  publishButton: {
     width: "100%",
    padding: 16,
    borderRadius: 100,
    alignItems: "center",
    marginTop: 32,
    zIndex: 999,
    elevation: 10,
  },
  
  publishText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  badgeWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 16,
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
  mediaContainer: {
    width: "100%",
    marginBottom: 8,
  },
  imagePreviewWrapper: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 20,
    overflow: "hidden",
    position: "relative",
  },
  previewImage: {
    width: "100%",
    height: "100%",
  },
  removeButton: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "rgba(0,0,0,0.4)",
    alignItems: "center",
    justifyContent: "center",
  },
  uploadPlaceholder: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: "rgba(23,22,20,0.15)",
    borderStyle: "dashed",
    backgroundColor: "#faf9f7",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  uploadIconCircle: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: "#f0ede8",
    alignItems: "center",
    justifyContent: "center",
  },
  uploadTextContainer: {
    alignItems: "center",
  },
  uploadMainText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#171614",
  },
  uploadSubText: {
    fontSize: 13,
    color: "#8a8680",
    marginTop: 2,
  },
  formatHint: {
    fontSize: 11,
    color: "#8a8680",
    textAlign: "center",
    marginTop: 8,
  },
  inputSection: {
    marginTop: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(23,22,20,0.08)",
    paddingBottom: 8,
  },
  captionInput: {
    fontSize: 15,
    color: "#171614",
    lineHeight: 22,
    minHeight: 60,
    textAlignVertical: "top",
  },
  charCounterContainer: {
    alignItems: "flex-end",
    marginTop: 4,
  },
  charCounterText: {
    fontSize: 11,
    color: "#8a8680",
  },
  rowItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(23,22,20,0.08)",
  },
  rowIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#f0ede8",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  rowInput: {
    flex: 1,
    fontSize: 15,
    color: "#171614",
  },
  toggleTextContainer: {
    flex: 1,
  },
  toggleMainText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#171614",
  },
  toggleSubText: {
    fontSize: 12,
    color: "#8a8680",
    marginTop: 2,
  },
  toggleTrack: {
    width: 46,
    height: 26,
    borderRadius: 13,
    justifyContent: "center",
    paddingHorizontal: 2,
  },
  toggleThumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 2,
  },
  colorTagSection: {
    marginTop: 24,
  },
  colorTagHeading: {
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 1,
    color: "#8a8680",
    marginBottom: 12,
  },
  colorTagRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  colorBlock: {
    width: 40,
    height: 40,
    borderRadius: 12,
    marginRight: 12,
  },
  colorName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#171614",
  },
  colorHex: {
    fontSize: 12,
    color: "#8a8680",
    marginTop: 2,
  },
  changeButton: {
    marginLeft: "auto",
    backgroundColor: "#f0ede8",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 9999,
  },
  changeButtonText: {
    fontSize: 13,
    fontWeight: "500",
    color: "#8a8680",
  },
  locationWrap: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#E8E8E8",
  },
   inputPlace: {
    flex: 1,
    fontSize: 16,
    fontWeight: "400",
    paddingVertical: 16,
    marginLeft: 8,
  },
});