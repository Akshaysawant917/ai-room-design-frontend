import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { getCurrentUser } from "../api/auth";
import { TOKEN_KEY } from "../api/client";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(Boolean(token));

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setUser(null);
  }, []);

  const refreshUser = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await getCurrentUser();
      setUser(response.data);
      return response.data;
    } catch (error) {
      if (error.code === "UNAUTHENTICATED") logout();
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [logout]);

  const loginWithToken = useCallback(
    async (nextToken) => {
      localStorage.setItem(TOKEN_KEY, nextToken);
      setToken(nextToken);
      return refreshUser();
    },
    [refreshUser],
  );

  useEffect(() => {
    if (!token) {
      setIsLoading(false);
      return;
    }

    refreshUser().catch(() => {});
  }, [refreshUser, token]);

  useEffect(() => {
    const handleUnauthorized = () => logout();
    window.addEventListener("ai-home:unauthorized", handleUnauthorized);
    return () =>
      window.removeEventListener("ai-home:unauthorized", handleUnauthorized);
  }, [logout]);

  const value = useMemo(
    () => ({
      token,
      user,
      isAuthenticated: Boolean(token && user),
      isLoading,
      loginWithToken,
      logout,
      refreshUser,
    }),
    [token, user, isLoading, loginWithToken, logout, refreshUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}
