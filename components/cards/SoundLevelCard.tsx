import BaseCard from "./BaseCard";
import ThemedText from "@/components/ThemedText";
import { SoundLevelData } from "@/types/cards";

interface Props {
  cardData: SoundLevelData;
}

const SoundLevelCard = ({ cardData }: Props) => {
  const { data } = cardData;

  return (
    <BaseCard cardData={cardData}>
      <ThemedText type="subtitle">{data.soundLevel} dB</ThemedText>
    </BaseCard>
  );
};

export default SoundLevelCard;
