import React, { FormEvent } from "react";

interface ButtonProps {
  onClick: (e: FormEvent) => void;
  label: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, label }) => {
  return <button onClick={onClick}>{label}</button>;
};

export default Button;
