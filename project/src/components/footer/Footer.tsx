import React from 'react';
import { Instagram, MessageCircle } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-sage-800 text-white py-6">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="font-playfair text-lg mb-1">Dott.ssa Fabiana Napolitano</p>
            <p className="text-sage-200 text-sm">Dietista e Nutrizionista</p>
          </div>
          
          <div className="flex items-center space-x-6">
            <a 
              href="https://www.instagram.com/nutrizionista.fabiana/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center hover:text-cream-100 transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5 mr-2" />
              <span>@nutrizionista.fabiana</span>
            </a>
            
            <a 
              href="https://wa.me/+393XXXXXXXXX"  // Replace with actual WhatsApp number
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center hover:text-cream-100 transition-colors"
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-sage-700 text-center text-sage-300 text-sm">
          <p>© {new Date().getFullYear()} Fabiana Napolitano. Tutti i diritti riservati.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;