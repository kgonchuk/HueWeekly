
import { router, Tabs } from "expo-router";

import { CustomBottomNav } from "../../components/CustomBottomNav"; 
import { TouchableOpacity, View } from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons"; // Використовуємо один набір іконок для стабільності

import { logout } from "../../redux/auth/authOperation";
import { useAppDispatch } from "../../redux/store";

export default function TabsLayout() {
  const dispatch = useAppDispatch();

  return (
    <Tabs
      tabBar={(props) => <CustomBottomNav {...props} />}
      screenOptions={{
        headerTitleAlign: "center",
        sceneStyle: { backgroundColor: "#fff" },
      }}
    >
      <Tabs.Screen
        name="posts" 
        options={{
          title: "Публікації",
        }}
      />
      <Tabs.Screen
        name="create" 
        options={{
          title: "Створити публікацію",
          headerLeft: () => (
            <TouchableOpacity 
              onPress={() => {
                dispatch(logout()); 
                router.replace("/login"); 
              }}
              style={{ paddingLeft: 16 }}
            >
              <Feather
                name="arrow-left"
                size={24}
                color="rgba(189, 189, 189, 1)"
              />
            </TouchableOpacity>
          ),
        }}
      />
       <Tabs.Screen
        name="profile"
         
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
          headerLeft: () => (
            <TouchableOpacity 
              onPress={() => {
                dispatch(logout()); 
                router.replace("/login"); 
              }}
              style={{ paddingLeft: 16 }}
            >
              <Feather
                name="arrow-left"
                size={24}
                color="rgba(189, 189, 189, 1)"
              />
            </TouchableOpacity>
          ),

        }}
      />
    </Tabs>
  );
}

