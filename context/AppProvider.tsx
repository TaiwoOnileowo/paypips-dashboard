"use client";
import { AppContextType } from "@/types";
import React, { useState, createContext } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    console.log("Page scroll: ", latest)
  })
  
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
