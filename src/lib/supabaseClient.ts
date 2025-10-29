import { createClient } from '@supabase/supabase-js';

// Use a safe cast to avoid lint/type issues in environments without Vite types configured
const env = (import.meta as any).env ?? {};
const supabaseUrl = env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl as string, supabaseAnonKey as string)
  : (null as unknown as ReturnType<typeof createClient>);

if (!isSupabaseConfigured) {
  // Helps during local debugging if env vars are missing or not picked up by Vite
  console.warn('[Supabase] Not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env');
}


