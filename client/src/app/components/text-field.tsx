import React, { ChangeEvent, KeyboardEvent } from "react";

interface TextFieldProps {
  label: string;
  name: string;
  value: string;
  type?: "text" | "password" | "email" | "number" | "date" | "time" | "search";
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
  className?: string;
}
const TextField: React.FC<TextFieldProps> = ({
  label,
  name,
  value,
  type,
  onChange,
  onBlur,
  onKeyDown,
  className = "",
}) => {
  return (
    <div className="flex flex-col">
      <label className="mb-1 text-white">{label}</label>{" "}
      {/* Apply text-white class */}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        className={`rounded bg-gray-700 p-2 text-white ${className}`} // Merge default and custom classes
      />
    </div>
  );
};

export default TextField;
