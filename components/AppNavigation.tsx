import { Stack } from "expo-router";
import { useAuthContext } from "@/context/auth/useAuthContext";
import Login from "@/app/Login";

const AppNavigation = () => {
  const { isAuthenticated } = useAuthContext();

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="user" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
};

export default AppNavigation;
