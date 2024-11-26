import React, { useCallback, useId, useMemo, useRef, useState } from "react";
import { cn, getIconClone, HTMLOnyxIUProps, ReactRef } from "../../../utils";
import { v4 } from "uuid";
import { UseBadgeProps } from "../badge";

type TagInputItem = {
  id: string;
  value: string;
};

interface Props extends HTMLOnyxIUProps<"input"> {
  ref?: ReactRef<HTMLInputElement | null>;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  clearIcon?: React.ReactNode;
  onClear?: () => void;
  isClearable?: boolean;
  fullWidth?: boolean;
  label?: string;
  error?: boolean | string;
  isDisabled?: boolean;
  optionalText?: string;
  hideAsterix?: boolean;
  cancelButtonProps?: Omit<React.HTMLAttributes<HTMLButtonElement>, "onClick">;
  tagProps?: Omit<UseBadgeProps, "ref">;
  onTagsChange?: (items: TagInputItem[]) => void;
  tagCloseButtonProps?: Omit<
    React.HTMLAttributes<HTMLButtonElement>,
    "onClick"
  >;
}

export type UseTagInputProps = Props;

function useTagInput(props: UseTagInputProps) {
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
    hideAsterix = false,
    optionalText,
    label,
    error,
    className,
    tagProps,
    onTagsChange,
    tagCloseButtonProps,
    onClear: onClearProp,
    cancelButtonProps,
    ...inputProps
  } = props;

  const [items, setItems] = useState<TagInputItem[]>([]);
  const [showClearIcon, setShowClearIcon] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const useid = useId();
  const id = idProp || useid;

  const Component = as || "input";

  const showAsterix = !hideAsterix && !!label && inputProps.required;

  const style = useMemo(() => {
    return cn(
      "p-0 m-0 h-[1.5rem] focus-visible:!outline-none focus:!outline-none bg-transparent",
      { "w-full": fullWidth, "pointer-events-none": isDisabled },
      className
    );
  }, []);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChangeProp?.(event);
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
    }

    setItems([]);
    onClearProp?.();
    onTagsChange?.([]);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && inputRef.current) {
      event.preventDefault();
      addItem(inputRef.current.value);
      inputRef.current.value = "";
    }
  };

  const addItem = (value: string) => {
    setItems((p) => {
      const newItems = [...p, { id: v4(), value }];
      onTagsChange?.(newItems);

      if (!showClearIcon && isClearable) {
        setShowClearIcon(true);
      }

      return newItems;
    });
  };

  const removeItem = (id: string) => {
    setItems((p) => {
      const newItems = p.filter((item) => item.id !== id);
      onTagsChange?.(newItems);

      if (!newItems.length) {
        setShowClearIcon(false);
      }

      return newItems;
    });
  };

  const getInputProps = useCallback(
    (props = {}) => {
      return {
        "aria-labelledby": id,
        "aria-disabled": isDisabled,
        autoComplete: "off",
        disabled: isDisabled,
        onChange,
        onFocus: () =>
          !isDisabled &&
          wrapperRef.current?.setAttribute("data-focused", "true"),
        onBlur: () => wrapperRef.current?.removeAttribute("data-focused"),
        onKeyDown: handleKeyDown,
        ...(isDisabled ? { tabIndex: -1 } : {}),
        ...inputProps,
        ...props,
      };
    },
    [wrapperRef, style, isDisabled, onChange]
  );

  const getWrapperProps = useCallback(
    (props = {}) => {
      return {
        ref: wrapperRef,
        className: cn(
          "focusable border rounded-md border-default-border px-4 py-1.5 leading-none focus:outline-none flex items-center gap-1 flex-wrap",
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

  const getTagCloseButtonProps = useCallback(
    (tagId: string) => ({
      ...tagCloseButtonProps,
      onClick: () => removeItem(tagId),
      className: cn("focusable hover:text-accent", tagCloseButtonProps?.className),
    }),
    [tagCloseButtonProps]
  );

  const leftIcon = getIconClone(leftIconProp);
  const rightIcon = getIconClone(rightIconProp);
  const clearIcon = getIconClone(clearIconProp);

  return {
    id,
    items,
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
    tagProps,
    isClearable,
    onClear,
    tagCloseButtonProps,
    getInputProps,
    getWrapperProps,
    getTagCloseButtonProps,
    cancelButtonProps,
  };
}

export default useTagInput;
