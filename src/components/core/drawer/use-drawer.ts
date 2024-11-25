import { useCallback, useRef, useState } from "react";
import { useClickOutside } from "../../../hooks";
import { cn, HTMLOnyxIUProps } from "../../../utils";

interface Props extends HTMLOnyxIUProps<"div"> {
  isOpen?: boolean;
  heading?: string;
  description?: string;
  disableClickOutside?: boolean;
  backdropClassName?: string;
  onClose?: () => void;
}

export type UseDrawerProps = Props;

function useDrawer(props: UseDrawerProps) {
  const { children, className, backdropClassName, disableClickOutside } = props;

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, () => {
    if (!disableClickOutside) {
      props.onClose?.();
      setIsOpen(false);
    }
  });

  const getDrawerProps = useCallback(
    (props = {}) => ({
      ref,
      className: cn(
        "fixed right-0 top-0 rounded-l-xl bg-background border border-default-border h-screen p-4 min-w-80 shadow-popup",
        className
      ),
      ...props,
    }),
    [ref, props]
  );

  const getBackdropProps = useCallback(
    (props = {}) => ({
      className: cn(
        "fixed top-0 left-0 w-full h-full bg-default-light/80",
        backdropClassName
      ),
      ...props,
    }),
    []
  );

  return {
    isOpen,
    setIsOpen,
    children,
    className,
    getDrawerProps,
    getBackdropProps,
  };
}

export default useDrawer;
