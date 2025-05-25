import { Tabs } from "expo-router";
import { AntDesign, Ionicons, Entypo } from "@expo/vector-icons";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/theme/Colors";

const TabLayout = () => {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors[colorScheme ?? "light"].tabBarBackground,
          position: "absolute",
          borderTopWidth: 0,
          elevation: 0,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Hem",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      ></Tabs.Screen>
    <Tabs.Screen
        name="location"
        options={{
          title: "Plats",
          tabBarIcon: ({ color, focused }) => (
            <AntDesign
              name={focused ? "enviroment" : "enviromento"}
              size={24}
              color={color}
            />
          ),
        }}
      ></Tabs.Screen>
      <Tabs.Screen
        name="sound-level"
        options={{
          title: "Ljudnivå",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "headset" : "headset-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      ></Tabs.Screen>
     <Tabs.Screen
        name="air-quality"
        options={{
          title: "Luftkvalitet",
          tabBarIcon: ({ color }) => (
            <Entypo name="air" size={24} color={color} />
          ),
        }}
      ></Tabs.Screen>
      <Tabs.Screen
        name="Pulse"
        options={{
          title: "Puls",
          tabBarIcon: ({ color, focused }) => (
            <AntDesign
              name={focused ? "heart" : "hearto"}
              size={24}
              color={color}
            />
          ),
        }}
      ></Tabs.Screen>
    </Tabs>
  );
};

export default TabLayout;
