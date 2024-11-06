import React from "react";

// Fun little thing to show when there's no content to display
const PlaceholderImage: React.FC = () => {
  const images = [
    "/images/ubceaeyes.png",
    "/images/ubceasleep.png",
    "/images/ubcealove.png",
  ];

  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
  };

  const randomImage = getRandomImage();

  return (
    <div className="flex h-full items-center justify-center">
      <img src={randomImage} alt="Cute Placeholder" className="rounded-lg" />
    </div>
  );
};

export default PlaceholderImage;
