import React from "react";
import { createContext, useContext } from "react";
import { useDrawer } from "../components";

type DrawerContextProps = Omit<ReturnType<typeof useDrawer>, "children">;

const DrawerContext = createContext<DrawerContextProps | null>(null);

export const useDrawerContext = () => {
  const ctx = useContext(DrawerContext);

  if (!ctx) {
    throw new Error("useDrawerContext must be used within a DrawerProvider");
  }

  return ctx;
};

export const DrawerContextProvider: React.FC<{
  children: React.ReactNode;
  props: DrawerContextProps;
}> = ({ children, props }) => {
  return (
    <DrawerContext.Provider value={{ ...props }}>
      {children}
    </DrawerContext.Provider>
  );
};
