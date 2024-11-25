import { useCallback, useMemo } from "react";
import { cn, getIconClone, HTMLOnyxIUProps } from "../../../utils";

interface Props extends HTMLOnyxIUProps<"a"> {
  active?: boolean;
  primary?: boolean;
  alert?: number;
  icon?: React.ReactNode;
}

export type UseVerticalNavigationItemProps = Props;

function useVerticalNavigationItem(props: UseVerticalNavigationItemProps) {
  const {
    as,
    children,
    active,
    className,
    primary,
    alert,
    icon: iconProp,
    ...linkProps
  } = props;

  const Component = as || "a";

  const style = useMemo(() => {
    return cn(
      "relative flex items-center gap-1.5 px-2.5 py-1.5 rounded-md hover:bg-default-light",
      {
        "bg-default-light before:content-[''] before:absolute before:top-0 before:-left-2 before:w-1 before:h-full before:bg-accent before:rounded-full":
          active && !primary,
      },
      {
        "bg-accent hover:bg-accent text-white": active && primary,
      },
      className
    );
  }, [className]);

  const alertStyle = useMemo(() => {
    return cn(
      "ml-auto rounded-full w-[1.25em] h-[1.25em] flex items-center justify-center bg-default-border",
      {
        "bg-accent-dark": primary && active,
      }
    );
  }, []);

  const icon = getIconClone(iconProp);

  const getLinkProps = useCallback((props = {}) => {
    return {
      ...props,
      ...linkProps,
    };
  }, []);

  return { Component, alert, icon, style, alertStyle, children, getLinkProps };
}

export default useVerticalNavigationItem;
