import React, { FormEvent } from "react";

interface ButtonProps {
  onClick: (e: FormEvent) => void;
  label: string;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  label,
  className,
  type,
  disabled,
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`rounded px-4 py-2 ${className}`}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;
