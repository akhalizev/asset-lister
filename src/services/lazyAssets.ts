import { Asset } from '../types/asset';
import { generateMockAssets } from '../data/mockAssets';

const BATCH_SIZE = 500;
const TOTAL_ASSETS = 10000;

// In-memory cache for lazy loading
let assetCache: Asset[] | null = null;

/**
 * Initialize the asset cache with a large dataset
 */
function initializeCache(): Asset[] {
  if (!assetCache) {
    assetCache = generateMockAssets(TOTAL_ASSETS);
  }
  return assetCache;
}

/**
 * Simulate API call for lazy loading assets
 * @param page Page number (0-indexed)
 * @param pageSize Number of items per page
 * @returns Promise with assets for the requested page
 */
export async function fetchAssetsPage(page: number, pageSize: number = BATCH_SIZE): Promise<Asset[]> {
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      const cache = initializeCache();
      const start = page * pageSize;
      const end = Math.min(start + pageSize, cache.length);
      resolve(cache.slice(start, end));
    }, 100 + Math.random() * 200); // 100-300ms delay
  });
}

/**
 * Get total count of available assets
 */
export async function getTotalAssetCount(): Promise<number> {
  initializeCache();
  return TOTAL_ASSETS;
}

/**
 * Search assets with lazy loading support
 * @param query Search query
 * @param filters Filter options
 * @param page Page number
 * @param pageSize Items per page
 */
export async function searchAssets(
  query: string,
  filters: {
    category?: string;
    type?: string;
    status?: string;
    dateFrom?: Date;
    dateTo?: Date;
  },
  page: number = 0,
  pageSize: number = BATCH_SIZE
): Promise<{ assets: Asset[]; total: number }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const cache = initializeCache();
      
      let filtered = cache.filter((asset) => {
        // Search filter
        if (query) {
          const searchLower = query.toLowerCase();
          const matchesSearch =
            asset.assetId.toLowerCase().includes(searchLower) ||
            asset.caseId.toLowerCase().includes(searchLower) ||
            asset.description.toLowerCase().includes(searchLower);
          if (!matchesSearch) return false;
        }

        // Category filter
        if (filters.category && filters.category !== 'all' && asset.category !== filters.category) {
          return false;
        }

        // Type filter
        if (filters.type && filters.type !== 'all' && asset.assetType !== filters.type) {
          return false;
        }

        // Status filter
        if (filters.status && filters.status !== 'all' && asset.fileStatus !== filters.status) {
          return false;
        }

        // Date range filter
        if (filters.dateFrom || filters.dateTo) {
          const assetDate = new Date(asset.capturedOn);
          if (filters.dateFrom) {
            const fromDate = new Date(filters.dateFrom);
            fromDate.setHours(0, 0, 0, 0);
            if (assetDate < fromDate) return false;
          }
          if (filters.dateTo) {
            const toDate = new Date(filters.dateTo);
            toDate.setHours(23, 59, 59, 999);
            if (assetDate > toDate) return false;
          }
        }

        return true;
      });

      const total = filtered.length;
      const start = page * pageSize;
      const end = Math.min(start + pageSize, filtered.length);
      const assets = filtered.slice(start, end);

      resolve({ assets, total });
    }, 150 + Math.random() * 200);
  });
}

