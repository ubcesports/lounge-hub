import React, { FormEvent } from "react";

interface HoverButtonProps {
  onClick: (e: FormEvent) => void;
  label: string;
  color: string;
  toolTip: string;
}

const HoverButton: React.FC<HoverButtonProps> = ({
  onClick,
  label,
  color,
  toolTip,
}) => {
  return (
    <div className="group relative">
      <button
        className={`h-full rounded border border-${color} p-2 text-white hover:bg-${color} hover:text-white`}
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
