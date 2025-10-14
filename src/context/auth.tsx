import React, { createContext, useContext, useState } from "react";
import postLogin from "../api/postLogin";
import type { User } from "../types";
import type { Login } from "../schemas";

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  login: ({ username, password }: Login) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async ({ username, password }: Login) => {
    const userData = await postLogin({ password, username });
    setUser(userData);
    setIsAuthenticated(true);
    // Store token for persistence
    localStorage.setItem("auth-token", userData.token);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("auth-token");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
