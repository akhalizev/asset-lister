
  # Media Assets Card Layout (Copy) (Copy)

  This is a code bundle for Media Assets Card Layout (Copy) (Copy). The original project is available at https://www.figma.com/design/jZP9J8xFUnO8ImLzuyT8QU/Media-Assets-Card-Layout--Copy---Copy-.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.
  
  ## Supabase setup
  
  1. Install dependencies (already in `package.json`):
  
  ```bash
  npm i @supabase/supabase-js
  ```
  
  2. Create a `.env` file in the project root with your project settings (from Supabase project settings → API):
  
  ```bash
  VITE_SUPABASE_URL=your-project-url
  VITE_SUPABASE_ANON_KEY=your-anon-key
  ```
  
  3. Create a table named `assets` with columns matching the UI types in `src/types/asset.ts`:
  
  - `id` text primary key (or uuid, but UI expects string)
  - `assetId` text
  - `category` text
  - `caseId` text
  - `cadId` text
  - `description` text
  - `capturedOn` timestamptz
  - `uploaded` timestamptz
  - `assetType` text check in ('image','video','audio','document')
  - `device` text
  - `station` text
  - `userName` text
  - `fileStatus` text check in ('available','expired','recoverable')
  - `retentionSpan` text
  - `assetDuration` text
  - `assetSize` text
  - `thumbnail` text (optional url)
  - `unitId` text (optional, for recording device identification)
  
  Tip: If you use `uuid` for `id`, the app coerces to string automatically.
  
  ### Adding the unitid column (if missing)
  
  If you're getting errors when fetching assets, you may need to add the `unitid` column. 
  Run this SQL in your Supabase SQL Editor:
  
  ```sql
  ALTER TABLE public.assets
  ADD COLUMN IF NOT EXISTS unitid text;
  ```
  
  Or use the migration file: `supabase/migrations/add_unitid_column.sql`
  
  4. Start the app. If env vars are present and the table has rows, the UI will load from Supabase; otherwise it falls back to local mock data.

  ### Thumbnails via Supabase Storage
  
  1. In Supabase → Storage, create a bucket named `thumbnails` and set it to Public (for prototyping).  
     You can switch to RLS later for private access.
  2. Upload images (e.g., `sample1.png`). Note the object path (for example: `sample1.png` or `folder/sample2.jpg`).
  3. In the `assets` table, set the `thumbnail` column to the storage object path (not URL). Example: `sample1.png`.
  4. The app will automatically convert that path to a public URL using `getPublicThumbnailUrl`.

  Notes:
  - If you already have a full `http(s)` URL in `thumbnail`, the app will use it as-is.
  - Bucket name defaults to `thumbnails`. If you need a different bucket, we can parameterize it.

  ## RLS Policy Fix

  If you're seeing a performance warning about duplicate RLS policies for the `assets` table, you can fix it by running the migration in `supabase/migrations/fix_duplicate_rls_policies.sql`.

  To apply the migration:
  1. Open your Supabase dashboard → SQL Editor
  2. Copy and paste the contents of `supabase/migrations/fix_duplicate_rls_policies.sql`
  3. Run the SQL script

  This will consolidate the duplicate SELECT policies into a single optimized policy.
  