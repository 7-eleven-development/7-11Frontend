export type AuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  deviceId: string | null | undefined;
  token: string | null | undefined;
  login: (credentials: UserCredentials) => Promise<LoginResult>;
  logout: () => void;
};

export type UserCredentials = {
  email: string;
  password: string;
};

export type LoginResponse = {
  device_id: string;
  message: string;
  token: string;
};

export type LoginResult = {
  success: boolean;
  error?: string;
  token?: string;
  deviceId?: string;
};
