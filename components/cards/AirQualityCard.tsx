import { View } from "react-native";
import BaseCard from "./BaseCard";
import ThemedText from "@/components/ThemedText";
import { AirQualityData } from "@/types/cards";

interface Props {
  cardData: AirQualityData;
}

const AirQualityCard = ({ cardData }: Props) => {
  const { data } = cardData;

  return (
    <BaseCard cardData={cardData}>
      <View style={{ alignItems: "flex-end" }}>
        <ThemedText type="subtitle">Rök: {data.smoke}</ThemedText>
        <ThemedText type="subtitle">Koldioxid: {data.co2}</ThemedText>
        <ThemedText type="subtitle">Propan: {data.propane}</ThemedText>
      </View>
    </BaseCard>
  );
};

export default AirQualityCard;