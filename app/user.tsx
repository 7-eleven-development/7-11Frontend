import { StyleSheet } from "react-native";
import ThemedView from "@/components/ThemedView";
import useUserContext from "@/context/user/useUserContext";
import { Colors } from "@/theme/Colors";
import { useRouter } from "expo-router";
import { useAuthContext } from "@/context/auth/useAuthContext";
import { useColorScheme } from "@/hooks/useColorScheme";
import UpdateButton from "@/components/UpdateButton";
import UserHeader from "@/components/UserHeader";
import UserInfo from "@/components/UserInfo";
import LogoutButton from "@/components/LogoutButton";
import { getThemeIcon, getThemeIconColor } from "@/utils/userUtils";
import { useMemo } from "react";

const User = () => {
  const { theme, toggleTheme, actualTheme, user } = useUserContext();
  const router = useRouter();
  const { logout } = useAuthContext();
  const { colorScheme, text, tint } = useColorScheme();

  const handleLogout = async () => {
    logout();
    router.push("/Login");
  };

  const goBackToIndex = () => {
    router.push("/(tabs)");
  };

  const themeColors = useMemo(
    () => ({
      backgroundColor:
        colorScheme === "dark"
          ? Colors.dark.background
          : Colors.light.tabBarBackground,
      headerBackgroundColor:
        colorScheme === "dark"
          ? Colors.dark.tabBarBackground
          : Colors.light.background,
    }),
    [colorScheme]
  );

  return (
    <>
      <UserHeader
        headerBackgroundColor={themeColors.headerBackgroundColor}
        tint={tint}
        onBackPress={goBackToIndex}
        onThemeToggle={toggleTheme}
        themeIcon={getThemeIcon(theme, actualTheme)}
        themeIconColor={getThemeIconColor(theme, actualTheme, text)}
      />

      <ThemedView
        style={[
          styles.container,
          { backgroundColor: themeColors.backgroundColor },
        ]}
        accessible={true}
        accessibilityLabel={`Användarskärm för ${user?.firstname || "användare"}`}
      >
        {user && (
          <>
            <UserInfo user={user} theme={theme} textColor={text} />
            <UpdateButton />
          </>
        )}
        <LogoutButton onPress={handleLogout} actualTheme={actualTheme} />
      </ThemedView>
    </>
  );
};

export default User;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
