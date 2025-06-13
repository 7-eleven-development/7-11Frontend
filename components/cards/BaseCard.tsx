import { Pressable, StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";
import { useColorScheme } from "@/hooks/useColorScheme";
import ThemedText from "@/components/ThemedText";
import ThemedView from "@/components/ThemedView";
import {
  getBackgroundColor,
  getStatusIcon,
  getIconNameFromStatus,
} from "@/utils/cardUtils";
import { CARD_CONFIG } from "@/utils/config/cardConfig";
import { CardData } from "@/types/cards";

interface BaseCardProps {
  cardData: CardData;
  children?: React.ReactNode;
}

const BaseCard = ({ cardData, children }: BaseCardProps) => {
  const { type, status } = cardData;
  const router = useRouter();
  const { colorScheme } = useColorScheme();

  const config = CARD_CONFIG[type];
  const backgroundColor = getBackgroundColor(status, colorScheme);
  const iconName = getIconNameFromStatus(status);
  const statusIcon = getStatusIcon(iconName);

  const handlePress = () => router.push(config.route);

  return (
    <ThemedView
      style={styles.card}
      lightColor={backgroundColor}
      darkColor={backgroundColor}
    >
      <Pressable
        style={({ pressed }) => [styles.pressable, pressed && { opacity: 0.9 }]}
        onPress={handlePress}
      >
        <View style={styles.header}>
          {config.icon()}
          <ThemedText type="title">{config.title}</ThemedText>
        </View>

        <View style={styles.content}>
          {statusIcon}
          <View style={styles.dataContainer}>{children}</View>
        </View>
      </Pressable>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  pressable: {},
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  content: {
    flex: 1,
    alignItems: "flex-start",
    flexDirection: "row",
    paddingTop: 16,
  },
  dataContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-end",
  },
});

export default BaseCard;
