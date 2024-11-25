import React from "react";
import useDropdownItem, { UseDropdownItemProps } from "./use-dropdown-item";

const DropdownItem: React.FC<UseDropdownItemProps> = (props) => {
  const { children, style, icon, getButtonProps } = useDropdownItem(props);
  return (
    <li>
      <button className={style} {...getButtonProps()}>
        {icon}
        <span>{children}</span>
      </button>
    </li>
  );
};

export default DropdownItem;
