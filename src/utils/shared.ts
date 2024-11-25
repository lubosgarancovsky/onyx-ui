import { cloneElement, isValidElement, ReactNode } from "react";

export function mergeRefs<T = any>(
  refs: Array<React.MutableRefObject<T> | React.LegacyRef<T> | undefined | null>
): React.RefCallback<T> {
  return (value) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") {
        ref(value);
      } else if (ref != null) {
        (ref as React.MutableRefObject<T | null>).current = value;
      }
    });
  };
}

export const getIconClone = (icon: ReactNode) =>
  isValidElement(icon)
    ? cloneElement(icon, {
        // @ts-ignore
        "aria-hidden": true,
        focusable: false,
        tabIndex: -1,
      })
    : null;
