import React, { useCallback, useMemo } from "react";
import { cn, getIconClone, HTMLOnyxIUProps } from "../../../utils";
import { useDropdownContext } from "../../../context";

interface Props extends HTMLOnyxIUProps<"button"> {
  icon?: React.ReactNode;
  variant?: "default" | "danger";
  isDisabled?: boolean;
}

export type UseDropdownItemProps = Props;

function useDropdownItem(props: UseDropdownItemProps) {
  const {
    children,
    icon: iconProp,
    className,
    variant = "default",
    isDisabled,
    onClick: onClickProp,
    ...buttonProps
  } = props;

  const { setIsOpen } = useDropdownContext();

  const style = useMemo(
    () =>
      cn(
        "focusable px-3 py-1.5 hover:bg-default-light focus-visible:bg-default-light text-left duration-150 rounded-md transition-colors w-full flex items-center gap-2",
        {
          "text-danger hover:text-white hover:bg-danger": variant === "danger",
          "opacity-70 cursor-not-allowed pointer-events-none": isDisabled,
        },
        className
      ),
    [className]
  );

  const icon = getIconClone(iconProp);

  const getButtonProps = useCallback(
    (props = {}) => ({
      disabled: isDisabled,
      "aria-disabled": isDisabled,
      onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
        onClickProp?.(e);
        setIsOpen(false);
      },
      ...props,
      ...buttonProps,
    }),
    [isDisabled, buttonProps]
  );

  return {
    style,
    children,
    icon,
    getButtonProps,
  };
}

export default useDropdownItem;
