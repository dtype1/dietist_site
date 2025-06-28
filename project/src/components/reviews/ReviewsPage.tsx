import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Review } from '../../models/Review';
import { getReviews, subscribeToReviews } from '../../services/reviewsService';
import ReviewsList from './ReviewsList';
import ReviewForm from './ReviewForm';
import { setupSupabase } from '../../config/supabase';

const ReviewsPage: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [supabaseConnected, setSupabaseConnected] = useState(true);

  const fetchReviews = async () => {
    setLoading(true);
    const data = await getReviews();
    setReviews(data);
    setLoading(false);
  };

  useEffect(() => {
    const initializeSupabase = async () => {
      const connected = await setupSupabase();
      setSupabaseConnected(connected);
      
      if (connected) {
        fetchReviews();
        
        // Set up real-time subscription
        const unsubscribe = subscribeToReviews(setReviews);
        
        return () => {
          unsubscribe();
        };
      } else {
        setLoading(false);
      }
    };
    
    initializeSupabase();
  }, []);

  return (
    <div className="min-h-screen bg-cream-100">
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

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-center mb-12 text-sage-800"
        >
          Dott.ssa Fabiana Napolitano
        </motion.h1>

        {!supabaseConnected ? (
          <div className="bg-amber-50 border border-amber-200 rounded-md p-4 mb-8 text-amber-800">
            <p>La connessione a Supabase non è configurata. Per abilitare le recensioni, è necessario collegare Supabase al progetto.</p>
          </div>
        ) : loading ? (
          <div className="flex justify-center py-10">
            <div className="animate-pulse flex space-x-4">
              <div className="h-12 w-12 bg-sage-200 rounded-full"></div>
              <div className="space-y-2 flex-1 max-w-md">
                <div className="h-4 bg-sage-200 rounded"></div>
                <div className="h-4 bg-sage-200 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-2xl font-playfair mb-6 text-sage-800"
              >
                Cosa dicono i clienti
              </motion.h2>
              <ReviewsList reviews={reviews} />
            </div>
            
            <div className="md:sticky md:top-8 self-start">
              <ReviewForm onReviewAdded={fetchReviews} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewsPage;