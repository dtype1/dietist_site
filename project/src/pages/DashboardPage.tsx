import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';

const DashboardPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-cream-100 to-cream-200 relative overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 grid-background opacity-20"></div>
      
      {/* Floating Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-20 w-32 h-32 bg-accent-500/20 rounded-full blur-xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-48 h-48 bg-sage-500/20 rounded-full blur-xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/4 w-24 h-24 bg-cream-400/30 rounded-full blur-xl"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center mb-12"
        >
          {/* Main Title with Glitch Effect */}
          <motion.h1
            className="glitch-text text-6xl md:text-8xl lg:text-9xl font-playfair font-bold text-sage-800 mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <span className="glitch-text-content" data-text="Dott.ssa Fabiana Napolitano">
              Dott.ssa Fabiana Napolitano
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-xl md:text-2xl text-gray-700 mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Nutrizionista - Il tuo percorso verso il benessere
          </motion.p>

          {/* Navigation Cards */}
          <motion.div
            className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            {/* Home Card */}
            <Link to="/home">
              <motion.div
                className="group bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-playfair text-sage-800">Scopri di più</h3>
                  <ArrowRight className="w-6 h-6 text-accent-500 group-hover:translate-x-2 transition-transform" />
                </div>
                <p className="text-gray-600 mb-4">
                  Esplora i miei servizi, la mia storia e come posso aiutarti nel tuo percorso di benessere
                </p>
                <div className="flex items-center text-accent-500">
                  <span className="text-sm font-medium">Vai alla homepage</span>
                </div>
              </motion.div>
            </Link>

            {/* Reviews Card */}
            <Link to="/reviews">
              <motion.div
                className="group bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-playfair text-sage-800">Recensioni</h3>
                  <Star className="w-6 h-6 text-amber-400 group-hover:rotate-12 transition-transform" />
                </div>
                <p className="text-gray-600 mb-4">
                  Leggi le esperienze dei miei pazienti e condividi la tua storia di successo
                </p>
                <div className="flex items-center text-amber-400">
                  <span className="text-sm font-medium">Vedi le recensioni</span>
                </div>
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-sage-300 rounded-full flex justify-center">
            <motion.div
              className="w-1 h-3 bg-sage-400 rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardPage;