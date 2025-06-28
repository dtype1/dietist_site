export interface Review {
  id: number;
  created_at: string;
  name: string;
  content: string;
  rating: number;
  image_url?: string | null;
}