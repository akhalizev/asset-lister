import { supabase, isSupabaseConfigured } from './supabaseClient';

const DEFAULT_BUCKET = 'thumbnails';

/**
 * Extract filename from a path (handles local paths like /src/assets/file.png)
 */
function extractFilename(path: string): string {
  if (!path) return path;
  // Handle both forward and backslash paths, and URLs
  const parts = path.split(/[/\\]/);
  return parts[parts.length - 1];
}

export function getPublicThumbnailUrl(pathOrUrl?: string | null, bucket: string = DEFAULT_BUCKET): string | undefined {
  if (!pathOrUrl) return undefined;
  
  // Already a full URL - return as-is
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  
  if (!isSupabaseConfigured) return undefined;
  
  // Extract just the filename if it's a local path (e.g., /src/assets/file.png -> file.png)
  const storagePath = extractFilename(pathOrUrl);
  
  const { data } = supabase.storage.from(bucket).getPublicUrl(storagePath);
  return data?.publicUrl ?? undefined;
}


