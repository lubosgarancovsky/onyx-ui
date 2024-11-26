import React, { useCallback, useId, useMemo, useRef, useState } from "react";
import { cn, getIconClone, HTMLOnyxIUProps, ReactRef } from "../../../utils";
import { debounce as debounceFn } from "../../../utils";

interface Props extends HTMLOnyxIUProps<"input"> {
  ref?: ReactRef<HTMLInputElement | null>;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  clearIcon?: React.ReactNode;
  onClear?: () => void;
  isClearable?: boolean;
  fullWidth?: boolean;
  debounce?: number;
  label?: string;
  error?: boolean | string;
  isDisabled?: boolean;
  optionalText?: string;
  hideAsterix?: boolean;
  cancelButtonProps?: Omit<React.HTMLAttributes<HTMLButtonElement>, "onClick">;
}

export type UseInputProps = Props;

function useInput(props: UseInputProps) {
  const {
    id: idProp,
    as,
    ref: refProp,
    leftIcon: leftIconProp,
    rightIcon: rightIconProp,
    clearIcon: clearIconProp,
    isClearable = false,
    fullWidth = false,
    onChange: onChangeProp,
    isDisabled = false,
    debounce = 0,
    hideAsterix = false,
    optionalText,
    label,
    error,
    className,
    onClear: onClearProp,
    cancelButtonProps,
    ...inputProps
  } = props;

  const [showClearIcon, setShowClearIcon] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const useid = useId();
  const id = idProp || useid;

  const Component = as || "input";

  const showAsterix = !hideAsterix && !!label && inputProps.required;

  const style = useMemo(() => {
    return cn(
      "p-0 m-0 h-[1.15em] focus-visible:!outline-none focus:!outline-none bg-transparent w-full",
      { "pointer-events-none": isDisabled },
      className
    );
  }, []);

  const handleChangeFn = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!!event.target.value && !showClearIcon && isClearable) {
      setShowClearIcon(true);
    }

    if (!event.target.value) {
      setShowClearIcon(false);
    }

    onChangeProp?.(event);
  };

  const handleChange = useCallback(
    debounce
      ? debounceFn((event: React.ChangeEvent<HTMLInputElement>) => {
          handleChangeFn(event);
        }, debounce)
      : (event: React.ChangeEvent<HTMLInputElement>) => {
          handleChangeFn(event);
        },
    []
  );

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(event);
  };

  const onClear = () => {
    if (!!inputRef?.current) {
      inputRef.current.value = "";
      setShowClearIcon(false);
      onClearProp?.();
    }
  };

  const getInputProps = useCallback(
    (props = {}) => {
      return {
        "aria-labelledby": id,
        "aria-disabled": isDisabled,
        disabled: isDisabled,
        onChange,
        onFocus: () =>
          !isDisabled &&
          wrapperRef.current?.setAttribute("data-focused", "true"),
        onBlur: () => wrapperRef.current?.removeAttribute("data-focused"),
        ...(isDisabled ? { tabIndex: -1 } : {}),
        ...inputProps,
        ...props,
      };
    },
    [wrapperRef, isDisabled, onChange]
  );

  const getWrapperProps = useCallback(
    (props = {}) => {
      return {
        ref: wrapperRef,
        className: cn(
          "focusable border rounded-md border-default-border px-4 py-2.5 leading-none focus:outline-none flex items-center gap-2 cursor-text",
          {
            "border-danger": !!error,
            "w-full": fullWidth,
            "bg-default-light/50 pointer-events-none": isDisabled,
          }
        ),
        onClick: () => {
          wrapperRef.current?.setAttribute("data-focused", "true");
          inputRef.current?.focus();
        },
        ...props,
      };
    },
    [wrapperRef, inputRef, isDisabled, fullWidth, error, props]
  );

  const leftIcon = getIconClone(leftIconProp);
  const rightIcon = getIconClone(rightIconProp);
  const clearIcon = getIconClone(clearIconProp);

  return {
    id,
    Component,
    inputRef,
    leftIcon,
    rightIcon,
    showClearIcon,
    clearIcon,
    error,
    label,
    style,
    optionalText,
    showAsterix,
    isClearable,
    onClear,
    getInputProps,
    getWrapperProps,
    cancelButtonProps,
  };
}

export default useInput;
