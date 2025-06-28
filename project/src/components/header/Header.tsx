import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import { Menu, X, LogIn, LogOut } from 'lucide-react';
import { supabase } from '../../config/supabase';
import { User } from '@supabase/supabase-js';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Get initial session
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };
    getSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const navItems = [
    { label: 'Chi Sono', to: 'about' },
    { label: 'Servizi', to: 'services' },
    { label: 'Recensioni', to: 'reviews' },
    { label: 'Contatti', to: 'contact' }
  ];

  return (
    <>
      <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'}`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center text-xl font-playfair text-sage-800 hover:text-sage-600 transition-colors">
              <img 
                src="/fabiana-logo.jpg" 
                alt="Logo Dott.ssa Fabiana Napolitano" 
                className="w-10 h-10 mr-3 object-contain rounded-full shadow-sm"
              />
              <span>Dott.ssa Fabiana Napolitano</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <ScrollLink
                  key={item.to}
                  to={item.to}
                  spy={true}
                  smooth={true}
                  offset={-80}
                  duration={500}
                  className="text-sage-800 hover:text-sage-600 cursor-pointer font-medium transition-colors"
                >
                  {item.label}
                </ScrollLink>
              ))}
              
              {/* Auth Button */}
              {user ? (
                <div className="flex items-center space-x-4">
                  <Link
                    to="/admin"
                    className="text-sage-600 hover:text-sage-800 font-medium transition-colors"
                  >
                    Admin
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center text-sage-600 hover:text-sage-800 transition-colors"
                    title="Logout"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <Link
                  to="/admin-login"
                  className="flex items-center text-sage-600 hover:text-sage-800 font-medium transition-colors"
                  title="Login Admin"
                >
                  <LogIn className="w-4 h-4 mr-1" />
                  Login
                </Link>
              )}
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-sage-800 z-60 relative"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          {/* Menu Content */}
          <nav className="absolute top-20 left-0 right-0 bottom-0 bg-white shadow-xl overflow-y-auto">
            <div className="px-6 py-8 space-y-6">
              {navItems.map((item, index) => (
                <ScrollLink
                  key={item.to}
                  to={item.to}
                  spy={true}
                  smooth={true}
                  offset={-80}
                  duration={500}
                  className="block py-3 text-lg font-medium text-sage-800 hover:text-sage-600 cursor-pointer transition-colors border-b border-sage-100 last:border-b-0"
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: 'slideInFromRight 0.3s ease-out forwards'
                  }}
                >
                  {item.label}
                </ScrollLink>
              ))}
              
              {/* Mobile Auth Section */}
              <div className="pt-6 border-t border-sage-200">
                {user ? (
                  <div className="space-y-4">
                    <Link
                      to="/admin"
                      className="block py-3 text-lg font-medium text-sage-600 hover:text-sage-800 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Admin Panel
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="block py-3 text-lg font-medium text-sage-600 hover:text-sage-800 transition-colors w-full text-left"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/admin-login"
                    className="block py-3 text-lg font-medium text-sage-600 hover:text-sage-800 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login Admin
                  </Link>
                )}
              </div>
            </div>
          </nav>
        </div>
      )}

      {/* Add custom styles for mobile menu animation */}
      <style jsx>{`
        @keyframes slideInFromRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
};

export default Header;