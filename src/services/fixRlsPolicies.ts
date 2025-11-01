/**
 * Utility to fix duplicate RLS policies on the assets table
 * This consolidates multiple permissive SELECT policies into a single policy
 * for better performance.
 * 
 * Run this once via Supabase SQL Editor or use it programmatically.
 */

import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';

/**
 * Fix duplicate RLS policies by dropping existing ones and creating a single consolidated policy
 * This function executes SQL directly to fix the RLS policy issue.
 * 
 * Note: This requires service_role access or must be run manually in Supabase SQL Editor
 * 
 * @returns Promise with success status and any errors
 */
export async function fixDuplicateRlsPolicies(): Promise<{ 
  success: boolean; 
  error?: string;
  message?: string;
}> {
  if (!isSupabaseConfigured) {
    return {
      success: false,
      error: 'Supabase is not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY'
    };
  }

  // Note: The Supabase JS client with anon key cannot execute DROP POLICY commands
  // This is a reference implementation. You should run the SQL migration directly
  // in Supabase SQL Editor or use the Supabase Management API with service_role key.
  
  const migrationSQL = `
    -- Drop the existing duplicate policies
    DROP POLICY IF EXISTS "Public read assets" ON public.assets;
    DROP POLICY IF EXISTS "anon can select assets" ON public.assets;

    -- Create a single consolidated policy for anonymous read access
    CREATE POLICY "anon_select_assets"
    ON public.assets
    FOR SELECT
    TO anon
    USING (true);
  `;

  // Attempt to execute via RPC (if you have a function set up) or direct SQL
  // For now, return instructions
  return {
    success: false,
    message: 'This migration must be run in Supabase SQL Editor. See supabase/migrations/fix_duplicate_rls_policies.sql',
    error: 'Direct policy manipulation requires service_role key. Please run the SQL migration manually in Supabase dashboard.'
  };
}

/**
 * Get the migration SQL as a string for manual execution
 */
export function getRlsFixMigrationSQL(): string {
  return `
-- Fix duplicate RLS policies for public.assets table
-- This migration consolidates two permissive SELECT policies for the anon role
-- into a single policy for better performance.

-- Drop the existing duplicate policies
DROP POLICY IF EXISTS "Public read assets" ON public.assets;
DROP POLICY IF EXISTS "anon can select assets" ON public.assets;

-- Create a single consolidated policy for anonymous read access
-- This allows the anon role to SELECT all rows from the assets table
CREATE POLICY "anon_select_assets"
ON public.assets
FOR SELECT
TO anon
USING (true);
`.trim();
}

