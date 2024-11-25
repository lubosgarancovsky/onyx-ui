import React, { useCallback, useMemo } from "react";
import { HTMLOnyxIUProps } from "../../../utils/types";
import { cn } from "../../../utils/cn";
import Button from "./button";

interface Props extends HTMLOnyxIUProps<"div"> {
  children: React.ReactNode;
}

export type UseButtonGroupProps = Props;

function useButtonGroup(props: UseButtonGroupProps) {
  const { as, children: childrenProps, className, ...groupProps } = props;

  const Component = as || "div";

  React.Children.forEach(childrenProps, (child) => {
    if (React.isValidElement(child) && child.type === Button) {
    }
  });

  const children = useMemo(() => {
    const result: React.ReactNode[] = [];
    React.Children.forEach(childrenProps, (child, index) => {
      if (React.isValidElement(child) && child.type === Button) {
        result.push(
          React.cloneElement(child as any, { isInGroup: true, key: index })
        );
      }
    });

    return result;
  }, []);

  const styles = useMemo(() => {
    return cn("flex items-center", className);
  }, []);

  const getButtonGroupProps = useCallback((props = {}) => {
    return {
      "data-testid": "button-group",
      className: styles,
      ...props,
      ...groupProps,
    };
  }, []);

  return { Component, children, getButtonGroupProps };
}

export default useButtonGroup;
