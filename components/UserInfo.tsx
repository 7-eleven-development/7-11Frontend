import ThemedText from "./ThemedText";
import { StyleSheet, View } from "react-native";
import { UserProfile } from "@/services/user";

interface UserInfoProps {
  user: UserProfile;
  theme: string;
  textColor: string;
}

const UserInfo = ({ user, theme, textColor }: UserInfoProps) => {
  const getThemeDisplayName = () => {
    switch (theme) {
      case "system":
        return "System";
      case "light":
        return "Ljust";
      default:
        return "Mörkt";
    }
  };

  return (
    <View
      accessible={true}
      accessibilityRole="text"
      accessibilityLabel={`Användarinformation: ${user.firstname} ${user.surname}, ${user.email}, ${user.phonenumber}, ${user.company_name}, tema: ${getThemeDisplayName()}`}
    >
      <ThemedText
        style={[styles.info, { color: textColor }]}
        accessible={false}
      >
        Användare inloggad
      </ThemedText>

      <ThemedText
        style={[styles.info, { color: textColor }]}
        accessible={false}
      >
        👤Namn: {user.firstname} {user.surname}
      </ThemedText>

      <ThemedText
        style={[styles.info, { color: textColor }]}
        accessible={false}
      >
        📧 E-post: {user.email}
      </ThemedText>

      <ThemedText
        style={[styles.info, { color: textColor }]}
        accessible={false}
      >
        📞Telefon: {user.phonenumber}
      </ThemedText>

      <ThemedText
        style={[styles.info, { color: textColor }]}
        accessible={false}
      >
        🏢Företag: {user.company_name}
      </ThemedText>

      <ThemedText
        style={[styles.info, { color: textColor }]}
        accessible={false}
      >
        🎨Tema: {getThemeDisplayName()}
      </ThemedText>
    </View>
  );
};

export default UserInfo;

const styles = StyleSheet.create({
  info: {
    fontSize: 18,
    marginBottom: 10,
    lineHeight: 24,
    textAlign: "center",
  },
});
