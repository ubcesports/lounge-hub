import React, { FormEvent } from "react";

interface HoverButtonProps {
  onClick: (e: FormEvent) => void;
  label: string;
  toolTip: string;
  className: string;
}

const HoverButton: React.FC<HoverButtonProps> = ({
  onClick,
  label,
  toolTip,
  className,
}) => {
  return (
    <div className="group relative">
      <button
        className={`h-full rounded border p-2 text-white hover:text-white ${className}`}
        onClick={onClick}
      >
        {label}
      </button>
      <div className="absolute bottom-full left-1/2 mb-2 mt-2 hidden w-32 -translate-x-1/2 transform rounded bg-gray-100 p-2 text-center text-xs text-black group-hover:block">
        {toolTip}
      </div>
    </div>
  );
};

export default HoverButton;
