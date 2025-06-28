import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { RecipePhoto } from '../../../models/RecipePhoto';
import { getRecipePhotos, subscribeToRecipePhotos } from '../../../services/recipePhotosService';

const RecipePhotosSection = () => {
  const [photos, setPhotos] = useState<RecipePhoto[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPhotos = async () => {
      setLoading(true);
      const data = await getRecipePhotos();
      setPhotos(data);
      setLoading(false);
    };

    fetchPhotos();

    // Set up real-time subscription
    const unsubscribe = subscribeToRecipePhotos(setPhotos);
    
    return () => {
      unsubscribe();
    };
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying || photos.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === photos.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [isPlaying, photos.length]);

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? photos.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === photos.length - 1 ? 0 : currentIndex + 1);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  if (loading) {
    return (
      <section className="section bg-white">
        <div className="container">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-sage-200 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-sage-200 rounded w-96 mx-auto mb-8"></div>
              <div className="h-96 bg-sage-200 rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (photos.length === 0) {
    return (
      <section className="section bg-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-medium mb-4">
              Foto Ricette
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              Presto qui troverai una collezione delle mie ricette preferite
            </p>
            <div className="bg-cream-100 p-8 rounded-lg">
              <p className="text-sage-600">Nessuna foto disponibile al momento</p>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="section bg-white">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-medium mb-4">
            Foto Ricette
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Scopri alcune delle mie ricette preferite per un'alimentazione sana e gustosa
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative max-w-4xl mx-auto"
        >
          {/* Main slideshow container */}
          <div className="relative h-96 md:h-[500px] rounded-lg overflow-hidden shadow-xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -300 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <img
                  src={photos[currentIndex].image_url}
                  alt={photos[currentIndex].title || `Ricetta ${currentIndex + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                
                {/* Title overlay */}
                {photos[currentIndex].title && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="absolute bottom-6 left-6 right-6"
                  >
                    <h3 className="text-white text-xl md:text-2xl font-playfair font-medium">
                      {photos[currentIndex].title}
                    </h3>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation arrows */}
            {photos.length > 1 && (
              <>
                <button
                  onClick={goToPrevious}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-sage-800 p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
                  aria-label="Foto precedente"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={goToNext}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-sage-800 p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
                  aria-label="Foto successiva"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Play/Pause button */}
            {photos.length > 1 && (
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="absolute top-4 right-4 bg-white/80 hover:bg-white text-sage-800 p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
                aria-label={isPlaying ? "Pausa slideshow" : "Avvia slideshow"}
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </button>
            )}
          </div>

          {/* Dots indicator */}
          {photos.length > 1 && (
            <div className="flex justify-center mt-6 space-x-2">
              {photos.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === currentIndex
                      ? 'bg-accent-500 scale-125'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Vai alla foto ${index + 1}`}
                />
              ))}
            </div>
          )}

          {/* Photo counter */}
          {photos.length > 1 && (
            <div className="text-center mt-4">
              <span className="text-sm text-gray-500">
                {currentIndex + 1} di {photos.length}
              </span>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default RecipePhotosSection;