import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getToken, removeToken, getUser, saveUser, removeUser } from "@/services/storage";

// sesuaikan field ini dengan bentuk data.user dari API kamu
type User = {
  id: number;
  name: string;
  email: string;
  avatarUrl?: string | null;
};

type AuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean; // cek token pas app pertama dibuka
  user: User | null;
  setIsAuthenticated: (value: boolean) => void;
  setUser: (user: User) => void; // dipanggil setelah login/register API sukses
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUserState] = useState<User | null>(null);

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    const token = await getToken();
    if (token) {
      const storedUser = await getUser(); // data user yang tersimpan pas login
      setUserState(storedUser);
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  };

  // dipanggil dari halaman Login/Register setelah dapat data.user dari API
  const setUser = (userData: User) => {
    setUserState(userData);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    await removeToken();
    await removeUser();
    setUserState(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isLoading, user, setIsAuthenticated, setUser, logout }}
    >
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