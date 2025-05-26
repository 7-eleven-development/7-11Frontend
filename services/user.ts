import { API_URL } from "./api";

export type UserProfile = {
  firstName?: string;
  surName?: string;
  email: string;
  companyName?: string;
  phoneNumber?: string;
  role?: string;
};

type UserResponse = {
  success: boolean;
  data?: UserProfile;
  error?: string;
};

export const userService = {
  async fetchUserInformation(token: string): Promise<UserResponse> {
    try {
      if (!token) {
        return { success: false, error: "No authentication token provided" };
      }

      const response = await fetch(`${API_URL}/users/userinfo`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        return {
          success: false,
          error: `Failed to fetch user: ${response.status}`,
        };
      }

      const userData = await response.json();
      console.log("User data:", userData);
      return {
        success: true,
        data: userData,
      };
    } catch (error) {
      console.error("Error fetching user data:", error);
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Unknown error fetching user data",
      };
    }
  },
};
