import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("refresh_token"));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if token is still valid or needs to be refreshed
    // You can add additional logic here if needed

    setLoading(false);
  }, []);

  const login = (newToken) => {
    localStorage.setItem("refresh_token", newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("refresh_token");
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
