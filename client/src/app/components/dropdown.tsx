import React, { ChangeEvent } from "react";

interface DropdownFieldProps {
  label: string;
  name: string;
  value: any;
  options: { value: string; label: string }[];
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
}

const DropdownField: React.FC<DropdownFieldProps> = ({
  label,
  name,
  value,
  options,
  onChange,
  className = "",
}) => {
  return (
    <div className="flex flex-col">
      <label className="mb-1 text-white">{label}</label>{" "}
      {/* Apply text-white class */}
      <select
        name={name}
        value={value}
        onChange={onChange}
        className={`rounded bg-gray-700 p-2 text-white ${className}`} // Merge default and custom classes
      >
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
