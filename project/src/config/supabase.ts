import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/supabase';

// These would typically be in environment variables
// For the sake of this example, we're hardcoding them
// In a real production app, you should use proper environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

export const setupSupabase = async () => {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase credentials not found. Please connect to Supabase to enable reviews functionality.');
    return false;
  }
  
  return true;
};