import React, { useState, useMemo, useEffect } from 'react';
import { mockAssets, generateMockAssets } from './data/mockAssets';
import { AssetCardGrid } from './components/AssetCardGrid';
import { AssetDataTable } from './components/AssetDataTable';
import { AssetFilters, DateRange } from './components/AssetFilters';
import { AssetViewer } from './components/AssetViewer';
import { Button } from './components/ui/button';
import { Plus, Download, Trash2 } from 'lucide-react';
import { AssetType, FileStatus, Asset } from './types/asset';
import { fetchAssetsFromSupabase } from './services/assets';
import { isSupabaseConfigured } from './lib/supabaseClient';
import { SupabaseSeeder } from './components/SupabaseSeeder';

export default function App() {
  const [useLargeDataset, setUseLargeDataset] = useState(false);
  const [assets, setAssets] = useState<Asset[]>(mockAssets);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [density, setDensity] = useState<'comfortable' | 'compact' | 'minimal' | 'horizontal'>('comfortable');
  const [tableVariant, setTableVariant] = useState<'id' | 'thumbnail'>('thumbnail');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState<AssetType | 'all'>('all');
  const [selectedStatus, setSelectedStatus] = useState<FileStatus | 'all'>('all');
  const [dateRange, setDateRange] = useState<DateRange>({ from: undefined, to: undefined });
  const [selectedAssetForViewer, setSelectedAssetForViewer] = useState<Asset | null>(null);
  const [viewerOpen, setViewerOpen] = useState(false);

  // Generate large dataset when enabled
  useEffect(() => {
    if (useLargeDataset) {
      const largeDataset = generateMockAssets(5000);
      setAssets(largeDataset);
      console.log(`[Mock] Generated ${largeDataset.length} assets for virtualization demo`);
    } else {
      setAssets(mockAssets);
    }
  }, [useLargeDataset]);

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    let isMounted = true;
    fetchAssetsFromSupabase().then((result) => {
      if (!isMounted) return;
      // Use Supabase data even if empty; this helps verify DB wiring
      console.log('[Supabase] fetched assets:', result.length);
      setAssets(result);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const filteredAssets = useMemo(() => {
    return assets.filter((asset) => {
      const matchesSearch = asset.assetId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           asset.caseId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           asset.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || asset.category === selectedCategory;
      const matchesType = selectedType === 'all' || asset.assetType === selectedType;
      const matchesStatus = selectedStatus === 'all' || asset.fileStatus === selectedStatus;
      
      // Date range filtering based on capturedOn date
      let matchesDateRange = true;
      if (dateRange.from || dateRange.to) {
        const assetDate = new Date(asset.capturedOn);
        if (dateRange.from && dateRange.to) {
          const fromDate = new Date(dateRange.from);
          const toDate = new Date(dateRange.to);
          fromDate.setHours(0, 0, 0, 0);
          toDate.setHours(23, 59, 59, 999);
          matchesDateRange = assetDate >= fromDate && assetDate <= toDate;
        } else if (dateRange.from) {
          const fromDate = new Date(dateRange.from);
          fromDate.setHours(0, 0, 0, 0);
          matchesDateRange = assetDate >= fromDate;
        } else if (dateRange.to) {
          const toDate = new Date(dateRange.to);
          toDate.setHours(23, 59, 59, 999);
          matchesDateRange = assetDate <= toDate;
        }
      }
      
      return matchesSearch && matchesCategory && matchesType && matchesStatus && matchesDateRange;
    });
  }, [assets, searchQuery, selectedCategory, selectedType, selectedStatus, dateRange]);

  const handleAssetClick = (asset: Asset) => {
    setSelectedAssetForViewer(asset);
    setViewerOpen(true);
  };

  const handleCloseViewer = () => {
    setViewerOpen(false);
  };

  const handleNavigateAsset = (asset: Asset) => {
    setSelectedAssetForViewer(asset);
  };

  const handleClearAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedType('all');
    setSelectedStatus('all');
    setDateRange({ from: undefined, to: undefined });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-gray-500">
              Data source: {isSupabaseConfigured ? (
                <span className="text-green-600 font-medium">Supabase</span>
              ) : (
                <span className="text-gray-600">Mock data ({assets.length} assets)</span>
              )}
            </div>
            {!isSupabaseConfigured && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setUseLargeDataset(!useLargeDataset)}
                className="text-xs"
              >
                {useLargeDataset ? 'Switch to Small Dataset' : 'Load Large Dataset (5K)'}
              </Button>
            )}
          </div>
          {isSupabaseConfigured && (
            <div className="border-t pt-2">
              <SupabaseSeeder />
            </div>
          )}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AssetFilters
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          density={density}
          onDensityChange={setDensity}
          tableVariant={tableVariant}
          onTableVariantChange={setTableVariant}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          selectedType={selectedType}
          onTypeChange={setSelectedType}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
          onClearAllFilters={handleClearAllFilters}
        />

        {filteredAssets.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No assets found matching your filters.</p>
          </div>
        ) : viewMode === 'grid' ? (
          <AssetCardGrid
            data={filteredAssets}
            density={density}
            onAssetClick={handleAssetClick}
          />
        ) : (
          <AssetDataTable
            data={filteredAssets}
            variant={tableVariant}
            onRowClick={handleAssetClick}
          />
        )}
      </main>

      {selectedAssetForViewer && (
        <AssetViewer
          asset={selectedAssetForViewer}
          allAssets={assets}
          open={viewerOpen}
          onClose={handleCloseViewer}
          onNavigate={handleNavigateAsset}
        />
      )}
    </div>
  );
}
