import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { AntDesign } from "@expo/vector-icons";
import { Text, StyleSheet } from "react-native";
import { useThemeColor } from "@/theme/useThemeColors";

type IconName = "smileo" | "meh" | "frowno"; 

const SoundLevel = () => {
  const soundValue = 65;

  //Här skapar jag en funktion för att hämta rätt ikon samt label beroende på vilken ljudnivå det är.
  const getStatus = (): { icon: IconName; label: string } => {
    if (soundValue < 60) {
      return { icon: "smileo", label: "Quiet" };
    }
    if (soundValue < 80) {
      return { icon: "meh", label: "Moderate" };
    }
    return { icon: "frowno", label: "Loud" };
  };


  //Här använder jag den funktionen för att få fram rätt ikon samt label.
  const { icon, label} = getStatus();

  //Blev något konstigt med färgtemat så jag lägger in det här så att det går igenom.
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text"); 


  return (
    
    <ThemedView style={[styles.container, {backgroundColor}]}>
        
        <ThemedText style={[styles.heading, { color: textColor}]}> Sound Level </ThemedText>

        <AntDesign name={icon} size={64} style={styles.icon} />

        <ThemedText style={[styles.value, {color: textColor}]}> {soundValue} dB </ThemedText>
        <ThemedText style={[styles.status, {color: textColor}]}> {label} </ThemedText>
   
    </ThemedView>
  );
};



const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  heading: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 16,
  },

  value: {
    fontSize: 32,
    fontWeight: "bold",
  },

  icon: {
    marginBottom: 16,
  },

  level: {
    fontSize: 40,
    fontWeight: "bold",
  },

  status: {
    fontSize: 16,
    marginTop: 10,
  },



});

export default SoundLevel;