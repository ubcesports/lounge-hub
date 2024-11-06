import React from "react";

const PlaceholderImage: React.FC = () => {
  return (
    <div className="flex h-full items-center justify-center">
      <img
        src="/images/ubceasleep.png"
        alt="Cute Placeholder"
        className="rounded-lg"
      />
    </div>
  );
};

export default PlaceholderImage;
