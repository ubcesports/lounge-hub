import React from "react";
import { useState, useEffect } from "react";

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

  // Use useState to store the selected random image
  const [randomImage, setRandomImage] = useState<string>("");

  // Use useEffect to select a random image when the component mounts
  useEffect(() => {
    setRandomImage(getRandomImage());
  }, []);

  return (
    <div className="flex h-full items-center justify-center">
      <img src={randomImage} alt="Cute Placeholder" className="rounded-lg" />
    </div>
  );
};

export default PlaceholderImage;
