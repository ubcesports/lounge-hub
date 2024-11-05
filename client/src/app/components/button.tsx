import React, { FormEvent } from "react";

interface ButtonProps {
  onClick: (e: FormEvent) => void;
  label: string;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, label, className = "" }) => {
  return (
    <button onClick={onClick} className={`rounded px-4 py-2 ${className}`}>
      {label}
    </button>
  );
};

export default Button;
