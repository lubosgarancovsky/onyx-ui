import React, { forwardRef } from "react";
import useCheckbox, { UseCheckboxProps } from "./use-checkbox";
import { cn } from "../../../utils";
import { CheckIcon } from "../../../icons/action";

const Checkbox = forwardRef<HTMLInputElement, UseCheckboxProps>(
  (props, ref) => {
    const {
      id,
      label,
      isChecked,
      checkbuttonRef,
      showAsterix,
      optionalText,
      error,
      isDisabled,
      handleCheck,
      getCheckboxProps,
    } = useCheckbox({
      ...props,
      ref,
    });

    return (
      <div className="flex flex-col gap-1">
        <label
          htmlFor={id}
          className={cn(
            "onyx-checkbox flex items-center select-none cursor-pointer",
            { "opacity-70 cursor-not-allowed pointer-events-none": isDisabled }
          )}
        >
          <input {...getCheckboxProps()} />
          <button
            ref={checkbuttonRef}
            className={cn(
              "onyx-checkbox-icon-wrapper focusable w-5 h-5 rounded-md border border-default-border text-white grid place-items-center",
              {
                "bg-accent": isChecked,
                "border-danger": !!error,
                "opacity-70 cursor-not-allowed pointer-events-none": isDisabled,
              }
            )}
            onClick={handleCheck}
          >
            {isChecked && <CheckIcon className="pointer-events-none" />}
          </button>
          <span className="ml-2.5">{label}</span>
          {optionalText && (
            <span className="ml-1 opacity-50">{optionalText}</span>
          )}
          {showAsterix && <span className="text-danger ml-0.5">*</span>}
        </label>
        {typeof error === "string" && (
          <span className="text-danger ml-[1.875rem]">{error}</span>
        )}
      </div>
    );
  }
);
export default Checkbox;

Checkbox.displayName = "OnyxUI.Checkbox";
