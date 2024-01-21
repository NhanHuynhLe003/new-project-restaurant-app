// src/contexts/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import { productCart } from "../models/cart";

const defaultAuthContext = {
  isAdminAuth: false,
  isAuthenticated: false,
  updateProductsCart: (products: productCart[]) => {},

  checkUser: () => {},
};
const AuthContext = createContext(defaultAuthContext);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: any) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdminAuth, setIsAdmin] = useState(false);
  const [cartProductsInfo, setCartProductsInfo] = useState<productCart[]>([]);
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

  const updateProductsCart = (products: productCart[]) => {
    setCartProductsInfo(products);
  };

  const contextValue = {
    isAdminAuth,
    isAuthenticated,
    updateProductsCart,
    checkUser,
    cartProductsInfo,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
