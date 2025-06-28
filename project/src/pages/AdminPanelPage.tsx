import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Upload, Trash2, LogOut, Plus, Image as ImageIcon } from 'lucide-react';
import { supabase } from '../config/supabase';
import { RecipePhoto } from '../models/RecipePhoto';
import { getRecipePhotos, addRecipePhoto, deleteRecipePhoto, uploadRecipeImage } from '../services/recipePhotosService';
import toast from 'react-hot-toast';

const AdminPanelPage: React.FC = () => {
  const [photos, setPhotos] = useState<RecipePhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
    fetchPhotos();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate('/admin-login');
      return;
    }
  };

  const fetchPhotos = async () => {
    setLoading(true);
    const data = await getRecipePhotos();
    setPhotos(data);
    setLoading(false);
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast.success('Logout effettuato con successo');
      navigate('/home');
    } catch (error) {
      toast.error('Errore durante il logout');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error('L\'immagine deve essere inferiore a 10MB');
        return;
      }
      setSelectedFile(file);
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedFile) {
      toast.error('Seleziona un\'immagine');
      return;
    }

    setUploading(true);

    try {
      const imageUrl = await uploadRecipeImage(selectedFile);
      if (!imageUrl) {
        toast.error('Errore durante il caricamento dell\'immagine');
        return;
      }

      const result = await addRecipePhoto(title || null, imageUrl);
      if (result) {
        toast.success('Foto ricetta aggiunta con successo!');
        setTitle('');
        setSelectedFile(null);
        setPreviewUrl(null);
        fetchPhotos();
      } else {
        toast.error('Errore durante l\'aggiunta della foto');
      }
    } catch (error) {
      toast.error('Si è verificato un errore');
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Sei sicuro di voler eliminare questa foto?')) {
      return;
    }

    try {
      const success = await deleteRecipePhoto(id);
      if (success) {
        toast.success('Foto eliminata con successo');
        fetchPhotos();
      } else {
        toast.error('Errore durante l\'eliminazione');
      }
    } catch (error) {
      toast.error('Si è verificato un errore');
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-cream-100">
      <div className="container py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-center mb-8"
        >
          <div>
            <h1 className="text-3xl font-playfair font-medium text-sage-800 mb-2">
              Pannello Admin
            </h1>
            <p className="text-gray-600">Gestisci le foto ricette</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </button>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white p-6 rounded-lg shadow-sm"
          >
            <h2 className="text-xl font-playfair font-medium mb-6 text-sage-800 flex items-center">
              <Plus className="w-5 h-5 mr-2" />
              Aggiungi Nuova Foto
            </h2>

            <form onSubmit={handleUpload} className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Titolo (opzionale)
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                  placeholder="Es: Insalata di quinoa e verdure"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Immagine
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
                    <p className="text-xs text-gray-500">PNG, JPG, GIF fino a 10MB</p>
                  </div>
                </div>

                {previewUrl && (
                  <div className="mt-4">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="h-48 w-full object-cover rounded-md"
                    />
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={uploading || !selectedFile}
                className={`w-full py-3 px-4 rounded-md font-medium transition-all duration-200 ${
                  uploading || !selectedFile
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-sage-600 hover:bg-sage-700 hover:scale-105'
                } text-white shadow-lg`}
              >
                {uploading ? 'Caricamento in corso...' : 'Aggiungi Foto'}
              </button>
            </form>
          </motion.div>

          {/* Photos List */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white p-6 rounded-lg shadow-sm"
          >
            <h2 className="text-xl font-playfair font-medium mb-6 text-sage-800 flex items-center">
              <ImageIcon className="w-5 h-5 mr-2" />
              Foto Caricate ({photos.length})
            </h2>

            {loading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="animate-pulse flex space-x-4">
                    <div className="h-20 w-20 bg-gray-200 rounded"></div>
                    <div className="flex-1 space-y-2 py-1">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : photos.length === 0 ? (
              <div className="text-center py-8">
                <ImageIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-500">Nessuna foto caricata</p>
              </div>
            ) : (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {photos.map((photo, index) => (
                  <motion.div
                    key={photo.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-4 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <img
                      src={photo.image_url}
                      alt={photo.title || `Ricetta ${photo.id}`}
                      className="h-16 w-16 object-cover rounded-md"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {photo.title || 'Senza titolo'}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(photo.created_at).toLocaleDateString('it-IT')}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDelete(photo.id)}
                      className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors"
                      title="Elimina foto"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanelPage;