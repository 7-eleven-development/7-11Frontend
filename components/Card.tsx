import { AirQualityCard, SoundLevelCard, PulseCard } from "./cards";
import { CardData } from "@/types/cards";

type Props = {
  cardData: CardData;
};

const Card = ({ cardData }: Props) => {
  switch (cardData.type) {
    case "airQuality":
      return <AirQualityCard cardData={cardData} />;
    case "soundLevel":
      return <SoundLevelCard cardData={cardData} />;
    case "pulse":
      return <PulseCard cardData={cardData} />;
    default:
      return null;
  }
};

export default Card;
export type { CardData } from "@/types/cards";
export type { CardStatus } from "@/types/cards";
