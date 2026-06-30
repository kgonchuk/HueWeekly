import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function CommentsScreen() {
  const { id } = useLocalSearchParams();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Коментарі для поста ID: {id}</Text>
    </View>
  );
}