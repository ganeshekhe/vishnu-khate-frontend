

import HeroSlider from "../components/HeroSlider";
import HeroSection from "../components/HeroSection";
import ServicesSection from "../components/ServicesSection";
import HighlightsSection from "../components/HighlightsSection";
import StepsSection from "../components/StepsSection";
import NoticesSection from "../components/NoticesSection";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="bg-gray-900 text-gray-100">
      {/* Hero Slider */}
      <HeroSlider />

      {/* Hero Section */}
      <HeroSection />

      {/* Services Section */}
      <ServicesSection />

      {/* Highlights Section */}
      <HighlightsSection />

      {/* Steps / How it Works */}
      <StepsSection />

      {/* Notices / Announcements */}
      <NoticesSection />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
