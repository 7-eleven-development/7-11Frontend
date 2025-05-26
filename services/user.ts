import { API_URL } from "./api";

export type UserProfile = {
  firstname?: string;
  surname?: string;
  email: string;
  company_name?: string;
  phonenumber?: string;
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
      console.log("Fetched user data:", userData);

      if (userData && userData.length > 0) {
        return {
          success: true,
          data: userData[0] as UserProfile,
        };
      } else {
        return {
          success: false,
          error: "No user data found",
        };
      }
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
