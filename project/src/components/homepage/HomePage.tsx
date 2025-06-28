import React from 'react';
import { motion } from 'framer-motion';
import HeroSection from "./sections/HeroSection";
import AboutSection from "./sections/AboutSection";
import ServicesSection from "./sections/ServicesSection";
import RecipePhotosSection from "./sections/RecipePhotosSection";
import ReviewsPreviewSection from "./sections/ReviewsPreviewSection";
import ContactSection from "./sections/ContactSection";

const HomePage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <RecipePhotosSection />
      <ReviewsPreviewSection />
      <ContactSection />
    </motion.div>
  );
};

export default HomePage;