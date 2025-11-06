import { Asset } from '../types/asset';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';
import { getPublicThumbnailUrl } from '../lib/storage';

const TABLE_NAME = 'assets';

export async function fetchAssetsFromSupabase(): Promise<Asset[]> {
  if (!isSupabaseConfigured) return [];

  // Note: Postgres downcases unquoted identifiers; our SQL created columns
  // like assetid, capturedon, etc. Select using lowercase names and map.
  // Supabase has a default limit of 1000 rows, so we need to fetch all records
  // using pagination to handle any number of records.
  const BATCH_SIZE = 1000;
  const allData: any[] = [];
  let from = 0;
  let hasMore = true;
  let unitIdColumnExists = true; // Track if unitid column exists

  while (hasMore) {
    // Build select columns - conditionally include unitid
    const selectColumns = [
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
    ];
    
    // Only include unitid if we haven't discovered it doesn't exist yet
    if (unitIdColumnExists) {
      selectColumns.push('unitid');
    }

    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select(selectColumns.join(','))
      .range(from, from + BATCH_SIZE - 1);

    if (error) {
      // Check if error is about missing unitid column
      if (error.code === '42703' && error.message?.includes('unitid')) {
        console.warn('[Supabase] unitid column does not exist. Fetching without it. To add it, run: ALTER TABLE public.assets ADD COLUMN IF NOT EXISTS unitid text;');
        unitIdColumnExists = false;
        // Retry this batch without unitid
        continue;
      }
      
      // For other errors, log and return empty
      console.error('Supabase fetch error:', error);
      return [];
    }

    if (data && data.length > 0) {
      allData.push(...data);
      from += BATCH_SIZE;
      hasMore = data.length === BATCH_SIZE; // Continue if we got a full batch
    } else {
      hasMore = false;
    }
  }

  // If we had to remove unitid, log a helpful message
  if (!unitIdColumnExists && allData.length > 0) {
    console.info('[Supabase] Assets fetched successfully without unitid column. To enable Unit IDs, add the column: ALTER TABLE public.assets ADD COLUMN IF NOT EXISTS unitid text;');
  }

  // Ensure types are strings where our UI expects strings
  return allData.map((row: any) => ({
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
    unitId: row.unitid ?? undefined,
  }));
}


