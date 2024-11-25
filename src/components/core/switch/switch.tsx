import { motion } from "framer-motion";
import React, { forwardRef, useMemo } from "react";
import useSwitch, { UseSwitchProps } from "./use-switch";

const Switch = forwardRef<HTMLInputElement, UseSwitchProps>((props, ref) => {
  const {
    id,
    style,
    label,
    labelPosition,
    buttonRef,
    error,
    showAsterix,
    optionalText,
    handleCheck,
    getInputProps,
  } = useSwitch({
    ...props,
    ref,
  });

  const labelSpan = useMemo(() => {
    return (
      <span className="flex items-center">
        {label}
        {optionalText && (
          <span className="opacity-50 ml-1">{optionalText}</span>
        )}
        {showAsterix && <span className="text-danger ml-1">*</span>}
      </span>
    );
  }, [label, optionalText, showAsterix]);

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="onyx-switch flex items-center gap-2.5">
        <input {...getInputProps()} />
        {labelPosition === "left" && labelSpan}
        <motion.button ref={buttonRef} className={style} onClick={handleCheck}>
          <motion.span
            layout
            className="rounded-full w-4 h-4 block bg-background"
            transition={{
              ease: "easeOut",
              duration: 0.2,
            }}
          ></motion.span>
        </motion.button>
        {labelPosition === "right" && labelSpan}
      </label>
      {typeof error === "string" && <p className="text-danger">{error}</p>}
    </div>
  );
});

export default Switch;
