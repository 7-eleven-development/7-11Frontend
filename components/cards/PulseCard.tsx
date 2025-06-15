import BaseCard from "./BaseCard";
import ThemedText from "@/components/ThemedText";
import { PulseData } from "@/types/cards";

interface Props {
  cardData: PulseData;
}

const PulseCard = ({ cardData }: Props) => {
  const { data } = cardData;

  return (
    <BaseCard cardData={cardData}>
      <ThemedText type="subtitle">BPM: {data.pulse}</ThemedText>
    </BaseCard>
  );
};

export default PulseCard;
