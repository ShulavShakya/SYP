import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const access =
      localStorage.getItem("access") || sessionStorage.getItem("access");
    const refresh =
      localStorage.getItem("refresh") || sessionStorage.getItem("refresh");
    const role = localStorage.getItem("role") || sessionStorage.getItem("role");
    const username =
      localStorage.getItem("username") || sessionStorage.getItem("username");

    if (access && refresh && role && username) {
      setUser({ access, refresh, role, username });
    }

    setAuthLoading(false);
  }, []);

  const login = ({ access, refresh, role, username, keepSignedIn }) => {
    const storage = keepSignedIn ? localStorage : sessionStorage;

    localStorage.clear();
    sessionStorage.clear();

    storage.setItem("access", access);
    storage.setItem("refresh", refresh);
    storage.setItem("role", role);
    storage.setItem("username", username);

    setUser({ access, refresh, role, username });
  };

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("role");
    localStorage.removeItem("username");

    sessionStorage.removeItem("access");
    sessionStorage.removeItem("refresh");
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("username");

    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, authLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
