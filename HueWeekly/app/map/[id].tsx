import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function MapScreen() {
  const { id } = useLocalSearchParams();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Карта для локації ID: {id}</Text>
    </View>
  );
}