import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Upload } from 'lucide-react';
import toast from 'react-hot-toast';
import { addReview, uploadImage } from '../../services/reviewsService';

interface ReviewFormProps {
  onReviewAdded: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ onReviewAdded }) => {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('L\'immagine deve essere inferiore a 5MB');
        return;
      }
      setSelectedFile(file);
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !content.trim()) {
      toast.error('Per favore compila tutti i campi');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      let imageUrl = null;
      if (selectedFile) {
        imageUrl = await uploadImage(selectedFile);
        if (!imageUrl) {
          toast.error('Errore durante il caricamento dell\'immagine');
          return;
        }
      }

      const result = await addReview({
        name,
        content,
        rating,
        image_url: imageUrl
      });
      
      if (result) {
        toast.success('Recensione aggiunta con successo');
        setName('');
        setContent('');
        setRating(5);
        setSelectedFile(null);
        setPreviewUrl(null);
        onReviewAdded();
      } else {
        toast.error('Errore durante l\'aggiunta della recensione');
      }
    } catch (error) {
      toast.error('Si è verificato un errore');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-6 rounded-lg shadow-sm border border-sage-100"
    >
      <h3 className="text-xl font-playfair font-medium mb-4 text-sage-800">Lascia una recensione</h3>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Nome
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2"
            placeholder="Il tuo nome"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Valutazione
          </label>
          <div className="flex">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                className={`w-6 h-6 cursor-pointer ${
                  (hoverRating || rating) > index
                    ? 'text-amber-400 fill-amber-400'
                    : 'text-gray-300'
                }`}
                onClick={() => setRating(index + 1)}
                onMouseEnter={() => setHoverRating(index + 1)}
                onMouseLeave={() => setHoverRating(0)}
              />
            ))}
          </div>
        </div>
        
        <div className="mb-4">
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
            Recensione
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2"
            rows={4}
            placeholder="Racconta la tua esperienza..."
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Aggiungi un'immagine (opzionale)
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-sage-500 transition-colors">
            <div className="space-y-1 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <label htmlFor="image" className="relative cursor-pointer rounded-md font-medium text-sage-600 hover:text-sage-500">
                  <span>Carica un file</span>
                  <input
                    id="image"
                    name="image"
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={handleFileChange}
                  />
                </label>
                <p className="pl-1">o trascina qui</p>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, GIF fino a 5MB</p>
            </div>
          </div>
          {previewUrl && (
            <div className="mt-2">
              <img
                src={previewUrl}
                alt="Preview"
                className="h-32 w-auto object-cover rounded-md"
              />
            </div>
          )}
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className={`btn-primary w-full ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {isSubmitting ? 'Invio in corso...' : 'Invia Recensione'}
        </button>
      </form>
    </motion.div>
  );
};

export default ReviewForm;