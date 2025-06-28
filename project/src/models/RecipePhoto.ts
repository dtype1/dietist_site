export interface RecipePhoto {
  id: number;
  created_at: string;
  title?: string | null;
  image_url: string;
  display_order: number;
}