import React, { useCallback, useEffect, useState } from "react";
import { CarouselImages } from "../constants/data";

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(
        (currentSlide) => (currentSlide + 1) % CarouselImages.length
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [CarouselImages.length]);

  return (
    <div className="relative m-3 h-72 ">
      {CarouselImages.map((image, index) => (
        <div
          key={image.url}
          className={`absolute top-0 left-0 h-full w-full transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "hidden opacity-0"
          }`}
        >
          <img
            src={image.url}
            alt={image.category}
            className="h-full w-full rounded-xl object-cover object-top md:object-fill"
          />
        </div>
      ))}

      <div className="absolute -bottom-4 w-full">
        <div className="flex items-center justify-center gap-2">
          {CarouselImages.map((_, index) => (
            <div
              className={`h-2 w-2 rounded-full bg-black
              transition-all ${
                index === currentSlide ? "p-[6px]" : "bg-opacity-50"
              }`}
              onClick={() => setCurrentSlide(index)}
              key={index}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
