import { useCallback, useMemo } from "react";
import { cn, HTMLOnyxIUProps } from "../../../utils";

interface Props extends HTMLOnyxIUProps<"div"> {
  label?: string;
}

export type UseVerticalNavigationProps = Props;

function useVerticalNavigation(props: UseVerticalNavigationProps) {
  const { as, label, children, className, ...divProps } = props;

  const Component = as || "nav";

  const styles = useMemo(() => {
    return cn("flex flex-col", className);
  }, [className]);

  const getVerticalNavigationProps = useCallback((props = {}) => {
    return {
      ...divProps,
      ...props,
    };
  }, []);

  return { label, styles, Component, children, getVerticalNavigationProps };
}

export default useVerticalNavigation;
