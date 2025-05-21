import { LoginResponse, LoginResult, UserCredentials } from "@/types/auth";
import { API_URL } from "./api";

export const authService = {
  async login(credentials: UserCredentials): Promise<LoginResult> {
    try {
      console.log("Logging in with credentials:", credentials);
      const response = await fetch(`${API_URL}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      console.log("Response status:", response.status);
      const data: LoginResponse = await response.json();
      if (!response.ok) {
        return {
          success: false,
          error: data.message || "Login failed",
        };
      }

      return {
        success: true,
        token: data.token,
        deviceId: data.device_id,
      };
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred during login";
      return { success: false, error: errorMessage };
    }
  },
};
