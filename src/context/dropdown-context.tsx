import React from "react";
import { createContext, useContext } from "react";
import { UseDropdownProps } from "../components/core/dropdown";

const DropdownContext = createContext<any>(null);

export function useDropdownContext() {
  const ctx = useContext(DropdownContext);

  if (!ctx) {
    throw new Error(
      "useDropdownContext must be used within a DropdownProvider"
    );
  }

  return ctx;
}

export const DropdownContextProvider = (props: UseDropdownProps) => {
  const { children, ...dropdownProps } = props;
  return (
    <DropdownContext.Provider value={{ ...dropdownProps }}>
      {children}
    </DropdownContext.Provider>
  );
};
