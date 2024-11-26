import React, { useCallback, useEffect, useId, useRef, useState } from "react";
import { HTMLOnyxIUProps, mergeRefs, ReactRef } from "../../../utils";

interface Props extends HTMLOnyxIUProps<"input"> {
  ref?: ReactRef<HTMLInputElement>;
  label?: string;
  isChecked?: boolean;
  initiallyChecked?: boolean;
  error?: boolean | string;
  isDisabled?: boolean;
  optionalText?: string;
  hideAsterix?: boolean;
}

export type UseCheckboxProps = Omit<Props, "checked">;

function useCheckbox(props: UseCheckboxProps) {
  const {
    ref: forwardedRef,
    id: idProp,
    label,
    isChecked: isCheckedProp,
    error,
    isDisabled,
    optionalText,
    hideAsterix,
    initiallyChecked,
    onChange,
    ...inputProps
  } = props;

  const checkboxRef = useRef<HTMLInputElement>(null);
  const checkbuttonRef = useRef<HTMLButtonElement>(null);
  const [isChecked, setIsChecked] = useState<boolean>(!!initiallyChecked);

  const showAsterix = !hideAsterix && !!label && inputProps.required;

  useEffect(() => {
    const checkbox = checkboxRef.current;
    if (isCheckedProp !== undefined && checkbox) {
      // click checkbox if isChecked prop is different from current state of the checkbox
      if (checkbox.checked !== isCheckedProp) {
        checkbox.click();
      }
    }
  }, [isCheckedProp]);

  const useid = useId();
  const id = idProp || useid;

  const handleFocus = () => {
    const checkbtn = checkbuttonRef.current;
    if (checkbtn) {
      checkbtn.focus();
    }
  };

  const handleCheck = () => {
    const checkbox = checkboxRef.current;
    if (checkbox) {
      checkbox.click();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e);
    setIsChecked(e.target.checked);
  };

  const ref = mergeRefs([checkboxRef, forwardedRef]);

  const getCheckboxProps = useCallback(
    (props = {}) => ({
      id,
      ref,
      type: "checkbox",
      "aria-labelledby": id,
      "aria-disabled": isDisabled,
      className: "sr-only",
      checked: isChecked,
      disabled: isDisabled,
      onFocus: handleFocus,
      onChange: handleChange,
      ...props,
      ...inputProps,
    }),
    [id, ref, inputProps, isDisabled]
  );

  return {
    id,
    isChecked,
    label,
    checkboxRef,
    checkbuttonRef,
    showAsterix,
    optionalText,
    error,
    isDisabled,
    handleCheck,
    getCheckboxProps,
  };
}

export default useCheckbox;
