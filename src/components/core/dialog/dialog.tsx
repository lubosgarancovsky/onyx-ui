import React from "react";

import useDialog, { UseDialogProps } from "./use-dialog";
import { Button } from "../button";
import { CloseIcon } from "../../../icons/action";
import { useDialogContext } from "../../../context";
import { DialogContextProvider } from "../../../context";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "../../../utils";

interface DialogTriggerProps {
  children: React.ReactElement<{ onClick: () => void }>;
}

export const DialogTrigger: React.FC<DialogTriggerProps> = ({ children }) => {
  const { setIsOpen } = useDialogContext();
  return (
    <>
      {React.cloneElement(children, {
        onClick: () => {
          setIsOpen(true);
          children.props.onClick?.();
        },
      })}
    </>
  );
};

export const DialogContent: React.FC<{
  children: ((setIsOpen: React.Dispatch<React.SetStateAction<boolean>>) => React.ReactNode) | React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  const { setIsOpen } = useDialogContext();
  return <div className={cn("mt-4", className)}>{typeof children === "function" ? children(setIsOpen) : children}</div>;
};

export const DialogBody: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { titleId, isOpen, onClose, heading, description, getDialogProps } =
    useDialogContext();
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          className="fixed top-0 left-0 w-full h-full bg-black/20 grid place-items-center p-4"
        >
          <motion.div
            initial={{
              opacity: 0.5,
              y: 300,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0.5,
              y: 300,
            }}
            transition={{
              ease: [0, 0.55, 0.45, 1],
            }}
            role="dialog"
            className="p-4 m-4 w-full relative md:max-w-[36rem] bg-background border border-default-border rounded-xl overflow-y-hidden"
            {...getDialogProps()}
          >
            {(heading || description) && (
              <div className="flex flex-col gap-0.5">
                <span id={titleId} className="font-semibold text-xl">
                  {heading}
                </span>
                <span className="text-foreground-200">{description}</span>
              </div>
            )}

            <Button
              className="absolute right-2 top-2"
              isIconOnly
              onClick={onClose}
              variant="flat"
              data-testid="dialog-close-button"
            >
              <CloseIcon />
            </Button>

            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Dialog: React.FC<UseDialogProps> = (props) => {
  const dialogProps = useDialog(props);
  return <DialogContextProvider {...dialogProps} />;
};

export default Dialog;

Dialog.displayName = "OnyxUI.Dialog";
