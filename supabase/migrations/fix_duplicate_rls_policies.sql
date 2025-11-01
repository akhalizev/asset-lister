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

