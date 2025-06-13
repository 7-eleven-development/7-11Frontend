import ThemedText from "./ThemedText";
import { StyleSheet } from "react-native";
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
    <>
      <ThemedText style={[styles.info, { color: textColor }]}>
        Användare inloggad
      </ThemedText>

      <ThemedText style={[styles.info, { color: textColor }]}>
        👤Namn: {user.firstname} {user.surname}
      </ThemedText>

      <ThemedText style={[styles.info, { color: textColor }]}>
        📧 E-post: {user.email}
      </ThemedText>

      <ThemedText style={[styles.info, { color: textColor }]}>
        📞Telefon: {user.phonenumber}
      </ThemedText>

      <ThemedText style={[styles.info, { color: textColor }]}>
        🏢Företag: {user.company_name}
      </ThemedText>

      <ThemedText style={[styles.info, { color: textColor }]}>
        🎨Tema: {getThemeDisplayName()}
      </ThemedText>
    </>
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
