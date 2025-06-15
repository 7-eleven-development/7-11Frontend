import { ReactNode, useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import AuthContext from "@/context/auth/AuthContext";
import { authService } from "@/services/auth";
import { UserCredentials } from "@/types/auth";
import { userService } from "@/services/user";

const TOKEN_KEY = "auth_token";
const DEVICE_ID_KEY = "device_id";

type AuthProviderProps = {
  children: ReactNode;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null | undefined>(null);
  const [deviceId, setDeviceId] = useState<string | null | undefined>(null);

  useEffect(() => {
    const loadStoredAuth = async () => {
      try {
        const storedToken = await SecureStore.getItemAsync(TOKEN_KEY);
        const storedDeviceId = await SecureStore.getItemAsync(DEVICE_ID_KEY);
        if (storedToken) {
          setToken(storedToken);
          setDeviceId(storedDeviceId);
          setIsAuthenticated(true);
        }
      } catch (err) {
        console.error("Error loading authentication data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadStoredAuth();
  }, []);

  const storeAuthData = async (token: string, deviceId: string) => {
    try {
      await SecureStore.setItemAsync(TOKEN_KEY, token);
      await SecureStore.setItemAsync(DEVICE_ID_KEY, deviceId);
    } catch (err) {
      console.error("Error storing authentication data:", err);
    }
  };

  const clearAuthData = async () => {
    try {
      await SecureStore.deleteItemAsync(TOKEN_KEY);
      await SecureStore.deleteItemAsync(DEVICE_ID_KEY);
    } catch (err) {
      console.error("Error clearing authentication data:", err);
    }
  };

  const login = async (credentials: UserCredentials) => {
    setIsLoading(true);
    setError(null);

    const result = await authService.login(credentials);

    if (result.success && result.token && result.deviceId) {
      setToken(result.token);
      setDeviceId(result.deviceId);
      setIsAuthenticated(true);

      await storeAuthData(result.token, result.deviceId);

      if (result.token) {
        userService.fetchUserInformation(result.token);
      }
    } else {
      setError(result.error || "Login failed");
    }

    setIsLoading(false);
    return result;
  };

  const logout = async () => {
    await clearAuthData();

    setToken(null);
    setDeviceId(null);
    setIsAuthenticated(false);
  };
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        isLoading,
        error,
        token,
        deviceId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
