import React from "react";
import useVerticalNavigationItem, {
  UseVerticalNavigationItemProps,
} from "./use-vertical-navigation-item";

export const VerticalNavigationDevider: React.FC = () => {
  return <hr className="border-t border-default-border my-1.5" />;
};

const VerticalNavigationItem: React.FC<UseVerticalNavigationItemProps> = (
  props
) => {
  const { Component, alert, icon, style, alertStyle, children, getLinkProps } =
    useVerticalNavigationItem(props);

  return (
    <li>
      <Component className={style} {...getLinkProps()}>
        {icon}
        {children}
        {alert && <div className={alertStyle}>{alert}</div>}
      </Component>
    </li>
  );
};

export default VerticalNavigationItem;
