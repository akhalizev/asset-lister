import { Asset } from '../types/asset';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';
import { getPublicThumbnailUrl } from '../lib/storage';

const TABLE_NAME = 'assets';

export async function fetchAssetsFromSupabase(): Promise<Asset[]> {
  if (!isSupabaseConfigured) return [];

  // Note: Postgres downcases unquoted identifiers; our SQL created columns
  // like assetid, capturedon, etc. Select using lowercase names and map.
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select(
      [
        'id',
        'assetid',
        'category',
        'caseid',
        'cadid',
        'description',
        'capturedon',
        'uploaded',
        'assettype',
        'device',
        'station',
        'username',
        'filestatus',
        'retentionspan',
        'assetduration',
        'assetsize',
        'thumbnail',
      ].join(',')
    );

  if (error) {
    // In production you might route this to your logger/telemetry
    console.error('Supabase fetch error:', error);
    return [];
  }

  // Ensure types are strings where our UI expects strings
  return (data ?? []).map((row: any) => ({
    id: String(row.id),
    assetId: row.assetid ?? '',
    category: row.category ?? '',
    caseId: row.caseid ?? '',
    cadId: row.cadid ?? '',
    description: row.description ?? '',
    capturedOn: typeof row.capturedon === 'string' ? row.capturedon : new Date(row.capturedon).toISOString(),
    uploaded: typeof row.uploaded === 'string' ? row.uploaded : new Date(row.uploaded).toISOString(),
    assetType: row.assettype,
    device: row.device ?? '',
    station: row.station ?? '',
    userName: row.username ?? '',
    fileStatus: row.filestatus,
    retentionSpan: row.retentionspan ?? '',
    assetDuration: row.assetduration ?? '',
    assetSize: row.assetsize ?? '',
    thumbnail: getPublicThumbnailUrl(row.thumbnail) ?? undefined,
  }));
}


