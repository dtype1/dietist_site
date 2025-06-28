import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import ServicesGrid from '../components/ServicesGrid';

const ServicesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-cream-50 to-cream-100">
      <div className="container py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <Link 
            to="/home" 
            className="inline-flex items-center text-sage-600 hover:text-sage-800 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            <span>Torna alla Home</span>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-playfair font-medium mb-6 text-sage-800">
            I Miei Servizi
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Offro una vasta gamma di servizi nutrizionali personalizzati per aiutarti
            a raggiungere i tuoi obiettivi di salute e benessere. Ogni percorso è studiato
            su misura per le tue esigenze specifiche.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <ServicesGrid />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-center mt-16"
        >
          <p className="text-gray-600 mb-6">
            Vuoi saperne di più su come posso aiutarti nel tuo percorso di benessere?
          </p>
          <a
            href="http://www.miodottore.it/fabiana-napolitano/nutrizionista/giugliano"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Prenota una Consulenza
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default ServicesPage;