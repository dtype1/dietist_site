import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { Review } from '../../models/Review';
import { formatDate } from '../../utils/dateUtils';

interface ReviewsListProps {
  reviews: Review[];
}

const ReviewsList: React.FC<ReviewsListProps> = ({ reviews }) => {
  if (reviews.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">Nessuna recensione disponibile. Sii il primo a lasciare una recensione!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 py-4">
      {reviews.map((review, index) => (
        <motion.div
          key={review.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          className="bg-white p-6 rounded-lg shadow-sm border border-sage-100"
        >
          <div className="flex justify-between items-start mb-3">
            <h3 className="font-medium text-lg text-sage-800">{review.name}</h3>
            <span className="text-sm text-gray-500">{formatDate(review.created_at)}</span>
          </div>
          
          <div className="flex items-center mb-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < review.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300'
                }`}
              />
            ))}
          </div>

          {review.image_url && (
            <div className="mb-4">
              <img
                src={review.image_url}
                alt={`Immagine recensione di ${review.name}`}
                className="rounded-lg w-full max-w-md object-cover"
              />
            </div>
          )}
          
          <p className="text-gray-700">{review.content}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default ReviewsList;