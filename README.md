
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
  
  Tip: If you use `uuid` for `id`, the app coerces to string automatically.
  
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
  