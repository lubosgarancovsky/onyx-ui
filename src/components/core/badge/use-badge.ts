import { useCallback, useMemo } from "react";
import { cn, HTMLOnyxIUProps, ReactRef } from "../../../utils";

interface Props extends HTMLOnyxIUProps<"div"> {
  ref?: ReactRef<HTMLDivElement | null>;
  variant?: "default" | "primary" | "outline";
  rounded?: "full" | "medium" | "none";
}

export type UseBadgeProps = Props;

const useBadge = (props: UseBadgeProps) => {
  const {
    as,
    className,
    children,
    variant = "default",
    rounded = "full",
    ...badgeProps
  } = props;

  const Component = as || "div";

  const style = useMemo(
    () =>
      cn(
        "text-sm px-3 py-0.5 bg-default-light font-[500]",
        { "bg-accent/20 text-accent": variant === "primary" },
        {
          "bg-transparent border border-default-border": variant === "outline",
        },
        { "rounded-md": rounded === "medium" },
        { "rounded-full": rounded === "full" },
        className
      ),
    [className]
  );

  const getBadgeProps = useCallback(
    (props = {}) => {
      return {
        ...props,
        ...badgeProps,
      };
    },
    [props, badgeProps]
  );

  return { Component, style, children, getBadgeProps };
};

export default useBadge;
