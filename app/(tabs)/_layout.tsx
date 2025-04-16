import { Tabs } from "expo-router";
const TabLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
        }}
      ></Tabs.Screen>
      <Tabs.Screen
        name="location"
        options={{
          title: "Location",
        }}
      ></Tabs.Screen>
      <Tabs.Screen
        name="soundLevel"
        options={{
          title: "Sound Level", 
        }}
      ></Tabs.Screen>
      <Tabs.Screen
        name="gas"
        options={{
          title: "Gas",
        }}
      ></Tabs.Screen>
      <Tabs.Screen
        name="heartRate"
        options={{
          title: "Heart Rate",
        }}
      ></Tabs.Screen>
    </Tabs>
  );
};

export default TabLayout;
