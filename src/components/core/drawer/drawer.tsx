import React from "react";
import { UseDrawerProps } from "./use-drawer";
import { useDrawer } from ".";
import { DrawerContextProvider, useDrawerContext } from "../../../context";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "../button";
import { CloseIcon } from "../../../icons/action";

export const DrawerTrigger: React.FC<{
  children: React.ReactElement<{ onClick: () => void }>;
}> = ({ children }) => {
  const { setIsOpen } = useDrawerContext();
  return (
    <>
      {React.isValidElement(children) &&
        React.cloneElement(children, {
          ...children.props,
          onClick: () => {
            children.props.onClick?.();
            setIsOpen((p) => !p);
          },
        })}
    </>
  );
};

interface DrawerContentProps {
  children: React.ReactNode;
  header?: React.ReactNode;
}

export const DrawerContent: React.FC<DrawerContentProps> = ({
  header,
  children,
}) => {
  const { isOpen, setIsOpen, getBackdropProps, getDrawerProps } =
    useDrawerContext();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          {...getBackdropProps()}
        >
          <motion.div
            initial={{ right: "-100%" }}
            animate={{ right: 0 }}
            transition={{ ease: "easeOut", duration: 0.3 }}
            {...getDrawerProps()}
          >
            <div className="flex mb-5">
              {header}
              <Button
                className="ml-auto"
                variant="flat"
                isIconOnly
                onClick={() => setIsOpen(false)}
              >
                <CloseIcon />
              </Button>
            </div>

            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Drawer: React.FC<UseDrawerProps> = (props) => {
  const { children, ...drawerProps } = useDrawer(props);

  return (
    <DrawerContextProvider props={drawerProps}>
      {children}
    </DrawerContextProvider>
  );
};

export default Drawer;
