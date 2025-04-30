import Card from "@/components/Card";
import { ThemedView } from "@/components/ThemedView";
import { Text } from "react-native";

const Index = () => {
  return (
    <ThemedView >
      <Text>Index</Text>
      <Card title="Gas" dataType="gas" data={107} iconType="meh" />
      <Card
        title="Sound Level"
        dataType="soundLevel"
        data={65}
        iconType="smile"
      />
      <Card
        title="Heart Rate"
        dataType="heartRate"
        data={80}
        iconType="frown"
      />
    </ThemedView>
  );
};
export default Index;
