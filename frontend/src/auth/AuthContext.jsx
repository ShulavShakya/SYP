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
    const primaryStorage = keepSignedIn ? localStorage : sessionStorage;
    const otherStorage = keepSignedIn ? sessionStorage : localStorage;

    otherStorage.removeItem("access");
    otherStorage.removeItem("refresh");
    otherStorage.removeItem("role");
    otherStorage.removeItem("username");

    primaryStorage.setItem("access", access);
    primaryStorage.setItem("refresh", refresh);
    primaryStorage.setItem("role", role);
    primaryStorage.setItem("username", username);

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
