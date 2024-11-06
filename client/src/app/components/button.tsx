import React, { FormEvent } from "react";

interface ButtonProps {
  onClick: (e: FormEvent) => void;
  label: string;
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({ onClick, label, type }) => {
  return (
    <button onClick={onClick} type={type}>
      {label}
    </button>
  );
};

export default Button;
