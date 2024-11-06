import React from "react";

const PlaceholderImage: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <img
        src="/images/ubceasleep.png"
        alt="Cute Placeholder"
        className="rounded-lg"
      />
    </div>
  );
};

export default PlaceholderImage;