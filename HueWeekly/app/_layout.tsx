import { Stack, useRouter, useSegments } from "expo-router";
import { Provider, useSelector } from "react-redux";
import { useFonts } from "expo-font";
import { ActivityIndicator, View } from "react-native";
import { persistor, RootState, store } from "../redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { useEffect } from "react";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Bold": require("../assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Medium": require("../assets/fonts/Roboto-Medium.ttf"),
  });
  // if (!fontsLoaded) {
  //   return (
  //     <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" }}>
  //       <ActivityIndicator size="large" color="#9333EA" />
  //     </View>
  //   );
  // }

  return (
    <Provider store={store}>
      <PersistGate 
        loading={
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" }}>
            <ActivityIndicator size="large" color="#9333EA" />
          </View>
        } 
        persistor={persistor}
      >
        <RootLayoutContent />
      </PersistGate>
    </Provider>
  );
}

function RootLayoutContent() {
  const isLoggedIn = useSelector((state: RootState) => state.auth?.isLoggedIn) ?? false;
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const inAuthGroup = segments[0] === "(auth)";

    if (!isLoggedIn && !inAuthGroup) {
      router.replace("/login");
    } else if (isLoggedIn && inAuthGroup) {
      router.replace("/");
    }
  }, [isLoggedIn, segments]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen 
        name="comments/[id]" 
        options={{ 
          headerShown: true, 
          title: "Коментарі",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: '#fff' },
          headerTitleStyle: { fontSize: 17, fontWeight: "500" },
          headerTintColor: "#000", 
        }} 
      />
      <Stack.Screen 
        name="map/[id]" 
        options={{ 
          headerShown: true, 
          title: "Локація",
          headerTitleAlign: "center",
          headerTintColor: "#000", 
        }} 
      />
    </Stack>
  );
}