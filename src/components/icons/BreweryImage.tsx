import React, { useState, useEffect } from "react";
import images from "../../assets/index";

interface BreweryImageProps {
  imageType: string;
}

const BreweryImage: React.FC<BreweryImageProps> = ({ imageType }) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  useEffect(() => {
    const loadImage = async () => {
      if (images[imageType]) {
        const imageModule = await images[imageType]();
        setImageSrc(imageModule.default);
      } else {
        setImageSrc(null);
      }
    };

    loadImage();
  }, [imageType]);

  if (!imageSrc) {
    return <div>Image not found for {imageType} brewery</div>;
  }

  return <img src={imageSrc} alt={imageType} />;
};

export default BreweryImage;
