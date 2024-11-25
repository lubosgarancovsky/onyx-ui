import React from "react";
import useButtonGroup, { UseButtonGroupProps } from "./use-button-group";

const ButtonGroup: React.FC<UseButtonGroupProps> = (props) => {
  const { Component, children, getButtonGroupProps } = useButtonGroup(props);
  return <Component {...getButtonGroupProps()}>{children}</Component>;
};

export default ButtonGroup;

ButtonGroup.displayName = "OnyxUI.ButtonGroup";
