import React from 'react';
import { motion } from 'framer-motion';
import { Salad, Heart, Baby, Scale, Brain, Sun as Run } from 'lucide-react';

const services = [
  {
    icon: Salad,
    title: 'Piani Alimentari Personalizzati',
    description: 'Creo piani alimentari su misura per le tue esigenze e obiettivi specifici.'
  },
  {
    icon: Heart,
    title: 'Educazione Alimentare',
    description: 'Ti guido verso scelte alimentari consapevoli per uno stile di vita più sano.'
  },
  {
    icon: Baby,
    title: 'Nutrizione Pediatrica',
    description: 'Supporto nutrizionale specializzato per bambini e adolescenti.'
  },
  {
    icon: Scale,
    title: 'Gestione del Peso',
    description: 'Programmi personalizzati per il raggiungimento e mantenimento del peso forma.'
  },
  {
    icon: Brain,
    title: 'Nutrizione e Patologie',
    description: 'Piani alimentari specifici per la gestione di patologie attraverso la nutrizione.'
  },
  {
    icon: Run,
    title: 'Nutrizione Sportiva',
    description: 'Supporto nutrizionale per ottimizzare le prestazioni atletiche.'
  }
];

interface ServicesGridProps {
  showTitle?: boolean;
  className?: string;
}

const ServicesGrid: React.FC<ServicesGridProps> = ({ showTitle = false, className = "" }) => {
  return (
    <div className={className}>
      {showTitle && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-medium mb-4">
            I Miei Servizi
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Offro una vasta gamma di servizi nutrizionali personalizzati per aiutarti
            a raggiungere i tuoi obiettivi di salute e benessere
          </p>
        </motion.div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.03,
                y: -8,
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.12), 0 8px 16px rgba(0, 0, 0, 0.08)',
                transition: { duration: 0.2, ease: "easeOut" }
              }}
              whileTap={{ scale: 0.98 }}
              className="bg-white p-8 rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group"
            >
              <motion.div
                whileHover={{ 
                  rotate: 360,
                  scale: 1.1,
                  transition: { duration: 0.6, ease: "easeInOut" }
                }}
                className="mb-6"
              >
                <Icon className="w-12 h-12 text-accent-500 group-hover:text-accent-600 transition-colors duration-300" />
              </motion.div>
              <motion.h3 
                className="text-xl font-medium mb-3 group-hover:text-sage-700 transition-colors duration-300"
                whileHover={{ x: 2 }}
                transition={{ duration: 0.2 }}
              >
                {service.title}
              </motion.h3>
              <motion.p 
                className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300"
                whileHover={{ x: 2 }}
                transition={{ duration: 0.2, delay: 0.05 }}
              >
                {service.description}
              </motion.p>
              
              {/* Subtle gradient overlay on hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-accent-50/0 to-sage-50/0 rounded-lg pointer-events-none"
                whileHover={{
                  background: "linear-gradient(135deg, rgba(255, 38, 119, 0.02) 0%, rgba(104, 156, 106, 0.02) 100%)",
                  transition: { duration: 0.3 }
                }}
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default ServicesGrid;