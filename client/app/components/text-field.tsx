import React, { ChangeEvent } from "react";

interface TextFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const TextField: React.FC<TextFieldProps> = ({
  label,
  name,
  value,
  onChange,
}) => {
  return (
    <div>
      <label>{label}</label>
      <input type="text" name={name} value={value} onChange={onChange} />
    </div>
  );
};

export default TextField;
