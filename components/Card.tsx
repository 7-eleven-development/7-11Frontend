import { View, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import  ThemedText  from "@/components/ThemedText";

type Props = {
  title: string;
  dataType: "soundLevel" | "gas" | "pulse";
  data: number;
  iconType?: "meh" | "smile" | "frown";
};

const Card = ({ title, dataType, data, iconType }: Props) => {
  const unit =
    dataType === "soundLevel" ? "dB" : dataType === "gas" ? "ppm" : "bpm";

  const icon =
    iconType === "meh" ? (
      <AntDesign name="meh" size={24} />
    ) : iconType === "smile" ? (
      <AntDesign name="smileo" size={24} />
    ) : iconType === "frown" ? (
      <AntDesign name="frowno" size={24} />
    ) : (
      ""
    );

  return (
    <View style={styles.card}>
      <ThemedText>{title}</ThemedText>
      <ThemedText>{data}</ThemedText>
      <ThemedText>{unit}</ThemedText>
      <ThemedText>{icon}</ThemedText>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f6f6f6",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default Card;
