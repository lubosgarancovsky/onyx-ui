import React from "react";
import { forwardRef } from "react";
import useTagInput, { UseTagInputProps } from "./use-tag-input";
import { Badge } from "../badge";
import { ClearIcon, CloseIcon } from "../../../icons/action";

const TagInput = forwardRef<HTMLInputElement, UseTagInputProps>(
  (props, ref) => {
    const {
      items,
      label,
      optionalText,
      leftIcon,
      rightIcon,
      isClearable,
      showClearIcon,
      onClear,
      clearIcon,
      style,
      showAsterix,
      error,
      id,
      tagProps,
      Component,
      inputRef,
      getTagCloseButtonProps,
      getInputProps,
      getWrapperProps,
      cancelButtonProps,
    } = useTagInput({
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
          {items.map((item) => (
            <Badge
              key={item.id}
              className="flex gap-1.5 items-center"
              {...tagProps}
            >
              {item.value}
              <button {...getTagCloseButtonProps(item.id)}>
                <CloseIcon />
              </button>
            </Badge>
          ))}
          <Component
            id={id}
            ref={inputRef}
            className={style}
            {...getInputProps()}
          />
          {isClearable && showClearIcon ? (
            <button
              className="ml-auto"
              onClick={onClear}
              {...cancelButtonProps}
            >
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
  }
);

TagInput.displayName = "OnyxUI.TagInput";

export default TagInput;
