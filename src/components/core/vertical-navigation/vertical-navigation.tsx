import React from "react";
import useVerticalNavigation, {
  UseVerticalNavigationProps,
} from "./use-vertical-navigation";

const VerticalNavigation: React.FC<UseVerticalNavigationProps> = (props) => {
  const { Component, label, styles, children, getVerticalNavigationProps } =
    useVerticalNavigation(props);

  return (
    <Component {...getVerticalNavigationProps()}>
      {label && (
        <span className="text-sm text-foreground-100 mb-1.5 inline-block font-semibold">
          {label}
        </span>
      )}
      <ul className={styles}>{children}</ul>
    </Component>
  );
};

export default VerticalNavigation;
