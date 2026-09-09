import { API_BASE_URL } from "./config";

export interface User {
  id: number;
  email: string;
  name: string | null;
  avatar: string | null;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user: User;
}


export const authStorage = {
  setToken: (token: string) => {
    localStorage.setItem("access_token", token);
  },
  getToken: (): string | null => {
    return localStorage.getItem("access_token");
  },
  setUser: (user: User) => {
    localStorage.setItem("user", JSON.stringify(user));
  },
  getUser: (): User | null => {
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  },
  clear: () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
  },
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem("access_token");
  },
};

export const loginWithGoogle = () => {
  window.location.href = `${API_BASE_URL}/api/v1/auth/login`;
};

export const handleAuthCallback = (): AuthResponse | null => {
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");
  const userStr = params.get("user");

  if (token && userStr) {
    const user = JSON.parse(decodeURIComponent(userStr));
    const authResponse: AuthResponse = {
      access_token: token,
      token_type: "bearer",
      user,
    };
    
    authStorage.setToken(token);
    authStorage.setUser(user);
    
    return authResponse;
  }

  return null;
};

export const logout = () => {
  authStorage.clear();
  window.location.href = "/";
};


export const getCurrentUser = (): User | null => {
  return authStorage.getUser();
};

export const isAuthenticated = (): boolean => {
  return authStorage.isAuthenticated();
};
