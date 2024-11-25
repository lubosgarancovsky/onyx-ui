import React, { forwardRef } from "react";
import useBadge, { UseBadgeProps } from "./use-badge";

const Badge = forwardRef<HTMLDivElement, UseBadgeProps>((props, ref) => {
  const { Component, style, children, getBadgeProps } = useBadge({
    ...props,
    ref,
  });

  return (
    <Component ref={ref} className={style} {...getBadgeProps()}>
      {children}
    </Component>
  );
});

Badge.displayName = "OnyxUI.Badge";

export default Badge;
