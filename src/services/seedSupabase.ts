import { Asset } from '../types/asset';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';
import { generateMockAssets } from '../data/mockAssets';

const TABLE_NAME = 'assets';
const BATCH_SIZE = 500; // Supabase has limits on batch size

/**
 * Convert Asset object to Supabase row format (lowercase column names)
 * If useAutoId is true, omits the id field to let Supabase auto-generate it
 */
function assetToSupabaseRow(asset: Asset, useAutoId: boolean = false): any {
  const row: any = {
    assetid: asset.assetId,
    category: asset.category,
    caseid: asset.caseId,
    cadid: asset.cadId,
    description: asset.description,
    capturedon: asset.capturedOn,
    uploaded: asset.uploaded,
    assettype: asset.assetType,
    device: asset.device,
    station: asset.station,
    username: asset.userName,
    filestatus: asset.fileStatus,
    retentionspan: asset.retentionSpan,
    assetduration: asset.assetDuration,
    assetsize: asset.assetSize,
    thumbnail: asset.thumbnail || null,
  };

  // Only include id if not using auto-generated IDs
  if (!useAutoId) {
    row.id = asset.id;
  }

  return row;
}

/**
 * Insert a batch of assets into Supabase
 */
async function insertBatch(assets: Asset[], useAutoId: boolean = false): Promise<{ success: number; errors: number }> {
  if (!isSupabaseConfigured) {
    throw new Error('Supabase is not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY');
  }

  const rows = assets.map(asset => assetToSupabaseRow(asset, useAutoId));
  
  // Log first row for debugging
  if (rows.length > 0) {
    console.log('[Seed] Sample row being inserted:', {
      keys: Object.keys(rows[0]),
      sampleValues: Object.fromEntries(
        Object.entries(rows[0]).slice(0, 5).map(([k, v]) => [k, typeof v === 'string' && v.length > 50 ? v.substring(0, 50) + '...' : v])
      )
    });
  }
  
  // Use upsert to avoid conflicts on repeated seeds (on primary key id)
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .upsert(rows, { onConflict: 'id' });

  if (error) {
    console.error('[Seed] Batch insert error details:', {
      message: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code,
      fullError: error
    });
    throw new Error(`Insert failed: ${error.message}${error.details ? ` - ${error.details}` : ''}${error.hint ? ` (Hint: ${error.hint})` : ''}`);
  }

  return { success: rows.length, errors: 0 };
}

/**
 * Insert assets into Supabase in batches with progress reporting
 */
export async function seedSupabaseAssets(
  count: number = 5000,
  onProgress?: (current: number, total: number) => void,
  useAutoId: boolean = false
): Promise<{ total: number; successful: number; failed: number }> {
  if (!isSupabaseConfigured) {
    throw new Error('Supabase is not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY');
  }

  console.log(`[Seed] Generating ${count} assets...`);
  let assets = generateMockAssets(count);

  // Prefix ids for this run to ensure uniqueness across multiple seeds
  // Only prefix if we are providing ids (not using auto-generated ids)
  if (!useAutoId) {
    const seedPrefix = `seed_${Date.now()}`;
    assets = assets.map((a) => ({
      ...a,
      id: `${seedPrefix}_${a.id}`,
    }));
  }

  console.log(`[Seed] Starting batch insertion into Supabase...`);
  let successful = 0;
  let failed = 0;

  for (let i = 0; i < assets.length; i += BATCH_SIZE) {
    const batch = assets.slice(i, i + BATCH_SIZE);
    const batchNumber = Math.floor(i / BATCH_SIZE) + 1;
    const totalBatches = Math.ceil(assets.length / BATCH_SIZE);

    try {
      await insertBatch(batch, useAutoId);
      successful += batch.length;
      console.log(`[Seed] Batch ${batchNumber}/${totalBatches} inserted (${batch.length} assets)`);
      
      if (onProgress) {
        onProgress(successful, assets.length);
      }

      // Small delay between batches to avoid rate limiting
      if (i + BATCH_SIZE < assets.length) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    } catch (error: any) {
      failed += batch.length;
      const errorMessage = error?.message || String(error);
      console.error(`[Seed] Failed to insert batch ${batchNumber}/${totalBatches}:`, errorMessage);
      console.error('[Seed] Full error object:', error);
      // Continue with next batch even if one fails
    }
  }

  const result = {
    total: assets.length,
    successful,
    failed,
  };

  console.log(`[Seed] Complete! Success: ${successful}, Failed: ${failed}`);
  return result;
}

/**
 * Clear all assets from the table (useful for testing)
 */
export async function clearSupabaseAssets(): Promise<void> {
  if (!isSupabaseConfigured) {
    throw new Error('Supabase is not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY');
  }

  // Delete all rows where id is not null (works for text and uuid id types)
  const { error } = await supabase
    .from(TABLE_NAME)
    .delete()
    .not('id', 'is', null);

  if (error) {
    console.error('Clear error:', error);
    throw error;
  }

  console.log('[Seed] All assets cleared from Supabase');
}

/**
 * Get current asset count from Supabase
 */
export async function getSupabaseAssetCount(): Promise<number> {
  if (!isSupabaseConfigured) {
    return 0;
  }

  const { count, error } = await supabase
    .from(TABLE_NAME)
    .select('*', { count: 'exact', head: true });

  if (error) {
    console.error('Count error:', error);
    return 0;
  }

  return count || 0;
}

/**
 * Test inserting a single asset to verify schema compatibility
 */
export async function testInsertSingleAsset(useAutoId: boolean = false): Promise<{ success: boolean; error?: string; data?: any }> {
  if (!isSupabaseConfigured) {
    return { success: false, error: 'Supabase is not configured' };
  }

  const testAsset = generateMockAssets(1)[0];
  const row = assetToSupabaseRow(testAsset, useAutoId);

  console.log('[Seed] Testing single insert with row:', row);
  console.log('[Seed] Row keys:', Object.keys(row));
  
  const { data, error } = await supabase.from(TABLE_NAME).insert(row).select();

  if (error) {
    console.error('[Seed] Test insert error:', {
      message: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code,
    });
    return { 
      success: false, 
      error: `${error.message}${error.details ? ` - ${error.details}` : ''}${error.hint ? ` (Hint: ${error.hint})` : ''}` 
    };
  }

  return { success: true, data };
}

