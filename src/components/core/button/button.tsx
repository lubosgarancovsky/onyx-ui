import React, { forwardRef } from "react";
import useButton, { UseButtonProps } from "./use-button";

const Button = forwardRef<HTMLButtonElement, UseButtonProps>((props, ref) => {
  const {
    Component,
    children,
    leftIcon,
    rightIcon,
    style,
    isLoading,
    getButtonProps,
  } = useButton({ ...props, ref });

  return (
    <Component className={style} {...getButtonProps()}>
      {isLoading ? <span data-testid="loader" className="loader" /> : leftIcon}
      {children}
      {rightIcon}
    </Component>
  );
});

export default Button;

Button.displayName = "OnyxUI.Button";
