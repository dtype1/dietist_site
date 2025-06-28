import React from 'react';
import { motion } from 'framer-motion';
import { Star, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Review } from '../../../models/Review';
import { useEffect, useState } from 'react';
import { getReviews } from '../../../services/reviewsService';

const ReviewsPreviewSection = () => {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const latestReviews = await getReviews();
      setReviews(latestReviews.slice(0, 3)); // Get only the first 3 reviews
    };
    fetchReviews();
  }, []);

  return (
    <section id="reviews" className="section bg-cream-50">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-medium mb-4">
            Cosa dicono i miei pazienti
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Scopri le esperienze di chi ha già intrapreso il percorso verso una vita più sana
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white p-6 rounded-lg shadow-sm"
            >
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < review.rating
                        ? 'text-amber-400 fill-amber-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <p className="text-gray-700 mb-4 line-clamp-4">{review.content}</p>
              <p className="font-medium text-sage-800">{review.name}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <Link
            to="/reviews"
            className="inline-flex items-center text-sage-600 hover:text-sage-800 font-medium"
          >
            Leggi tutte le recensioni
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ReviewsPreviewSection;