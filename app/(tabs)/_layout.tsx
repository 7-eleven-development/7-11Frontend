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
          title: "Home",
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
          title: "Location",
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
          title: "Sound Level",
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
          title: "Air Quality",
          tabBarIcon: ({ color, focused }) => (
            <Entypo
              //   name={focused ? "home" : "home-outline"}
              name={"air"}
              size={24}
              color={color}
            />
          ),
        }}
      ></Tabs.Screen>
      <Tabs.Screen
        name="pulse"
        options={{
          title: "Pulse",
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
