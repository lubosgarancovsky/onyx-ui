import { useRef, useState } from "react";
import { debounce, HTMLOnyxIUProps } from "../../../utils";
import { useClickOutside } from "../../../hooks";

interface Props extends HTMLOnyxIUProps<"div"> {
  children?: React.ReactNode;
}

export type UseDropdownProps = Props;

function useDropdown(props: UseDropdownProps) {
  const { children } = props;

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLElement>(null);

  useClickOutside(dropdownRef, () => {
    if (isOpen) {
      debounce(() => setIsOpen(false), 10)();
    }
  });

  return { isOpen, setIsOpen, children, dropdownRef };
}

export default useDropdown;
