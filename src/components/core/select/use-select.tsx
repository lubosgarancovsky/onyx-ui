import React, {
  RefObject,
  useCallback,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { cn, getIconClone, HTMLOnyxIUProps } from "../../../utils";
import { useClickOutside } from "../../../hooks";

interface Props extends HTMLOnyxIUProps<"button"> {
  ref?: RefObject<HTMLButtonElement | null>;
  label?: string;
  error?: boolean | string;
  isDisabled?: boolean;
  optionalText?: string;
  hideAsterix?: boolean;
  leftIcon?: React.ReactNode;
  arrowIcon?: React.ReactNode;
  required?: boolean;
  options?: any[];
  placeholder?: string;
  onChange?: (option: any) => void;
  getOptionLabel?: (option: any) => string;
}

export type UseSelectProps = Props;

function useSelect(props: UseSelectProps) {
  const {
    id: idProp,
    as,
    ref: refProp,
    label,
    className,
    error,
    isDisabled,
    optionalText,
    hideAsterix,
    leftIcon: leftIconProp,
    arrowIcon: arrowIconProp,
    children,
    onChange: onChangeProp,
    required,
    options = [],
    placeholder,
    onChange,
    getOptionLabel = (option) => option,
    ...selectProps
  } = props;

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [value, setValue] = useState<any>(null);

  const selectRef = useRef<HTMLSelectElement>(null);
  const id = idProp || useId();

  useClickOutside(selectRef, () => {
    if (isOpen) setIsOpen(false);
  });

  const Component = as || "button";

  const showAsterix = !hideAsterix && !!label && required;

  const style = useMemo(() => {
    return cn(
      "focusable relative border rounded-md border-default-border px-4 py-2.5 leading-none focus:outline-none flex items-center gap-2 w-full",
      className
    );
  }, [className]);

  const leftIcon = getIconClone(leftIconProp);
  const arrowIcon = getIconClone(arrowIconProp);

  const handleClick = () => {
    setIsOpen((p) => !p);
    selectRef.current?.focus();
  };

  const handleSelectOption = (value: string) => {
    setValue(value);
    setIsOpen(false);
    onChange?.(value);
  };

  const handleKeys = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      setIsOpen(false);
    }
  };

  const getSelectProps = useCallback(
    (props = {}) => ({
      "aria-labelledby": id,
      "aria-disabled": isDisabled,
      "aria-haspopup": "listbox",
      "aria-expanded": isOpen,
      onClick: handleClick,
      onKeyDown: handleKeys,
      ...(isDisabled ? { tabIndex: -1 } : {}),
      ...props,
      ...selectProps,
    }),
    [props, selectProps, id]
  );

  return {
    Component,
    selectRef,
    id,
    label,
    style,
    showAsterix,
    error,
    leftIcon,
    arrowIcon,
    optionalText,
    children,
    isOpen,
    value,
    options,
    placeholder,
    getSelectProps,
    handleSelectOption,
    getOptionLabel,
  };
}

export default useSelect;
