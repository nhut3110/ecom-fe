import { motion } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useState, useEffect, useMemo } from "react";
import { carouselImages } from "../constants/data";

const CHANGE_SLIDE_TIME = 5000; // time in milliseconds to change the slide

const Carousel = (): React.ReactElement => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const buttonVariants = useMemo(() => {
    return {
      initial: { scale: 1 },
      onTap: { scale: 0.8 },
      onHover: { scale: 1.2 },
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(
        (currentSlide) => (currentSlide + 1) % carouselImages.length
      );
    }, CHANGE_SLIDE_TIME);

    return () => clearInterval(interval);
  }, [carouselImages.length]);

  const handlePrevious = () => {
    setCurrentSlide((prevSlide) => {
      const updatedPosition = --prevSlide;
      return updatedPosition < 0 ? carouselImages.length - 1 : updatedPosition;
    });
  };

  const handleNext = () => {
    setCurrentSlide((prevSlide) => {
      const updatedPosition = ++prevSlide;
      return updatedPosition >= carouselImages.length ? 0 : updatedPosition;
    });
  };

  return (
    <div className="relative m-3 h-36 md:h-72">
      <motion.button
        className="absolute left-0 top-1/2 z-10 -translate-y-1/2 transform text-gray-400 focus:outline-none hover:text-gray-900"
        onClick={handlePrevious}
        variants={buttonVariants}
        initial="initial"
        whileHover="onHover"
        whileTap="onTap"
      >
        <FiChevronLeft size={32} />
      </motion.button>

      <motion.button
        className="absolute right-0 top-1/2 z-10 -translate-y-1/2 transform text-gray-400 focus:outline-none hover:text-gray-900"
        onClick={handleNext}
        variants={buttonVariants}
        initial="initial"
        whileHover="onHover"
        whileTap="onTap"
      >
        <FiChevronRight size={32} />
      </motion.button>

      {carouselImages.map((image, index) => (
        <motion.img
          key={index}
          src={image.url}
          alt={image.category}
          initial={{ opacity: 0 }}
          animate={{
            opacity: index === currentSlide ? 1 : 0,
            transition: { duration: 1, ease: "easeInOut" },
          }}
          className="object-fit absolute top-0 left-0 h-full w-full rounded-xl object-top md:object-fill"
        />
      ))}

      <div className="absolute -bottom-4 w-full">
        <div className="flex h-4 items-center justify-center gap-2">
          {carouselImages.map((_, index) => (
            <motion.div
              className={`h-2 w-2 rounded-full bg-black
              transition-all ${
                index === currentSlide ? "p-1" : "bg-opacity-50"
              }`}
              onClick={() => setCurrentSlide(index)}
              key={index}
              variants={buttonVariants}
              initial="initial"
              whileHover="onHover"
              whileTap="onTap"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
