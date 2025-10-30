/**
 * Console utility functions for seeding Supabase
 * 
 * Usage in browser console:
 * - window.seedSupabase(5000) - Seed with 5000 assets
 * - window.clearSupabase() - Clear all assets
 * - window.getSupabaseCount() - Get current count
 */

import { seedSupabaseAssets, clearSupabaseAssets, getSupabaseAssetCount } from '../services/seedSupabase';

// Expose to window for console access
if (typeof window !== 'undefined') {
  (window as any).seedSupabase = async (count: number = 5000) => {
    console.log(`Starting to seed ${count} assets...`);
    try {
      const result = await seedSupabaseAssets(count, (current, total) => {
        console.log(`Progress: ${current}/${total} (${Math.round((current / total) * 100)}%)`);
      });
      console.log(`✅ Seeding complete!`, result);
      return result;
    } catch (error) {
      console.error('❌ Seeding failed:', error);
      throw error;
    }
  };

  (window as any).clearSupabase = async () => {
    console.log('Clearing all assets from Supabase...');
    try {
      await clearSupabaseAssets();
      console.log('✅ Cleared successfully');
    } catch (error) {
      console.error('❌ Clear failed:', error);
      throw error;
    }
  };

  (window as any).getSupabaseCount = async () => {
    try {
      const count = await getSupabaseAssetCount();
      console.log(`Current asset count: ${count}`);
      return count;
    } catch (error) {
      console.error('❌ Count failed:', error);
      throw error;
    }
  };

  console.log('🌱 Supabase seeding utilities loaded!');
  console.log('Available functions:');
  console.log('  - window.seedSupabase(count) - Seed database with assets');
  console.log('  - window.clearSupabase() - Clear all assets');
  console.log('  - window.getSupabaseCount() - Get current count');
}

