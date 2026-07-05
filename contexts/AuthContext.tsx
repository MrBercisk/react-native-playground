import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getToken, removeToken } from "@/services/storage";

type AuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean; // cek token pas app pertama dibuka
  setIsAuthenticated: (value: boolean) => void;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    const token = await getToken();
    setIsAuthenticated(!!token);
    setIsLoading(false);
  };

  const logout = async () => {
    await removeToken();
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, setIsAuthenticated, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth harus berada di dalam AuthProvider");
  }
  return context;
}