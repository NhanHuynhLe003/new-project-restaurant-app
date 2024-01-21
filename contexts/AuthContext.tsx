// src/contexts/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { Auth } from "aws-amplify";

const defaultAuthContext = {
  isAdminAuth: false,
  isAuthenticated: false,

  checkUser: () => {},
};
const AuthContext = createContext(defaultAuthContext);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: any) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdminAuth, setIsAdmin] = useState(false);
  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const userSession = await Auth.currentSession();
      const accessToken = await userSession.getAccessToken();
      const isAdminSession =
        accessToken?.payload["cognito:groups"]?.includes("admin");
      setIsAdmin(isAdminSession);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("ERROR::: ", error);
      setIsAuthenticated(false);
    }
  };

  const contextValue = {
    isAdminAuth,
    isAuthenticated,

    checkUser,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
