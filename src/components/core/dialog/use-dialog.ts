import { useCallback, useEffect, useId, useRef, useState } from "react";
import { HTMLOnyxIUProps } from "../../../utils";
import { useClickOutside } from "../../../hooks";

interface Props extends HTMLOnyxIUProps<"dialog"> {
  isOpen?: boolean;
  heading?: string;
  description?: string;
  disableClickOutside?: boolean;
  onClose?: () => void;
}

export type UseDialogProps = Props;

function useDialog(props: UseDialogProps) {
  const {
    isOpen: isOpenProp,
    children,
    onClose: onCloseProp,
    heading,
    description,
    disableClickOutside,
    ...otherProps
  } = props;

  const [isOpen, setIsOpen] = useState<boolean>(!!isOpenProp);

  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);

  const onClose = () => {
    if (onCloseProp) {
      onCloseProp();
    } else {
      setIsOpen(false);
    }
  };

  useClickOutside(dialogRef, () => {
    if (isOpen && !disableClickOutside) {
      onClose();
    }
  });

  useEffect(() => {
    if (isOpenProp !== undefined) {
      setIsOpen(isOpenProp);
    }
  }, [isOpenProp]);

  useEffect(() => {
    if (isOpen) {
      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
        "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"
      );
      if (focusable?.length) {
        focusable[focusable.length > 1 ? 1 : 0].focus();
      }
    }
  }, [isOpen]);

  const getDialogProps = useCallback(
    (props = {}) => {
      return {
        ref: dialogRef,
        "aria-modal": "true",
        "aria-describedby": titleId,
        role: "dialog",
        ...props,
        ...otherProps,
      };
    },
    [otherProps, titleId]
  );

  return {
    isOpen,
    setIsOpen,
    onClose,
    children,
    heading,
    description,
    getDialogProps,
  };
}

export default useDialog;
