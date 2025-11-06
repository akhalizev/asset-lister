-- Add unitid column to assets table
-- This column stores the Unit ID for recording devices (police body worn cameras, in-car cameras, etc.)

ALTER TABLE public.assets
ADD COLUMN IF NOT EXISTS unitid text;

-- Add a comment to document the column
COMMENT ON COLUMN public.assets.unitid IS 'Unit ID identifying the recording device (e.g., BWC-001, CAR-S02-567, CCTV-S03-127)';

