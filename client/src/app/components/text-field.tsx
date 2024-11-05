import React, { ChangeEvent } from "react";

interface TextFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const TextField: React.FC<TextFieldProps> = ({
  label,
  name,
  value,
  onChange,
  className = "",
}) => {
  return (
    <div className="flex flex-col">
      <label className="text-white mb-1">{label}</label> {/* Apply text-white class */}
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        className={`p-2 rounded bg-gray-700 text-white ${className}`} // Merge default and custom classes
      />
    </div>
  );
};

export default TextField;
