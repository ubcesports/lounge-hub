import React, { ChangeEvent } from "react";

interface DropdownFieldProps {
  label: string;
  name: string;
  value: any;
  options: { value: string; label: string }[];
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const DropdownField: React.FC<DropdownFieldProps> = ({
  label,
  name,
  value,
  options,
  onChange,
}) => {
  return (
    <div>
      <label>{label}</label>
      <select name={name} value={value} onChange={onChange}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropdownField;
