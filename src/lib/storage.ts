import { supabase, isSupabaseConfigured } from './supabaseClient';

const DEFAULT_BUCKET = 'thumbnails';

export function getPublicThumbnailUrl(pathOrUrl?: string | null, bucket: string = DEFAULT_BUCKET): string | undefined {
  if (!pathOrUrl) return undefined;
  // Already a full URL
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  if (!isSupabaseConfigured) return undefined;
  const { data } = supabase.storage.from(bucket).getPublicUrl(pathOrUrl);
  return data?.publicUrl ?? undefined;
}


