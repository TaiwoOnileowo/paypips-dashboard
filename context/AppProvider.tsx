"use client";
import { AppContextType } from "@/types";
import React, { useState, createContext } from "react";

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <AppContext.Provider
      value={{
        showSidebar,
        setShowSidebar,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
