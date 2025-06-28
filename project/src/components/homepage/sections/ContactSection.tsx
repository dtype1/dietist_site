import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const ContactSection = () => {
  return (
    <section id="contact" className="section bg-white">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-medium mb-4">
            Contattami
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Sono qui per aiutarti a raggiungere i tuoi obiettivi di salute e benessere.
            Non esitare a contattarmi per qualsiasi domanda.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="flex items-start space-x-4">
              <MapPin className="w-6 h-6 text-sage-600 flex-shrink-0" />
              <div>
                <h3 className="font-medium mb-1">Studio</h3>
                <div className="text-gray-600 space-y-1">
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Giugliano+centro+Meida+Via+Corso+Campano+569/q+1+Piano"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:text-sage-600 transition-colors cursor-pointer"
                  >
                    Giugliano centro Meida Via Corso Campano 569/q 1 Piano
                  </a>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Napoli+Via+Vincenzo+Cuoco+5"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:text-sage-600 transition-colors cursor-pointer"
                  >
                    Napoli Via Vincenzo Cuoco 5
                  </a>
                </div>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Phone className="w-6 h-6 text-sage-600 flex-shrink-0" />
              <div>
                <h3 className="font-medium mb-1">Telefono</h3>
                <a
                  href="tel:3663196143"
                  className="text-gray-600 hover:text-sage-600 transition-colors"
                >
                  3663196143
                </a>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Mail className="w-6 h-6 text-sage-600 flex-shrink-0" />
              <div>
                <h3 className="font-medium mb-1">Email</h3>
                <a
                  href="mailto:napolitano.fabiana@libero.it"
                  className="text-gray-600 hover:text-sage-600 transition-colors"
                >
                  napolitano.fabiana@libero.it
                </a>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Clock className="w-6 h-6 text-sage-600 flex-shrink-0" />
              <div>
                <h3 className="font-medium mb-1">Orari</h3>
                <p className="text-gray-600">
                  Lun - Ven: 9:00 - 19:00<br />
                  Sab: 9:00 - 13:00
                </p>
              </div>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
            method="POST"
            action="mailto:napolitano.fabiana@libero.it"
            encType="text/plain"
          >
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Nome e Cognome
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full"
                required
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Messaggio
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="w-full"
                required
              ></textarea>
            </div>

            <button type="submit" className="btn-primary w-full">
              Invia Messaggio
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;