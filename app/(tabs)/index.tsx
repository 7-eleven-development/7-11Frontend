import Card from "@/components/Card";
import { View, Text } from "react-native";
const Index = () => {
  return (
    <View>
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
    </View>
  );
};
export default Index;
