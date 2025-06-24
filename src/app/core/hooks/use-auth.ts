import { useEffect, useState } from "react";
import { DecodeToken, DecodeTokenInterface } from "../utils/decode-token"; // your own utility

export function useAuthHook() {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));
  const [user, setUser] = useState<DecodeTokenInterface | null>(() => {
    const storedToken = localStorage.getItem("token");
    return storedToken ? DecodeToken(storedToken) : null;
  });

  const login = (newToken: string) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
    setUser(DecodeToken(newToken)); 
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  useEffect(() => {
    if (token) {
      setUser(DecodeToken(token));
    }
  }, [token]);

  return {
    token,
    user, 
    login,
    logout,
    isAuthenticated: !!token,
  };
}
