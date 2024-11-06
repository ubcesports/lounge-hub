import React, { ChangeEvent } from "react";

interface TextFieldProps {
  label: string;
  name: string;
  value: string;
  type?: "text" | "password" | "email" | "number" | "date" | "time" | "search";
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
const TextField: React.FC<TextFieldProps> = ({
  label,
  name,
  value,
  type,
  onChange,
}) => {
  return (
    <div>
      <label>{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default TextField;
