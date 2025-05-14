import { useContext } from "react";
import { SoundLevelContext } from "@/context/SoundLevel/SoundLevelContext";
import { SoundLevelContextType } from "@/types/soundLevel";

const useSoundLevelContext = (): SoundLevelContextType => {
  const context = useContext(SoundLevelContext);

  if (context === undefined) {
    throw new Error(
      "useSoundLevelContext must be used within a SoundLevelProvider"
    );
  }

  return context;
};

export default useSoundLevelContext;
