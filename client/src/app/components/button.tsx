import React, { FormEvent } from "react";

interface ButtonProps {
  onClick: (e: FormEvent) => void;
  label: string;
  className?: string;
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({ onClick, label, className, type }) => {
  return (
    <button onClick={onClick} type={type} className={`rounded px-4 py-2 ${className}`}>
      {label}
    </button>
  );
};

export default Button;
