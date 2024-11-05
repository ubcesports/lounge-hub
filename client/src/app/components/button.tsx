import React, { FormEvent } from "react";

interface ButtonProps {
  onClick: (e: FormEvent) => void;
  label: string;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, label, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`py-2 px-4 rounded ${className}`}
    >
      {label}
    </button>
  );
};

export default Button;
