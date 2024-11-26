import React, {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { cn, HTMLOnyxIUProps, mergeRefs, ReactRef } from "../../../utils";

interface Props extends HTMLOnyxIUProps<"input"> {
  ref?: ReactRef<HTMLInputElement>;
  label?: string;
  isDisabled?: boolean;
  isChecked?: boolean;
  initiallyChecked?: boolean;
  labelPosition?: "left" | "right";
  error?: boolean | string;
  hideAsterix?: boolean;
  optionalText?: string;
}

export type UseSwitchProps = Props;

function useSwitch(props: UseSwitchProps) {
  const {
    id: idProp,
    ref: forwardedRef,
    label,
    isDisabled,
    isChecked: isCheckedProp,
    initiallyChecked,
    labelPosition = "right",
    hideAsterix,
    error,
    optionalText,
    onChange,
    ...inputProps
  } = props;

  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const ref = mergeRefs([inputRef, forwardedRef]);

  const useid = useId();
  const id = idProp || useid;

  const [isChecked, setIsChecked] = useState<boolean>(!!initiallyChecked);

  const showAsterix = !hideAsterix && !!label && inputProps.required;

  useEffect(() => {
    const switchEl = inputRef.current;
    if (isCheckedProp !== undefined && switchEl) {
      if (switchEl.checked !== isCheckedProp) {
        switchEl.click();
      }
    }
  }, [isCheckedProp]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e);
    setIsChecked(e.target.checked);
  };

  const handleFocus = () => {
    const switchBtn = buttonRef.current;
    if (switchBtn) {
      switchBtn.focus();
    }
  };

  const handleCheck = () => {
    const checkbox = inputRef.current;
    if (checkbox) {
      checkbox.click();
    }
  };

  const style = useMemo(() => {
    return cn(
      "rounded-full w-9 p-0.5 bg-default-border h-fit flex items-center duration-200 justify-start hover:shadow-accent hover:border hover:border-accent",
      {
        "bg-accent justify-end": isChecked,
        "opacity-70 cursor-not-allowed pointer-events-none": isDisabled,
      }
    );
  }, [isChecked]);

  const getInputProps = useCallback(
    (props = {}) => ({
      ref,
      id,
      checked: isChecked,
      type: "checkbox",
      "aria-disabled": isDisabled,
      className: "sr-only",
      disabled: isDisabled,
      onChange: handleChange,
      onFocus: handleFocus,
      ...inputProps,
      ...props,
    }),
    [id, isChecked, isDisabled, inputRef, inputProps]
  );

  return {
    id,
    isChecked,
    buttonRef,
    labelPosition,
    label,
    style,
    error,
    showAsterix,
    optionalText,
    handleCheck,
    getInputProps,
  };
}

export default useSwitch;
