import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';

const TABLE_NAME = 'assets';
const BATCH_SIZE = 100; // Update in smaller batches for better performance
const DEFAULT_BUCKET = 'thumbnails';

/**
 * List of thumbnail file names available in Supabase Storage
 * Update this list with your actual thumbnail file names in the 'thumbnails' bucket
 */
const THUMBNAIL_FILES = [
  'f7bdc7c3675a201b22e82f4db7988551fa4bd8e9.png',
  '332b24b3de4e262662ba06ac0d355e3b046308be.png',
  '410091be46419428c5e5c59d9da30f70a565cea7.png',
  '4becfd878069c4df0ebfec7ffb57749b20f5c55f.png',
  '69e64033d53d8fe3afeedc6660ce8adb3bb1b10a.png',
  '747a27fe416ebfaf57b25beae190a98036e77d0e.png',
  '9fcda7faf487ffa9a989ea8f44315905f0ff23fa.png',
  'd032069d0e81c306f7036f6e92d6554c3a1b6eaa.png',
  'd77ed8d07dbad509bd7ab5e286c6e31590bb0f69.png',
  'f3364c7b257c0b3cc919414fdcfa749e50bbdc2f.png',
  'f7eaa289a8ed2120f1d1130383a6e1c0725fc497.png',
];

/**
 * Extract filename from a path (handles both storage paths and local paths)
 */
function extractFilename(path: string): string {
  if (!path) return '';
  // Handle both forward and backslash paths, and URLs
  const parts = path.split(/[/\\]/);
  return parts[parts.length - 1];
}

/**
 * Get a thumbnail path for an asset based on its ID (for consistent assignment)
 */
function getThumbnailForAsset(assetId: string): string {
  // Use assetId to determine which thumbnail (for consistency)
  const hash = assetId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return THUMBNAIL_FILES[hash % THUMBNAIL_FILES.length];
}

/**
 * Fetch all assets from Supabase that need thumbnails (image or video type, no thumbnail)
 * @param updateAll If true, updates ALL image/video assets regardless of existing thumbnails
 */
async function fetchAssetsNeedingThumbnails(updateAll: boolean = false): Promise<any[]> {
  if (!isSupabaseConfigured) {
    throw new Error('Supabase is not configured');
  }

  const allAssets: any[] = [];
  let from = 0;
  let hasMore = true;
  const BATCH_SIZE_FETCH = 1000;
  let totalFetched = 0;
  let totalWithoutThumbnails = 0;

  while (hasMore) {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select('id, assetid, assettype, thumbnail')
      .in('assettype', ['image', 'video'])
      .range(from, from + BATCH_SIZE_FETCH - 1);

    if (error) {
      console.error('[Update Thumbnails] Fetch error:', error);
      throw error;
    }

    if (data && data.length > 0) {
      totalFetched += data.length;
      
      if (updateAll) {
        // Update all image/video assets
        allAssets.push(...data);
      } else {
        // Filter to only include assets without thumbnails
        const assetsNeedingThumbnails = data.filter((asset: any) => {
          const hasThumbnail = asset.thumbnail && 
                               asset.thumbnail !== null && 
                               asset.thumbnail !== '' &&
                               String(asset.thumbnail).trim() !== '';
          if (!hasThumbnail) totalWithoutThumbnails++;
          return !hasThumbnail;
        });
        allAssets.push(...assetsNeedingThumbnails);
      }
      
      from += BATCH_SIZE_FETCH;
      hasMore = data.length === BATCH_SIZE_FETCH;
    } else {
      hasMore = false;
    }
  }

  console.log(`[Update Thumbnails] Fetched ${totalFetched} image/video assets`);
  if (!updateAll) {
    console.log(`[Update Thumbnails] Found ${totalWithoutThumbnails} assets without thumbnails`);
  }

  return allAssets;
}

/**
 * Update thumbnails for a batch of assets
 */
async function updateThumbnailBatch(
  assets: any[],
  useStoragePaths: boolean = true
): Promise<{ success: number; errors: number }> {
  if (!isSupabaseConfigured) {
    throw new Error('Supabase is not configured');
  }

  let success = 0;
  let errors = 0;

  for (const asset of assets) {
    // Get the correct thumbnail filename for this asset
    const thumbnailPath = getThumbnailForAsset(asset.assetid);
    
    // If useStoragePaths is true, store as just the filename (e.g., "sample.png")
    // If false, store as full URL (requires thumbnails to be uploaded first)
    const thumbnailValue = useStoragePaths ? thumbnailPath : null;

    const { error } = await supabase
      .from(TABLE_NAME)
      .update({ thumbnail: thumbnailValue })
      .eq('id', asset.id);

    if (error) {
      console.error(`[Update Thumbnails] Error updating asset ${asset.assetid}:`, error);
      errors++;
    } else {
      success++;
    }
  }

  return { success, errors };
}

/**
 * Main function to update thumbnails for all image and video assets in Supabase
 * @param useStoragePaths If true, stores thumbnail paths (e.g., "sample.png") that will be resolved by getPublicThumbnailUrl
 *                        If false, stores full URLs (requires uploading thumbnails to Supabase Storage first and generating URLs)
 * @param updateAll If true, updates ALL image/video assets even if they already have thumbnails
 * @param onProgress Optional progress callback
 */
export async function updateAssetThumbnails(
  useStoragePaths: boolean = true,
  updateAll: boolean = false,
  onProgress?: (current: number, total: number) => void
): Promise<{ total: number; updated: number; errors: number }> {
  if (!isSupabaseConfigured) {
    throw new Error('Supabase is not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY');
  }

  console.log('[Update Thumbnails] Fetching assets that need thumbnails...');
  const assets = await fetchAssetsNeedingThumbnails(updateAll);
  
  if (assets.length === 0) {
    console.log('[Update Thumbnails] No assets need thumbnails. All image/video assets already have thumbnails.');
    return { total: 0, updated: 0, errors: 0 };
  }

  console.log(`[Update Thumbnails] Found ${assets.length} assets needing thumbnails`);
  console.log(`[Update Thumbnails] Mode: ${useStoragePaths ? 'Storage paths' : 'Full URLs'}`);
  
  if (useStoragePaths) {
    console.log('[Update Thumbnails] Make sure these thumbnail files exist in your Supabase Storage bucket:', DEFAULT_BUCKET);
    console.log('[Update Thumbnails] Thumbnail files:', THUMBNAIL_FILES);
  }

  let totalUpdated = 0;
  let totalErrors = 0;

  // Update in batches
  for (let i = 0; i < assets.length; i += BATCH_SIZE) {
    const batch = assets.slice(i, i + BATCH_SIZE);
    const batchNumber = Math.floor(i / BATCH_SIZE) + 1;
    const totalBatches = Math.ceil(assets.length / BATCH_SIZE);

    try {
      const result = await updateThumbnailBatch(batch, useStoragePaths);
      totalUpdated += result.success;
      totalErrors += result.errors;
      
      console.log(`[Update Thumbnails] Batch ${batchNumber}/${totalBatches}: ${result.success} updated, ${result.errors} errors`);
      
      if (onProgress) {
        onProgress(totalUpdated + totalErrors, assets.length);
      }

      // Small delay between batches
      if (i + BATCH_SIZE < assets.length) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    } catch (error: any) {
      totalErrors += batch.length;
      console.error(`[Update Thumbnails] Batch ${batchNumber}/${totalBatches} failed:`, error);
    }
  }

  console.log(`[Update Thumbnails] Complete! Updated: ${totalUpdated}, Errors: ${totalErrors}`);
  return {
    total: assets.length,
    updated: totalUpdated,
    errors: totalErrors,
  };
}

/**
 * Upload thumbnail images to Supabase Storage (helper function)
 * Call this first if you want to use storage paths
 */
export async function uploadThumbnailsToStorage(): Promise<{ success: number; errors: number }> {
  if (!isSupabaseConfigured) {
    throw new Error('Supabase is not configured');
  }

  console.log('[Upload Thumbnails] This function requires manual implementation.');
  console.log('[Upload Thumbnails] You need to:');
  console.log('  1. Upload thumbnail images to Supabase Storage bucket:', DEFAULT_BUCKET);
  console.log('  2. Ensure the file names match those in THUMBNAIL_FILES');
  console.log('[Upload Thumbnails] You can do this via Supabase Dashboard or use Supabase Storage API');

  // List all files in storage
  const { data: files, error } = await supabase.storage
    .from(DEFAULT_BUCKET)
    .list('', { limit: 100, offset: 0, sortBy: { column: 'name', order: 'asc' } });

  if (error) {
    console.error('[Upload Thumbnails] Error listing files:', error);
    return { success: 0, errors: 1 };
  }

  const existingFiles = files?.map(f => f.name) || [];
  
  console.log(`[Upload Thumbnails] Found ${existingFiles.length} files in storage bucket '${DEFAULT_BUCKET}':`);
  if (existingFiles.length > 0) {
    console.log('[Upload Thumbnails] Files in storage:', existingFiles);
  } else {
    console.log('[Upload Thumbnails] Storage bucket is empty!');
  }
  
  console.log('[Upload Thumbnails] Looking for these thumbnail files:', THUMBNAIL_FILES);
  
  // Case-insensitive comparison
  const existingFilesLower = existingFiles.map(f => f.toLowerCase());
  const missingFiles = THUMBNAIL_FILES.filter(f => !existingFilesLower.includes(f.toLowerCase()));

  if (missingFiles.length > 0) {
    console.log('[Upload Thumbnails] Missing files in storage:', missingFiles);
    console.log('[Upload Thumbnails] Please upload these files to the', DEFAULT_BUCKET, 'bucket');
  } else {
    console.log('[Upload Thumbnails] ✅ All thumbnail files exist in storage!');
  }

  return { success: existingFiles.length, errors: missingFiles.length };
}

/**
 * Test if a thumbnail file can be accessed from Supabase Storage
 */
export async function testThumbnailAccess(filename: string): Promise<{ success: boolean; url?: string; error?: string }> {
  if (!isSupabaseConfigured) {
    return { success: false, error: 'Supabase not configured' };
  }

  try {
    const { data, error } = supabase.storage.from(DEFAULT_BUCKET).getPublicUrl(filename);
    
    if (error) {
      return { success: false, error: error.message };
    }

    // Try to fetch the URL to verify it's accessible
    const url = data?.publicUrl;
    if (!url) {
      return { success: false, error: 'No URL generated' };
    }

    try {
      const response = await fetch(url, { method: 'HEAD' });
      return { 
        success: response.ok, 
        url,
        error: response.ok ? undefined : `HTTP ${response.status}: ${response.statusText}`
      };
    } catch (fetchError: any) {
      return { success: false, url, error: `Fetch failed: ${fetchError.message}` };
    }
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

/**
 * Debug function to inspect thumbnail values in the database
 * Helps diagnose why thumbnails aren't showing
 */
export async function inspectThumbnailValues(limit: number = 10): Promise<void> {
  if (!isSupabaseConfigured) {
    throw new Error('Supabase is not configured');
  }

  console.log(`[Debug] Fetching ${limit} image/video assets to inspect thumbnail values...`);
  
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('id, assetid, assettype, thumbnail')
    .in('assettype', ['image', 'video'])
    .limit(limit);

  if (error) {
    console.error('[Debug] Error:', error);
    return;
  }

  console.log(`[Debug] Sample thumbnail values:`);
  
  // Test first thumbnail file to verify storage access
  if (data && data.length > 0) {
    const firstThumb = data[0].thumbnail;
    if (firstThumb) {
      const filename = extractFilename(firstThumb);
      console.log(`[Debug] Testing storage access for: ${filename}`);
      const testResult = await testThumbnailAccess(filename);
      console.log(`[Debug] Storage access test:`, testResult);
    }
  }
  
  data?.forEach((asset: any, index: number) => {
    const thumbValue = asset.thumbnail;
    const type = typeof thumbValue;
    const isNull = thumbValue === null;
    const isEmpty = thumbValue === '';
    const isUrl = typeof thumbValue === 'string' && /^https?:\/\//i.test(thumbValue);
    const isPath = typeof thumbValue === 'string' && !isUrl && thumbValue.length > 0;
    const extractedFilename = thumbValue ? extractFilename(thumbValue) : null;
    const isValidStoragePath = extractedFilename && THUMBNAIL_FILES.includes(extractedFilename);
    
    console.log(`  ${index + 1}. ${asset.assetid} (${asset.assettype}):`, {
      value: thumbValue,
      extractedFilename,
      isValidStoragePath,
      type,
      isNull,
      isEmpty,
      isUrl,
      isPath,
      length: thumbValue?.length || 0
    });
  });
}

/**
 * Generate full URLs for thumbnails and update assets
 * Use this if thumbnails are already uploaded to Supabase Storage
 * @param updateAll If true, updates ALL image/video assets even if they already have thumbnails
 */
export async function updateThumbnailsWithUrls(updateAll: boolean = false): Promise<{ total: number; updated: number; errors: number }> {
  if (!isSupabaseConfigured) {
    throw new Error('Supabase is not configured');
  }

  console.log('[Update Thumbnails] Fetching assets that need thumbnails...');
  const assets = await fetchAssetsNeedingThumbnails(updateAll);
  
  if (assets.length === 0) {
    console.log('[Update Thumbnails] No assets need thumbnails.');
    return { total: 0, updated: 0, errors: 0 };
  }

  console.log(`[Update Thumbnails] Found ${assets.length} assets needing thumbnails`);
  console.log('[Update Thumbnails] Generating full URLs from storage paths...');

  let totalUpdated = 0;
  let totalErrors = 0;

  for (const asset of assets) {
    const thumbnailPath = getThumbnailForAsset(asset.assetid);
    
    // Generate public URL from storage path
    const { data } = supabase.storage.from(DEFAULT_BUCKET).getPublicUrl(thumbnailPath);
    const thumbnailUrl = data?.publicUrl;

    if (!thumbnailUrl) {
      console.error(`[Update Thumbnails] Could not generate URL for ${thumbnailPath}`);
      totalErrors++;
      continue;
    }

    const { error } = await supabase
      .from(TABLE_NAME)
      .update({ thumbnail: thumbnailUrl })
      .eq('id', asset.id);

    if (error) {
      console.error(`[Update Thumbnails] Error updating asset ${asset.assetid}:`, error);
      totalErrors++;
    } else {
      totalUpdated++;
    }

    if (totalUpdated % 50 === 0) {
      console.log(`[Update Thumbnails] Progress: ${totalUpdated}/${assets.length} updated`);
    }
  }

  console.log(`[Update Thumbnails] Complete! Updated: ${totalUpdated}, Errors: ${totalErrors}`);
  return {
    total: assets.length,
    updated: totalUpdated,
    errors: totalErrors,
  };
}

