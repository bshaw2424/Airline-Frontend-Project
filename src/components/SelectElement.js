import React from "react";

const SelectElement = ({
  className,
  onChange,
  defaultValue,
  key,
  children,
}) => {
  return (
    <select
      className={className}
      onChange={onChange}
      defaultValue={defaultValue}
      key={key}
    >
      {children}
    </select>
  );
};

export default SelectElement;
