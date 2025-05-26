import {
  AntDesign,
  Entypo,
  Ionicons,
  MaterialIcons,
  Fontisto,
} from "@expo/vector-icons";
import ThemedText from "@/components/ThemedText";
import { Colors, ColorSchemeName } from "@/theme/Colors";
import { View } from "react-native";
import { CardStatus } from "@/components/Card";
import { getSoundLevelStatus } from "./soundLevelUtils";
import { getCO2Status, getPropaneStatus, getSmokeStatus } from "./airQualityUtils";
import { getPulseStatus } from "./pulseUtils";

export const getTitle = (type: string) => {
  switch (type) {
    case "airQuality":
      return "Luftkvalitet";
    case "soundLevel":
      return "Ljudnivå";
    case "pulse":
      return "Puls";
    default:
      return "Något gick fel";
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
    return <MaterialIcons name="error-outline" size={32} color="black" />;
  }
};

export const getStatusIcon = (iconName: string, size: number = 64) => {
  switch (iconName) {
    case "smiley":
      return <Fontisto name="smiley" size={size} />;
    case "frowning":
      return <Fontisto name="frowning" size={size} />;
    case "slightly-smile":
    default:
      return <Fontisto name="slightly-smile" size={size} />;
  }
};

export const getCardStatus = (type: string, data: any): CardStatus => {
  if (type === "airQuality") {
    const smokeStatus = getSmokeStatus(data.smoke);
    const co2Status = getCO2Status(data.co2);
    const propaneStatus = getPropaneStatus(data.propane);
    
    // If any value is in "bad" range, the entire air quality is bad
    if (smokeStatus.icon === "frowning" || co2Status.icon === "frowning" || propaneStatus.icon === "frowning") {
      return "bad";
    }
    // If all values are in "good" range, the air quality is good
    if (smokeStatus.icon === "smiley" && co2Status.icon === "smiley" && propaneStatus.icon === "smiley") {
      return "good";
    }
    // Otherwise neutral
    return "normal";
  } else if (type === "soundLevel") {
    const status = getSoundLevelStatus(data.soundLevel);
    return status.icon === "frowning" ? "bad" : status.icon === "smiley" ? "good" : "normal";
  } else if (type === "pulse") {
    const status = getPulseStatus(data.pulse);
    return status.icon === "frowning" ? "bad" : status.icon === "smiley" ? "good" : "normal";
  }
  
  return "normal";
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

export const getIconNameFromStatus = (status: CardStatus): string => {
  switch (status) {
    case "good":
      return "smiley";
    case "bad":
      return "frowning";
    case "normal":
    default:
      return "slightly-smile";
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
        <ThemedText type="subtitle">Rök: {data.smoke}</ThemedText>
        <ThemedText type="subtitle">Koldioxid: {data.co2}</ThemedText>
        <ThemedText type="subtitle">Propan: {data.propane}</ThemedText>
      </View>
    ) : type === "soundLevel" ? (
      <ThemedText type="subtitle">{data.soundLevel} dB</ThemedText>
    ) : type === "pulse" ? (
      <ThemedText type="subtitle">BPM: {data.pulse}</ThemedText>
    ) : (
      <ThemedText>Unknown Data</ThemedText>
    );

  return statusText;
};

export const getStatusLabel = (type: string, data: any) => {
  if (type === "airQuality") {
    // For air quality, we check all values and prioritize the worst status
    const smokeStatus = getSmokeStatus(data.smoke);
    const co2Status = getCO2Status(data.co2);
    const propaneStatus = getPropaneStatus(data.propane);
    
    if (smokeStatus.icon === "frowning" || co2Status.icon === "frowning" || propaneStatus.icon === "frowning") {
      return "Dålig luftkvalitet";
    }
    if (smokeStatus.icon === "smiley" && co2Status.icon === "smiley" && propaneStatus.icon === "smiley") {
      return "Bra luftkvalitet";
    }
    return "Normal luftkvalitet";
  } else if (type === "soundLevel") {
    return getSoundLevelStatus(data.soundLevel).label;
  } else if (type === "pulse") {
    return getPulseStatus(data.pulse).label;
  }
  
  return "Okänd status";
};