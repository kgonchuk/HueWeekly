import { router } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";



export default function Index() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" }}>
      <ActivityIndicator size="large" color="#9333EA" />
    </View>

  );
}