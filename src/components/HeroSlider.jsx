


import { useEffect, useState } from "react";
import axios from "axios";
import { ChevronLeft, ChevronRight } from "lucide-react";

// ✅ Backend base URL
const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

const HeroSlider = () => {
  const [slides, setSlides] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // ✅ Fetch slides on mount
  useEffect(() => {
    fetchSlides();
  }, []);

  const fetchSlides = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/heroslides`);

      // ✅ Keep only slides that have valid images
      const validSlides = res.data.filter(
        (slide) => slide.image && slide.image.filename
      );

      setSlides(validSlides);
    } catch (err) {
      console.error("Error fetching slides:", err);
    }
  };

  // ✅ Auto-slide every 5s
  useEffect(() => {
    if (slides.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % slides.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [slides]);

 
  if (slides.length === 0) {
    return null;
  }

  const currentSlide = slides[currentIndex];
  const imageURL = `${BASE_URL}/api/files/${currentSlide.image.filename}`;

  return (



<div className="mt-20 relative w-full overflow-hidden bg-black rounded-b-3xl shadow-2xl">
  <img
    src={imageURL}
    alt="Banner"
    className="w-full h-auto object-contain"
  />
  <div className="absolute inset-0 bg-black/40"></div>
  <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6">
    <h2 className="text-3xl md:text-5xl font-extrabold drop-shadow-lg tracking-wide">
      {currentSlide.title}
    </h2>
    <p className="text-base md:text-xl mt-4 max-w-2xl drop-shadow-md">
      {currentSlide.subtitle}
    </p>
  </div>
</div>


  );
};

export default HeroSlider;

