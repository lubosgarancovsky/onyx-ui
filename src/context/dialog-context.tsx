import React from "react";
import { UseDialogProps } from "../components";

const DialogContext = React.createContext<any>(null);

export const useDialogContext = () => {
  const ctx = React.useContext(DialogContext);

  if (!ctx) {
    throw new Error("useDialogContext must be used within a DialogProvider");
  }

  return ctx;
};

export const DialogContextProvider = (props: UseDialogProps) => {
  const { children, ...modalProps } = props;
  return (
    <DialogContext.Provider value={{ ...modalProps }}>
      {children}
    </DialogContext.Provider>
  );
};
