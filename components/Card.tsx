import { Pressable, StyleSheet, View } from "react-native";
import ThemedText from "@/components/ThemedText";
import ThemedView from "./ThemedView";
import { useRouter } from "expo-router";
import { useColorScheme } from "@/hooks/useColorScheme";
import {
  getTitle,
  getBackgroundColor,
  getStatusIcon,
  getStatusText,
  getTitleIcon,
} from "@/utils/cardUtils";

export type CardStatus = "good" | "bad" | "normal";
interface AirQualityData {
  type: "airQuality";
  data: {
    pm1: number;
    pm2: number;
    pm10: number;
    tvoc: number;
  };
  status: CardStatus;
}

interface SoundLevelData {
  type: "soundLevel";
  data: {
    soundLevel: number;
  };
  status: CardStatus;
}

interface PulseData {
  type: "pulse";
  data: {
    pulse: number;
  };
  status: CardStatus;
}

type CardData = AirQualityData | SoundLevelData | PulseData;

type Props = {
  cardData: CardData;
};

const Card = ({ cardData }: Props) => {
  const { type, data, status } = cardData;
  const router = useRouter();
  const colorScheme = useColorScheme();

  const backgroundColor = getBackgroundColor(status, colorScheme);
  const statusText = getStatusText(type, data);
  const statusIcon = getStatusIcon(status);
  const Title = getTitle(type);
  const icon = getTitleIcon(type);

  const handleRoutePress = () => {
    if (type === "airQuality") {
      router.push("/(tabs)/air-quality");
    } else if (type === "soundLevel") {
      router.push("/(tabs)/sound-level");
    } else if (type === "pulse") {
      router.push("/(tabs)/pulse");
    }
  };

  return (
    <ThemedView
      style={styles.card}
      lightColor={backgroundColor}
      darkColor={backgroundColor}
    >
      <Pressable
        style={({ pressed }) => [styles.pressable, pressed && { opacity: 0.9 }]}
        onPress={() => {
          handleRoutePress();
        }}
      >
        <View style={styles.contentContainer}>
          {icon}
          <ThemedText type="title">{Title}</ThemedText>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: "flex-start",
            flexDirection: "row",
            paddingTop: 16,
          }}
        >
          {statusIcon}
          <View
            style={{ flex: 1, flexDirection: "column", alignItems: "flex-end" }}
          >
            {statusText}
          </View>
        </View>
      </Pressable>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  pressable: {},
  card: {
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
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});

export default Card;
