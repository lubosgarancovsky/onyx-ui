import React, { forwardRef } from "react";
import useInput, { UseInputProps } from "./use-input";
import { ClearIcon } from "../../../icons/action";

const Input = forwardRef<HTMLInputElement, UseInputProps>((props, ref) => {
  const {
    id,
    Component,
    inputRef,
    leftIcon,
    rightIcon,
    clearIcon,
    showClearIcon,
    error,
    label,
    optionalText,
    showAsterix,
    isClearable,
    style,
    onClear,
    getInputProps,
    getWrapperProps,
    cancelButtonProps,
  } = useInput({
    ...props,
    clearIcon: props.clearIcon || <ClearIcon />,
    ref,
  });

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={id} className="font-medium flex items-center">
          {label}
          {optionalText && (
            <span className="ml-1 opacity-50">{optionalText}</span>
          )}
          {showAsterix && <span className="text-danger ml-0.5">*</span>}
        </label>
      )}
      <div {...getWrapperProps()}>
        {leftIcon}
        <Component id={id} ref={inputRef} className={style} {...getInputProps()} />
        {isClearable && showClearIcon ? (
          <button onClick={onClear} {...cancelButtonProps}>
            {clearIcon}
          </button>
        ) : (
          <span className="w-[1em]"></span>
        )}
        {rightIcon}
      </div>
      {typeof error === "string" && (
        <span className="text-danger">{error}</span>
      )}
    </div>
  );
});

Input.displayName = "OnyxUI.Input";

export default Input;
