import {
  AntDesign,
  Entypo,
  Ionicons,
  MaterialIcons,
  Fontisto,
} from "@expo/vector-icons";
import ThemedText from "@/components/ThemedText";
import ThemedView from "@/components/ThemedView";
import { Colors, ColorSchemeName } from "@/theme/Colors";
import { View, StyleSheet } from "react-native";
import { CardStatus } from "@/components/Card";

export const getTitle = (type: string) => {
  switch (type) {
    case "airQuality":
      return "Luftkvalitet";
    case "soundLevel":
      return "Ljudnivå";
    case "pulse":
      return "Puls";
    default:
      return "N[got gick fel";
  }
};

export const getTitleIcon = (type: string) => {
  if (type === "airQuality") {
    return <Entypo name="air" size={32} color="black" />;
  } else if (type === "soundLevel") {
    return <Ionicons name="headset-outline" size={32} color="black" />;
  } else if (type === "pulse") {
    return <AntDesign name="hearto" size={32} color="black" />;
  } else {
    return (
      <MaterialIcons
        name="error-outline"
        size={32}
        color="black"
      ></MaterialIcons>
    );
  }
};

export const getStatusIcon = (status: CardStatus) => {
  if (status === "good") {
    return <Fontisto name="smiley" size={64} />;
  } else if (status === "bad") {
    return <Fontisto name="frowning" size={64} />;
  } else {
    return <Fontisto name="slightly-smile" size={64} />;
  }
};

export const getBackgroundColor = (
  status: CardStatus,
  colorScheme: ColorSchemeName
) => {
  if (status === "good") {
    return colorScheme === "dark" ? Colors.dark.success : Colors.light.success;
  } else if (status === "bad") {
    return colorScheme === "dark" ? Colors.dark.error : Colors.light.error;
  } else {
    return colorScheme === "dark" ? Colors.dark.neutral : Colors.light.neutral;
  }
};

export const getStatusText = (type: string, data: any) => {
  const statusText =
    type === "airQuality" ? (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          alignItems: "flex-end",
          justifyContent: "flex-start",
        }}
      >
        <ThemedText type="subtitle">PM1: {data.pm1}</ThemedText>
        <ThemedText type="subtitle">PM2: {data.pm2}</ThemedText>
        <ThemedText type="subtitle">PM10: {data.pm10}</ThemedText>
        <ThemedText type="subtitle">TVOC: {data.tvoc}</ThemedText>
      </View>
    ) : type === "soundLevel" ? (
      <ThemedText type="subtitle">{data.soundLevel} dB</ThemedText>
    ) : type === "pulse" ? (
      <ThemedText type="subtitle">BPM: {data.pulse} </ThemedText>
    ) : (
      <ThemedText>Unknown Data</ThemedText>
    );

  return statusText;
};

// const styles = StyleSheet.create({
//   card: {

// }};
