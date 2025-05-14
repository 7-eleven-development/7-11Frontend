import { Pressable, StyleSheet, View } from "react-native";
import { AntDesign, Entypo } from "@expo/vector-icons";
import ThemedText from "@/components/ThemedText";
import ThemedView from "./ThemedView";
import { useRouter } from "expo-router";

type CardStatus = "good" | "bad" | "normal";
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

  const Title =
    type === "airQuality"
      ? "Luftkvalitet"
      : type === "soundLevel"
      ? "Ljudnivå"
      : "Puls";
  const icon =
    type === "airQuality" ? (
      <Entypo name="air" size={24} color="black" />
    ) : type === "soundLevel" ? (
      <AntDesign name="sound" size={24} color="black" />
    ) : type === "pulse" ? (
      <AntDesign name="hearto" size={24} color="black" />
    ) : (
      <></>
    );
  const statusIcon =
    status === "good" ? (
      <AntDesign name="smileo" size={24} color="green" />
    ) : status === "bad" ? (
      <AntDesign name="frowno" size={24} color="red" />
    ) : (
      <AntDesign name="meh" size={24} color="orange" />
    );

  const statusText =
    type === "airQuality" ? (
      <View
        style={{ flex: 1, flexDirection: "column", alignItems: "flex-end" }}
      >
        <ThemedText>PM1: {data.pm1}</ThemedText>
        <ThemedText>PM2: {data.pm2}</ThemedText>
        <ThemedText>PM10: {data.pm10}</ThemedText>
        <ThemedText>TVOC: {data.tvoc}</ThemedText>
      </View>
    ) : type === "soundLevel" ? (
      <ThemedText type="subtitle">{data.soundLevel} dB</ThemedText>
    ) : type === "pulse" ? (
      <ThemedText type="subtitle">BPM: {data.pulse} </ThemedText>
    ) : (
      <ThemedText>Unknown Data</ThemedText>
    );

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
    <Pressable
      style={({ pressed }) => [styles.pressable, pressed && { opacity: 0.9 }]}
      onPress={() => {
        handleRoutePress();
      }}
    >
      <ThemedView style={styles.card}>
        <View style={styles.contentContainer}>
          {icon}
          <ThemedText type="title">{Title}</ThemedText>
        </View>
        {statusIcon}
        <View
          style={{ flex: 1, flexDirection: "column", alignItems: "flex-end" }}
        >
          {statusText}
        </View>
      </ThemedView>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressable: {
    flex: 1,
  },
  card: {
    flex: 1,
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
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});

export default Card;
