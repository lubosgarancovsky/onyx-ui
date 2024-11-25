import React, { forwardRef } from "react";
import useSelect, { UseSelectProps } from "./use-select";
import { cn, mergeRefs } from "../../../utils";
import { ChevronDownIcon } from "../../../icons/navigation";
import { AnimatePresence, motion } from "framer-motion";

const Select = forwardRef<HTMLSelectElement, UseSelectProps>((props, ref) => {
  const {
    Component,
    id,
    label,
    showAsterix,
    leftIcon,
    arrowIcon,
    optionalText,
    error,
    selectRef,
    style,
    isOpen,
    options,
    placeholder,
    value,
    getSelectProps,
    handleSelectOption,
    getOptionLabel,
    // @ts-ignore
  } = useSelect({ arrowIcon: <ChevronDownIcon />, ...props, ref });

  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label htmlFor={id} className="font-medium flex items-center">
          {label}
          {optionalText && (
            <span className="ml-1 opacity-50">{optionalText}</span>
          )}
          {showAsterix && <span className="text-danger ml-0.5">*</span>}
        </label>
      )}

      <div className="relative flex flex-col w-full">
        <Component
          id={id}
          className={style}
          ref={mergeRefs([ref, selectRef])}
          {...getSelectProps()}
        >
          {leftIcon}
          <span className={cn({ "opacity-50": !value })}>
            {value ? getOptionLabel(value) : placeholder}
          </span>
          <motion.span
            initial={{ rotate: 0 }}
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.1, ease: "easeInOut" }}
            className="ml-auto"
          >
            {arrowIcon}
          </motion.span>
        </Component>

        <AnimatePresence>
          {isOpen && (
            <motion.ul
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.1 }}
              className="absolute top-[calc(100%+0.5rem)] bg-background left-0 right-0 rounded-md overflow-hidden border border-default-border origin-top shadow-popup p-1.5"
            >
              {options?.map((option, index) => (
                <li key={index}>
                  <button
                    className="focusable px-3 py-1.5 hover:bg-default-light focus-visible:bg-default-light w-full text-left duration-150 rounded-md transition-colors"
                    onClick={() => handleSelectOption(option)}
                  >
                    {getOptionLabel(option)}
                  </button>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>

      {typeof error === "string" && (
        <span className="text-danger">{error}</span>
      )}
    </div>
  );
});

Select.displayName = "OnyxUI.Select";

export default Select;
