import { Tabs } from "expo-router";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/theme/Colors";
import { TAB_CONFIG } from "@/utils/config/tabConfig";

const TabLayout = () => {
  const { colorScheme } = useColorScheme();

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
        tabBarAccessibilityLabel: "huvudnavigering",
      }}
    >
      {TAB_CONFIG.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            tabBarIcon: tab.icon,
            tabBarAccessibilityLabel: `${tab.title} flik`,
          }}
        />
      ))}
    </Tabs>
  );
};

export default TabLayout;
