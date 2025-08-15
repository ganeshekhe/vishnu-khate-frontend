

import HeroSection from "../components/HeroSection";
import ServicesSection from "../components/ServicesSection";
import HighlightsSection from "../components/HighlightsSection";
import StepsSection from "../components/StepsSection";

import NoticesSection from "../components/NoticesSection";

import Footer from "../components/Footer";
 import HeroSlider from "../components/HeroSlider";

const Home = () => {
  return (
    <div>
        <HeroSlider /> 
      <HeroSection />
      <ServicesSection />
      <HighlightsSection />
      <StepsSection />
     
      <NoticesSection />

      <Footer />
    </div>
  );
};

export default Home;
