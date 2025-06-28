import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Award, Users } from 'lucide-react';

const AboutSection = () => {
  return (
    <section id="about" className="section bg-white">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-medium mb-6">
              Chi Sono
            </h2>
            <p className="text-gray-600 mb-6">
              Sono la Dott.ssa Fabiana Napolitano, una professionista dedicata nel campo della nutrizione. 
              La mia missione è aiutare le persone a raggiungere il loro benessere attraverso 
              un'alimentazione sana ed equilibrata credo in un'alimentazione sana, ma flessibile, reale, e soprattutto…
              divertente.
            </p>
            <p className="text-gray-600 mb-6">
              Il mio motto? Mangiare sano, ma con leggerezza e piacere. Niente rigidità o rinunce forzate:
              ti accompagno in un percorso fatto di ascolto, equilibrio e piccoli
              cambiamenti concreti. Parliamo di cibo, certo, ma soprattutto di
              benessere, emozioni e libertà.
            </p>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <Heart className="w-8 h-8 text-sage-600 mx-auto mb-2" />
                <p className="font-medium">Passione</p>
              </div>
              <div className="text-center">
                <Award className="w-8 h-8 text-sage-600 mx-auto mb-2" />
                <p className="font-medium">Esperienza</p>
              </div>
              <div className="text-center">
                <Users className="w-8 h-8 text-sage-600 mx-auto mb-2" />
                <p className="font-medium">Empatia</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <img
              src={`${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/assets/doc.jpg`}
              alt="Dott.ssa Fabiana Napolitano"
              className="rounded-lg shadow-lg w-full"
              onError={(e) => {
                // Fallback to local image if Supabase image fails to load
                e.currentTarget.src = "/doc.jpg";
              }}
            />
            <div className="absolute -bottom-6 -right-6 bg-sage-600 text-white p-6 rounded-lg shadow-lg">
              <p className="text-2xl font-playfair mb-2">5+</p>
              <p className="text-sm">Anni di Esperienza</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;