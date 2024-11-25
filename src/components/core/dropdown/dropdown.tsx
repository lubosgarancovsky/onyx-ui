import React from "react";
import useDropdown, { UseDropdownProps } from "./use-dropdown";
import { DropdownContextProvider, useDropdownContext } from "../../../context";
import { cn } from "../../../utils";
import { AnimatePresence, motion } from "framer-motion";
import { CloseIcon } from "../../../icons/action";

export const DropdownTrigger: React.FC<{
  children: React.ReactElement<{ onClick: () => void; className: string }>;
}> = ({ children }) => {
  const { setIsOpen } = useDropdownContext();
  return (
    <>
      {React.cloneElement(children, {
        onClick: () => {
          setIsOpen((p: boolean) => !p);
          children.props.onClick?.();
        },
      })}
    </>
  );
};

export const DropdownContent: React.FC<{
  children: React.ReactNode;
  className?: string;
  direction?: "left" | "right";
  label?: string;
  actions?: React.ReactNode;
}> = ({ children, className, label, actions, direction = "left" }) => {
  const { isOpen, setIsOpen, dropdownRef } = useDropdownContext();
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={dropdownRef}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.1 }}
          className={cn(
            "absolute top-[calc(100%+0.5rem)] right-0 border border-default-border origin-top shadow-popup bg-background rounded-md",
            { "right-0": direction === "right" },
            { "left-0": direction === "left" },
            className
          )}
        >
          {!!label && (
            <div className="text-sm font-bold px-3 py-2 border-b border-default-border flex justify-between items-center">
              {label}
              <button
                className="text-neutral-500 hover:text-neutral-900"
                onClick={() => setIsOpen((p: boolean) => !p)}
              >
                <CloseIcon />
              </button>
            </div>
          )}
          <ul className={cn("overflow-hidden p-1.5")}>{children}</ul>
          {!!actions && (
            <div className="flex items-center justify-end gap-2.5 p-2 border-t border-default-border">
              {actions}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Dropdown: React.FC<UseDropdownProps> = (props) => {
  const { children, ...dropdownProps } = useDropdown(props);
  return (
    <DropdownContextProvider {...dropdownProps}>
      <div className="relative">{children}</div>
    </DropdownContextProvider>
  );
};

export default Dropdown;
