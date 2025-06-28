/*
  # Add image_url to reviews table

  1. Changes
    - Add `image_url` column to `reviews` table
      - Type: text
      - Nullable: true
      - Description: Stores the URL of the uploaded image
*/

DO $$ 
BEGIN 
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'reviews' AND column_name = 'image_url'
  ) THEN 
    ALTER TABLE reviews ADD COLUMN image_url text;
  END IF;
END $$;