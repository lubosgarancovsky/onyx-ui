import React, { forwardRef } from "react";
import useTextarea, { UseTextareaProps } from "./use-textarea";
import { mergeRefs } from "../../../utils";

const Textarea = forwardRef<HTMLTextAreaElement, UseTextareaProps>(
  (props, ref) => {
    const {
      Component,
      id,
      label,
      optionalText,
      textareaRef,
      showAsterix,
      error,
      style,
      getTextareaProps,
    } = useTextarea({ ...props, ref });

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
        <Component
          id={id}
          className={style}
          ref={mergeRefs([textareaRef, ref])}
          {...getTextareaProps()}
        />
        {typeof error === "string" && (
          <span className="text-danger">{error}</span>
        )}
      </div>
    );
  }
);

export default Textarea;
