import { supabase } from '../config/supabase';
import { RecipePhoto } from '../models/RecipePhoto';

export const getRecipePhotos = async (): Promise<RecipePhoto[]> => {
  try {
    const { data, error } = await supabase
      .from('recipe_photos')
      .select('*')
      .order('display_order', { ascending: true })
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    
    return data || [];
  } catch (error) {
    console.error('Error fetching recipe photos:', error);
    return [];
  }
};

export const addRecipePhoto = async (
  title: string | null, 
  imageUrl: string, 
  displayOrder: number = 0
): Promise<RecipePhoto | null> => {
  try {
    const { data, error } = await supabase
      .from('recipe_photos')
      .insert([{
        title,
        image_url: imageUrl,
        display_order: displayOrder
      }])
      .select()
      .single();
    
    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error('Error adding recipe photo:', error);
    return null;
  }
};

export const deleteRecipePhoto = async (id: number): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('recipe_photos')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    
    return true;
  } catch (error) {
    console.error('Error deleting recipe photo:', error);
    return false;
  }
};

export const uploadRecipeImage = async (file: File): Promise<string | null> => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `recipe-photos/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('recipe-photos')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from('recipe-photos')
      .getPublicUrl(filePath);

    return data.publicUrl;
  } catch (error) {
    console.error('Error uploading recipe image:', error);
    return null;
  }
};

export const subscribeToRecipePhotos = (callback: (photos: RecipePhoto[]) => void) => {
  const subscription = supabase
    .channel('public:recipe_photos')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'recipe_photos' }, () => {
      getRecipePhotos().then(callback);
    })
    .subscribe();
  
  return () => {
    supabase.removeChannel(subscription);
  };
};