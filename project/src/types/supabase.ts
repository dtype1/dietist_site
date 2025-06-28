export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      reviews: {
        Row: {
          id: number
          created_at: string
          name: string
          content: string
          rating: number
          image_url?: string | null
        }
        Insert: {
          id?: number
          created_at?: string
          name: string
          content: string
          rating: number
          image_url?: string | null
        }
        Update: {
          id?: number
          created_at?: string
          name?: string
          content?: string
          rating?: number
          image_url?: string | null
        }
      }
      recipe_photos: {
        Row: {
          id: number
          created_at: string
          title?: string | null
          image_url: string
          display_order: number
        }
        Insert: {
          id?: number
          created_at?: string
          title?: string | null
          image_url: string
          display_order?: number
        }
        Update: {
          id?: number
          created_at?: string
          title?: string | null
          image_url?: string
          display_order?: number
        }
      }
    }
  }
}