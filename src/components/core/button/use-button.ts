import { cn, HTMLOnyxIUProps, ReactRef } from "../../../utils";
import React, {
  cloneElement,
  isValidElement,
  MouseEventHandler,
  ReactNode,
  useCallback,
  useMemo,
} from "react";

interface Props extends HTMLOnyxIUProps<"button"> {
  ref?: ReactRef<HTMLButtonElement | null>;
  color?: "primary" | "default" | "danger";
  variant?: "default" | "flat" | "outline";
  size?: "sm" | "md" | "lg";
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isLoading?: boolean;
  isDisabled?: boolean;
  isIconOnly?: boolean;
  isInGroup?: boolean;
  fullWidth?: boolean;
  children?: React.ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export type UseButtonProps = Props;

function useButton(props: UseButtonProps) {
  const {
    ref,
    as,
    color = "default",
    variant = "default",
    size = "md",
    leftIcon: leftIconProp,
    rightIcon: rightIconProp,
    isLoading = false,
    isDisabled: isDisabledProp = false,
    isIconOnly = false,
    isInGroup = false,
    fullWidth = false,
    className,
    children,
    onClick: onClickProp,
    ...buttonProps
  } = props;

  const Component = as || "button";

  const isDisabled = isDisabledProp || isLoading;
  const onClick = isDisabled ? undefined : onClickProp;

  const style = useMemo(() => {
    return cn(
      "focusable flex items-center font-medium border h-fit rounded-md leading-none whitespace-nowrap relative w-fit text-center justify-center",
      {
        "gap-1.5 px-3 py-1.5 text-sm": size === "sm",
        "gap-2 px-4 py-2.5": size === "md",
        "gap-2.5 px-5 py-3.5": size === "lg",
      },
      {
        "p-1.5": size === "sm" && isIconOnly,
        "p-2.5": size === "md" && isIconOnly,
        "p-3.5": size === "lg" && isIconOnly,
      },
      {
        "bg-primary border-primary-dark hover:bg-primary-dark text-white":
          color === "primary",
        "bg-default border-default-border hover:bg-default":
          color === "default",
        "bg-default border-default-border hover:bg-danger text-danger hover:text-white":
          color === "danger",
        "text-foreground hover:text-primary hover:bg-transparent":
          variant === "flat" && color === "primary",
        "text-foreground hover:text-danger hover:bg-transparent":
          variant === "flat" && color === "danger",
      },
      {
        "first:rounded-r-none [&:not(:first-child)]:rounded-l-none [&:not(:first-child)]:border-l-0":
          isInGroup,
      },
      {
        "w-full": fullWidth,
        "border-none bg-transparent": variant === "flat",
        "hover:bg-primary/10 text-primary":
          color === "primary" && variant === "flat",
        "hover:bg-danger/10 text-danger":
          color === "danger" && variant === "flat",
        "border-default-border bg-transparent": variant === "outline",
        "border-primary text-primary hover:bg-primary/10":
          color === "primary" && variant === "outline",
        "border-danger !text-danger hover:bg-danger/10":
          color === "danger" && variant === "outline",
        "hover:bg-default-light": color === "default" && variant === "default",
      },
      {
        "opacity-70 cursor-not-allowed pointer-events-none": isDisabled,
      },
      className
    );
  }, [size, variant]);

  const getIconClone = (icon: ReactNode) =>
    isValidElement(icon)
      ? cloneElement(icon, {
          // @ts-ignore
          "aria-hidden": true,
          "aria-disabled": isDisabled,
          focusable: false,
          tabIndex: -1,
        })
      : null;

  const leftIcon = getIconClone(leftIconProp);
  const rightIcon = getIconClone(rightIconProp);

  const getButtonProps = useCallback(
    (props = {}) => ({
      "data-disabled": isDisabled,
      "data-loading": isLoading,
      ref,
      onClick,
      ...buttonProps,
      ...props,
    }),
    [isDisabled, isLoading, buttonProps]
  );

  return {
    Component,
    style,
    leftIcon,
    rightIcon,
    children,
    isLoading,
    getButtonProps,
  };
}

export default useButton;
